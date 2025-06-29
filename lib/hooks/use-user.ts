"use client";

import { useState, useEffect } from 'react';
import { useUser as useClerkUser } from '@clerk/nextjs';
import { User } from '@/lib/models/user';
import { UserService } from '@/lib/services/user-service';

export function useUser() {
  const { user: clerkUser, isLoaded } = useClerkUser();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoaded || !clerkUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Try to get existing user
        let userData = await UserService.getUserByClerkId(clerkUser.id);

        // If user doesn't exist, create them
        if (!userData) {
          const profile = {
            firstName: clerkUser.firstName || '',
            lastName: clerkUser.lastName || '',
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
          };

          userData = await UserService.createUser(clerkUser.id, profile);
        } else {
          // Update last login
          await UserService.updateLastLogin(userData._id);
        }

        setUser(userData);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [clerkUser, isLoaded]);

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return null;

    try {
      const updatedUser = await UserService.updateUser(user._id, updates);
      if (updatedUser) {
        setUser(updatedUser);
      }
      return updatedUser;
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user');
      return null;
    }
  };

  const updateSubscription = async (subscription: any) => {
    if (!user) return null;

    try {
      const updatedUser = await UserService.updateUserSubscription(user._id, subscription);
      if (updatedUser) {
        setUser(updatedUser);
      }
      return updatedUser;
    } catch (err) {
      console.error('Error updating subscription:', err);
      setError('Failed to update subscription');
      return null;
    }
  };

  const checkUsageLimit = async (type: 'resume' | 'export' | 'aiAnalysis' | 'atsCheck') => {
    if (!user) return false;
    return UserService.checkUsageLimit(user._id, type);
  };

  const incrementUsage = async (type: 'resume' | 'export' | 'aiAnalysis' | 'atsCheck') => {
    if (!user) return;
    
    await UserService.incrementUsage(user._id, type);
    
    // Refresh user data to get updated usage
    const updatedUser = await UserService.getUserById(user._id);
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  const getUsageStats = () => {
    if (!user) return null;
    return UserService.getUsageStats(user);
  };

  const isPremium = () => {
    if (!user) return false;
    return UserService.isPremiumUser(user);
  };

  const hasFeature = (feature: keyof User['subscription']['features']) => {
    if (!user) return false;
    return UserService.isFeatureEnabled(user, feature);
  };

  return {
    user,
    clerkUser,
    loading,
    error,
    isLoaded,
    updateUser,
    updateSubscription,
    checkUsageLimit,
    incrementUsage,
    getUsageStats,
    isPremium,
    hasFeature,
  };
}