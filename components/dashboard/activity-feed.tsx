"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity, 
  FileText, 
  Download, 
  Edit, 
  Plus, 
  Trash2, 
  LogIn,
  Crown
} from 'lucide-react';

interface ActivityItem {
  _id: string;
  action: string;
  details?: Record<string, any>;
  timestamp: string;
}

interface ActivityFeedProps {
  userId?: string;
}

const getActivityIcon = (action: string) => {
  switch (action) {
    case 'resume_created':
      return <Plus className="h-4 w-4 text-green-600" />;
    case 'resume_updated':
      return <Edit className="h-4 w-4 text-blue-600" />;
    case 'resume_deleted':
      return <Trash2 className="h-4 w-4 text-red-600" />;
    case 'resume_exported':
      return <Download className="h-4 w-4 text-purple-600" />;
    case 'login':
      return <LogIn className="h-4 w-4 text-gray-600" />;
    case 'subscription_activated':
      return <Crown className="h-4 w-4 text-yellow-600" />;
    default:
      return <Activity className="h-4 w-4 text-gray-600" />;
  }
};

const getActivityMessage = (activity: ActivityItem) => {
  switch (activity.action) {
    case 'resume_created':
      return `Created resume "${activity.details?.title || 'Untitled'}"`;
    case 'resume_updated':
      return `Updated resume (Version ${activity.details?.version || 'N/A'})`;
    case 'resume_deleted':
      return 'Deleted a resume';
    case 'resume_exported':
      return 'Exported resume to PDF';
    case 'login':
      return activity.details?.firstLogin ? 'Joined Resume Rocket' : 'Signed in';
    case 'subscription_activated':
      return 'Activated Premium subscription';
    default:
      return 'Unknown activity';
  }
};

const getActivityColor = (action: string) => {
  switch (action) {
    case 'resume_created':
      return 'bg-green-50 border-green-200';
    case 'resume_updated':
      return 'bg-blue-50 border-blue-200';
    case 'resume_deleted':
      return 'bg-red-50 border-red-200';
    case 'resume_exported':
      return 'bg-purple-50 border-purple-200';
    case 'subscription_activated':
      return 'bg-yellow-50 border-yellow-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export function ActivityFeed({ userId }: ActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchActivities();
    }
  }, [userId]);

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/users/activities?limit=20');
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityTime.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Your recent actions and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border animate-pulse">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No recent activity</p>
              <p className="text-sm text-gray-500 mt-1">
                Start building your resume to see activity here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${getActivityColor(activity.action)}`}
                >
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.action)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {getActivityMessage(activity)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                  {activity.action === 'subscription_activated' && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Premium
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}