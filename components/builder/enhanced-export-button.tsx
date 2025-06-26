"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EnhancedExportDialog } from './enhanced-export-dialog';
import { ResumeData } from '@/lib/types';
import { Download } from 'lucide-react';

interface EnhancedExportButtonProps {
  resumeData: ResumeData;
  elementId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  onExportComplete?: () => void;
}

export function EnhancedExportButton({ 
  resumeData, 
  elementId, 
  variant = 'default',
  size = 'default',
  className,
  onExportComplete
}: EnhancedExportButtonProps) {
  const [showExportDialog, setShowExportDialog] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setShowExportDialog(true)}
        className={className}
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>

      <EnhancedExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        resumeData={resumeData}
        elementId={elementId}
        onExportComplete={onExportComplete}
      />
    </>
  );
}