

// "use client";

// import React, { useState } from "react";
// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { Progress } from "@/components/ui/progress";
// import { PersonalSection } from "@/components/builder/sections/personal-section";
// import { EducationSection } from "@/components/builder/sections/education-section";
// import { ExperienceSection } from "@/components/builder/sections/experience-section";
// import { SkillsSection } from "@/components/builder/sections/skills-section";
// import { ProjectsSection } from "@/components/builder/sections/projects-section";
// import { CertificationsSection } from "@/components/builder/sections/certifications-section";
// import { LanguagesSection } from "@/components/builder/sections/languages-section";
// import { InterestsSection } from "@/components/builder/sections/interests-section";
// import { ReferencesSection } from "@/components/builder/sections/references-section";
// import { AiSuggestions } from "@/components/builder/ai-suggestions";
// import { ResumeData } from "@/lib/types";
// import {
//   User,
//   GraduationCap,
//   Briefcase,
//   Code,
//   Lightbulb,
//   Award,
//   Globe,
//   Heart,
//   UserCheck,
//   Brain,
//   CheckCircle2,
//   AlertCircle,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   TrendingUp,
//   Target,
//   Rocket,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface EditorSidebarProps {
//   resumeData: ResumeData;
//   activeSection: string;
//   onSectionChange: (section: string) => void;
//   onDataChange: (sectionKey: string, data: any) => void;
//   handleNestedDataChange: (sectionKey: string, data: any) => void;
// }

// // flat list of all top-level sections
// const SECTIONS = [
//   { key: "personal",    icon: User,         label: "Personal",       description: "Your basic contact details" },
//   { key: "education",   icon: GraduationCap,label: "Education",      description: "Your academic background" },
//   { key: "experience",  icon: Briefcase,    label: "Experience",     description: "Your work history" },
//   { key: "skills",      icon: Code,         label: "Skills",         description: "Your technical skills" },
//   { key: "projects",    icon: Lightbulb,    label: "Projects",       description: "Your portfolio items" },
//   { key: "certifications", icon: Award,     label: "Certifications", description: "Your professional credentials" },
//   { key: "languages",   icon: Globe,        label: "Languages",      description: "Your language proficiencies" },
//   { key: "interests",   icon: Heart,        label: "Interests",      description: "Your personal interests" },
//   { key: "references",  icon: UserCheck,    label: "References",     description: "Your professional references" },
//   { key: "ai",          icon: Brain,        label: "AI Assistant",   description: "Get AI-powered suggestions" },
// ] as const;

// function getStatus(
//   key: string,
//   resumeData: ResumeData
// ): "complete" | "incomplete" | "optional" {
//   switch (key) {
//     case "personal":
//       return resumeData.personal.name && resumeData.personal.email
//         ? "complete"
//         : "incomplete";
//     case "experience":
//       return resumeData.sections.experience.items?.length
//         ? "complete"
//         : "incomplete";
//     case "education":
//       return resumeData.sections.education.items?.length
//         ? "complete"
//         : "incomplete";
//     case "skills":
//       return resumeData.sections.skills.groups?.length
//         ? "complete"
//         : "incomplete";
//     default:
//       return "optional";
//   }
// }

// type SidebarItemProps = {
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   label: string;
//   description: string;
//   status: "complete" | "incomplete" | "optional";
//   active: boolean;
//   onClick: () => void;
// };

// function SidebarItem({
//   icon: Icon,
//   label,
//   description,
//   status,
//   active,
//   onClick,
// }: SidebarItemProps) {
//   return (
//     <button
//       onClick={onClick}
//       className={cn(
//         "flex items-center gap-3 w-full p-3 rounded-xl transition-all outline-none",
//         active
//           ? "bg-white shadow-sm border-l-4 border-blue-500"
//           : "hover:bg-gray-50 border-l-4 border-transparent",
//         "focus:ring-2 focus:ring-blue-300"
//       )}
//     >
//       <Icon className="w-5 h-5 text-gray-600" />
//       <div className="flex-1 text-left">
//         <div className="font-medium text-gray-800">{label}</div>
//         <div className="text-xs text-gray-500">{description}</div>
//       </div>
//       {status === "complete" && (
//         <CheckCircle2 className="w-4 h-4 text-green-500" />
//       )}
//       {status === "incomplete" && (
//         <AlertCircle className="w-4 h-4 text-orange-500" />
//       )}
//     </button>
//   );
// }

// export function EditorSidebar({
//   resumeData,
//   activeSection,
//   onSectionChange,
//   onDataChange,
//   handleNestedDataChange,
// }: EditorSidebarProps) {
//   const [showAi, setShowAi] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   // compute completion % (same logic as before)
//   const completion = React.useMemo(() => {
//     let done = 0,
//       total = 0;
//     total += 5;
//     if (resumeData.personal.name) done++;
//     if (resumeData.personal.title) done++;
//     if (resumeData.personal.email) done++;
//     if (resumeData.personal.phone) done++;
//     if (resumeData.personal.summary) done++;
//     total += 3;
//     if (resumeData.sections.experience.items?.length) done++;
//     if (resumeData.sections.education.items?.length) done++;
//     if (resumeData.sections.skills.groups?.length) done++;
//     return Math.round((done / total) * 100);
//   }, [resumeData]);

//   return (
//     <div className="relative flex h-full">
//       {/* Sidebar Column */}
//       <div
//         className={cn(
//           "flex flex-col bg-white border-r shadow-sm overflow-hidden transition-all",
//           isCollapsed ? "w-0" : "w-80"
//         )}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-500 rounded-xl shadow-sm">
//               <Rocket className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold">Resume Builder</h2>
//               <p className="text-sm text-gray-500">Build your perfect resume</p>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="text-xl font-bold">{completion}%</div>
//             <div className="text-xs text-gray-500">Complete</div>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="px-6 py-2">
//           <Progress
//             value={completion}
//             className="h-2 bg-gray-200 rounded-full shadow-inner"
//           />
//           <div className="flex justify-between text-xs text-gray-500 mt-1">
//             <span>Getting started</span>
//             <span>Ready to export</span>
//           </div>
//         </div>

//         {/* Navigation List */}
//         <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
//           {SECTIONS.map((sec) => (
//             <SidebarItem
//               key={sec.key}
//               icon={sec.icon}
//               label={sec.label}
//               description={sec.description}
//               status={getStatus(sec.key, resumeData)}
//               active={activeSection === sec.key}
//               onClick={() => {
//                 setShowAi(false);
//                 onSectionChange(sec.key);
//               }}
//             />
//           ))}
//         </nav>

//         {/* Collapse Button */}
//         <div className="px-6 py-4 border-t">
//           <button
//             onClick={() => setIsCollapsed((c) => !c)}
//             className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition"
//           >
//             {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
//             {isCollapsed ? "Expand" : "Collapse"}
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto">
//         <Tabs value={activeSection} onValueChange={onSectionChange}>
//           {/* Personal */}
//           <TabsContent value="personal" className="p-6 space-y-6">
//             <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
//               <div className="p-3 bg-blue-500 rounded-lg">
//                 <User className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Personal Information
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Tell us about yourself
//                 </p>
//               </div>
//             </div>
//             <PersonalSection
//               data={resumeData.personal}
//               onChange={(d) => onDataChange("personal", d)}
//             />
//           </TabsContent>

//           {/* Education */}
//           <TabsContent value="education" className="p-6 space-y-6">
//             <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
//               <div className="p-3 bg-emerald-500 rounded-lg">
//                 <GraduationCap className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Education
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Your academic achievements
//                 </p>
//               </div>
//             </div>
//             <EducationSection
//               data={resumeData.sections.education}
//               onChange={(d) => handleNestedDataChange("education", d)}
//             />
//           </TabsContent>

//           {/* Experience */}
//           <TabsContent value="experience" className="p-6 space-y-6">
//             <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
//               <div className="p-3 bg-purple-500 rounded-lg">
//                 <Briefcase className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Work Experience
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Your professional journey
//                 </p>
//               </div>
//             </div>
//             <ExperienceSection
//               data={resumeData.sections.experience}
//               onChange={(d) => handleNestedDataChange("experience", d)}
//             />
//           </TabsContent>

//           {/* Skills */}
//           <TabsContent value="skills" className="p-6 space-y-6">
//             <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
//               <div className="p-3 bg-orange-500 rounded-lg">
//                 <Code className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Skills & Expertise
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   What you’re great at
//                 </p>
//               </div>
//             </div>
//             <SkillsSection
//               data={resumeData.sections.skills}
//               onChange={(d) => handleNestedDataChange("skills", d)}
//             />
//           </TabsContent>

//           {/* AI Assistant */}
//           <TabsContent value="ai" className="p-6 space-y-6">
//             <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl border border-violet-100">
//               <div className="p-3 bg-violet-500 rounded-lg">
//                 <Brain className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   AI Assistant
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Let AI enhance your resume
//                 </p>
//               </div>
//             </div>

//             {showAi ? (
//               <AiSuggestions
//                 resumeData={resumeData}
//                 onClose={() => setShowAi(false)}
//               />
//             ) : (
//               <div className="space-y-4">
//                 <p className="text-gray-600 leading-relaxed">
//                   Get personalized suggestions to make your resume stand out
//                   from the crowd.
//                 </p>
//                 <div className="grid gap-3">
//                   <button
//                     onClick={() => setShowAi(true)}
//                     className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition"
//                   >
//                     <div className="p-2 bg-blue-500 rounded-lg">
//                       <Sparkles className="w-5 h-5 text-white" />
//                     </div>
//                     <div className="text-left">
//                       <div className="font-semibold text-blue-800">
//                         Improve Summary
//                       </div>
//                       <div className="text-sm text-blue-600">
//                         Make it more compelling
//                       </div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => setShowAi(true)}
//                     className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition"
//                   >
//                     <div className="p-2 bg-purple-500 rounded-lg">
//                       <TrendingUp className="w-5 h-5 text-white" />
//                     </div>
//                     <div className="text-left">
//                       <div className="font-semibold text-purple-800">
//                         Enhance Experience
//                       </div>
//                       <div className="text-sm text-purple-600">
//                         Highlight achievements
//                       </div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => setShowAi(true)}
//                     className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition"
//                   >
//                     <div className="p-2 bg-green-500 rounded-lg">
//                       <Target className="w-5 h-5 text-white" />
//                     </div>
//                     <div className="text-left">
//                       <div className="font-semibold text-green-800">
//                         Optimize Keywords
//                       </div>
//                       <div className="text-sm text-green-600">
//                         Beat ATS systems
//                       </div>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </TabsContent>

//           {/* Projects */}
//           <TabsContent value="projects" className="p-6 space-y-6">
//             <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
//               <div className="p-3 bg-yellow-500 rounded-lg">
//                 <Lightbulb className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Projects
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Your portfolio items
//                 </p>
//               </div>
//             </div>
//             <ProjectsSection
//               data={resumeData.sections.projects}
//               onChange={(d) => handleNestedDataChange("projects", d)}
//             />
//           </TabsContent>

//           {/* Certifications */}
//           <TabsContent value="certifications" className="p-6 space-y-6">
//             <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
//               <div className="p-3 bg-red-500 rounded-lg">
//                 <Award className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Certifications
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Your professional credentials
//                 </p>
//               </div>
//             </div>
//             <CertificationsSection
//               data={resumeData.sections.certifications}
//               onChange={(d) => handleNestedDataChange("certifications", d)}
//             />
//           </TabsContent>

//           {/* Languages */}
//           <TabsContent value="languages" className="p-6 space-y-6">
//             <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
//               <div className="p-3 bg-teal-500 rounded-lg">
//                 <Globe className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Languages
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Your language proficiencies
//                 </p>
//               </div>
//             </div>
//             <LanguagesSection
//               data={resumeData.sections.languages}
//               onChange={(d) => handleNestedDataChange("languages", d)}
//             />
//           </TabsContent>

//           {/* Interests */}
//           <TabsContent value="interests" className="p-6 space-y-6">
//             <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl border border-pink-100">
//               <div className="p-3 bg-pink-500 rounded-lg">
//                 <Heart className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Interests
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Your personal interests
//                 </p>
//               </div>
//             </div>
//             <InterestsSection
//               data={resumeData.sections.interests}
//               onChange={(d) => handleNestedDataChange("interests", d)}
//             />
//           </TabsContent>

//           {/* References */}
//           <TabsContent value="references" className="p-6 space-y-6">
//             <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
//               <div className="p-3 bg-indigo-500 rounded-lg">
//                 <UserCheck className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   References
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Your professional references
//                 </p>
//               </div>
//             </div>
//             <ReferencesSection
//               data={resumeData.sections.references}
//               onChange={(d) => handleNestedDataChange("references", d)}
//             />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useMemo } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PersonalSection } from "@/components/builder/sections/personal-section";
import { EducationSection } from "@/components/builder/sections/education-section";
import { ExperienceSection } from "@/components/builder/sections/experience-section";
import { SkillsSection } from "@/components/builder/sections/skills-section";
import { ProjectsSection } from "@/components/builder/sections/projects-section";
import { CertificationsSection } from "@/components/builder/sections/certifications-section";
import { LanguagesSection } from "@/components/builder/sections/languages-section";
import { InterestsSection } from "@/components/builder/sections/interests-section";
import { ReferencesSection } from "@/components/builder/sections/references-section";
import { AiSuggestions } from "@/components/builder/ai-suggestions";
import { ResumeData } from "@/lib/types";
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
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Target,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorSidebarProps {
  resumeData: ResumeData;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onDataChange: (sectionKey: string, data: any) => void;
  handleNestedDataChange: (sectionKey: string, data: any) => void;
}

const SECTIONS = [
  { key: "personal",    icon: User,         label: "Personal",       description: "Your basic contact details" },
  { key: "education",   icon: GraduationCap,label: "Education",      description: "Your academic background" },
  { key: "experience",  icon: Briefcase,    label: "Experience",     description: "Your work history" },
  { key: "skills",      icon: Code,         label: "Skills",         description: "Your technical skills" },
  { key: "projects",    icon: Lightbulb,    label: "Projects",       description: "Your portfolio items" },
  { key: "certifications", icon: Award,     label: "Certifications", description: "Your professional credentials" },
  { key: "languages",   icon: Globe,        label: "Languages",      description: "Your language proficiencies" },
  { key: "interests",   icon: Heart,        label: "Interests",      description: "Your personal interests" },
  { key: "references",  icon: UserCheck,    label: "References",     description: "Your professional references" },
  { key: "ai",          icon: Brain,        label: "AI Assistant",   description: "Get AI-powered suggestions" },
] as const;

function getStatus(
  key: string,
  resumeData: ResumeData
): "complete" | "incomplete" | "optional" {
  switch (key) {
    case "personal":
      return resumeData.personal.name && resumeData.personal.email
        ? "complete"
        : "incomplete";
    case "experience":
      return resumeData.sections.experience.items?.length
        ? "complete"
        : "incomplete";
    case "education":
      return resumeData.sections.education.items?.length
        ? "complete"
        : "incomplete";
    case "skills":
      return resumeData.sections.skills.groups?.length
        ? "complete"
        : "incomplete";
    default:
      return "optional";
  }
}

const COLLAPSED_WIDTH = "w-16";
const EXPANDED_WIDTH  = "w-80";

export function EditorSidebar({
  resumeData,
  activeSection,
  onSectionChange,
  onDataChange,
  handleNestedDataChange,
}: EditorSidebarProps) {
  const [showAi, setShowAi] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const completion = useMemo(() => {
    let done = 0,
      total = 0;
    // personal bits
    total += 5;
    if (resumeData.personal.name) done++;
    if (resumeData.personal.title) done++;
    if (resumeData.personal.email) done++;
    if (resumeData.personal.phone) done++;
    if (resumeData.personal.summary) done++;
    // core sections
    total += 3;
    if (resumeData.sections.experience.items?.length) done++;
    if (resumeData.sections.education.items?.length) done++;
    if (resumeData.sections.skills.groups?.length) done++;
    return Math.round((done / total) * 100);
  }, [resumeData]);

  return (
    <div className="relative flex h-full">
      {/* Sidebar */}
      <div
        className={cn(
          "flex flex-col bg-white border-r shadow-sm overflow-hidden transition-all",
          collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center bg-white border-b transition-all",
            collapsed ? "justify-center px-2 py-4" : "justify-between px-6 py-4"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-xl shadow-sm">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-semibold">Resume Builder</h2>
                <p className="text-sm text-gray-500">
                  Build your perfect resume
                </p>
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="text-right">
              <div className="text-xl font-bold">{completion}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          )}
        </div>

        {/* Progress */}
        {!collapsed && (
          <div className="px-6 py-2">
            <Progress
              value={completion}
              className="h-2 bg-gray-200 rounded-full shadow-inner"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Getting started</span>
              <span>Ready to export</span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav
          className={cn(
            "flex-1 overflow-y-auto transition-all",
            collapsed ? "px-2 py-4" : "px-4 py-6 space-y-3"
          )}
        >
          {SECTIONS.map((sec) => {
            const status = getStatus(sec.key, resumeData);
            const isActive = activeSection === sec.key;
            return (
              <button
                key={sec.key}
                onClick={() => {
                  setCollapsed(false);
                  setShowAi(false);
                  onSectionChange(sec.key);
                }}
                className={cn(
                  "flex items-center rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all",
                  isActive
                    ? "bg-white shadow-sm border-l-4 border-blue-500"
                    : "border-l-4 border-transparent hover:bg-gray-50",
                  collapsed ? "justify-center p-2" : "justify-start gap-3 p-3"
                )}
              >
                <sec.icon
                  className={cn(
                    "transition-colors",
                    isActive ? "text-blue-500" : "text-gray-600"
                  )}
                />
                {!collapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-800">
                        {sec.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {sec.description}
                      </div>
                    </div>
                    {status === "complete" && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                    {status === "incomplete" && (
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="border-t">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3 focus:outline-none hover:bg-gray-100 transition-all",
              collapsed ? "" : "px-4"
            )}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeSection} onValueChange={onSectionChange}>
          {/* ——— Personal ——— */}
          <TabsContent value="personal" className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="p-3 bg-blue-500 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Personal Information
                </h3>
                <p className="text-sm text-gray-600">
                  Tell us about yourself
                </p>
              </div>
            </div>
            <PersonalSection
              data={resumeData.personal}
              onChange={(d) => onDataChange("personal", d)}
            />
          </TabsContent>

          {/* ——— Education ——— */}
          <TabsContent value="education" className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="p-3 bg-emerald-500 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Education
                </h3>
                <p className="text-sm text-gray-600">
                  Your academic achievements
                </p>
              </div>
            </div>
            <EducationSection
              data={resumeData.sections.education}
              onChange={(d) => handleNestedDataChange("education", d)}
            />
          </TabsContent>

          {/* ——— Experience ——— */}
          <TabsContent value="experience" className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="p-3 bg-purple-500 rounded-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Work Experience
                </h3>
                <p className="text-sm text-gray-600">
                  Your professional journey
                </p>
              </div>
            </div>
            <ExperienceSection
              data={resumeData.sections.experience}
              onChange={(d) => handleNestedDataChange("experience", d)}
            />
          </TabsContent>

          {/* ——— Skills ——— */}
          <TabsContent value="skills" className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="p-3 bg-orange-500 rounded-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Skills & Expertise
                </h3>
                <p className="text-sm text-gray-600">
                  What you’re great at
                </p>
              </div>
            </div>
            <SkillsSection
              data={resumeData.sections.skills}
              onChange={(d) => handleNestedDataChange("skills", d)}
            />
          </TabsContent>

          {/* ——— AI Assistant ——— */}
          <TabsContent value="ai" className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl border border-violet-100">
              <div className="p-3 bg-violet-500 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  AI Assistant
                </h3>
                <p className="text-sm text-gray-600">
                  Let AI enhance your resume
                </p>
              </div>
            </div>

            {showAi ? (
              <AiSuggestions
                resumeData={resumeData}
                onClose={() => setShowAi(false)}
              />
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Get personalized suggestions to make your resume stand
                  out from the crowd.
                </p>
                <div className="grid gap-3">
                  <button
                    onClick={() => setShowAi(true)}
                    className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition"
                  >
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-blue-800">
                        Improve Summary
                      </div>
                      <div className="text-sm text-blue-600">
                        Make it more compelling
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setShowAi(true)}
                    className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition"
                  >
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-purple-800">
                        Enhance Experience
                      </div>
                      <div className="text-sm text-purple-600">
                        Highlight achievements
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setShowAi(true)}
                    className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition"
                  >
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-green-800">
                        Optimize Keywords
                      </div>
                      <div className="text-sm text-green-600">
                        Beat ATS systems
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* ——— Projects ——— */}
          <TabsContent value="projects" className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <div className="p-3 bg-yellow-500 rounded-lg">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Projects
                </h3>
                <p className="text-sm text-gray-600">
                  Your portfolio items
                </p>
              </div>
            </div>
            <ProjectsSection
              data={resumeData.sections.projects}
              onChange={(d) => handleNestedDataChange("projects", d)}
            />
          </TabsContent>

          {/* ——— Certifications ——— */}
          <TabsContent value="certifications" className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
              <div className="p-3 bg-red-500 rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Certifications
                </h3>
                <p className="text-sm text-gray-600">
                  Your professional credentials
                </p>
              </div>
            </div>
            <CertificationsSection
              data={resumeData.sections.certifications}
              onChange={(d) => handleNestedDataChange("certifications", d)}
            />
          </TabsContent>

          {/* ——— Languages ——— */}
          <TabsContent value="languages" className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
              <div className="p-3 bg-teal-500 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Languages
                </h3>
                <p className="text-sm text-gray-600">
                  Your language proficiencies
                </p>
              </div>
            </div>
            <LanguagesSection
              data={resumeData.sections.languages}
              onChange={(d) => handleNestedDataChange("languages", d)}
            />
          </TabsContent>

          {/* ——— Interests ——— */}
          <TabsContent value="interests" className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl border border-pink-100">
              <div className="p-3 bg-pink-500 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Interests
                </h3>
                <p className="text-sm text-gray-600">
                  Your personal interests
                </p>
              </div>
            </div>
            <InterestsSection
              data={resumeData.sections.interests}
              onChange={(d) => handleNestedDataChange("interests", d)}
            />
          </TabsContent>

          {/* ——— References ——— */}
          <TabsContent value="references" className="p-6 space-y-6">
            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="p-3 bg-indigo-500 rounded-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  References
                </h3>
                <p className="text-sm text-gray-600">
                  Your professional references
                </p>
              </div>
            </div>
            <ReferencesSection
              data={resumeData.sections.references}
              onChange={(d) => handleNestedDataChange("references", d)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
