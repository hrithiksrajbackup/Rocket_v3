"use client";

import { useState } from 'react';
import { getAIFeedback, AIFeedbackType } from '@/lib/ai-utils';
import { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  Edit, 
  Lightbulb, 
  X, 
  MinusCircle, 
  PlusCircle,
  Repeat 
} from 'lucide-react';

interface AiSuggestionsProps {
  resumeData: ResumeData;
  onClose: () => void;
}

export function AiSuggestions({ resumeData, onClose }: AiSuggestionsProps) {
  const [sectionType, setSectionType] = useState('summary');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [feedbackType, setFeedbackType] = useState<AIFeedbackType>('improve');
  const [originalContent, setOriginalContent] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [improvedContent, setImprovedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSelectSection = (section: string) => {
    setSectionType(section);
    setSelectedItemId('');
    setOriginalContent('');
    setImprovedContent('');
  };

  const handleSelectContent = (itemId: string, content: string) => {
    setSelectedItemId(itemId);
    setOriginalContent(content);
    setImprovedContent('');
    setStep(2);
  };

  const handleSelectSummary = () => {
    setSectionType('summary');
    setSelectedItemId('personal');
    setOriginalContent(resumeData.personal.summary);
    setImprovedContent('');
    setStep(2);
  };

  const handleGetFeedback = async () => {
    setIsLoading(true);
    try {
      let contentToImprove = originalContent;
      
      const improved = await getAIFeedback({
        resumeData,
        sectionType,
        itemId: selectedItemId,
        contentToImprove,
        feedbackType,
        jobDescription: feedbackType === 'keywords' ? jobDescription : undefined
      });
      
      setImprovedContent(improved);
      setStep(3);
    } catch (error) {
      console.error('Error getting AI feedback:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">What would you like to improve?</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant={sectionType === 'summary' ? 'default' : 'outline'} 
          className="justify-start h-auto py-3"
          onClick={handleSelectSummary}
        >
          <div className="flex flex-col items-start text-left">
            <span className="flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              Professional Summary
            </span>
            <span className="text-xs mt-1 font-normal opacity-70">
              Improve your personal summary
            </span>
          </div>
        </Button>
        
        <Button 
          variant={sectionType === 'experience' ? 'default' : 'outline'} 
          className="justify-start h-auto py-3"
          onClick={() => handleSelectSection('experience')}
        >
          <div className="flex flex-col items-start text-left">
            <span className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Work Experience
            </span>
            <span className="text-xs mt-1 font-normal opacity-70">
              Enhance job descriptions
            </span>
          </div>
        </Button>
      </div>
      
      {sectionType === 'experience' && (
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-medium text-muted-foreground">Select an experience to improve:</h4>
          <div className="space-y-2">
            {resumeData.sections.experience.items?.map((item, index) => (
              <Button 
                key={item.id}
                variant="ghost"
                className="w-full justify-start h-auto py-2 px-3 bg-muted/50 hover:bg-muted"
                onClick={() => handleSelectContent(item.id, item.description.join('\n\n'))}
              >
                <div className="text-left">
                  <div className="font-medium text-sm">{item.position}</div>
                  <div className="text-xs text-muted-foreground">{item.company}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setStep(1)} 
          className="text-xs text-primary flex items-center"
        >
          <ArrowRight className="h-3 w-3 mr-1 rotate-180" />
          Back
        </button>
        
        <h3 className="text-sm font-medium">
          {sectionType === 'summary' ? 'Improve Professional Summary' : 'Enhance Job Description'}
        </h3>
        
        <div className="w-16"></div>
      </div>
      
      <div className="space-y-2">
        <Textarea
          value={originalContent}
          onChange={(e) => setOriginalContent(e.target.value)}
          className="min-h-[120px] text-sm"
          placeholder="Enter the content you want to improve..."
        />
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={feedbackType === 'improve' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFeedbackType('improve')}
            className="text-xs h-7"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Improve
          </Button>
          <Button 
            variant={feedbackType === 'shorten' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFeedbackType('shorten')}
            className="text-xs h-7"
          >
            <MinusCircle className="h-3 w-3 mr-1" />
            Shorten
          </Button>
          <Button 
            variant={feedbackType === 'expand' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFeedbackType('expand')}
            className="text-xs h-7"
          >
            <PlusCircle className="h-3 w-3 mr-1" />
            Expand
          </Button>
          <Button 
            variant={feedbackType === 'professional' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFeedbackType('professional')}
            className="text-xs h-7"
          >
            <Briefcase className="h-3 w-3 mr-1" />
            More Professional
          </Button>
          <Button 
            variant={feedbackType === 'keywords' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFeedbackType('keywords')}
            className="text-xs h-7"
          >
            <Lightbulb className="h-3 w-3 mr-1" />
            Optimize Keywords
          </Button>
        </div>
      </div>
      
      {feedbackType === 'keywords' && (
        <div className="space-y-2">
          <label className="text-xs font-medium">
            Job Description (for keyword optimization)
          </label>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[100px] text-sm"
            placeholder="Paste the job description to optimize keywords..."
          />
        </div>
      )}
      
      <Button 
        className="w-full"
        onClick={handleGetFeedback}
        disabled={isLoading || !originalContent}
      >
        {isLoading ? 'Generating...' : 'Get AI Suggestions'}
      </Button>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setStep(2)} 
          className="text-xs text-primary flex items-center"
        >
          <ArrowRight className="h-3 w-3 mr-1 rotate-180" />
          Back
        </button>
        
        <h3 className="text-sm font-medium">
          AI Suggestion
        </h3>
        
        <button 
          onClick={onClose} 
          className="text-xs text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground flex items-center">
            <div className="w-full">Original</div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 text-xs"
              onClick={handleGetFeedback}
            >
              <Repeat className="h-3 w-3 mr-1" />
              Regenerate
            </Button>
          </div>
          <div className="p-3 bg-muted/50 rounded-md text-sm min-h-[100px] whitespace-pre-wrap">
            {originalContent}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            <div>Improved</div>
          </div>
          <div className="p-3 border-2 border-primary/20 bg-primary/5 rounded-md text-sm min-h-[100px] whitespace-pre-wrap">
            {improvedContent}
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setStep(2)}
        >
          Modify
        </Button>
        <Button 
          className="flex-1"
          onClick={onClose}
        >
          Use This
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}