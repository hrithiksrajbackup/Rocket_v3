"use client";

import { useSubscription } from '@/hooks/use-subscription';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Crown, FileText, AlertTriangle } from 'lucide-react';

interface ResumeLimitCheckProps {
  currentResumeCount: number;
  onUpgrade?: () => void;
}

export function ResumeLimitCheck({ currentResumeCount, onUpgrade }: ResumeLimitCheckProps) {
  const { isPremium, limits, checkResumeLimit } = useSubscription();

  if (isPremium) {
    return null; // No limits for premium users
  }

  const canCreateMore = checkResumeLimit(currentResumeCount);
  const usagePercentage = (currentResumeCount / limits.maxResumes) * 100;
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = !canCreateMore;

  if (!isNearLimit && !isAtLimit) {
    return null; // Don't show anything if user is well within limits
  }

  return (
    <Card className={`border-2 ${
      isAtLimit 
        ? 'border-red-200 bg-red-50' 
        : 'border-amber-200 bg-amber-50'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isAtLimit 
              ? 'bg-red-100' 
              : 'bg-amber-100'
          }`}>
            {isAtLimit ? (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            ) : (
              <FileText className="h-5 w-5 text-amber-600" />
            )}
          </div>
          
          <div className="flex-1">
            <h4 className={`font-semibold ${
              isAtLimit ? 'text-red-900' : 'text-amber-900'
            }`}>
              {isAtLimit ? 'Resume Limit Reached' : 'Approaching Resume Limit'}
            </h4>
            
            <p className={`text-sm mt-1 ${
              isAtLimit ? 'text-red-800' : 'text-amber-800'
            }`}>
              You've used {currentResumeCount} of {limits.maxResumes} free resumes.
              {isAtLimit && ' Upgrade to Premium for unlimited resumes.'}
            </p>
            
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Usage</span>
                <span>{currentResumeCount}/{limits.maxResumes}</span>
              </div>
              <Progress 
                value={usagePercentage} 
                className={`h-2 ${
                  isAtLimit ? 'bg-red-100' : 'bg-amber-100'
                }`}
              />
            </div>
            
            {(isAtLimit || isNearLimit) && (
              <Button 
                onClick={onUpgrade}
                size="sm" 
                className={`mt-3 ${
                  isAtLimit 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-amber-600 hover:bg-amber-700'
                } text-white`}
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}