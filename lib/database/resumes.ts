import { getDatabase } from '../mongodb';
import { ResumeDocument, ResumeVersion } from '../models/Resume';
import { ResumeData } from '../types';
import { ObjectId } from 'mongodb';
import { UserService } from './users';

export class ResumeService {
  private static async getCollection() {
    const db = await getDatabase();
    return db.collection<ResumeDocument>('resumes');
  }

  private static async getVersionsCollection() {
    const db = await getDatabase();
    return db.collection<ResumeVersion>('resume_versions');
  }

  static async createResume(
    userId: string, 
    resumeData: ResumeData, 
    title: string = 'Untitled Resume'
  ): Promise<ResumeDocument> {
    try {
      const collection = await this.getCollection();
      
      const resume: Omit<ResumeDocument, '_id'> = {
        ...resumeData,
        userId,
        title,
        isPublic: false,
        tags: [],
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastAccessedAt: new Date(),
        exportCount: 0,
        templateId: resumeData.settings.template
      };

      const result = await collection.insertOne(resume as ResumeDocument);
      const createdResume = { ...resume, _id: result.insertedId } as ResumeDocument;

      // Create initial version
      await this.createVersion(result.insertedId, resumeData, userId, 'Initial version');

      // Log activity
      await UserService.logActivity(userId, 'resume_created', { 
        resumeId: result.insertedId.toString(),
        title 
      });

      return createdResume;
    } catch (error) {
      console.error('Error creating resume:', error);
      throw new Error('Failed to create resume');
    }
  }

  static async getResumeById(resumeId: string, userId?: string): Promise<ResumeDocument | null> {
    try {
      const collection = await this.getCollection();
      const objectId = new ObjectId(resumeId);
      
      const query: any = { _id: objectId };
      if (userId) {
        query.$or = [
          { userId },
          { isPublic: true }
        ];
      }

      const resume = await collection.findOne(query);
      
      if (resume && userId) {
        // Update last accessed time
        await collection.updateOne(
          { _id: objectId },
          { $set: { lastAccessedAt: new Date() } }
        );
      }

      return resume;
    } catch (error) {
      console.error('Error fetching resume:', error);
      throw new Error('Failed to fetch resume');
    }
  }

  static async getUserResumes(userId: string, limit: number = 50): Promise<ResumeDocument[]> {
    try {
      const collection = await this.getCollection();
      
      return await collection
        .find({ userId })
        .sort({ updatedAt: -1 })
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error('Error fetching user resumes:', error);
      throw new Error('Failed to fetch user resumes');
    }
  }

  static async updateResume(
    resumeId: string, 
    userId: string, 
    updates: Partial<ResumeData>,
    changeDescription?: string
  ): Promise<ResumeDocument | null> {
    try {
      const collection = await this.getCollection();
      const objectId = new ObjectId(resumeId);

      // Get current resume to create version
      const currentResume = await collection.findOne({ _id: objectId, userId });
      if (!currentResume) {
        throw new Error('Resume not found or access denied');
      }

      const updatedData = { ...currentResume, ...updates };
      const newVersion = currentResume.version + 1;

      const result = await collection.findOneAndUpdate(
        { _id: objectId, userId },
        { 
          $set: { 
            ...updates,
            version: newVersion,
            updatedAt: new Date(),
            lastAccessedAt: new Date()
          } 
        },
        { returnDocument: 'after' }
      );

      if (result.value) {
        // Create new version
        await this.createVersion(objectId, updatedData, userId, changeDescription);

        // Log activity
        await UserService.logActivity(userId, 'resume_updated', { 
          resumeId: resumeId,
          version: newVersion,
          changeDescription 
        });
      }

      return result.value;
    } catch (error) {
      console.error('Error updating resume:', error);
      throw new Error('Failed to update resume');
    }
  }

  static async deleteResume(resumeId: string, userId: string): Promise<boolean> {
    try {
      const [collection, versionsCollection] = await Promise.all([
        this.getCollection(),
        this.getVersionsCollection()
      ]);
      
      const objectId = new ObjectId(resumeId);

      // Delete resume and all its versions
      const [resumeResult] = await Promise.all([
        collection.deleteOne({ _id: objectId, userId }),
        versionsCollection.deleteMany({ resumeId: objectId })
      ]);

      if (resumeResult.deletedCount > 0) {
        // Log activity
        await UserService.logActivity(userId, 'resume_deleted', { 
          resumeId: resumeId 
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw new Error('Failed to delete resume');
    }
  }

  static async duplicateResume(resumeId: string, userId: string, newTitle?: string): Promise<ResumeDocument> {
    try {
      const originalResume = await this.getResumeById(resumeId, userId);
      if (!originalResume) {
        throw new Error('Resume not found or access denied');
      }

      const { _id, createdAt, updatedAt, lastAccessedAt, version, exportCount, ...resumeData } = originalResume;
      
      return await this.createResume(
        userId, 
        resumeData, 
        newTitle || `${originalResume.title} (Copy)`
      );
    } catch (error) {
      console.error('Error duplicating resume:', error);
      throw new Error('Failed to duplicate resume');
    }
  }

  static async incrementExportCount(resumeId: string, userId: string): Promise<void> {
    try {
      const collection = await this.getCollection();
      const objectId = new ObjectId(resumeId);

      await collection.updateOne(
        { _id: objectId, userId },
        { $inc: { exportCount: 1 } }
      );

      // Log activity
      await UserService.logActivity(userId, 'resume_exported', { 
        resumeId: resumeId 
      });
    } catch (error) {
      console.error('Error incrementing export count:', error);
      // Don't throw error as this is not critical
    }
  }

  private static async createVersion(
    resumeId: ObjectId, 
    data: ResumeData, 
    userId: string, 
    changeDescription?: string
  ): Promise<void> {
    try {
      const collection = await this.getVersionsCollection();
      
      // Get current version count
      const versionCount = await collection.countDocuments({ resumeId });
      
      await collection.insertOne({
        resumeId,
        version: versionCount + 1,
        data,
        createdAt: new Date(),
        createdBy: userId,
        changeDescription
      });

      // Keep only last 10 versions to save space
      const versions = await collection
        .find({ resumeId })
        .sort({ version: -1 })
        .skip(10)
        .toArray();

      if (versions.length > 0) {
        const oldVersionIds = versions.map(v => v._id);
        await collection.deleteMany({ _id: { $in: oldVersionIds } });
      }
    } catch (error) {
      console.error('Error creating version:', error);
      // Don't throw error as this is not critical
    }
  }

  static async getResumeVersions(resumeId: string, userId: string): Promise<ResumeVersion[]> {
    try {
      const collection = await this.getVersionsCollection();
      const objectId = new ObjectId(resumeId);

      // Verify user has access to this resume
      const resume = await this.getResumeById(resumeId, userId);
      if (!resume) {
        throw new Error('Resume not found or access denied');
      }

      return await collection
        .find({ resumeId: objectId })
        .sort({ version: -1 })
        .toArray();
    } catch (error) {
      console.error('Error fetching resume versions:', error);
      throw new Error('Failed to fetch resume versions');
    }
  }

  static async restoreVersion(resumeId: string, version: number, userId: string): Promise<ResumeDocument | null> {
    try {
      const versionsCollection = await this.getVersionsCollection();
      const objectId = new ObjectId(resumeId);

      const versionDoc = await versionsCollection.findOne({ 
        resumeId: objectId, 
        version 
      });

      if (!versionDoc) {
        throw new Error('Version not found');
      }

      return await this.updateResume(
        resumeId, 
        userId, 
        versionDoc.data, 
        `Restored to version ${version}`
      );
    } catch (error) {
      console.error('Error restoring version:', error);
      throw new Error('Failed to restore version');
    }
  }

  static async searchResumes(
    userId: string, 
    query: string, 
    tags?: string[], 
    limit: number = 20
  ): Promise<ResumeDocument[]> {
    try {
      const collection = await this.getCollection();
      
      const searchQuery: any = { userId };
      
      if (query) {
        searchQuery.$or = [
          { title: { $regex: query, $options: 'i' } },
          { 'personal.name': { $regex: query, $options: 'i' } },
          { 'personal.title': { $regex: query, $options: 'i' } }
        ];
      }

      if (tags && tags.length > 0) {
        searchQuery.tags = { $in: tags };
      }

      return await collection
        .find(searchQuery)
        .sort({ updatedAt: -1 })
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error('Error searching resumes:', error);
      throw new Error('Failed to search resumes');
    }
  }
}