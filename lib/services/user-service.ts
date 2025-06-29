import { User, UserProfile, UserSubscription, UserPreferences, defaultUserSubscription, defaultUserPreferences, defaultUserUsage, subscriptionPlans } from '@/lib/models/user';

// Mock database - replace with actual database calls
let users: User[] = [];

export class UserService {
  static async createUser(clerkId: string, profile: Partial<UserProfile>, metadata?: any): Promise<User> {
    const now = new Date().toISOString();
    
    const newUser: User = {
      _id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      clerkId,
      profile: {
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        experienceLevel: profile.experienceLevel || 'entry',
        ...profile
      },
      subscription: { ...defaultUserSubscription },
      preferences: { ...defaultUserPreferences },
      usage: { ...defaultUserUsage },
      metadata: {
        source: 'organic',
        ...metadata
      },
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
      isActive: true,
      isEmailVerified: false,
    };

    users.push(newUser);
    return newUser;
  }

  static async getUserByClerkId(clerkId: string): Promise<User | null> {
    return users.find(user => user.clerkId === clerkId) || null;
  }

  static async getUserById(userId: string): Promise<User | null> {
    return users.find(user => user._id === userId) || null;
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = users.findIndex(user => user._id === userId);
    if (userIndex === -1) return null;

    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return users[userIndex];
  }

  static async updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<User | null> {
    const user = await this.getUserById(userId);
    if (!user) return null;

    return this.updateUser(userId, {
      profile: { ...user.profile, ...profile }
    });
  }

  static async updateUserSubscription(userId: string, subscription: Partial<UserSubscription>): Promise<User | null> {
    const user = await this.getUserById(userId);
    if (!user) return null;

    const updatedSubscription = { ...user.subscription, ...subscription };
    
    // Update features based on plan
    if (subscription.plan) {
      const planConfig = subscriptionPlans[subscription.plan];
      updatedSubscription.features = { ...planConfig.features };
    }

    return this.updateUser(userId, {
      subscription: updatedSubscription
    });
  }

  static async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<User | null> {
    const user = await this.getUserById(userId);
    if (!user) return null;

    return this.updateUser(userId, {
      preferences: { ...user.preferences, ...preferences }
    });
  }

  static async incrementUsage(userId: string, type: 'resume' | 'export' | 'aiAnalysis' | 'atsCheck'): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) return;

    const usage = { ...user.usage };
    
    switch (type) {
      case 'resume':
        usage.resumesCreated += 1;
        break;
      case 'export':
        usage.exportsThisMonth += 1;
        break;
      case 'aiAnalysis':
        usage.aiAnalysisUsed += 1;
        break;
      case 'atsCheck':
        usage.atsChecksUsed += 1;
        break;
    }

    usage.lastActiveDate = new Date().toISOString();

    await this.updateUser(userId, { usage });
  }

  static async updateLastLogin(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) return;

    await this.updateUser(userId, {
      lastLoginAt: new Date().toISOString(),
      usage: {
        ...user.usage,
        totalLoginCount: user.usage.totalLoginCount + 1,
        lastActiveDate: new Date().toISOString()
      }
    });
  }

  static async checkUsageLimit(userId: string, type: 'resume' | 'export' | 'aiAnalysis' | 'atsCheck'): Promise<boolean> {
    const user = await this.getUserById(userId);
    if (!user) return false;

    const planConfig = subscriptionPlans[user.subscription.plan];
    const usage = user.usage;

    switch (type) {
      case 'resume':
        return planConfig.limits.resumes === -1 || usage.resumesCreated < planConfig.limits.resumes;
      case 'export':
        return planConfig.limits.exportsPerMonth === -1 || usage.exportsThisMonth < planConfig.limits.exportsPerMonth;
      case 'aiAnalysis':
        return planConfig.limits.aiAnalysisPerMonth === -1 || usage.aiAnalysisUsed < planConfig.limits.aiAnalysisPerMonth;
      case 'atsCheck':
        return planConfig.limits.atsChecksPerMonth === -1 || usage.atsChecksUsed < planConfig.limits.atsChecksPerMonth;
      default:
        return false;
    }
  }

  static async resetMonthlyUsage(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user) return;

    await this.updateUser(userId, {
      usage: {
        ...user.usage,
        exportsThisMonth: 0,
        aiAnalysisUsed: 0,
        atsChecksUsed: 0,
      }
    });
  }

  static getUserSubscriptionFeatures(user: User): UserSubscription['features'] {
    return user.subscription.features;
  }

  static isFeatureEnabled(user: User, feature: keyof UserSubscription['features']): boolean {
    return user.subscription.features[feature];
  }

  static isPremiumUser(user: User): boolean {
    return user.subscription.plan !== 'free' && user.subscription.status === 'active';
  }

  static getUsageStats(user: User) {
    const planConfig = subscriptionPlans[user.subscription.plan];
    
    return {
      resumes: {
        used: user.usage.resumesCreated,
        limit: planConfig.limits.resumes,
        unlimited: planConfig.limits.resumes === -1
      },
      exports: {
        used: user.usage.exportsThisMonth,
        limit: planConfig.limits.exportsPerMonth,
        unlimited: planConfig.limits.exportsPerMonth === -1
      },
      aiAnalysis: {
        used: user.usage.aiAnalysisUsed,
        limit: planConfig.limits.aiAnalysisPerMonth,
        unlimited: planConfig.limits.aiAnalysisPerMonth === -1
      },
      atsChecks: {
        used: user.usage.atsChecksUsed,
        limit: planConfig.limits.atsChecksPerMonth,
        unlimited: planConfig.limits.atsChecksPerMonth === -1
      }
    };
  }
}