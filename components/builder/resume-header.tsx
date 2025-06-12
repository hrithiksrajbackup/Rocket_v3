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
//   const [exporting, setExporting] = useState<null | "pdf" | "docx" | "txt">(
//     null
//   );

//   const template = getTemplateById(templateId);

//   const switchTemplate = (id: string) => {
//     router.push(`/builder?template=${id}`);
//   };

//   const handleExport = async (format: "pdf" | "docx" | "txt") => {
//     setExporting(format);
//     try {
//       // TODO: replace with real export logic
//       console.log(`Exporting as ${format}`, resumeData);
//       await new Promise((r) => setTimeout(r, 800));
//     } finally {
//       setExporting(null);
//     }
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

//             {/* Export */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" size="sm" className="gap-1">
//                   <Download className="h-4 w-4" />
//                   {exporting ? `Exporting…` : "Export"}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem
//                   onSelect={() => handleExport("pdf")}
//                   disabled={!!exporting}
//                 >
//                   <FileText className="h-4 w-4 mr-2" /> PDF
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   onSelect={() => handleExport("docx")}
//                   disabled={!!exporting}
//                 >
//                   <FileText className="h-4 w-4 mr-2" /> DOCX
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   onSelect={() => handleExport("txt")}
//                   disabled={!!exporting}
//                 >
//                   <FileText className="h-4 w-4 mr-2" /> Plain Text
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

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
//                 {/* your settings form goes here */}
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
import { getTemplateById } from "@/lib/resume-data";
import { ModeToggle } from "@/components/mode-toggle";
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
}

export function ResumeHeader({
  resumeData,
  templateId,
  onSave,
}: ResumeHeaderProps) {
  const router = useRouter();
  const [showATS, setShowATS] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [exporting, setExporting] = useState<null | "pdf" | "docx" | "txt">(
    null
  );

  const template = getTemplateById(templateId);

  const switchTemplate = (id: string) => {
    router.push(`/builder?template=${id}`);
  };

  const handleExport = async (format: "pdf" | "docx" | "txt") => {
    setExporting(format);
    try {
      // TODO: replace with real export logic
      console.log(`Exporting as ${format}`, resumeData);
      await new Promise((r) => setTimeout(r, 800));
    } finally {
      setExporting(null);
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
      alert("Link copied");
    }
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
              onClick={onSave}
              className="gap-1"
            >
              <Save className="h-4 w-4" /> Save
            </Button>

            {/* Export */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  {exporting ? `Exporting…` : "Export"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onSelect={() => handleExport("pdf")}
                  disabled={!!exporting}
                >
                  <FileText className="h-4 w-4 mr-2" /> PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => handleExport("docx")}
                  disabled={!!exporting}
                >
                  <FileText className="h-4 w-4 mr-2" /> DOCX
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => handleExport("txt")}
                  disabled={!!exporting}
                >
                  <FileText className="h-4 w-4 mr-2" /> Plain Text
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
                {/* your settings form goes here */}
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
    </>
  );
}