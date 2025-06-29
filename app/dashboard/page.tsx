"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import {
  FileText,
  Download,
  Target,
  Award,
  Plus,
  Briefcase,
  Lightbulb,
  TrendingUp,
  Calendar,
  Share2,
  Copy,
  Edit,
  Trash2,
  Eye,
  Crown,
  Sparkles,
  RefreshCw,
  Activity,
  Clock,
  User,
  Settings,
  LogOut,
  Bell,
  HelpCircle,
  Zap,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  Loader2,
  CreditCard,
  Shield,
  Infinity as InfinityIcon,
  Brain,
  Palette,
  ExternalLink,
  Lock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { UserButton, SignOutButton } from '@clerk/nextjs';

interface ResumeDocument {
  _id: string;
  title: string;
  personal: {
    name: string;
    title: string;
  };
  version: number;
  updatedAt: string;
  createdAt: string;
  exportCount: number;
}

interface UserActivity {
  _id: string;
  action: string;
  details?: any;
  timestamp: string;
}

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

interface DashboardStats {
  totalResumes: number;
  totalDownloads: number;
  profileScore: number;
  atsScore: number;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [resumes, setResumes] = useState<ResumeDocument[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalResumes: 0,
    totalDownloads: 0,
    profileScore: 100,
    atsScore: 89
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [refreshingActivities, setRefreshingActivities] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    } else if (user) {
      fetchDashboardData();
    }
  }, [isLoaded, user, router]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchResumes(),
        fetchActivities(),
        fetchSubscription()
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resumes');
      if (response.ok) {
        const resumeData = await response.json();
        setResumes(resumeData);
        
        // Calculate stats
        const totalDownloads = resumeData.reduce((sum: number, resume: ResumeDocument) => 
          sum + (resume.exportCount || 0), 0
        );
        
        setStats(prev => ({
          ...prev,
          totalResumes: resumeData.length,
          totalDownloads
        }));
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/users/activities?limit=10');
      if (response.ok) {
        const activityData = await response.json();
        setActivities(activityData);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/payments/status');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const refreshActivities = async () => {
    setRefreshingActivities(true);
    try {
      await fetchActivities();
      toast({
        title: "Activities Refreshed",
        description: "Recent activity has been updated.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh activities.",
        variant: "destructive",
      });
    } finally {
      setRefreshingActivities(false);
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

  const handleCreateResume = () => {
    const isPremium = subscription?.status === 'ACTIVE';
    const canCreate = isPremium || resumes.length < 3;
    
    if (!canCreate) {
      toast({
        title: "Resume Limit Reached",
        description: "You've reached the limit of 3 free resumes. Upgrade to Premium for unlimited resumes.",
        variant: "destructive",
      });
      return;
    }
    
    router.push('/builder');
  };

  const handleEditResume = (resumeId: string) => {
    router.push(`/builder?resume=${resumeId}`);
  };

  const handlePreviewResume = (resumeId: string) => {
    // Open preview in new tab
    window.open(`/preview?resume=${resumeId}`, '_blank');
  };

  const handleShareResume = async (resume: ResumeDocument) => {
    const shareUrl = `${window.location.origin}/preview?resume=${resume._id}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${resume.title} - Resume`,
          text: `Check out ${resume.personal.name}'s resume`,
          url: shareUrl
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "Resume share link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      // If sharing fails, copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "Resume share link has been copied to your clipboard.",
        });
      } catch (clipboardError) {
        toast({
          title: "Share Failed",
          description: "Unable to share or copy link. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteResume = async (resumeId: string) => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id }),
      });

      if (response.ok) {
        setResumes(prev => prev.filter(resume => resume._id !== resumeId));
        toast({
          title: "Resume Deleted",
          description: "Resume has been successfully deleted.",
        });
        // Refresh activities to show the deletion
        fetchActivities();
      } else {
        throw new Error('Failed to delete resume');
      }
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'login': return <User className="h-4 w-4 text-blue-500" />;
      case 'resume_created': return <FileText className="h-4 w-4 text-green-500" />;
      case 'resume_updated': return <Edit className="h-4 w-4 text-orange-500" />;
      case 'resume_exported': return <Download className="h-4 w-4 text-purple-500" />;
      case 'resume_deleted': return <Trash2 className="h-4 w-4 text-red-500" />;
      case 'subscription_activated': return <Crown className="h-4 w-4 text-amber-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityMessage = (activity: UserActivity) => {
    const timeAgo = getRelativeTime(activity.timestamp);
    
    switch (activity.action) {
      case 'login':
        return `Signed in ${timeAgo}`;
      case 'resume_created':
        return `Created resume "${activity.details?.title || 'Untitled'}" ${timeAgo}`;
      case 'resume_updated':
        return `Updated resume (v${activity.details?.version || 1}) ${timeAgo}`;
      case 'resume_exported':
        return `Exported resume ${timeAgo}`;
      case 'resume_deleted':
        return `Deleted resume ${timeAgo}`;
      case 'subscription_activated':
        return `Activated Premium subscription ${timeAgo}`;
      default:
        return `Activity ${timeAgo}`;
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 604800)}w ago`;
  };

  const getSmartTips = () => {
    const isPremium = subscription?.status === 'ACTIVE';
    const isNewUser = resumes.length === 0;
    const hasMultipleResumes = resumes.length > 1;
    
    const allTips = [
      {
        id: 1,
        category: 'content',
        title: 'Use Action Verbs',
        description: 'Start bullet points with strong action verbs like "achieved," "led," or "implemented."',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        icon: <Zap className="h-4 w-4" />,
        difficulty: 'beginner'
      },
      {
        id: 2,
        category: 'formatting',
        title: 'Quantify Results',
        description: 'Include numbers and percentages to show the impact of your work.',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: <TrendingUp className="h-4 w-4" />,
        difficulty: 'beginner'
      },
      {
        id: 3,
        category: 'ats',
        title: 'Tailor for ATS',
        description: 'Use keywords from the job description to pass applicant tracking systems.',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        icon: <Target className="h-4 w-4" />,
        difficulty: 'intermediate',
        premium: true
      },
      {
        id: 4,
        category: 'strategy',
        title: 'Keep It Concise',
        description: 'Aim for 1-2 pages maximum. Recruiters spend only 6 seconds scanning resumes.',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        icon: <Clock className="h-4 w-4" />,
        difficulty: 'beginner'
      },
      {
        id: 5,
        category: 'content',
        title: 'Show Career Progression',
        description: 'Highlight promotions and increasing responsibilities in your work history.',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        icon: <TrendingUp className="h-4 w-4" />,
        difficulty: 'intermediate'
      },
      {
        id: 6,
        category: 'ats',
        title: 'Use Standard Headings',
        description: 'Stick to conventional section names like "Experience" and "Education" for ATS compatibility.',
        color: 'text-teal-600',
        bgColor: 'bg-teal-50',
        icon: <FileText className="h-4 w-4" />,
        difficulty: 'advanced',
        premium: true
      }
    ];

    // Filter tips based on user status
    let relevantTips = allTips;
    
    if (isNewUser) {
      relevantTips = allTips.filter(tip => tip.difficulty === 'beginner');
    } else if (hasMultipleResumes) {
      relevantTips = allTips.filter(tip => tip.difficulty !== 'beginner');
    }
    
    // Show premium tips only to premium users, or as teasers
    if (!isPremium) {
      relevantTips = relevantTips.map(tip => ({
        ...tip,
        premium: tip.premium || false
      }));
    }
    
    return relevantTips.slice(0, 3);
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isPremium = subscription?.status === 'ACTIVE';
  const resumeUsage = isPremium ? resumes.length : Math.min(resumes.length, 3);
  const maxResumes = isPremium ? -1 : 3;
  const usagePercentage = isPremium ? 0 : (resumes.length / 3) * 100;
  const canCreateNewResume = isPremium || resumes.length < 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Resume Rocket</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  1
                </span>
              </Button>

              {/* Help */}
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.emailAddresses[0]?.emailAddress}
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  {!isPremium && (
                    <DropdownMenuItem onClick={handleUpgrade}>
                      <Crown className="mr-2 h-4 w-4" />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <SignOutButton>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </SignOutButton>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subscription Status Alert */}
        {!isPremium && resumes.length >= 2 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Resume Limit Reached</strong>
                  <p className="mt-1">You've used {resumes.length} of 3 free resumes. Upgrade to Premium for unlimited resumes.</p>
                  <div className="mt-2">
                    <div className="text-xs mb-1">Usage</div>
                    <Progress value={usagePercentage} className="h-2 bg-red-100" />
                  </div>
                </div>
                <Button 
                  onClick={handleUpgrade}
                  disabled={isUpgrading}
                  className="bg-red-600 hover:bg-red-700 text-white ml-4"
                >
                  {isUpgrading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Crown className="mr-2 h-4 w-4" />
                      Upgrade to Premium
                    </>
                  )}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalResumes}</p>
                  <p className="text-xs text-green-600 mt-1">
                    {isPremium ? 'Unlimited' : `${resumes.length}/3 used`}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Downloads</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalDownloads}</p>
                  <p className="text-xs text-green-600 mt-1">+{stats.totalDownloads} this week</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profile Score</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.profileScore}%</p>
                  <Progress value={stats.profileScore} className="mt-2 h-2" />
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ATS Score</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.atsScore}%</p>
                  <p className="text-xs text-blue-600 mt-1">Excellent</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <Card className="border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={handleCreateResume}
                    disabled={!canCreateNewResume}
                    className={`h-20 ${
                      canCreateNewResume 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-center">
                      {canCreateNewResume ? (
                        <Plus className="h-6 w-6 mx-auto mb-1" />
                      ) : (
                        <Lock className="h-6 w-6 mx-auto mb-1" />
                      )}
                      <div className="text-sm font-medium">
                        {canCreateNewResume ? 'New Resume' : 'Limit Reached'}
                      </div>
                      {!canCreateNewResume && (
                        <div className="text-xs mt-1">Upgrade for unlimited</div>
                      )}
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20"
                    onClick={() => router.push('/jobs')}
                  >
                    <div className="text-center">
                      <Briefcase className="h-6 w-6 mx-auto mb-1" />
                      <div className="text-sm font-medium">Browse Jobs</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20"
                    onClick={() => {
                      // Scroll to tips section
                      document.getElementById('resume-tips')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <div className="text-center">
                      <Lightbulb className="h-6 w-6 mx-auto mb-1" />
                      <div className="text-sm font-medium">Resume Tips</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade to Premium Card */}
            {!isPremium && (
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
                        96% OFF
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-800">
                      Lifetime access to all premium features
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6 text-sm text-blue-800">
                    <div className="flex items-center">
                      <InfinityIcon className="h-4 w-4 mr-2 text-blue-600" />
                      <span>Unlimited Resumes</span>
                    </div>
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 mr-2 text-blue-600" />
                      <span>AI Suggestions</span>
                    </div>
                    <div className="flex items-center">
                      <Palette className="h-4 w-4 mr-2 text-blue-600" />
                      <span>Premium Templates</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-600" />
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
            )}

            {/* Your Resumes */}
            <Card className="border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Your Resumes</span>
                    <Badge variant="secondary">{resumes.length}</Badge>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {resumes.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
                    <p className="text-gray-600 mb-4">Create your first resume to get started</p>
                    <Button onClick={handleCreateResume}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Resume
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {resumes.map((resume) => (
                      <div key={resume._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{resume.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{resume.personal.name} • {resume.personal.title}</span>
                              <span>•</span>
                              <span>{new Date(resume.updatedAt).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{resume.exportCount || 0} exports</span>
                              <span>•</span>
                              <span>v{resume.version}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditResume(resume._id)}
                            title="Edit Resume"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handlePreviewResume(resume._id)}
                            title="Preview Resume"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleShareResume(resume)}
                            title="Share Resume"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" title="Delete Resume">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Resume</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{resume.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteResume(resume._id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resume Tips */}
            <Card id="resume-tips" className="border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    <span>Resume Tips</span>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {getSmartTips().map((tip) => (
                  <div key={tip.id} className={`p-3 rounded-lg ${tip.bgColor} relative`}>
                    {tip.premium && !isPremium && (
                      <div className="absolute top-2 right-2">
                        <Crown className="h-4 w-4 text-amber-500" />
                      </div>
                    )}
                    <div className="flex items-start space-x-3">
                      <div className={`${tip.color} mt-0.5`}>
                        {tip.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${tip.color} text-sm`}>
                          {tip.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {tip.description}
                        </p>
                        {tip.premium && !isPremium && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="mt-2 text-xs h-6"
                            onClick={handleUpgrade}
                          >
                            Unlock with Premium
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full text-sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View All Tips
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={refreshActivities}
                    disabled={refreshingActivities}
                  >
                    <RefreshCw className={`h-4 w-4 ${refreshingActivities ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {activities.length === 0 ? (
                  <div className="text-center py-4">
                    <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No recent activity</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Start by creating your first resume
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activities.map((activity) => (
                      <div key={activity._id} className="flex items-center space-x-3 text-sm">
                        {getActivityIcon(activity.action)}
                        <span className="text-gray-700 flex-1">
                          {getActivityMessage(activity)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}