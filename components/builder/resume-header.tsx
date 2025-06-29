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
import { templateConfigs, getTemplateConfig } from "@/lib/template-config";
import { getUserSubscription, canUseTemplate } from "@/lib/subscription";
import { ModeToggle } from "@/components/mode-toggle";
import { ExportButton } from "./export-button";
import { PremiumBadge } from "@/components/ui/premium-badge";
import { PremiumUpgradeDialog } from "@/components/dialogs/premium-upgrade-dialog";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const [showATS, setShowATS] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<'template' | 'export'>('export');
  const [selectedPremiumTemplate, setSelectedPremiumTemplate] = useState<string>('');

  const subscription = getUserSubscription();
  const currentTemplate = getTemplateConfig(templateId) || templateConfigs[0];

  const switchTemplate = (id: string) => {
    const template = getTemplateConfig(id);
    if (!template) return;

    // Allow switching to any template (including premium ones)
    router.push(`/builder?template=${id}`);
    
    // Show notification for premium templates if user is not premium
    if (template.premium && !subscription.isPremium) {
      toast({
        title: "Premium Template Selected",
        description: `You're now using the ${template.name} template. Upgrade to Pro to export this template.`,
        variant: "default",
      });
    }
  };

  const handleShare = async () => {
    const shareData = { title: "My Resume", url: window.location.href };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      await navigator.clipboard.writeText(shareData.url);
      toast({
        title: "Link copied",
        description: "Resume link copied to clipboard",
      });
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

  const categoryLabels = {
    professional: 'Professional',
    modern: 'Modern',
    creative: 'Creative', 
    simple: 'Simple',
    specialized: 'Specialized'
  };

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
                  className="flex items-center gap-1 min-w-[160px] justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate">{currentTemplate.name}</span>
                    {currentTemplate.premium && <PremiumBadge size="sm" />}
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-96 max-h-[500px] overflow-y-auto">
                {/* Free Templates Section */}
                <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-green-600 uppercase tracking-wider">
                  Free Templates
                </DropdownMenuLabel>
                {templateConfigs.filter(t => !t.premium).map((template) => (
                  <DropdownMenuItem
                    key={template.id}
                    onSelect={() => switchTemplate(template.id)}
                    className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="font-medium">{template.name}</span>
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
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                {/* Premium Templates Section */}
                <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-orange-600 uppercase tracking-wider flex items-center gap-1">
                  Premium Templates
                  <PremiumBadge size="sm" />
                </DropdownMenuLabel>
                {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => {
                  const premiumTemplatesInCategory = categoryTemplates.filter(t => t.premium);
                  if (premiumTemplatesInCategory.length === 0) return null;

                  return (
                    <div key={category}>
                      <DropdownMenuLabel className="px-4 py-1 text-xs text-muted-foreground">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </DropdownMenuLabel>
                      {premiumTemplatesInCategory.map((template) => (
                        <DropdownMenuItem
                          key={template.id}
                          onSelect={() => switchTemplate(template.id)}
                          className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                        >
                          <div className="flex items-center gap-2 w-full">
                            <span className="font-medium">{template.name}</span>
                            <PremiumBadge size="sm" />
                            {template.id === templateId && (
                              <span className="px-1.5 py-0.5 text-xs bg-green-100 text-green-700 rounded-full ml-auto">
                                Current
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {template.description}
                          </span>
                          {!subscription.isPremium && (
                            <span className="text-xs text-orange-600 font-medium">
                              Can preview • Upgrade to export
                            </span>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  );
                })}
                
                {!subscription.isPremium && (
                  <>
                    <DropdownMenuSeparator />
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 m-1 rounded-md">
                      <div className="text-sm font-medium mb-1">Unlock All Templates</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        Get access to all premium templates and export functionality
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => {
                          setUpgradeFeature('template');
                          setShowUpgradeDialog(true);
                        }}
                      >
                        <PremiumBadge size="sm" className="mr-2" />
                        Upgrade to Pro
                      </Button>
                    </div>
                  </>
                )}
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

            {/* Export Button - with premium check for premium templates */}
            <ExportButton
              resumeData={resumeData}
              elementId="resume-preview-content"
              variant="outline"
              size="sm"
              templateId={templateId}
            />

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
        templateName={selectedPremiumTemplate}
      />
    </>
  );
}