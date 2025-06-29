"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Briefcase, 
  Crown, 
  FileText, 
  Download, 
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react';

interface QuickActionsProps {
  onCreateResume: () => void;
  onJobSearch: () => void;
  onUpgrade: () => void;
  isPremium: boolean;
}

export function QuickActions({ 
  onCreateResume, 
  onJobSearch, 
  onUpgrade, 
  isPremium 
}: QuickActionsProps) {
  const actions = [
    {
      title: 'Create New Resume',
      description: 'Start building a new resume from scratch',
      icon: <Plus className="h-6 w-6" />,
      onClick: onCreateResume,
      color: 'bg-blue-500 hover:bg-blue-600',
      available: true
    },
    {
      title: 'Find Jobs',
      description: 'Search for jobs that match your skills',
      icon: <Briefcase className="h-6 w-6" />,
      onClick: onJobSearch,
      color: 'bg-green-500 hover:bg-green-600',
      available: true
    },
    {
      title: 'AI Resume Review',
      description: 'Get AI-powered feedback on your resume',
      icon: <Sparkles className="h-6 w-6" />,
      onClick: () => {}, // TODO: Implement AI review
      color: 'bg-purple-500 hover:bg-purple-600',
      available: isPremium,
      premium: true
    },
    {
      title: 'Resume Analytics',
      description: 'View detailed performance metrics',
      icon: <TrendingUp className="h-6 w-6" />,
      onClick: () => {}, // TODO: Implement analytics view
      color: 'bg-orange-500 hover:bg-orange-600',
      available: isPremium,
      premium: true
    },
    {
      title: 'Cover Letter Builder',
      description: 'Create matching cover letters',
      icon: <FileText className="h-6 w-6" />,
      onClick: () => {}, // TODO: Implement cover letter builder
      color: 'bg-teal-500 hover:bg-teal-600',
      available: isPremium,
      premium: true
    },
    {
      title: 'Professional Review',
      description: 'Get expert human feedback',
      icon: <Users className="h-6 w-6" />,
      onClick: () => {}, // TODO: Implement professional review
      color: 'bg-indigo-500 hover:bg-indigo-600',
      available: isPremium,
      premium: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks to help you build and improve your resume
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <div key={index} className="relative">
              <Button
                variant="outline"
                className={`w-full h-auto p-4 flex flex-col items-center gap-3 text-left hover:shadow-md transition-all ${
                  !action.available ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={action.available ? action.onClick : onUpgrade}
                disabled={!action.available && !action.premium}
              >
                <div className={`p-3 rounded-lg text-white ${action.color}`}>
                  {action.icon}
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-sm mb-1">{action.title}</h3>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
                {action.premium && !isPremium && (
                  <div className="absolute top-2 right-2">
                    <Crown className="h-4 w-4 text-yellow-500" />
                  </div>
                )}
              </Button>
            </div>
          ))}
        </div>

        {!isPremium && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Unlock Premium Features
                </h3>
                <p className="text-sm text-gray-600">
                  Get access to AI reviews, analytics, cover letters, and more
                </p>
              </div>
              <Button
                onClick={onUpgrade}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}