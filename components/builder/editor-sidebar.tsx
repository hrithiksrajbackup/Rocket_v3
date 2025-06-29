"use client";

import { useState } from "react";
import { ResumeData } from "@/lib/types";
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
import { AIResumeAnalyzer } from "./ai-resume-analyzer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
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
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Brain,
} from "lucide-react";

interface EditorSidebarProps {
  resumeData: ResumeData;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onDataChange: (sectionKey: string, data: any) => void;
  handleNestedDataChange: (sectionKey: string, data: any) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const sectionConfig = [
  {
    id: "personal",
    label: "Personal Info",
    icon: User,
    required: true,
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    required: true,
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    required: true,
  },
  {
    id: "skills",
    label: "Skills",
    icon: Code,
    required: true,
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderOpen,
    required: false,
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: Award,
    required: false,
  },
  {
    id: "languages",
    label: "Languages",
    icon: Globe,
    required: false,
  },
  {
    id: "interests",
    label: "Interests",
    icon: Heart,
    required: false,
  },
  {
    id: "references",
    label: "References",
    icon: Users,
    required: false,
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
}: EditorSidebarProps) {
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [showAIAnalyzer, setShowAIAnalyzer] = useState(false);

  if (collapsed) {
    return (
      <div className="w-0 overflow-hidden transition-all duration-300">
        {/* Content is hidden when collapsed */}
      </div>
    );
  }

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

  return (
    <div className="w-[440px] bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Resume Builder</h2>
              <p className="text-xs text-gray-500">Build your perfect resume</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAIAnalyzer(!showAIAnalyzer)}
              className="gap-1 text-xs"
            >
              <Brain className="w-3 h-3" />
              AI Analyzer
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className="gap-1 text-xs"
            >
              <Sparkles className="w-3 h-3" />
              AI Help
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full w-full"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Getting started</span>
            <span>Ready to export</span>
          </div>
        </div>
      </div>

      {/* AI Analyzer Panel */}
      {showAIAnalyzer && (
        <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-purple-50 to-pink-50">
          <AIResumeAnalyzer
            resumeData={resumeData}
            onClose={() => setShowAIAnalyzer(false)}
          />
        </div>
      )}

      {/* AI Suggestions Panel */}
      {showAISuggestions && (
        <div className="border-b border-gray-200 p-4 bg-blue-50">
          <AiSuggestions
            resumeData={resumeData}
            onClose={() => setShowAISuggestions(false)}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="p-4 border-b border-gray-200">
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Required Sections
          </div>
          {sectionConfig
            .filter((section) => section.required)
            .map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
                  )}
                </button>
              );
            })}
        </div>

        <div className="space-y-1 mt-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Optional Sections
          </div>
          {sectionConfig
            .filter((section) => !section.required)
            .map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
                  )}
                </button>
              );
            })}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">{renderSectionContent()}</div>
      </ScrollArea>
    </div>
  );
}