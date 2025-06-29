"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SubscriptionModal } from "@/components/payment/subscription-modal";
import { JobSearchModal } from "@/components/jobs/job-search-modal";
import { 
  Plus, 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Copy, 
  Trash2, 
  Search,
  Crown,
  TrendingUp,
  Clock,
  MoreVertical,
  Briefcase,
  Sparkles,
  BarChart3,
  Users,
  Zap,
  Star,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface Resume {
  _id: string;
  title: string;
  personal: {
    name: string;
    title: string;
  };
  updatedAt: string;
  createdAt: string;
  exportCount: number;
  atsScore?: number;
  templateId: string;
  version: number;
}

interface UserSubscription {
  status: 'ACTIVE' | 'INACTIVE';
  subscriptionType: string;
  features: string[];
  activatedAt: string;
}

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showJobSearchModal, setShowJobSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isSignedIn && user) {
      loadDashboardData();
    }
  }, [isSignedIn, user]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      const [resumesResponse, subscriptionResponse] = await Promise.all([
        fetch('/api/resumes'),
        fetch('/api/payments/status')
      ]);

      if (resumesResponse.ok) {
        const resumesData = await resumesResponse.json();
        setResumes(resumesData);
      }

      if (subscriptionResponse.ok) {
        const subscriptionData = await subscriptionResponse.json();
        setSubscription(subscriptionData.subscription);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateResume = () => {
    if (!subscription && resumes.length >= 1) {
      setShowSubscriptionModal(true);
      return;
    }
    router.push('/builder');
  };

  const handleDuplicateResume = async (resumeId: string, title: string) => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/duplicate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: `${title} (Copy)` }),
      });

      if (response.ok) {
        const newResume = await response.json();
        setResumes(prev => [newResume, ...prev]);
        toast({
          title: "Resume Duplicated",
          description: "Resume has been successfully duplicated.",
        });
      } else {
        throw new Error('Failed to duplicate resume');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate resume",
        variant: "destructive"
      });
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
      } else {
        throw new Error('Failed to delete resume');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive"
      });
    }
  };

  const filteredResumes = resumes.filter(resume =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resume.personal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCompletionScore = (resume: Resume) => {
    let score = 0;
    if (resume.personal.name) score += 20;
    if (resume.personal.title) score += 20;
    return Math.min(score + 60, 100);
  };

  const isPremium = subscription?.status === 'ACTIVE';

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Resume Rocket
                </span>
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowJobSearchModal(true)}
                className="flex items-center gap-2 hover:bg-blue-50 border-blue-200"
              >
                <Briefcase className="h-4 w-4" />
                Find Jobs
              </Button>
              
              {!isPremium && (
                <Button
                  onClick={() => setShowSubscriptionModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress.charAt(0) || 'U'}
                </span>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Welcome back, {user?.firstName || 'there'}!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to take your career to the next level? Let's build something amazing together.
            </p>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Total Resumes</p>
                    <p className="text-3xl font-bold text-blue-900">{resumes.length}</p>
                  </div>
                  <div className="p-3 bg-blue-500 rounded-xl">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">Downloads</p>
                    <p className="text-3xl font-bold text-green-900">
                      {resumes.reduce((sum, resume) => sum + (resume.exportCount || 0), 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-500 rounded-xl">
                    <Download className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Avg. ATS Score</p>
                    <p className="text-3xl font-bold text-purple-900">
                      {resumes.length > 0 
                        ? Math.round(resumes.reduce((sum, resume) => sum + (resume.atsScore || 75), 0) / resumes.length)
                        : 0
                      }%
                    </p>
                  </div>
                  <div className="p-3 bg-purple-500 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700">Last Updated</p>
                    <p className="text-lg font-bold text-orange-900">
                      {resumes.length > 0 
                        ? new Date(Math.max(...resumes.map(r => new Date(r.updatedAt).getTime()))).toLocaleDateString()
                        : 'Never'
                      }
                    </p>
                  </div>
                  <div className="p-3 bg-orange-500 rounded-xl">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plan Status - Only show if not premium */}
          {!isPremium && (
            <Card className="border-2 border-dashed border-blue-300 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
                    <Crown className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Free Plan</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Unlock Your Full Potential
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    You're currently on the free plan with 1 resume limit. Upgrade to Premium for unlimited resumes, 
                    AI-powered suggestions, premium templates, and advanced analytics.
                  </p>
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>1 Resume</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Basic Templates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>PDF Export</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowSubscriptionModal(true)}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Crown className="h-5 w-5 mr-2" />
                    Upgrade to Premium - Only $1
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Get started with these essential tools
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-3 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
                  onClick={handleCreateResume}
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium">New Resume</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-3 hover:bg-green-50 hover:border-green-300 transition-all duration-200 group"
                  onClick={() => setShowJobSearchModal(true)}
                >
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium">Find Jobs</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-3 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 group relative"
                  onClick={isPremium ? () => {} : () => setShowSubscriptionModal(true)}
                  disabled={!isPremium}
                >
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="font-medium">AI Review</span>
                  {!isPremium && <Crown className="absolute top-2 right-2 h-4 w-4 text-yellow-500" />}
                </Button>
                
                <Button
                  variant="outline"
                  className="h-24 flex flex-col gap-3 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 group relative"
                  onClick={isPremium ? () => {} : () => setShowSubscriptionModal(true)}
                  disabled={!isPremium}
                >
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="font-medium">Analytics</span>
                  {!isPremium && <Crown className="absolute top-2 right-2 h-4 w-4 text-yellow-500" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resumes Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Resumes</h2>
                <p className="text-gray-600">Manage and edit your professional resumes</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search resumes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  />
                </div>
                <Button
                  onClick={handleCreateResume}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Resume
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredResumes.length === 0 ? (
              <Card className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-dashed border-gray-300">
                <CardContent>
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {searchQuery ? 'No resumes found' : 'Ready to create your first resume?'}
                    </h3>
                    <p className="text-gray-600">
                      {searchQuery 
                        ? 'Try adjusting your search terms or create a new resume'
                        : 'Start building your professional resume with our easy-to-use builder'
                      }
                    </p>
                    {!searchQuery && (
                      <Button onClick={handleCreateResume} size="lg" className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Resume
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResumes.map((resume) => {
                  const completionScore = getCompletionScore(resume);
                  
                  return (
                    <Card key={resume._id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1 line-clamp-1 text-gray-900">
                              {resume.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-1 text-gray-600">
                              {resume.personal.name} • {resume.personal.title}
                            </CardDescription>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem asChild>
                                <Link href={`/builder?resume=${resume._id}`} className="flex items-center">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Resume
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/preview?resume=${resume._id}`} className="flex items-center">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDuplicateResume(resume._id, resume.title)}
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteResume(resume._id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Completion</span>
                          <span className="font-medium text-gray-900">{completionScore}%</span>
                        </div>
                        <Progress value={completionScore} className="h-2" />
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(resume.updatedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              <span>{resume.exportCount || 0}</span>
                            </div>
                            {resume.atsScore && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                ATS: {resume.atsScore}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button asChild size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Link href={`/builder?resume=${resume._id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="flex-1 hover:bg-gray-50">
                            <Link href={`/preview?resume=${resume._id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <SubscriptionModal
        open={showSubscriptionModal}
        onOpenChange={setShowSubscriptionModal}
        onSubscriptionSuccess={loadDashboardData}
      />
      
      <JobSearchModal
        open={showJobSearchModal}
        onOpenChange={setShowJobSearchModal}
        resumeData={resumes[0]}
      />
    </div>
  );
}