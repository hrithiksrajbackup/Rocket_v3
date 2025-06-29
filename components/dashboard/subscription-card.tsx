"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  Sparkles, 
  Check, 
  Zap, 
  Star, 
  Gift,
  Loader2,
  CreditCard,
  Shield,
  Infinity as InfinityIcon ,
  Download,
  FileText,
  Brain,
  Palette
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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

interface SubscriptionCardProps {
  onUpgrade?: () => void;
}

export function SubscriptionCard({ onUpgrade }: SubscriptionCardProps) {
  const { user } = useUser();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSubscriptionStatus();
    }
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch('/api/payments/status');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async () => {
    if (!user) return;

    setIsUpgrading(true);
    try {
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100, // $1 for lifetime access
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.paymentUrl) {
          // Redirect to PhonePe payment page
          window.location.href = data.paymentUrl;
        } else {
          throw new Error(data.error || 'Failed to initiate payment');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment initiation failed');
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      toast({
        title: "Upgrade Failed",
        description: error instanceof Error ? error.message : "Failed to start upgrade process",
        variant: "destructive",
      });
    } finally {
      setIsUpgrading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-0 bg-white/60 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Premium user card
  if (subscription?.status === 'ACTIVE') {
    return (
      <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full -translate-y-16 translate-x-16"></div>
        <CardContent className="p-6 relative">
          <div className="flex items-center space-x-2 mb-3">
            <Crown className="h-6 w-6 text-amber-600" />
            <h3 className="font-bold text-amber-900">Premium Active</h3>
            <Badge className="bg-amber-500 text-white">
              {subscription.subscriptionType}
            </Badge>
          </div>
          
          <p className="text-sm text-amber-800 mb-4">
            You have access to all premium features including unlimited resumes, AI suggestions, and premium templates.
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-amber-800">
              <Check className="h-4 w-4 mr-2 text-amber-600" />
              <span>Unlimited Resumes</span>
            </div>
            <div className="flex items-center text-sm text-amber-800">
              <Check className="h-4 w-4 mr-2 text-amber-600" />
              <span>AI-Powered Suggestions</span>
            </div>
            <div className="flex items-center text-sm text-amber-800">
              <Check className="h-4 w-4 mr-2 text-amber-600" />
              <span>Premium Templates</span>
            </div>
            <div className="flex items-center text-sm text-amber-800">
              <Check className="h-4 w-4 mr-2 text-amber-600" />
              <span>Priority Support</span>
            </div>
          </div>

          <div className="text-xs text-amber-700">
            Activated: {new Date(subscription.activatedAt).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Free user upgrade card
  return (
    <Card className="border-0 bg-gradient-to-br from-blue-50 to-purple-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full -translate-y-16 translate-x-16"></div>
      <CardContent className="p-6 relative">
        <div className="flex items-center space-x-2 mb-3">
          <Crown className="h-6 w-6 text-blue-600" />
          <h3 className="font-bold text-blue-900">Upgrade to Premium</h3>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            Limited Time
          </Badge>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="text-3xl font-bold text-blue-900">$1</span>
            <span className="text-sm text-blue-700 line-through">$29</span>
            <Badge variant="destructive" className="text-xs">
              <span>96% OFF</span>
            </Badge>
          </div>
          <p className="text-sm text-blue-800">
            Lifetime access to all premium features
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-blue-800">
            <InfinityIcon className="h-4 w-4 mr-2 text-blue-600" />
            <span>Unlimited Resumes</span>
          </div>
          <div className="flex items-center text-sm text-blue-800">
            <Brain className="h-4 w-4 mr-2 text-blue-600" />
            <span>AI-Powered Content Suggestions</span>
          </div>
          <div className="flex items-center text-sm text-blue-800">
            <Palette className="h-4 w-4 mr-2 text-blue-600" />
            <span>12+ Premium Templates</span>
          </div>
          <div className="flex items-center text-sm text-blue-800">
            <Download className="h-4 w-4 mr-2 text-blue-600" />
            <span>All Export Formats</span>
          </div>
          <div className="flex items-center text-sm text-blue-800">
            <Shield className="h-4 w-4 mr-2 text-blue-600" />
            <span>Advanced ATS Optimization</span>
          </div>
          <div className="flex items-center text-sm text-blue-800">
            <Star className="h-4 w-4 mr-2 text-blue-600" />
            <span>Priority Support</span>
          </div>
        </div>

        <Button 
          onClick={handleUpgrade}
          disabled={isUpgrading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 font-semibold"
        >
          {isUpgrading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Upgrade Now - $1
            </>
          )}
        </Button>

        <div className="flex items-center justify-center mt-3 text-xs text-blue-700">
          <CreditCard className="h-3 w-3 mr-1" />
          <span>Secure payment via PhonePe</span>
        </div>
      </CardContent>
    </Card>
  );
}