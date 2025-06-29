"use client";

import { ReactNode } from 'react';
import { useSubscription } from '@/hooks/use-subscription';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Lock, Sparkles } from 'lucide-react';

interface FeatureGateProps {
  feature: 'ai' | 'templates' | 'export' | 'ats' | 'support';
  children: ReactNode;
  fallback?: ReactNode;
  showUpgrade?: boolean;
}

export function FeatureGate({ 
  feature, 
  children, 
  fallback, 
  showUpgrade = true 
}: FeatureGateProps) {
  const { isPremium, getUpgradeMessage } = useSubscription();

  // Map features to subscription limits
  const featureMap = {
    ai: 'hasAIFeatures',
    templates: 'hasPremiumTemplates',
    export: 'hasAdvancedExport',
    ats: 'hasATSOptimization',
    support: 'hasPrioritySupport',
  } as const;

  const hasAccess = isPremium; // For now, all features require premium

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (!showUpgrade) {
    return null;
  }

  return (
    <Card className="border-2 border-dashed border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Crown className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-amber-900 mb-2">
          Premium Feature
        </h3>
        
        <p className="text-sm text-amber-800 mb-4 max-w-md mx-auto">
          {getUpgradeMessage(feature)}
        </p>
        
        <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
          <Sparkles className="mr-2 h-4 w-4" />
          Upgrade to Premium
        </Button>
      </CardContent>
    </Card>
  );
}