"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, X, Zap, Star } from 'lucide-react';

interface PremiumUpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: 'template' | 'export' | 'general';
  templateName?: string;
}

export function PremiumUpgradeDialog({ 
  open, 
  onOpenChange, 
  feature = 'general',
  templateName 
}: PremiumUpgradeDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'enterprise'>('pro');

  const getFeatureMessage = () => {
    switch (feature) {
      case 'template':
        return {
          title: `Unlock ${templateName} Template`,
          description: `The ${templateName} template is part of our premium collection. Upgrade to Pro to access all premium templates and advanced features.`
        };
      case 'export':
        return {
          title: 'Export Your Resume',
          description: 'Resume export is a premium feature. Upgrade to Pro to download your resume in PDF, DOCX, and PNG formats.'
        };
      default:
        return {
          title: 'Upgrade to Premium',
          description: 'Unlock all premium features and take your resume to the next level.'
        };
    }
  };

  const { title, description } = getFeatureMessage();

  const plans = [
    {
      id: 'pro',
      name: 'Pro',
      price: '$12',
      period: '/month',
      description: 'Perfect for job seekers',
      features: [
        'All premium templates',
        'Unlimited exports (PDF, DOCX, PNG)',
        'AI content suggestions',
        'ATS optimization',
        'Priority support',
        'Version history',
        'Custom branding removal'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$49',
      period: '/month',
      description: 'For teams and career coaches',
      features: [
        'Everything in Pro',
        'Team collaboration (5 members)',
        'Advanced analytics',
        'Custom templates',
        'API access',
        'White-label solution',
        'Dedicated support'
      ],
      popular: false
    }
  ];

  const handleUpgrade = (planId: string) => {
    // In a real app, this would redirect to payment processing
    console.log(`Upgrading to ${planId} plan`);
    // For demo, just close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-lg border-2 p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedPlan(plan.id as 'pro' | 'enterprise')}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">{plan.period}</div>
                </div>
              </div>

              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Maybe Later
          </Button>
          <Button
            onClick={() => handleUpgrade(selectedPlan)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            Upgrade to {plans.find(p => p.id === selectedPlan)?.name}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}