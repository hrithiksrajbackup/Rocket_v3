"use client";

import { useState } from "react";
import { ResumeData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileCheck,
  Save,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PersonalSection } from "./sections/personal-section";
import { ExperienceSection } from "./sections/experience-section";
import { EducationSection } from "./sections/education-section";
import { SkillsSection } from "./sections/skills-section";
import { ProjectsSection } from "./sections/projects-section";
import { CertificationsSection } from "./sections/certifications-section";
import { LanguagesSection } from "./sections/languages-section";
import { InterestsSection } from "./sections/interests-section";
import { ReferencesSection } from "./sections/references-section";
import { AiSuggestions } from "./ai-suggestions";
import { AtsChecker } from "./ats-checker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EditorSidebarProps {
  resumeData: ResumeData;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onDataChange: (sectionKey: string, data: any) => void;
  handleNestedDataChange: (sectionKey: string, data: any) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  isSaving?: boolean;
  lastSaved?: Date | null;
  hasUnsavedChanges?: boolean;
  onSave?: () => void;
}

const sectionConfig = [
  {
    id: "personal",
    label: "Personal Info",
    icon: User,
    color: "text-blue-600",
    bgColor: "bg-blue-50 hover:bg-blue-100",
    borderColor: "border-blue-200",
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    color: "text-green-600",
    bgColor: "bg-green-50 hover:bg-green-100",
    borderColor: "border-green-200",
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    color: "text-purple-600",
    bgColor: "bg-purple-50 hover:bg-purple-100",
    borderColor: "border-purple-200",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Code,
    color: "text-orange-600",
    bgColor: "bg-orange-50 hover:bg-orange-100",
    borderColor: "border-orange-200",
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderOpen,
    color: "text-teal-600",
    bgColor: "bg-teal-50 hover:bg-teal-100",
    borderColor: "border-teal-200",
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: Award,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
    borderColor: "border-yellow-200",
  },
  {
    id: "languages",
    label: "Languages",
    icon: Globe,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 hover:bg-indigo-100",
    borderColor: "border-indigo-200",
  },
  {
    id: "interests",
    label: "Interests",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50 hover:bg-pink-100",
    borderColor: "border-pink-200",
  },
  {
    id: "references",
    label: "References",
    icon: Users,
    color: "text-gray-600",
    bgColor: "bg-gray-50 hover:bg-gray-100",
    borderColor: "border-gray-200",
  },
];

export function EditorSidebar({
  resumeData,
  activeSection,
  onSectionChange,
  onDataChange,
  handleNestedDataChange,
  collapsed = false,
  onToggleCollapse,
  isSaving = false,
  lastSaved,
  hasUnsavedChanges = false,
  onSave
}: EditorSidebarProps) {
  const [showAI, setShowAI] = useState(false);
  const [showATS, setShowATS] = useState(false);

  const renderSectionContent = () => {
    switch (activeSection) {
      case "personal":
        return (
          <PersonalSection
            data={resumeData.personal}
            onChange={(data) => onDataChange("personal", data)}
          />
        );
      case "experience":
        return (
          <ExperienceSection
            data={resumeData.sections.experience}
            onChange={(data) => handleNestedDataChange("experience", data)}
          />
        );
      case "education":
        return (
          <EducationSection
            data={resumeData.sections.education}
            onChange={(data) => handleNestedDataChange("education", data)}
          />
        );
      case "skills":
        return (
          <SkillsSection
            data={resumeData.sections.skills}
            onChange={(data) => handleNestedDataChange("skills", data)}
          />
        );
      case "projects":
        return (
          <ProjectsSection
            data={resumeData.sections.projects}
            onChange={(data) => handleNestedDataChange("projects", data)}
          />
        );
      case "certifications":
        return (
          <CertificationsSection
            data={resumeData.sections.certifications}
            onChange={(data) => handleNestedDataChange("certifications", data)}
          />
        );
      case "languages":
        return (
          <LanguagesSection
            data={resumeData.sections.languages}
            onChange={(data) => handleNestedDataChange("languages", data)}
          />
        );
      case "interests":
        return (
          <InterestsSection
            data={resumeData.sections.interests}
            onChange={(data) => handleNestedDataChange("interests", data)}
          />
        );
      case "references":
        return (
          <ReferencesSection
            data={resumeData.sections.references}
            onChange={(data) => handleNestedDataChange("references", data)}
          />
        );
      default:
        return null;
    }
  };

  if (collapsed) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-2">
        {sectionConfig.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          
          return (
            <Button
              key={section.id}
              variant="ghost"
              size="icon"
              className={cn(
                "w-12 h-12 rounded-lg transition-all duration-200",
                isActive
                  ? `${section.bgColor} ${section.color} border ${section.borderColor}`
                  : "hover:bg-gray-100"
              )}
              onClick={() => onSectionChange(section.id)}
              title={section.label}
            >
              <Icon className="h-5 w-5" />
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-[440px] bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Resume Editor</h2>
          <div className="flex items-center gap-2">
            {/* Save Status */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              {isSaving ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : hasUnsavedChanges ? (
                <>
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Unsaved changes</span>
                </>
              ) : lastSaved ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Saved {lastSaved.toLocaleTimeString()}</span>
                </>
              ) : null}
            </div>
            
            {onSave && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSave}
                disabled={isSaving || !hasUnsavedChanges}
                className="h-8 px-2"
              >
                <Save className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* AI Tools */}
        <div className="flex gap-2">
          <Dialog open={showAI} onOpenChange={setShowAI}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Assist
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
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
        </div>
      </div>

      {/* Section Navigation */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          {sectionConfig.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const sectionData = resumeData.sections[section.id as keyof typeof resumeData.sections];
            const isVisible = sectionData && typeof sectionData === 'object' && 'visible' in sectionData 
              ? sectionData.visible 
              : true;

            return (
              <Button
                key={section.id}
                variant="ghost"
                className={cn(
                  "justify-start h-auto py-3 px-3 transition-all duration-200",
                  isActive
                    ? `${section.bgColor} ${section.color} border ${section.borderColor}`
                    : "hover:bg-gray-50"
                )}
                onClick={() => onSectionChange(section.id)}
              >
                <div className="flex items-center w-full">
                  <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{section.label}</div>
                    {!isVisible && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        Hidden
                      </Badge>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Section Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {renderSectionContent()}
        </div>
      </ScrollArea>
    </div>
  );
}