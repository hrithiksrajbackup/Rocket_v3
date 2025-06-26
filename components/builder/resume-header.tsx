
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   Download,
//   Save,
//   Share2,
//   Settings,
//   ChevronDown,
//   FileText,
//   ArrowLeft,
//   X,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { ResumeData } from "@/lib/types";
// import { getTemplateById } from "@/lib/resume-data";
// import { ModeToggle } from "@/components/mode-toggle";
// import { ExportButton } from "./export-button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { AtsChecker } from "@/components/builder/ats-checker";

// interface ResumeHeaderProps {
//   resumeData: ResumeData;
//   templateId: string;
//   onSave: () => void;
// }

// export function ResumeHeader({
//   resumeData,
//   templateId,
//   onSave,
// }: ResumeHeaderProps) {
//   const router = useRouter();
//   const [showATS, setShowATS] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);

//   const template = getTemplateById(templateId);

//   const switchTemplate = (id: string) => {
//     router.push(`/builder?template=${id}`);
//   };

//   const handleShare = async () => {
//     const shareData = { title: "My Resume", url: window.location.href };
//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch {}
//     } else {
//       await navigator.clipboard.writeText(shareData.url);
//       alert("Link copied");
//     }
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b print:hidden">
//         <div className="container mx-auto flex h-16 items-center justify-between px-4">
//           <div className="flex items-center gap-4">
//             <Link href="/" className="flex items-center gap-2">
//               <Button variant="ghost" size="icon" aria-label="Back">
//                 <ArrowLeft className="h-4 w-4" />
//               </Button>
//               <span className="text-lg font-bold">Resume Rocket</span>
//             </Link>

//             <div className="h-6 w-px bg-muted mx-2" />

//             <span className="text-sm font-medium">Template:</span>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="flex items-center gap-1"
//                 >
//                   {template.name}
//                   <ChevronDown className="h-4 w-4 opacity-50" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="start">
//                 {[
//                   "professional",
//                   "modern",
//                   "minimal",
//                   "executive",
//                   "creative",
//                 ].map((id) => (
//                   <DropdownMenuItem
//                     key={id}
//                     onSelect={() => switchTemplate(id)}
//                   >
//                     {getTemplateById(id).name}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>

//           <div className="flex items-center gap-2">
//             {/* ATS Checker */}
//             <Dialog open={showATS} onOpenChange={setShowATS}>
//               <DialogTrigger asChild>
//                 <Button variant="outline" size="sm" className="gap-1">
//                   <FileText className="h-4 w-4" /> ATS Check
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-lg">
//                 <DialogHeader>
//                   <DialogTitle>ATS Compatibility</DialogTitle>
//                   <DialogDescription>
//                     See how your resume scores with Applicant Tracking Systems.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <AtsChecker
//                   resumeData={resumeData}
//                   onClose={() => setShowATS(false)}
//                 />
//               </DialogContent>
//             </Dialog>

//             {/* Save */}
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={onSave}
//               className="gap-1"
//             >
//               <Save className="h-4 w-4" /> Save
//             </Button>

//             {/* Export Button */}
//             <ExportButton
//               resumeData={resumeData}
//               elementId="resume-preview-content"
//               variant="outline"
//               size="sm"
//             />

//             {/* Share */}
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleShare}
//               className="gap-1"
//             >
//               <Share2 className="h-4 w-4" /> Share
//             </Button>

//             {/* Settings */}
//             <Dialog open={showSettings} onOpenChange={setShowSettings}>
//               <DialogTrigger asChild>
//                 <Button variant="outline" size="icon" aria-label="Settings">
//                   <Settings className="h-4 w-4" />
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="max-w-sm">
//                 <div className="flex justify-between items-center mb-4">
//                   <DialogTitle>Settings</DialogTitle>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setShowSettings(false)}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   Customize builder preferences.
//                 </p>
//               </DialogContent>
//             </Dialog>

//             {/* Dark/Light Toggle */}
//             <ModeToggle />
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
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
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeData } from "@/lib/types";
import { getTemplateById } from "@/lib/resume-data";
import { ModeToggle } from "@/components/mode-toggle";
import { ExportButton } from "./export-button";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  resumeId?: string;
  onResumeIdChange?: (id: string) => void;
}

export function ResumeHeader({
  resumeData,
  templateId,
  onSave,
  resumeId,
  onResumeIdChange,
}: ResumeHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [showATS, setShowATS] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const template = getTemplateById(templateId);

  const switchTemplate = (id: string) => {
    const currentResumeId = resumeId || searchParams.get('resume');
    if (currentResumeId) {
      router.push(`/builder?resume=${currentResumeId}&template=${id}`);
    } else {
      router.push(`/builder?template=${id}`);
    }
  };

  const handleSave = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your resume.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const currentResumeId = resumeId || searchParams.get('resume');
      
      if (currentResumeId) {
        // Update existing resume
        const response = await fetch(`/api/resumes/${currentResumeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            updates: {
              ...resumeData,
              settings: {
                ...resumeData.settings,
                template: templateId,
              },
            },
            changeDescription: 'Resume updated from builder',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update resume');
        }

        const data = await response.json();
        
        toast({
          title: "Resume Saved",
          description: `Your resume has been updated (Version ${data.resume.version}).`,
        });
      } else {
        // Create new resume
        const response = await fetch('/api/resumes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            resumeData: {
              ...resumeData,
              settings: {
                ...resumeData.settings,
                template: templateId,
              },
            },
            title: resumeData.personal?.name 
              ? `${resumeData.personal.name}'s Resume` 
              : 'Untitled Resume',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create resume');
        }

        const data = await response.json();
        
        // Update the URL with the new resume ID
        const newUrl = `/builder?resume=${data.resume._id}`;
        router.replace(newUrl);
        
        // Notify parent component of new resume ID
        if (onResumeIdChange) {
          onResumeIdChange(data.resume._id);
        }
        
        toast({
          title: "Resume Created",
          description: "Your resume has been saved successfully.",
        });
      }

      // Call the original onSave callback
      onSave();
      
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    if (!resumeId && !searchParams.get('resume')) {
      toast({
        title: "Save First",
        description: "Please save your resume before sharing.",
        variant: "destructive",
      });
      return;
    }

    const currentResumeId = resumeId || searchParams.get('resume');
    const shareUrl = `${window.location.origin}/preview?resume=${currentResumeId}`;
    const shareData = { 
      title: resumeData.personal?.name 
        ? `${resumeData.personal.name}'s Resume` 
        : "My Resume", 
      url: shareUrl 
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled sharing or sharing failed
        console.log('Sharing cancelled or failed');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "Resume link has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          title: "Copy Failed",
          description: "Failed to copy link. Please copy manually.",
          variant: "destructive",
        });
      }
    }
  };

  const handleExport = async () => {
    if (!user?.id) return;
    
    const currentResumeId = resumeId || searchParams.get('resume');
    if (currentResumeId) {
      // Track export in database
      try {
        await fetch(`/api/resumes/${currentResumeId}/export`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id }),
        });
      } catch (error) {
        console.error('Failed to track export:', error);
        // Don't show error to user as this is not critical
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b print:hidden">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Back to Dashboard">
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
                  className="flex items-center gap-1"
                >
                  {template.name}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {[
                  "professional",
                  "modern",
                  "minimal",
                  "executive",
                  "creative",
                ].map((id) => (
                  <DropdownMenuItem
                    key={id}
                    onSelect={() => switchTemplate(id)}
                  >
                    {getTemplateById(id).name}
                  </DropdownMenuItem>
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
              onClick={handleSave}
              disabled={isSaving || !user}
              className="gap-1"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSaving ? 'Saving...' : 'Save'}
            </Button>

            {/* Export Button */}
            <ExportButton
              resumeData={resumeData}
              elementId="resume-preview-content"
              variant="outline"
              size="sm"
              onExport={handleExport}
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
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Auto-save</h4>
                    <p className="text-xs text-muted-foreground">
                      Changes are automatically saved as you type when signed in.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Export Format</h4>
                    <p className="text-xs text-muted-foreground">
                      Default export format: PDF
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Dark/Light Toggle */}
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  );
}