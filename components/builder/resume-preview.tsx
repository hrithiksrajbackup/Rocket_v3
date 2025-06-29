"use client";

import { useState, useRef } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  Settings, 
  Eye,
  EyeOff,
  Smartphone,
  Monitor,
  Tablet,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ProfessionalTemplate } from '@/components/templates/professional-template';
import { ModernTemplate } from '@/components/templates/modern-template';
import { MinimalTemplate } from '@/components/templates/minimal-template';
import { ExecutiveTemplate } from '@/components/templates/executive-template';
import { CreativeTemplate } from '@/components/templates/creative-template';
import { TechnicalTemplate } from '@/components/templates/technical-template';
import { AcademicTemplate } from '@/components/templates/academic-template';
import { HealthcareTemplate } from '@/components/templates/healthcare-template';
import { Badge } from '@/components/ui/badge';
import { AIResumeAnalyzer } from './ai-resume-analyzer';
import { PremiumBadge } from '@/components/ui/premium-badge';
import { getUserSubscription } from '@/lib/subscription';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: string;
}

export function ResumePreview({ resumeData, templateId }: ResumePreviewProps) {
  const [zoom, setZoom] = useState(85);
  const [fullscreen, setFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showAIAnalyzer, setShowAIAnalyzer] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const subscription = getUserSubscription();

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 25));
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate resumeData={resumeData} />;
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} />;
      case 'technical':
        return <TechnicalTemplate resumeData={resumeData} />;
      case 'academic':
        return <AcademicTemplate resumeData={resumeData} />;
      case 'healthcare':
        return <HealthcareTemplate resumeData={resumeData} />;
      case 'professional':
      default:
        return <ProfessionalTemplate resumeData={resumeData} />;
    }
  };

  const getViewModeStyles = () => {
    switch (viewMode) {
      case 'mobile':
        return { maxWidth: '375px', margin: '0 auto' };
      case 'tablet':
        return { maxWidth: '768px', margin: '0 auto' };
      default:
        return {};
    }
  };

  return (
    <div className={cn(
      "flex flex-col flex-1 bg-gradient-to-br from-gray-50 to-gray-100",
      fullscreen ? "fixed inset-0 z-50 bg-white" : ""
    )}>
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b p-4 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center space-x-4">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-2">
            <Button variant="ghost" size="sm" onClick={handleZoomOut} className="h-8 w-8 p-0">
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <Slider
                value={[zoom]}
                min={25}
                max={200}
                step={5}
                onValueChange={handleZoomChange}
                className="w-24"
              />
              <Badge variant="secondary" className="text-xs min-w-[50px] justify-center">
                {zoom}%
              </Badge>
            </div>
            
            <Button variant="ghost" size="sm" onClick={handleZoomIn} className="h-8 w-8 p-0">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* View Mode Selector */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('desktop')}
              className="h-8 px-3"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('tablet')}
              className="h-8 px-3"
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('mobile')}
              className="h-8 px-3"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* AI Analyzer Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAIAnalyzer(true)}
            className="gap-2 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100"
          >
            <Brain className="h-4 w-4 text-purple-600" />
            <span className="text-purple-700 font-medium">AI Analyzer</span>
            {!subscription.isPremium && <PremiumBadge size="sm" />}
          </Button>

          {/* Grid Toggle */}
          <Button
            variant={showGrid ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
            className="gap-2"
          >
            {showGrid ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            Grid
          </Button>

          {/* Settings */}
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          
          {/* Fullscreen Toggle */}
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            {fullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Preview Area */}
      <div className="flex-1 overflow-auto p-8 relative">
        {showGrid && (
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        )}
        
        <div className="flex items-start justify-center min-h-full" style={getViewModeStyles()}>
          <div 
            id="resume-preview-content"
            className={cn(
              "bg-white shadow-2xl transition-all duration-300 origin-top",
              "border border-gray-200 rounded-lg overflow-hidden",
              fullscreen ? "shadow-none border-0 rounded-none" : ""
            )}
            style={{ 
              width: viewMode === 'mobile' ? '100%' : '210mm', 
              minHeight: viewMode === 'mobile' ? 'auto' : '297mm',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center'
            }}
            ref={resumeRef}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t bg-white/80 backdrop-blur-sm px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>Template: <span className="font-medium capitalize">{templateId}</span></span>
            <span>•</span>
            <span>View: <span className="font-medium capitalize">{viewMode}</span></span>
            <span>•</span>
            <span>Zoom: <span className="font-medium">{zoom}%</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Auto-saved</span>
          </div>
        </div>
      </div>

      {/* AI Analyzer Dialog */}
      <Dialog open={showAIAnalyzer} onOpenChange={setShowAIAnalyzer}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Resume Analyzer
            </DialogTitle>
            <DialogDescription>
              Get comprehensive AI-powered analysis of your resume including spelling checks, 
              ATS optimization, and professional recommendations.
            </DialogDescription>
          </DialogHeader>
          <AIResumeAnalyzer
            resumeData={resumeData}
            onClose={() => setShowAIAnalyzer(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}