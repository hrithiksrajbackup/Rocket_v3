"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExportDialog } from './export-dialog';
import { ResumeData } from '@/lib/types';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  resumeData: ResumeData;
  elementId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  onExport?: (() => void) | (() => Promise<void>); // Fixed: callback for tracking exports
}

export function ExportButton({ 
  resumeData,
  elementId,
  variant = 'default',
  size = 'default',
  className,
  onExport
}: ExportButtonProps) {
  const [showExportDialog, setShowExportDialog] = useState(false);

  const handleExportStart = async () => {
    // Call the onExport callback when export starts
    if (onExport) {
      try {
        await onExport();
      } catch (error) {
        console.error('Failed to track export:', error);
        // Don't prevent export if tracking fails
      }
    }
  };

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

      <ExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        resumeData={resumeData}
        elementId={elementId}
        onExportStart={handleExportStart}
      />
    </>
  );
}