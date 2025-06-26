import { ObjectId } from 'mongodb';

export interface User {
  _id: string; // Clerk userId
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  loginCount: number;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    emailNotifications: boolean;
    autoSave: boolean;
  };
}

export interface UserActivity {
  _id?: ObjectId;
  userId: string;
  action: 'login' | 'logout' | 'resume_created' | 'resume_updated' | 'resume_deleted' | 'resume_exported';
  details?: Record<string, any>;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface LoginHistory {
  _id?: ObjectId;
  userId: string;
  loginAt: Date;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  failureReason?: string;
}