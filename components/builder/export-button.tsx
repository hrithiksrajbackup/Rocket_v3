"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExportDialog } from './export-dialog';
import { PremiumUpgradeDialog } from '@/components/dialogs/premium-upgrade-dialog';
import { ResumeData } from '@/lib/types';
import { getUserSubscription, getExportLimitMessage } from '@/lib/subscription';
import { getTemplateConfig } from '@/lib/template-config';
import { Download } from 'lucide-react';
import { PremiumBadge } from '@/components/ui/premium-badge';
import { useToast } from '@/hooks/use-toast';

interface ExportButtonProps {
  resumeData: ResumeData;
  elementId: string;
  templateId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function ExportButton({ 
  resumeData, 
  elementId, 
  templateId,
  variant = 'default',
  size = 'default',
  className 
}: ExportButtonProps) {
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const { toast } = useToast();

  const subscription = getUserSubscription();
  const template = getTemplateConfig(templateId);
  
  // Check if user can export this template
  const canExport = subscription.isPremium || !template?.premium;

  const handleExportClick = () => {
    if (!canExport) {
      toast({
        title: "Premium Feature",
        description: template?.premium 
          ? `Export for ${template.name} template requires Premium subscription.`
          : getExportLimitMessage(),
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
        {!canExport && <PremiumBadge size="sm" className="ml-2" />}
      </Button>

      {canExport && (
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
        templateName={template?.name}
      />
    </>
  );
}