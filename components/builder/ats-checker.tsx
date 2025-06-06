"use client";

import { useState } from 'react';
import { checkATSCompatibility } from '@/lib/ai-utils';
import { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AtsCheckerProps {
  resumeData: ResumeData;
  onClose: () => void;
}

export function AtsChecker({ resumeData, onClose }: AtsCheckerProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    feedback: string[];
    missingKeywords?: string[];
  } | null>(null);

  const handleCheck = async () => {
    setIsChecking(true);
    try {
      const compatibility = await checkATSCompatibility(resumeData, jobDescription);
      setResult(compatibility);
    } catch (error) {
      console.error('Error checking ATS compatibility:', error);
      // Handle error
    } finally {
      setIsChecking(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <AlertCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="py-4">
      <div className="mb-6">
        <Label htmlFor="job-description" className="mb-2 block">
          Paste the job description (optional)
        </Label>
        <Textarea
          id="job-description"
          placeholder="For best results, paste the job description you're applying for"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="min-h-[120px]"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Adding a job description helps us analyze keyword matches and provide more targeted feedback.
        </p>
      </div>

      <Button 
        onClick={handleCheck} 
        disabled={isChecking} 
        className="w-full"
      >
        {isChecking ? 'Analyzing...' : 'Check ATS Compatibility'}
      </Button>

      {isChecking && (
        <div className="mt-6">
          <Label className="mb-2 block text-sm">Analyzing your resume...</Label>
          <Progress value={45} className="h-2" />
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">ATS Compatibility Score</h3>
            <div className="flex items-center gap-2">
              {getScoreIcon(result.score)}
              <span className={cn("text-lg font-bold", getScoreColor(result.score))}>
                {result.score}/100
              </span>
            </div>
          </div>

          <Progress 
            value={result.score} 
            className={cn(
              "h-2",
              result.score >= 80 ? "bg-green-100" : 
              result.score >= 60 ? "bg-yellow-100" : 
              "bg-red-100"
            )}
          />

          <div className="mt-4">
            <h3 className="font-medium mb-2">Feedback</h3>
            <ul className="space-y-2">
              {result.feedback.map((item, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <Info className="h-4 w-4 flex-shrink-0 mt-1 text-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {result.missingKeywords && result.missingKeywords.length > 0 && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-sm text-yellow-800">
                <strong>Missing keywords from job description:</strong>
                <div className="flex flex-wrap gap-1 mt-2">
                  {result.missingKeywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="bg-yellow-100 text-yellow-800 text-xs rounded-full px-2 py-1"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="default">
              Apply Suggestions
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}