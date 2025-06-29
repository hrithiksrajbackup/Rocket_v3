"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Download,
  Save,
  Share2,
  Settings,
  ChevronDown,
  FileText,
  ArrowLeft,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeData } from "@/lib/types";
import { templateConfigs } from "@/lib/template-config";
import { canUseTemplate, canExportResume } from "@/lib/subscription";
import { ModeToggle } from "@/components/mode-toggle";
import { ExportButton } from "./export-button";
import { PremiumBadge } from "@/components/ui/premium-badge";
import { PremiumUpgradeDialog } from "@/components/dialogs/premium-upgrade-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AtsChecker } from "@/components/builder/ats-checker";

interface ResumeHeaderProps {
  resumeData: ResumeData;
  templateId: string;
  onSave: () => void;
}

export function ResumeHeader({
  resumeData,
  templateId,
  onSave,
}: ResumeHeaderProps) {
  const router = useRouter();
  const [showATS, setShowATS] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<'template' | 'export'>('export');

  const currentTemplate = templateConfigs.find(t => t.id === templateId) || templateConfigs[0];

  const switchTemplate = (id: string) => {
    if (!canUseTemplate(id)) {
      setUpgradeFeature('template');
      setShowUpgradeDialog(true);
      return;
    }
    router.push(`/builder?template=${id}`);
  };

  const handleShare = async () => {
    const shareData = { title: "My Resume", url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied");
    }
  };

  const handleExportClick = () => {
    if (!canExportResume()) {
      setUpgradeFeature('export');
      setShowUpgradeDialog(true);
      return;
    }
  };

  // Group templates by category for better organization
  const groupedTemplates = templateConfigs.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, typeof templateConfigs>);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b print:hidden">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Back">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-bold">Resume Rocket</span>
            </Link>

            <div className="h-6 w-px bg-muted mx-2" />

            <span className="text-sm font-medium">Template:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 min-w-[140px] justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate">{currentTemplate.name}</span>
                    {currentTemplate.premium && <PremiumBadge size="sm" />}
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 max-h-96 overflow-y-auto">
                {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
                  <div key={category}>
                    <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {category} Templates
                    </DropdownMenuLabel>
                    {categoryTemplates.map((template) => {
                      const canUse = canUseTemplate(template.id);
                      return (
                        <DropdownMenuItem
                          key={template.id}
                          onSelect={() => switchTemplate(template.id)}
                          className="flex flex-col items-start gap-1 p-3"
                          disabled={!canUse}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <span className="font-medium">{template.name}</span>
                            {template.premium && <PremiumBadge size="sm" />}
                            {template.popular && (
                              <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                                Popular
                              </span>
                            )}
                            {template.id === templateId && (
                              <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded-full ml-auto">
                                Current
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {template.description}
                          </span>
                          {!canUse && (
                            <span className="text-xs text-orange-600 font-medium">
                              Premium template - Upgrade to unlock
                            </span>
                          )}
                        </DropdownMenuItem>
                      );
                    })}
                    <DropdownMenuSeparator />
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            {/* ATS Checker */}
            <Dialog open={showATS} onOpenChange={setShowATS}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="h-4 w-4" /> ATS Check
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>ATS Compatibility</DialogTitle>
                  <DialogDescription>
                    See how your resume scores with Applicant Tracking Systems.
                  </DialogDescription>
                </DialogHeader>
                <AtsChecker
                  resumeData={resumeData}
                  onClose={() => setShowATS(false)}
                />
              </DialogContent>
            </Dialog>

            {/* Save */}
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              className="gap-1"
            >
              <Save className="h-4 w-4" /> Save
            </Button>

            {/* Export Button - with premium check */}
            {canExportResume() ? (
              <ExportButton
                resumeData={resumeData}
                elementId="resume-preview-content"
                variant="outline"
                size="sm"
              />
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportClick}
                className="gap-1"
              >
                <Download className="h-4 w-4" />
                Export
                <PremiumBadge size="sm" className="ml-1" />
              </Button>
            )}

            {/* Share */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-1"
            >
              <Share2 className="h-4 w-4" /> Share
            </Button>

            {/* Settings */}
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Settings">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <DialogTitle>Settings</DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSettings(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Customize builder preferences.
                </p>
              </DialogContent>
            </Dialog>

            {/* Dark/Light Toggle */}
            <ModeToggle />
          </div>
        </div>
      </header>

      <PremiumUpgradeDialog
        open={showUpgradeDialog}
        onOpenChange={setShowUpgradeDialog}
        feature={upgradeFeature}
        templateName={upgradeFeature === 'template' ? currentTemplate.name : undefined}
      />
    </>
  );
}