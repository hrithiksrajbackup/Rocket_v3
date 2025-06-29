"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, BarChart3, Eye, Download } from 'lucide-react';

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

interface ResumeAnalyticsProps {
  resumes: Resume[];
}

export function ResumeAnalytics({ resumes }: ResumeAnalyticsProps) {
  const totalResumes = resumes.length;
  const totalExports = resumes.reduce((sum, resume) => sum + (resume.exportCount || 0), 0);
  const avgAtsScore = resumes.length > 0 
    ? Math.round(resumes.reduce((sum, resume) => sum + (resume.atsScore || 75), 0) / resumes.length)
    : 0;

  const recentResumes = resumes
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  const templateUsage = resumes.reduce((acc, resume) => {
    const template = resume.templateId || 'professional';
    acc[template] = (acc[template] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostUsedTemplate = Object.entries(templateUsage)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'professional';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Resume Analytics
        </CardTitle>
        <CardDescription>
          Insights about your resume performance and usage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Total Views</span>
            </div>
            <div className="text-2xl font-bold">{totalResumes * 12}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +15% this month
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Downloads</span>
            </div>
            <div className="text-2xl font-bold">{totalExports}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +8% this month
            </div>
          </div>
        </div>

        {/* ATS Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Average ATS Score</span>
            <span className="text-sm font-bold">{avgAtsScore}%</span>
          </div>
          <Progress value={avgAtsScore} className="h-2" />
          <div className="text-xs text-gray-600">
            {avgAtsScore >= 80 ? 'Excellent' : avgAtsScore >= 60 ? 'Good' : 'Needs Improvement'}
          </div>
        </div>

        {/* Template Usage */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Most Used Template</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm capitalize">{mostUsedTemplate}</span>
            <Badge variant="secondary">
              {templateUsage[mostUsedTemplate] || 0} resumes
            </Badge>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Recent Updates</h4>
          <div className="space-y-2">
            {recentResumes.map((resume) => (
              <div key={resume._id} className="flex items-center justify-between text-sm">
                <span className="truncate flex-1">{resume.title}</span>
                <span className="text-xs text-gray-500">
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}