"use client";

import { useState, useRef } from 'react';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ResumeData } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ProfessionalTemplate } from '@/components/templates/professional-template';
import { ModernTemplate } from '@/components/templates/modern-template';
import { MinimalTemplate } from '@/components/templates/minimal-template';

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateId: string;
}

export function ResumePreview({ resumeData, templateId }: ResumePreviewProps) {
  const [zoom, setZoom] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
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
      case 'professional':
      default:
        return <ProfessionalTemplate resumeData={resumeData} />;
    }
  };

  return (
    <div className={cn(
      "flex flex-col flex-1 bg-muted/30",
      fullscreen ? "fixed inset-0 z-50 bg-background" : ""
    )}>
      <div className="flex items-center justify-between border-b p-3 bg-background">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <Slider
            value={[zoom]}
            min={50}
            max={150}
            step={5}
            onValueChange={handleZoomChange}
            className="w-32"
          />
          
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <div className="text-sm text-muted-foreground ml-2">
            {zoom}%
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            {fullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-8 flex items-start justify-center">
        <div 
          className="bg-white shadow-lg transition-transform duration-200 origin-top"
          style={{ 
            width: '210mm', 
            height: '297mm',
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center'
          }}
          ref={resumeRef}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}