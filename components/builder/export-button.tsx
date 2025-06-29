"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExportDialog } from './export-dialog';
import { PremiumUpgradeDialog } from '@/components/dialogs/premium-upgrade-dialog';
import { ResumeData } from '@/lib/types';
import { canExportResume, getExportLimitMessage } from '@/lib/subscription';
import { Download } from 'lucide-react';
import { PremiumBadge } from '@/components/ui/premium-badge';
import { useToast } from '@/hooks/use-toast';

interface ExportButtonProps {
  resumeData: ResumeData;
  elementId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function ExportButton({ 
  resumeData, 
  elementId, 
  variant = 'default',
  size = 'default',
  className 
}: ExportButtonProps) {
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const { toast } = useToast();

  const handleExportClick = () => {
    if (!canExportResume()) {
      toast({
        title: "Premium Feature",
        description: getExportLimitMessage(),
        variant: "destructive",
      });
      setShowUpgradeDialog(true);
      return;
    }
    setShowExportDialog(true);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleExportClick}
        className={className}
      >
        <Download className="h-4 w-4 mr-2" />
        Export
        {!canExportResume() && <PremiumBadge size="sm" className="ml-2" />}
      </Button>

      {canExportResume() && (
        <ExportDialog
          open={showExportDialog}
          onOpenChange={setShowExportDialog}
          resumeData={resumeData}
          elementId={elementId}
        />
      )}

      <PremiumUpgradeDialog
        open={showUpgradeDialog}
        onOpenChange={setShowUpgradeDialog}
        feature="export"
      />
    </>
  );
}