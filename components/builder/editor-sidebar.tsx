// "use client";

// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { PersonalSection } from "@/components/builder/sections/personal-section";
// import { EducationSection } from "@/components/builder/sections/education-section";
// import { ExperienceSection } from "@/components/builder/sections/experience-section";
// import { SkillsSection } from "@/components/builder/sections/skills-section";
// import { ProjectsSection } from "@/components/builder/sections/projects-section";
// import { CertificationsSection } from "@/components/builder/sections/certifications-section";
// import { LanguagesSection } from "@/components/builder/sections/languages-section";
// import { InterestsSection } from "@/components/builder/sections/interests-section";
// import { ReferencesSection } from "@/components/builder/sections/references-section";
// import { Separator } from "@/components/ui/separator";
// import { ResumeData } from "@/lib/types";
// import { AiSuggestions } from "@/components/builder/ai-suggestions";
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
// } from "lucide-react";

// interface EditorSidebarProps {
//   resumeData: ResumeData;
//   activeSection: string;
//   onSectionChange: (section: string) => void;
//   onDataChange: (sectionKey: string, data: any) => void;
//   handleNestedDataChange: (sectionKey: string, data: any) => void;
// }

// const nestedSections = [
//   "projects",
//   "certifications",
//   "languages",
//   "interests",
//   "references",
// ];

// export function EditorSidebar({
//   resumeData,
//   activeSection,
//   onSectionChange,
//   onDataChange,
//   handleNestedDataChange,
// }: EditorSidebarProps) {
//   const [showAiSuggestions, setShowAiSuggestions] = useState(false);

//   // Handlers for section data changes
//   const handlePersonalChange = (data: any) => {
//     onDataChange("personal", data);
//   };

//   const handleNestedSectionChange = (sectionKey: string, data: any) => {
//     handleNestedDataChange(`${sectionKey}`, data);
//   };

//   // Determine which root and nested tabs to show
//   const isNested = nestedSections.includes(activeSection);
//   const rootTabValue = isNested ? "more" : activeSection;
//   const nestedTabValue = isNested ? activeSection : nestedSections[0];

//   // Switch between root tabs
//   const handleRootTabChange = (value: string) => {
//     if (value === "more") {
//       onSectionChange(nestedTabValue);
//     } else {
//       onSectionChange(value);
//     }
//   };

//   // Switch between nested 'More' tabs
//   const handleNestedTabChange = (value: string) => {
//     onSectionChange(value);
//   };

//   return (
//     <div className="w-[420px] flex-shrink-0 border-r h-full overflow-y-auto flex flex-col bg-background">
//       <Tabs
//         value={rootTabValue}
//         onValueChange={handleRootTabChange}
//         className="flex-1 flex flex-col"
//       >
//         <div className="px-4 py-2 border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//           <TabsList className="grid grid-cols-5 h-auto p-1">
//             <TabsTrigger
//               value="personal"
//               className="py-2 px-3 h-auto data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-muted"
//             >
//               <User className="h-4 w-4" />
//             </TabsTrigger>
//             <TabsTrigger
//               value="education"
//               className="py-2 px-3 h-auto data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-muted"
//             >
//               <GraduationCap className="h-4 w-4" />
//             </TabsTrigger>
//             <TabsTrigger
//               value="experience"
//               className="py-2 px-3 h-auto data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-muted"
//             >
//               <Briefcase className="h-4 w-4" />
//             </TabsTrigger>
//             <TabsTrigger
//               value="skills"
//               className="py-2 px-3 h-auto data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-muted"
//             >
//               <Code className="h-4 w-4" />
//             </TabsTrigger>
//             <TabsTrigger
//               value="more"
//               className="py-2 px-3 h-auto data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:bg-muted"
//             >
//               <span className="flex items-center justify-center w-4 h-4">
//                 +
//               </span>
//             </TabsTrigger>
//           </TabsList>
//         </div>

//         <TabsContent value="personal" className="p-4 flex-1">
//           <PersonalSection
//             data={resumeData.personal}
//             onChange={handlePersonalChange}
//           />
//         </TabsContent>

//         <TabsContent value="education" className="p-4 flex-1">
//           <EducationSection
//             data={resumeData.sections.education}
//             onChange={(data) => handleNestedSectionChange("education", data)}
//           />
//         </TabsContent>

//         <TabsContent value="experience" className="p-4 flex-1">
//           <ExperienceSection
//             data={resumeData.sections.experience}
//             onChange={(data) => handleNestedSectionChange("experience", data)}
//           />
//         </TabsContent>

//         <TabsContent value="skills" className="p-4 flex-1">
//           <SkillsSection
//             data={resumeData.sections.skills}
//             onChange={(data) => handleNestedSectionChange("skills", data)}
//           />
//         </TabsContent>

//         <TabsContent value="more" className="p-0 flex-1">
//           <Tabs
//             value={nestedTabValue}
//             onValueChange={handleNestedTabChange}
//             className="flex-1 flex flex-col"
//           >
//             <div className="px-4 py-2 border-b bg-muted/40">
//               <TabsList className="w-full h-auto p-1 bg-transparent justify-start overflow-x-auto flex space-x-2">
//                 <TabsTrigger
//                   value="projects"
//                   className="data-[state=active]:bg-background rounded-md"
//                 >
//                   <Lightbulb className="h-4 w-4 mr-2" /> Projects
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="certifications"
//                   className="data-[state=active]:bg-background rounded-md"
//                 >
//                   <Award className="h-4 w-4 mr-2" /> Certifications
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="languages"
//                   className="data-[state=active]:bg-background rounded-md"
//                 >
//                   <Globe className="h-4 w-4 mr-2" /> Languages
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="interests"
//                   className="data-[state=active]:bg-background rounded-md"
//                 >
//                   <Heart className="h-4 w-4 mr-2" /> Interests
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="references"
//                   className="data-[state=active]:bg-background rounded-md"
//                 >
//                   <UserCheck className="h-4 w-4 mr-2" /> References
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <TabsContent value="projects" className="p-4 flex-1">
//               <ProjectsSection
//                 data={resumeData.sections.projects}
//                 onChange={(data) => handleNestedSectionChange("projects", data)}
//               />
//             </TabsContent>
//             <TabsContent value="certifications" className="p-4 flex-1">
//               <CertificationsSection
//                 data={resumeData.sections.certifications}
//                 onChange={(data) =>
//                   handleNestedSectionChange("certifications", data)
//                 }
//               />
//             </TabsContent>
//             <TabsContent value="languages" className="p-4 flex-1">
//               <LanguagesSection
//                 data={resumeData.sections.languages}
//                 onChange={(data) =>
//                   handleNestedSectionChange("languages", data)
//                 }
//               />
//             </TabsContent>
//             <TabsContent value="interests" className="p-4 flex-1">
//               <InterestsSection
//                 data={resumeData.sections.interests}
//                 onChange={(data) =>
//                   handleNestedSectionChange("interests", data)
//                 }
//               />
//             </TabsContent>
//             <TabsContent value="references" className="p-4 flex-1">
//               <ReferencesSection
//                 data={resumeData.sections.references}
//                 onChange={(data) =>
//                   handleNestedSectionChange("references", data)
//                 }
//               />
//             </TabsContent>
//           </Tabs>
//         </TabsContent>
//       </Tabs>

//       <Separator />

//       <Card className="m-4 bg-primary/5 border-primary/20">
//         <CardHeader className="py-3">
//           <CardTitle className="text-sm flex items-center">
//             <Brain className="h-4 w-4 mr-2 text-primary" /> AI Assistant
//           </CardTitle>
//           <CardDescription className="text-xs">
//             Get AI-powered suggestions to improve your resume
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="pb-3">
//           {showAiSuggestions ? (
//             <AiSuggestions
//               resumeData={resumeData}
//               onClose={() => setShowAiSuggestions(false)}
//             />
//           ) : (
//             <div className="flex flex-col gap-2">
//               <div className="text-sm text-muted-foreground">
//                 Let AI help you improve your resume content and boost your
//                 chances of getting noticed.
//               </div>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 <button
//                   onClick={() => setShowAiSuggestions(true)}
//                   className="text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full px-3 py-1 transition-colors"
//                 >
//                   Improve summary
//                 </button>
//                 <button
//                   onClick={() => setShowAiSuggestions(true)}
//                   className="text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full px-3 py-1 transition-colors"
//                 >
//                   Enhance job descriptions
//                 </button>
//                 <button
//                   onClick={() => setShowAiSuggestions(true)}
//                   className="text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full px-3 py-1 transition-colors"
//                 >
//                   Optimize keywords
//                 </button>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

const sectionConfig = {
  personal: {
    icon: User,
    label: "Personal Info",
    description: "Basic contact information",
    color: "bg-blue-500",
    lightColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  education: {
    icon: GraduationCap,
    label: "Education",
    description: "Academic background",
    color: "bg-green-500",
    lightColor: "bg-green-50 text-green-700 border-green-200",
  },
  experience: {
    icon: Briefcase,
    label: "Experience",
    description: "Work history",
    color: "bg-purple-500",
    lightColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  skills: {
    icon: Code,
    label: "Skills",
    description: "Technical abilities",
    color: "bg-orange-500",
    lightColor: "bg-orange-50 text-orange-700 border-orange-200",
  },
  projects: {
    icon: Lightbulb,
    label: "Projects",
    description: "Portfolio items",
    color: "bg-yellow-500",
    lightColor: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  certifications: {
    icon: Award,
    label: "Certifications",
    description: "Professional credentials",
    color: "bg-red-500",
    lightColor: "bg-red-50 text-red-700 border-red-200",
  },
  languages: {
    icon: Globe,
    label: "Languages",
    description: "Language proficiency",
    color: "bg-teal-500",
    lightColor: "bg-teal-50 text-teal-700 border-teal-200",
  },
  interests: {
    icon: Heart,
    label: "Interests",
    description: "Personal interests",
    color: "bg-pink-500",
    lightColor: "bg-pink-50 text-pink-700 border-pink-200",
  },
  references: {
    icon: UserCheck,
    label: "References",
    description: "Professional references",
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
};

export function EditorSidebar({
  resumeData,
  activeSection,
  onSectionChange,
  onDataChange,
  handleNestedDataChange,
}: EditorSidebarProps) {
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  // Calculate completion percentage
  const calculateCompletion = () => {
    let completed = 0;
    let total = 0;

    // Personal info (required fields)
    total += 5;
    if (resumeData.personal.name) completed++;
    if (resumeData.personal.title) completed++;
    if (resumeData.personal.email) completed++;
    if (resumeData.personal.phone) completed++;
    if (resumeData.personal.summary) completed++;

    // Experience
    total += 1;
    if (resumeData.sections.experience.items?.length) completed++;

    // Education
    total += 1;
    if (resumeData.sections.education.items?.length) completed++;

    // Skills
    total += 1;
    if (resumeData.sections.skills.groups?.length) completed++;

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateCompletion();

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

  const getSectionStatus = (sectionKey: string) => {
    switch (sectionKey) {
      case "personal":
        return resumeData.personal.name && resumeData.personal.email ? "complete" : "incomplete";
      case "experience":
        return resumeData.sections.experience.items?.length ? "complete" : "incomplete";
      case "education":
        return resumeData.sections.education.items?.length ? "complete" : "incomplete";
      case "skills":
        return resumeData.sections.skills.groups?.length ? "complete" : "incomplete";
      default:
        return "optional";
    }
  };

  return (
    <div className="w-[440px] h-screen flex-shrink-0 border-r  overflow-hidden flex flex-col bg-gradient-to-b from-slate-50/50 to-white">
      {/* Header with Progress */}
      <div className="p-6 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Resume Builder</h2>
            <p className="text-sm text-gray-600">Build your perfect resume</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">{completionPercentage}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
            <div className="w-12 h-12 relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${completionPercentage}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                {completionPercentage === 100 ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Target className="w-4 h-4 text-blue-500" />
                )}
              </div>
            </div>
          </div>
        </div>
        
        <Progress value={completionPercentage} className="h-2" />
      </div>

      <Tabs
        value={rootTabValue}
        onValueChange={handleRootTabChange}
        className="flex-1 flex flex-col"
      >
        {/* Enhanced Tab Navigation */}
        <div className="px-6 py-4 border-b bg-white/50">
          <TabsList className="grid grid-cols-5 h-auto p-1 bg-gray-100/80 backdrop-blur-sm">
            {["personal", "education", "experience", "skills", "more"].map((tab) => {
              const config = sectionConfig[tab as keyof typeof sectionConfig];
              const isActive = rootTabValue === tab;
              const status = tab !== "more" ? getSectionStatus(tab) : "optional";
              
              return (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={cn(
                    "relative py-3 px-2 h-auto data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200",
                    isActive && "scale-105"
                  )}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      isActive ? config?.lightColor : "bg-gray-100"
                    )}>
                      {tab === "more" ? (
                        <div className="w-4 h-4 flex items-center justify-center text-gray-600 font-bold">+</div>
                      ) : (
                        config && <config.icon className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-xs font-medium">{config?.label || "More"}</span>
                    {status === "complete" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-2 h-2 text-white" />
                      </div>
                    )}
                    {status === "incomplete" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="personal" className="p-6 m-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className={cn("p-3 rounded-xl", sectionConfig.personal.lightColor)}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Personal Information</h3>
                  <p className="text-sm text-gray-600">Your basic contact details and summary</p>
                </div>
              </div>
              <PersonalSection
                data={resumeData.personal}
                onChange={handlePersonalChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="education" className="p-6 m-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className={cn("p-3 rounded-xl", sectionConfig.education.lightColor)}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Education</h3>
                  <p className="text-sm text-gray-600">Your academic background and qualifications</p>
                </div>
              </div>
              <EducationSection
                data={resumeData.sections.education}
                onChange={(data) => handleNestedSectionChange("education", data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="experience" className="p-6 m-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className={cn("p-3 rounded-xl", sectionConfig.experience.lightColor)}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Work Experience</h3>
                  <p className="text-sm text-gray-600">Your professional work history</p>
                </div>
              </div>
              <ExperienceSection
                data={resumeData.sections.experience}
                onChange={(data) => handleNestedSectionChange("experience", data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="skills" className="p-6 m-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className={cn("p-3 rounded-xl", sectionConfig.skills.lightColor)}>
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Skills</h3>
                  <p className="text-sm text-gray-600">Your technical and professional skills</p>
                </div>
              </div>
              <SkillsSection
                data={resumeData.sections.skills}
                onChange={(data) => handleNestedSectionChange("skills", data)}
              />
            </div>
          </TabsContent>

          <TabsContent value="more" className="p-0 m-0">
            <Tabs
              value={nestedTabValue}
              onValueChange={handleNestedTabChange}
              className="flex-1 flex flex-col"
            >
              <div className="px-6 py-4 border-b bg-gray-50/50">
                <TabsList className="w-full h-auto p-1 bg-white/80 backdrop-blur-sm justify-start overflow-x-auto flex space-x-1">
                  {nestedSections.map((section) => {
                    const config = sectionConfig[section as keyof typeof sectionConfig];
                    const isActive = nestedTabValue === section;
                    
                    return (
                      <TabsTrigger
                        key={section}
                        value={section}
                        className={cn(
                          "data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-4 py-2 transition-all duration-200",
                          isActive && "scale-105"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <config.icon className="h-4 w-4" />
                          <span className="font-medium">{config.label}</span>
                        </div>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {nestedSections.map((section) => {
                const config = sectionConfig[section as keyof typeof sectionConfig];
                
                return (
                  <TabsContent key={section} value={section} className="p-6 m-0">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={cn("p-3 rounded-xl", config.lightColor)}>
                          <config.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{config.label}</h3>
                          <p className="text-sm text-gray-600">{config.description}</p>
                        </div>
                      </div>
                      
                      {section === "projects" && (
                        <ProjectsSection
                          data={resumeData.sections.projects}
                          onChange={(data) => handleNestedSectionChange("projects", data)}
                        />
                      )}
                      {section === "certifications" && (
                        <CertificationsSection
                          data={resumeData.sections.certifications}
                          onChange={(data) => handleNestedSectionChange("certifications", data)}
                        />
                      )}
                      {section === "languages" && (
                        <LanguagesSection
                          data={resumeData.sections.languages}
                          onChange={(data) => handleNestedSectionChange("languages", data)}
                        />
                      )}
                      {section === "interests" && (
                        <InterestsSection
                          data={resumeData.sections.interests}
                          onChange={(data) => handleNestedSectionChange("interests", data)}
                        />
                      )}
                      {section === "references" && (
                        <ReferencesSection
                          data={resumeData.sections.references}
                          onChange={(data) => handleNestedSectionChange("references", data)}
                        />
                      )}
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </TabsContent>
        </div>
      </Tabs>

      {/* Enhanced AI Assistant Card */}
      <div className="p-6 border-t bg-gradient-to-r from-blue-50 to-purple-50">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    AI Assistant
                    <Badge variant="secondary" className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Smart
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Get AI-powered suggestions to improve your resume
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            {showAiSuggestions ? (
              <AiSuggestions
                resumeData={resumeData}
                onClose={() => setShowAiSuggestions(false)}
              />
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Let AI help you improve your resume content and boost your chances of getting noticed by recruiters.
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowAiSuggestions(true)}
                    className="group flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-700 rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    <Zap className="h-4 w-4" />
                    <span className="text-xs font-medium">Improve Summary</span>
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  
                  <button
                    onClick={() => setShowAiSuggestions(true)}
                    className="group flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 text-purple-700 rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-medium">Enhance Jobs</span>
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
                
                <button
                  onClick={() => setShowAiSuggestions(true)}
                  className="group w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 text-green-700 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <Target className="h-4 w-4" />
                  <span className="text-xs font-medium">Optimize Keywords</span>
                  <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}