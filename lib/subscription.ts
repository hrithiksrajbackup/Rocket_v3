"use client";

import { useUser } from '@/lib/hooks/use-user';
import { User } from '@/lib/models/user';
import { UserService } from '@/lib/services/user-service';

export interface UserSubscription {
  isPremium: boolean;
  plan: 'free' | 'pro' | 'enterprise';
  expiresAt?: string;
}

// Hook to get user subscription from the user management system
export function getUserSubscription(): UserSubscription {
  // This is a simplified version for components that can't use hooks
  // In a real implementation, you'd want to use the useUser hook
  return {
    isPremium: false,
    plan: 'free'
  };
}

export function canUseTemplate(templateId: string, user?: User): boolean {
  if (!user) return false;
  
  const template = getTemplateConfig(templateId);
  if (!template) return false;
  if (!template.premium) return true;
  
  return UserService.isPremiumUser(user);
}

export function canExportTemplate(templateId: string, user?: User): boolean {
  if (!user) return false;
  
  const template = getTemplateConfig(templateId);
  if (!template) return false;
  if (!template.premium) return true;
  
  return UserService.isPremiumUser(user);
}

export function canExportResume(user?: User): boolean {
  if (!user) return false;
  return UserService.isFeatureEnabled(user, 'unlimitedExports');
}

export function canUseAIAnalyzer(user?: User): boolean {
  if (!user) return false;
  return UserService.isFeatureEnabled(user, 'aiAnalyzer');
}

export function canUseATSChecker(user?: User): boolean {
  if (!user) return true; // Basic ATS checking is available to all users
  return UserService.isFeatureEnabled(user, 'atsChecker');
}

export function getExportLimitMessage(user?: User): string {
  if (!user) {
    return "Please sign in to export your resume.";
  }

  if (UserService.isPremiumUser(user)) {
    return "Unlimited exports available";
  }
  
  const usageStats = UserService.getUsageStats(user);
  const remaining = usageStats.exports.limit - usageStats.exports.used;
  
  if (remaining <= 0) {
    return "You've reached your monthly export limit. Upgrade to Pro for unlimited exports.";
  }
  
  return `${remaining} exports remaining this month. Upgrade to Pro for unlimited exports.`;
}

export function getAIAnalyzerLimitMessage(user?: User): string {
  if (!user) {
    return "Please sign in to use AI Resume Analyzer.";
  }

  if (!UserService.isFeatureEnabled(user, 'aiAnalyzer')) {
    return "AI Resume Analyzer is a premium feature. Upgrade to Pro to get comprehensive analysis including spelling checks, ATS optimization, and keyword suggestions.";
  }

  const usageStats = UserService.getUsageStats(user);
  if (usageStats.aiAnalysis.unlimited) {
    return "Unlimited AI analysis available";
  }

  const remaining = usageStats.aiAnalysis.limit - usageStats.aiAnalysis.used;
  if (remaining <= 0) {
    return "You've reached your monthly AI analysis limit. Upgrade to Enterprise for unlimited analysis.";
  }

  return `${remaining} AI analyses remaining this month.`;
}

export function getTemplateLimitMessage(templateName: string): string {
  return `The ${templateName} template is part of our premium collection. Upgrade to Pro to access all premium templates and advanced features.`;
}

// Usage tracking functions
export async function trackUsage(type: 'resume' | 'export' | 'aiAnalysis' | 'atsCheck', user?: User) {
  if (!user) return false;

  try {
    const response = await fetch('/api/users/usage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to track usage');
    }

    return true;
  } catch (error) {
    console.error('Error tracking usage:', error);
    return false;
  }
}

export async function checkUsageLimit(type: 'resume' | 'export' | 'aiAnalysis' | 'atsCheck', user?: User): Promise<boolean> {
  if (!user) return false;

  try {
    const response = await fetch(`/api/users/usage?type=${type}`);
    
    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.canPerform;
  } catch (error) {
    console.error('Error checking usage limit:', error);
    return false;
  }
}

import { getTemplateConfig } from './template-config';