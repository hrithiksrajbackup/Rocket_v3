export interface UserSubscription {
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'expired' | 'trial';
  startDate: string;
  endDate?: string;
  trialEndDate?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  features: {
    premiumTemplates: boolean;
    unlimitedExports: boolean;
    aiAnalyzer: boolean;
    atsChecker: boolean;
    prioritySupport: boolean;
    teamCollaboration: boolean;
    customBranding: boolean;
    apiAccess: boolean;
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  emailNotifications: {
    marketing: boolean;
    productUpdates: boolean;
    resumeReminders: boolean;
    exportNotifications: boolean;
  };
  defaultTemplate: string;
  autoSave: boolean;
}

export interface UserUsage {
  resumesCreated: number;
  exportsThisMonth: number;
  aiAnalysisUsed: number;
  atsChecksUsed: number;
  lastActiveDate: string;
  totalLoginCount: number;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  jobTitle?: string;
  company?: string;
  industry?: string;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface User {
  _id: string;
  clerkId: string; // Clerk user ID for authentication
  profile: UserProfile;
  subscription: UserSubscription;
  preferences: UserPreferences;
  usage: UserUsage;
  metadata: {
    source: 'organic' | 'referral' | 'social' | 'ads';
    referralCode?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
  isActive: boolean;
  isEmailVerified: boolean;
}

export const defaultUserSubscription: UserSubscription = {
  plan: 'free',
  status: 'active',
  startDate: new Date().toISOString(),
  features: {
    premiumTemplates: false,
    unlimitedExports: false,
    aiAnalyzer: false,
    atsChecker: true, // Free users get basic ATS checking
    prioritySupport: false,
    teamCollaboration: false,
    customBranding: false,
    apiAccess: false,
  }
};

export const defaultUserPreferences: UserPreferences = {
  theme: 'system',
  language: 'en',
  timezone: 'UTC',
  emailNotifications: {
    marketing: true,
    productUpdates: true,
    resumeReminders: true,
    exportNotifications: true,
  },
  defaultTemplate: 'professional',
  autoSave: true,
};

export const defaultUserUsage: UserUsage = {
  resumesCreated: 0,
  exportsThisMonth: 0,
  aiAnalysisUsed: 0,
  atsChecksUsed: 0,
  lastActiveDate: new Date().toISOString(),
  totalLoginCount: 0,
};

// Subscription plan configurations
export const subscriptionPlans = {
  free: {
    name: 'Free',
    price: 0,
    features: {
      premiumTemplates: false,
      unlimitedExports: false,
      aiAnalyzer: false,
      atsChecker: true,
      prioritySupport: false,
      teamCollaboration: false,
      customBranding: false,
      apiAccess: false,
    },
    limits: {
      resumes: 3,
      exportsPerMonth: 2,
      aiAnalysisPerMonth: 0,
      atsChecksPerMonth: 5,
    }
  },
  pro: {
    name: 'Pro',
    price: 12,
    features: {
      premiumTemplates: true,
      unlimitedExports: true,
      aiAnalyzer: true,
      atsChecker: true,
      prioritySupport: true,
      teamCollaboration: false,
      customBranding: true,
      apiAccess: false,
    },
    limits: {
      resumes: -1, // unlimited
      exportsPerMonth: -1, // unlimited
      aiAnalysisPerMonth: 50,
      atsChecksPerMonth: -1, // unlimited
    }
  },
  enterprise: {
    name: 'Enterprise',
    price: 49,
    features: {
      premiumTemplates: true,
      unlimitedExports: true,
      aiAnalyzer: true,
      atsChecker: true,
      prioritySupport: true,
      teamCollaboration: true,
      customBranding: true,
      apiAccess: true,
    },
    limits: {
      resumes: -1, // unlimited
      exportsPerMonth: -1, // unlimited
      aiAnalysisPerMonth: -1, // unlimited
      atsChecksPerMonth: -1, // unlimited
      teamMembers: 5,
    }
  }
};