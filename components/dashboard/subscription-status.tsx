"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  Check, 
  X, 
  Sparkles, 
  FileText, 
  Download, 
  BarChart3,
  Users,
  Zap
} from 'lucide-react';

interface UserSubscription {
  status: 'ACTIVE' | 'INACTIVE';
  subscriptionType: string;
  features: string[];
  activatedAt: string;
}

interface SubscriptionStatusProps {
  subscription: UserSubscription | null;
  onUpgrade: () => void;
}

const freeFeatures = [
  { name: '1 Resume', icon: FileText, included: true },
  { name: 'Basic Templates', icon: FileText, included: true },
  { name: 'PDF Export', icon: Download, included: true },
  { name: 'AI Suggestions', icon: Sparkles, included: false },
  { name: 'Premium Templates', icon: FileText, included: false },
  { name: 'Analytics', icon: BarChart3, included: false },
  { name: 'Cover Letters', icon: FileText, included: false },
  { name: 'Professional Review', icon: Users, included: false }
];

const premiumFeatures = [
  { name: 'Unlimited Resumes', icon: FileText, included: true },
  { name: 'All Templates', icon: FileText, included: true },
  { name: 'All Export Formats', icon: Download, included: true },
  { name: 'AI Suggestions', icon: Sparkles, included: true },
  { name: 'Resume Analytics', icon: BarChart3, included: true },
  { name: 'Cover Letter Builder', icon: FileText, included: true },
  { name: 'Job Search Integration', icon: Zap, included: true },
  { name: 'Professional Review', icon: Users, included: true }
];

export function SubscriptionStatus({ subscription, onUpgrade }: SubscriptionStatusProps) {
  const isPremium = subscription?.status === 'ACTIVE';
  const features = isPremium ? premiumFeatures : freeFeatures;

  return (
    <Card className={isPremium ? 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="flex items-center gap-2">
              {isPremium ? (
                <>
                  <Crown className="h-5 w-5 text-yellow-600" />
                  Premium Plan
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 text-gray-600" />
                  Free Plan
                </>
              )}
            </CardTitle>
            <Badge 
              variant={isPremium ? "default" : "secondary"}
              className={isPremium ? "bg-yellow-600 hover:bg-yellow-700" : ""}
            >
              {isPremium ? 'Active' : 'Free'}
            </Badge>
          </div>
          
          {!isPremium && (
            <Button
              onClick={onUpgrade}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          )}
        </div>
        
        <CardDescription>
          {isPremium 
            ? `Premium subscription activated on ${new Date(subscription.activatedAt).toLocaleDateString()}`
            : 'Upgrade to unlock all features and create unlimited resumes'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!isPremium && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Resume Limit</span>
              <span>1 / 1</span>
            </div>
            <Progress value={100} className="h-2" />
            <p className="text-xs text-gray-600 mt-1">
              You've reached your free plan limit. Upgrade for unlimited resumes.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="font-medium text-sm">
            {isPremium ? 'Premium Features' : 'Plan Features'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className={`p-1 rounded ${
                    feature.included 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {feature.included ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                  </div>
                  <Icon className={`h-4 w-4 ${
                    feature.included ? 'text-gray-700' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    feature.included ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {feature.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {isPremium && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-yellow-600" />
              <span className="font-medium text-sm">Premium Benefits</span>
            </div>
            <p className="text-sm text-gray-600">
              You have lifetime access to all premium features. Create unlimited resumes, 
              use AI suggestions, and access professional templates.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}