import { ObjectId } from 'mongodb';
import { ResumeData } from '../types';

export interface ResumeDocument extends Omit<ResumeData, 'meta'> {
  _id?: ObjectId;
  userId: string;
  title: string;
  isPublic: boolean;
  tags: string[];
  version: number;
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt: Date;
  exportCount: number;
  atsScore?: number;
  templateId: string;
}

export interface ResumeVersion {
  _id?: ObjectId;
  resumeId: ObjectId;
  version: number;
  data: ResumeData;
  createdAt: Date;
  createdBy: string;
  changeDescription?: string;
}