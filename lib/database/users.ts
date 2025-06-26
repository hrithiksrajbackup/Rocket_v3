import { getDatabase } from '../mongodb';
import { User, UserActivity, LoginHistory } from '../models/User';
import { ObjectId } from 'mongodb';

export class UserService {
  private static async getCollection() {
    const db = await getDatabase();
    return db.collection<User>('users');
  }

  private static async getActivityCollection() {
    const db = await getDatabase();
    return db.collection<UserActivity>('user_activities');
  }

  private static async getLoginHistoryCollection() {
    const db = await getDatabase();
    return db.collection<LoginHistory>('login_history');
  }

  static async createUser(userData: Omit<User, 'createdAt' | 'updatedAt' | 'lastLoginAt' | 'loginCount'>): Promise<User> {
    try {
      const collection = await this.getCollection();
      
      const user: User = {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLoginAt: new Date(),
        loginCount: 1,
        preferences: {
          // theme: 'system',
          // emailNotifications: true,
          // autoSave: true,
          ...userData.preferences
        }
      };

      await collection.insertOne(user);
      
      // Log user creation activity
      await this.logActivity(user._id, 'login', { firstLogin: true });
      
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  static async getUserById(userId: string): Promise<User | null> {
    try {
      const collection = await this.getCollection();
      return await collection.findOne({ _id: userId });
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    try {
      const collection = await this.getCollection();
      
      const result = await collection.findOneAndUpdate(
        { _id: userId },
        { 
          $set: { 
            ...updates, 
            updatedAt: new Date() 
          } 
        },
        { returnDocument: 'after' }
      );

      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  static async recordLogin(userId: string, ipAddress?: string, userAgent?: string): Promise<void> {
    try {
      const [userCollection, loginHistoryCollection] = await Promise.all([
        this.getCollection(),
        this.getLoginHistoryCollection()
      ]);

      // Update user login info
      await userCollection.updateOne(
        { _id: userId },
        { 
          $set: { lastLoginAt: new Date() },
          $inc: { loginCount: 1 }
        }
      );

      // Record login history
      await loginHistoryCollection.insertOne({
        userId,
        loginAt: new Date(),
        ipAddress,
        userAgent,
        success: true
      });

      // Log activity
      await this.logActivity(userId, 'login', { ipAddress, userAgent });
    } catch (error) {
      console.error('Error recording login:', error);
      throw new Error('Failed to record login');
    }
  }

  static async logActivity(
    userId: string, 
    action: UserActivity['action'], 
    details?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    try {
      const collection = await this.getActivityCollection();
      
      await collection.insertOne({
        userId,
        action,
        details,
        timestamp: new Date(),
        ipAddress,
        userAgent
      });
    } catch (error) {
      console.error('Error logging activity:', error);
      // Don't throw error for activity logging to avoid breaking main functionality
    }
  }

  static async getUserActivities(userId: string, limit: number = 50): Promise<UserActivity[]> {
    try {
      const collection = await this.getActivityCollection();
      
      return await collection
        .find({ userId })
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error('Error fetching user activities:', error);
      throw new Error('Failed to fetch user activities');
    }
  }

  static async getLoginHistory(userId: string, limit: number = 20): Promise<LoginHistory[]> {
    try {
      const collection = await this.getLoginHistoryCollection();
      
      return await collection
        .find({ userId })
        .sort({ loginAt: -1 })
        .limit(limit)
        .toArray();
    } catch (error) {
      console.error('Error fetching login history:', error);
      throw new Error('Failed to fetch login history');
    }
  }

  static async deleteUser(userId: string): Promise<boolean> {
    try {
      const [userCollection, activityCollection, loginHistoryCollection] = await Promise.all([
        this.getCollection(),
        this.getActivityCollection(),
        this.getLoginHistoryCollection()
      ]);

      // Delete user data
      await Promise.all([
        userCollection.deleteOne({ _id: userId }),
        activityCollection.deleteMany({ userId }),
        loginHistoryCollection.deleteMany({ userId })
      ]);

      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }
}