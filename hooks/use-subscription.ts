"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface UserSubscription {
  _id?: string;
  userId: string;
  subscriptionType: 'LIFETIME' | 'MONTHLY' | 'YEARLY';
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
  paymentId: string;
  activatedAt: Date;
  expiresAt?: Date;
  features: string[];
}

interface SubscriptionLimits {
  maxResumes: number;
  hasAIFeatures: boolean;
  hasPremiumTemplates: boolean;
  hasAdvancedExport: boolean;
  hasATSOptimization: boolean;
  hasPrioritySupport: boolean;
}

export function useSubscription() {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/payments/status');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data.subscription);
      } else {
        throw new Error('Failed to fetch subscription');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Subscription fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isPremium = subscription?.status === 'ACTIVE';

  const limits: SubscriptionLimits = {
    maxResumes: isPremium ? -1 : 3, // -1 means unlimited
    hasAIFeatures: isPremium,
    hasPremiumTemplates: isPremium,
    hasAdvancedExport: isPremium,
    hasATSOptimization: isPremium,
    hasPrioritySupport: isPremium,
  };

  const checkFeatureAccess = (feature: keyof SubscriptionLimits): boolean => {
    return limits[feature] as boolean;
  };

  const checkResumeLimit = (currentCount: number): boolean => {
    if (limits.maxResumes === -1) return true; // Unlimited
    return currentCount < limits.maxResumes;
  };

  const getUpgradeMessage = (feature: string): string => {
    const messages: Record<string, string> = {
      resumes: `You've reached the limit of ${limits.maxResumes} resumes. Upgrade to Premium for unlimited resumes.`,
      ai: 'AI-powered suggestions are available with Premium. Upgrade to get intelligent content recommendations.',
      templates: 'Premium templates are available with Premium subscription. Upgrade to access 12+ professional templates.',
      export: 'Advanced export formats are available with Premium. Upgrade to export in multiple high-quality formats.',
      ats: 'Advanced ATS optimization is available with Premium. Upgrade to maximize your resume compatibility.',
      support: 'Priority support is available with Premium. Upgrade to get faster response times.',
    };
    
    return messages[feature] || 'This feature requires Premium subscription.';
  };

  return {
    subscription,
    isPremium,
    isLoading,
    error,
    limits,
    checkFeatureAccess,
    checkResumeLimit,
    getUpgradeMessage,
    refetch: fetchSubscription,
  };
}