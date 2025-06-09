"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonalSection } from "@/components/builder/sections/personal-section";
import { EducationSection } from "@/components/builder/sections/education-section";
import { ExperienceSection } from "@/components/builder/sections/experience-section";
import { SkillsSection } from "@/components/builder/sections/skills-section";
import { ProjectsSection } from "@/components/builder/sections/projects-section";
import { CertificationsSection } from "@/components/builder/sections/certifications-section";
import { LanguagesSection } from "@/components/builder/sections/languages-section";
import { InterestsSection } from "@/components/builder/sections/interests-section";
import { ReferencesSection } from "@/components/builder/sections/references-section";
import { Separator } from "@/components/ui/separator";
import { ResumeData } from "@/lib/types";
import { AiSuggestions } from "@/components/builder/ai-suggestions";
import {
  User,
  GraduationCap,
  Briefcase,
  Code,
  Lightbulb,
  Award,
  Globe,
  Heart,
  UserCheck,
  Brain,
} from "lucide-react";

interface EditorSidebarProps {
  resumeData: ResumeData;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onDataChange: (sectionKey: string, data: any) => void;
  handleNestedDataChange: (sectionKey: string, data: any) => void;
}

const nestedSections = [
  "projects",
  "certifications",
  "languages",
  "interests",
  "references",
];

export function EditorSidebar({
  resumeData,
  activeSection,
  onSectionChange,
  onDataChange,
  handleNestedDataChange,
}: EditorSidebarProps) {
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  // Handlers for section data changes
  const handlePersonalChange = (data: any) => {
    onDataChange("personal", data);
  };

  const handleNestedSectionChange = (sectionKey: string, data: any) => {
    handleNestedDataChange(`${sectionKey}`, data);
  };

  // Determine which root and nested tabs to show
  const isNested = nestedSections.includes(activeSection);
  const rootTabValue = isNested ? "more" : activeSection;
  const nestedTabValue = isNested ? activeSection : nestedSections[0];

  // Switch between root tabs
  const handleRootTabChange = (value: string) => {
    if (value === "more") {
      onSectionChange(nestedTabValue);
    } else {
      onSectionChange(value);
    }
  };

  // Switch between nested 'More' tabs
  const handleNestedTabChange = (value: string) => {
    onSectionChange(value);
  };

  return (
    <div className="w-[420px] flex-shrink-0 border-r h-full overflow-y-auto flex flex-col bg-background">
      <Tabs
        value={rootTabValue}
        onValueChange={handleRootTabChange}
        className="flex-1 flex flex-col"
      >
        <div className="px-4 py-2 border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <TabsList className="grid grid-cols-5 h-auto p-1">
            <TabsTrigger
              value="personal"
              className="py-2 px-3 h-auto data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-muted"
            >
              <User className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="py-2 px-3 h-auto data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-muted"
            >
              <GraduationCap className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="py-2 px-3 h-auto data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-muted"
            >
              <Briefcase className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="py-2 px-3 h-auto data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-muted"
            >
              <Code className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="more"
              className="py-2 px-3 h-auto data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-muted"
            >
              <span className="flex items-center justify-center w-4 h-4">
                +
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="personal" className="p-4 flex-1">
          <PersonalSection
            data={resumeData.personal}
            onChange={handlePersonalChange}
          />
        </TabsContent>

        <TabsContent value="education" className="p-4 flex-1">
          <EducationSection
            data={resumeData.sections.education}
            onChange={(data) => handleNestedSectionChange("education", data)}
          />
        </TabsContent>

        <TabsContent value="experience" className="p-4 flex-1">
          <ExperienceSection
            data={resumeData.sections.experience}
            onChange={(data) => handleNestedSectionChange("experience", data)}
          />
        </TabsContent>

        <TabsContent value="skills" className="p-4 flex-1">
          <SkillsSection
            data={resumeData.sections.skills}
            onChange={(data) => handleNestedSectionChange("skills", data)}
          />
        </TabsContent>

        <TabsContent value="more" className="p-0 flex-1">
          <Tabs
            value={nestedTabValue}
            onValueChange={handleNestedTabChange}
            className="flex-1 flex flex-col"
          >
            <div className="px-4 py-2 border-b bg-muted/40">
              <TabsList className="w-full h-auto p-1 bg-transparent justify-start overflow-x-auto flex space-x-2">
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-background rounded-md"
                >
                  <Lightbulb className="h-4 w-4 mr-2" /> Projects
                </TabsTrigger>
                <TabsTrigger
                  value="certifications"
                  className="data-[state=active]:bg-background rounded-md"
                >
                  <Award className="h-4 w-4 mr-2" /> Certifications
                </TabsTrigger>
                <TabsTrigger
                  value="languages"
                  className="data-[state=active]:bg-background rounded-md"
                >
                  <Globe className="h-4 w-4 mr-2" /> Languages
                </TabsTrigger>
                <TabsTrigger
                  value="interests"
                  className="data-[state=active]:bg-background rounded-md"
                >
                  <Heart className="h-4 w-4 mr-2" /> Interests
                </TabsTrigger>
                <TabsTrigger
                  value="references"
                  className="data-[state=active]:bg-background rounded-md"
                >
                  <UserCheck className="h-4 w-4 mr-2" /> References
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="projects" className="p-4 flex-1">
              <ProjectsSection
                data={resumeData.sections.projects}
                onChange={(data) => handleNestedSectionChange("projects", data)}
              />
            </TabsContent>
            <TabsContent value="certifications" className="p-4 flex-1">
              <CertificationsSection
                data={resumeData.sections.certifications}
                onChange={(data) =>
                  handleNestedSectionChange("certifications", data)
                }
              />
            </TabsContent>
            <TabsContent value="languages" className="p-4 flex-1">
              <LanguagesSection
                data={resumeData.sections.languages}
                onChange={(data) =>
                  handleNestedSectionChange("languages", data)
                }
              />
            </TabsContent>
            <TabsContent value="interests" className="p-4 flex-1">
              <InterestsSection
                data={resumeData.sections.interests}
                onChange={(data) =>
                  handleNestedSectionChange("interests", data)
                }
              />
            </TabsContent>
            <TabsContent value="references" className="p-4 flex-1">
              <ReferencesSection
                data={resumeData.sections.references}
                onChange={(data) =>
                  handleNestedSectionChange("references", data)
                }
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      <Separator />

      <Card className="m-4 bg-primary/5 border-primary/20">
        <CardHeader className="py-3">
          <CardTitle className="text-sm flex items-center">
            <Brain className="h-4 w-4 mr-2 text-primary" /> AI Assistant
          </CardTitle>
          <CardDescription className="text-xs">
            Get AI-powered suggestions to improve your resume
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          {showAiSuggestions ? (
            <AiSuggestions
              resumeData={resumeData}
              onClose={() => setShowAiSuggestions(false)}
            />
          ) : (
            <div className="flex flex-col gap-2">
              <div className="text-sm text-muted-foreground">
                Let AI help you improve your resume content and boost your
                chances of getting noticed.
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                <button
                  onClick={() => setShowAiSuggestions(true)}
                  className="text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full px-3 py-1 transition-colors"
                >
                  Improve summary
                </button>
                <button
                  onClick={() => setShowAiSuggestions(true)}
                  className="text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full px-3 py-1 transition-colors"
                >
                  Enhance job descriptions
                </button>
                <button
                  onClick={() => setShowAiSuggestions(true)}
                  className="text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full px-3 py-1 transition-colors"
                >
                  Optimize keywords
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
