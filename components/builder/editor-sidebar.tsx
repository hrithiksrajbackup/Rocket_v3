"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderOpen, 
  Award, 
  Globe, 
  Heart, 
  Users, 
  Settings,
  Sparkles,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Save,
  Download
} from 'lucide-react';
import { ResumeData } from '@/lib/types';
import { PersonalSection } from './sections/personal-section';
import { ExperienceSection } from './sections/experience-section';
import { EducationSection } from './sections/education-section';
import { SkillsSection } from './sections/skills-section';
import { ProjectsSection } from './sections/projects-section';
import { CertificationsSection } from './sections/certifications-section';
import { LanguagesSection } from './sections/languages-section';
import { InterestsSection } from './sections/interests-section';
import { ReferencesSection } from './sections/references-section';
import { AiSuggestions } from './ai-suggestions';
import { AtsChecker } from './ats-checker';
import { ExportButton } from './export-button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface EditorSidebarProps {
  resumeData: ResumeData;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onDataChange: (sectionKey: string, data: any) => void;
  handleNestedDataChange: (sectionKey: string, data: any) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const sectionIcons = {
  personal: User,
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
  projects: FolderOpen,
  certifications: Award,
  languages: Globe,
  interests: Heart,
  references: Users,
  settings: Settings,
};

const sectionLabels = {
  personal: 'Personal Info',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  interests: 'Interests',
  references: 'References',
  settings: 'Settings',
};

export function EditorSidebar({
  resumeData,
  activeSection,
  onSectionChange,
  onDataChange,
  handleNestedDataChange,
  collapsed = false,
  onToggleCollapse
}: EditorSidebarProps) {
  const [showAI, setShowAI] = useState(false);
  const [showATS, setShowATS] = useState(false);

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <PersonalSection
            data={resumeData.personal}
            onChange={(data) => onDataChange('personal', data)}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            data={resumeData.sections.experience}
            onChange={(data) => handleNestedDataChange('experience', data)}
          />
        );
      case 'education':
        return (
          <EducationSection
            data={resumeData.sections.education}
            onChange={(data) => handleNestedDataChange('education', data)}
          />
        );
      case 'skills':
        return (
          <SkillsSection
            data={resumeData.sections.skills}
            onChange={(data) => handleNestedDataChange('skills', data)}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            data={resumeData.sections.projects}
            onChange={(data) => handleNestedDataChange('projects', data)}
          />
        );
      case 'certifications':
        return (
          <CertificationsSection
            data={resumeData.sections.certifications}
            onChange={(data) => handleNestedDataChange('certifications', data)}
          />
        );
      case 'languages':
        return (
          <LanguagesSection
            data={resumeData.sections.languages}
            onChange={(data) => handleNestedDataChange('languages', data)}
          />
        );
      case 'interests':
        return (
          <InterestsSection
            data={resumeData.sections.interests}
            onChange={(data) => handleNestedDataChange('interests', data)}
          />
        );
      case 'references':
        return (
          <ReferencesSection
            data={resumeData.sections.references}
            onChange={(data) => handleNestedDataChange('references', data)}
          />
        );
      default:
        return <div>Select a section to edit</div>;
    }
  };

  if (collapsed) {
    return null;
  }

  return (
    <div className="w-[440px] bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Resume Editor</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Dialog open={showAI} onOpenChange={setShowAI}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Assist
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>AI Content Suggestions</DialogTitle>
              </DialogHeader>
              <AiSuggestions
                resumeData={resumeData}
                onClose={() => setShowAI(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={showATS} onOpenChange={setShowATS}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <FileCheck className="h-4 w-4 mr-2" />
                ATS Check
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>ATS Compatibility Check</DialogTitle>
              </DialogHeader>
              <AtsChecker
                resumeData={resumeData}
                onClose={() => setShowATS(false)}
              />
            </DialogContent>
          </Dialog>

          <ExportButton
            resumeData={resumeData}
            elementId="resume-preview-content"
            variant="outline"
            size="sm"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 border-b border-gray-200">
        <div className="space-y-1">
          {Object.entries(sectionLabels).map(([key, label]) => {
            const Icon = sectionIcons[key as keyof typeof sectionIcons];
            const isActive = activeSection === key;
            const sectionData = key === 'personal' ? resumeData.personal : resumeData.sections[key as keyof typeof resumeData.sections];
            const isVisible = key === 'personal' || (sectionData && typeof sectionData === 'object' && 'visible' in sectionData && sectionData.visible);
            
            return (
              <button
                key={key}
                onClick={() => onSectionChange(key)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <div className="flex items-center">
                  <Icon className="h-4 w-4 mr-3" />
                  {label}
                </div>
                <div className="flex items-center gap-2">
                  {key !== 'personal' && (
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      isVisible ? "bg-green-500" : "bg-gray-300"
                    )} />
                  )}
                  {isActive && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {renderSectionContent()}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Auto-saved</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}