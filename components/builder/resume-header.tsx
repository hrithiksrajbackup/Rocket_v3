"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Save, 
  Share2, 
  Settings, 
  ChevronDown,
  FileText,
  Camera,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeData } from '@/lib/types';
import { getTemplateById } from '@/lib/resume-data';
import { ModeToggle } from '@/components/mode-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AtsChecker } from '@/components/builder/ats-checker';

interface ResumeHeaderProps {
  resumeData: ResumeData;
  templateId: string;
  onSave: () => void;
}

export function ResumeHeader({ resumeData, templateId, onSave }: ResumeHeaderProps) {
  const [showATSChecker, setShowATSChecker] = useState(false);
  const template = getTemplateById(templateId);

  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 print:hidden">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-bold">ResumeAI</span>
          </Link>

          <div className="h-6 w-px bg-muted mx-2"></div>

          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Template:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  {template.name}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/builder?template=professional">Professional</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/builder?template=modern">Modern</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/builder?template=minimal">Minimal</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/builder?template=executive">Executive</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/builder?template=creative">Creative</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Dialog open={showATSChecker} onOpenChange={setShowATSChecker}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                ATS Check
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>ATS Compatibility Check</DialogTitle>
                <DialogDescription>
                  Check how well your resume will perform with Applicant Tracking Systems (ATS).
                </DialogDescription>
              </DialogHeader>
              <AtsChecker resumeData={resumeData} onClose={() => setShowATSChecker(false)} />
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" className="gap-2" onClick={onSave}>
            <Save className="h-4 w-4" />
            Save
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Export as DOCX
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Export as Plain Text
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}