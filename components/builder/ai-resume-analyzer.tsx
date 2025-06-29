"use client";

import { useState } from 'react';
import { ResumeData } from '@/lib/types';
import { analyzeResumeWithAI, AnalysisResult } from '@/lib/ai-analyzer';
import { getUserSubscription } from '@/lib/subscription';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PremiumBadge } from '@/components/ui/premium-badge';
import { PremiumUpgradeDialog } from '@/components/dialogs/premium-upgrade-dialog';
import { 
  Brain, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Sparkles,
  FileText,
  Target,
  Zap,
  TrendingUp,
  Eye,
  RefreshCw
} from 'lucide-react';

interface AIResumeAnalyzerProps {
  resumeData: ResumeData;
  onClose: () => void;
}

export function AIResumeAnalyzer({ resumeData, onClose }: AIResumeAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const subscription = getUserSubscription();

  const handleAnalyze = async () => {
    if (!subscription.isPremium) {
      setShowUpgradeDialog(true);
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeResumeWithAI(resumeData);
      setAnalysisResult(result);
      setActiveTab('overview');
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getSeverityIcon = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getSeverityColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-green-200 bg-green-50';
    }
  };

  if (!subscription.isPremium) {
    return (
      <>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">AI Resume Analyzer</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get comprehensive AI-powered analysis of your resume including spelling checks, 
            ATS optimization, keyword suggestions, and professional recommendations.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Spelling & Grammar</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Target className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-medium">ATS Optimization</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Keyword Analysis</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <div className="text-sm font-medium">Impact Score</div>
            </div>
          </div>

          <Button 
            onClick={() => setShowUpgradeDialog(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <PremiumBadge size="sm" className="mr-2" />
            Upgrade to Analyze Resume
          </Button>
        </div>

        <PremiumUpgradeDialog
          open={showUpgradeDialog}
          onOpenChange={setShowUpgradeDialog}
          feature="analyzer"
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">AI Resume Analyzer</h3>
            <p className="text-sm text-gray-600">Comprehensive resume analysis powered by AI</p>
          </div>
        </div>
        <PremiumBadge />
      </div>

      {/* Analysis Button */}
      {!analysisResult && (
        <div className="text-center py-8">
          <Button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Analyze My Resume
              </>
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            This will analyze your entire resume for improvements
          </p>
        </div>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium mb-2">Analyzing Your Resume</h4>
            <p className="text-sm text-gray-600">Our AI is reviewing your resume for improvements...</p>
          </div>
          <Progress value={45} className="h-2" />
          <div className="text-xs text-center text-gray-500">
            Checking spelling, grammar, ATS compatibility, and keyword optimization
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Overall Resume Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${getScoreBgColor(analysisResult.overallScore)} ${getScoreColor(analysisResult.overallScore)}`}>
                  {analysisResult.overallScore}
                </div>
                <div className="flex-1">
                  <Progress value={analysisResult.overallScore} className="h-3 mb-2" />
                  <p className="text-sm text-gray-600">{analysisResult.summary}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="spelling">Spelling & Grammar</TabsTrigger>
              <TabsTrigger value="ats">ATS Optimization</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Content Quality
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{analysisResult.contentScore}/100</div>
                    <Progress value={analysisResult.contentScore} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      ATS Compatibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{analysisResult.atsScore}/100</div>
                    <Progress value={analysisResult.atsScore} className="h-2 mt-2" />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Key Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.recommendations.slice(0, 3).map((rec, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(rec.severity)}`}>
                        <div className="flex items-start gap-2">
                          {getSeverityIcon(rec.severity)}
                          <div className="flex-1">
                            <div className="font-medium text-sm">{rec.title}</div>
                            <div className="text-sm text-gray-600 mt-1">{rec.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="spelling" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Spelling & Grammar Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisResult.spellingErrors.length === 0 ? (
                    <div className="text-center py-6">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No spelling or grammar errors found!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {analysisResult.spellingErrors.map((error, index) => (
                        <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                            <div className="flex-1">
                              <div className="font-medium text-sm">
                                "{error.word}" in {error.section}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                Suggestion: {error.suggestion}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Context: "{error.context}"
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    ATS Optimization Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{analysisResult.atsScore}</div>
                        <div className="text-sm text-gray-600">ATS Score</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {analysisResult.keywordMatches.length}
                        </div>
                        <div className="text-sm text-gray-600">Keywords Found</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {analysisResult.atsIssues.map((issue, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(issue.severity)}`}>
                          <div className="flex items-start gap-2">
                            {getSeverityIcon(issue.severity)}
                            <div className="flex-1">
                              <div className="font-medium text-sm">{issue.issue}</div>
                              <div className="text-sm text-gray-600 mt-1">{issue.suggestion}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keywords" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Keyword Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Strong Keywords Found</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywordMatches.map((keyword, index) => (
                          <Badge key={index} variant="success" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Suggested Keywords to Add</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.suggestedKeywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Alert>
                      <Sparkles className="h-4 w-4" />
                      <AlertDescription>
                        Adding these keywords can improve your resume's visibility to ATS systems 
                        and increase your chances of getting noticed by recruiters.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Close Analysis
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleAnalyze}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Re-analyze
              </Button>
              <Button>
                <Eye className="w-4 h-4 mr-2" />
                Apply Suggestions
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}