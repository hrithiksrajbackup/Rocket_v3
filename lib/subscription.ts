// Mock subscription service - replace with your actual subscription logic
export interface UserSubscription {
  isPremium: boolean;
  plan: 'free' | 'pro' | 'enterprise';
  expiresAt?: string;
}

// Mock user subscription - in a real app, this would come from your auth/subscription service
export function getUserSubscription(): UserSubscription {
  // For demo purposes, returning free user
  // In production, this would check actual user subscription status
  return {
    isPremium: false,
    plan: 'free'
  };
}

export function canUseTemplate(templateId: string): boolean {
  const subscription = getUserSubscription();
  const template = getTemplateConfig(templateId);
  
  if (!template) return false;
  if (!template.premium) return true;
  
  return subscription.isPremium;
}

export function canExportResume(): boolean {
  const subscription = getUserSubscription();
  return subscription.isPremium;
}

export function getExportLimitMessage(): string {
  const subscription = getUserSubscription();
  
  if (subscription.isPremium) {
    return "Unlimited exports available";
  }
  
  return "Export feature requires Premium subscription. Upgrade to export your resume in PDF, DOCX, and PNG formats.";
}

export function getTemplateLimitMessage(templateName: string): string {
  return `The ${templateName} template is part of our premium collection. Upgrade to Pro to access all premium templates and advanced features.`;
}

import { getTemplateConfig } from './template-config';