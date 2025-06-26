// "use client";

// import { useState } from "react";
// import { ResumeData } from "@/lib/types";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import {
//   User,
//   Briefcase,
//   GraduationCap,
//   Code,
//   FolderOpen,
//   Award,
//   Globe,
//   Heart,
//   Users,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   FileCheck,
//   Save,
//   Loader2
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { PersonalSection } from "./sections/personal-section";
// import { ExperienceSection } from "./sections/experience-section";
// import { EducationSection } from "./sections/education-section";
// import { SkillsSection } from "./sections/skills-section";
// import { ProjectsSection } from "./sections/projects-section";
// import { CertificationsSection } from "./sections/certifications-section";
// import { LanguagesSection } from "./sections/languages-section";
// import { InterestsSection } from "./sections/interests-section";
// import { ReferencesSection } from "./sections/references-section";
// import { AiSuggestions } from "./ai-suggestions";
// import { AtsChecker } from "./ats-checker";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// interface EditorSidebarProps {
//   resumeData: ResumeData;
//   activeSection: string;
//   onSectionChange: (section: string) => void;
//   onDataChange: (sectionKey: string, data: any) => void;
//   handleNestedDataChange: (sectionKey: string, data: any) => void;
//   collapsed?: boolean;
//   onToggleCollapse?: () => void;
//   isSaving?: boolean;
//   lastSaved?: Date | null;
//   hasUnsavedChanges?: boolean;
//   onSave?: () => void;
// }

// const sectionConfig = [
//   {
//     id: "personal",
//     label: "Personal Info",
//     icon: User,
//     color: "text-blue-600",
//     bgColor: "bg-blue-50 hover:bg-blue-100",
//     borderColor: "border-blue-200",
//   },
//   {
//     id: "experience",
//     label: "Experience",
//     icon: Briefcase,
//     color: "text-green-600",
//     bgColor: "bg-green-50 hover:bg-green-100",
//     borderColor: "border-green-200",
//   },
//   {
//     id: "education",
//     label: "Education",
//     icon: GraduationCap,
//     color: "text-purple-600",
//     bgColor: "bg-purple-50 hover:bg-purple-100",
//     borderColor: "border-purple-200",
//   },
//   {
//     id: "skills",
//     label: "Skills",
//     icon: Code,
//     color: "text-orange-600",
//     bgColor: "bg-orange-50 hover:bg-orange-100",
//     borderColor: "border-orange-200",
//   },
//   {
//     id: "projects",
//     label: "Projects",
//     icon: FolderOpen,
//     color: "text-teal-600",
//     bgColor: "bg-teal-50 hover:bg-teal-100",
//     borderColor: "border-teal-200",
//   },
//   {
//     id: "certifications",
//     label: "Certifications",
//     icon: Award,
//     color: "text-yellow-600",
//     bgColor: "bg-yellow-50 hover:bg-yellow-100",
//     borderColor: "border-yellow-200",
//   },
//   {
//     id: "languages",
//     label: "Languages",
//     icon: Globe,
//     color: "text-indigo-600",
//     bgColor: "bg-indigo-50 hover:bg-indigo-100",
//     borderColor: "border-indigo-200",
//   },
//   {
//     id: "interests",
//     label: "Interests",
//     icon: Heart,
//     color: "text-pink-600",
//     bgColor: "bg-pink-50 hover:bg-pink-100",
//     borderColor: "border-pink-200",
//   },
//   {
//     id: "references",
//     label: "References",
//     icon: Users,
//     color: "text-gray-600",
//     bgColor: "bg-gray-50 hover:bg-gray-100",
//     borderColor: "border-gray-200",
//   },
// ];

// export function EditorSidebar({
//   resumeData,
//   activeSection,
//   onSectionChange,
//   onDataChange,
//   handleNestedDataChange,
//   collapsed = false,
//   onToggleCollapse,
//   isSaving = false,
//   lastSaved,
//   hasUnsavedChanges = false,
//   onSave
// }: EditorSidebarProps) {
//   const [showAI, setShowAI] = useState(false);
//   const [showATS, setShowATS] = useState(false);

//   const renderSectionContent = () => {
//     switch (activeSection) {
//       case "personal":
//         return (
//           <PersonalSection
//             data={resumeData.personal}
//             onChange={(data) => onDataChange("personal", data)}
//           />
//         );
//       case "experience":
//         return (
//           <ExperienceSection
//             data={resumeData.sections.experience}
//             onChange={(data) => handleNestedDataChange("experience", data)}
//           />
//         );
//       case "education":
//         return (
//           <EducationSection
//             data={resumeData.sections.education}
//             onChange={(data) => handleNestedDataChange("education", data)}
//           />
//         );
//       case "skills":
//         return (
//           <SkillsSection
//             data={resumeData.sections.skills}
//             onChange={(data) => handleNestedDataChange("skills", data)}
//           />
//         );
//       case "projects":
//         return (
//           <ProjectsSection
//             data={resumeData.sections.projects}
//             onChange={(data) => handleNestedDataChange("projects", data)}
//           />
//         );
//       case "certifications":
//         return (
//           <CertificationsSection
//             data={resumeData.sections.certifications}
//             onChange={(data) => handleNestedDataChange("certifications", data)}
//           />
//         );
//       case "languages":
//         return (
//           <LanguagesSection
//             data={resumeData.sections.languages}
//             onChange={(data) => handleNestedDataChange("languages", data)}
//           />
//         );
//       case "interests":
//         return (
//           <InterestsSection
//             data={resumeData.sections.interests}
//             onChange={(data) => handleNestedDataChange("interests", data)}
//           />
//         );
//       case "references":
//         return (
//           <ReferencesSection
//             data={resumeData.sections.references}
//             onChange={(data) => handleNestedDataChange("references", data)}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   if (collapsed) {
//     return (
//       <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-2">
//         {sectionConfig.map((section) => {
//           const Icon = section.icon;
//           const isActive = activeSection === section.id;
          
//           return (
//             <Button
//               key={section.id}
//               variant="ghost"
//               size="icon"
//               className={cn(
//                 "w-12 h-12 rounded-lg transition-all duration-200",
//                 isActive
//                   ? `${section.bgColor} ${section.color} border ${section.borderColor}`
//                   : "hover:bg-gray-100"
//               )}
//               onClick={() => onSectionChange(section.id)}
//               title={section.label}
//             >
//               <Icon className="h-5 w-5" />
//             </Button>
//           );
//         })}
//       </div>
//     );
//   }

//   return (
//     <div className="w-[440px] bg-white border-r border-gray-200 flex flex-col h-full">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold text-gray-900">Resume Editor</h2>
//           <div className="flex items-center gap-2">
//             {/* Save Status */}
//             <div className="flex items-center gap-2 text-xs text-gray-500">
//               {isSaving ? (
//                 <>
//                   <Loader2 className="h-3 w-3 animate-spin" />
//                   <span>Saving...</span>
//                 </>
//               ) : hasUnsavedChanges ? (
//                 <>
//                   <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                   <span>Unsaved changes</span>
//                 </>
//               ) : lastSaved ? (
//                 <>
//                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                   <span>Saved {lastSaved.toLocaleTimeString()}</span>
//                 </>
//               ) : null}
//             </div>
            
//             {onSave && (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={onSave}
//                 disabled={isSaving || !hasUnsavedChanges}
//                 className="h-8 px-2"
//               >
//                 <Save className="h-4 w-4" />
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* AI Tools */}
//         <div className="flex gap-2">
//           <Dialog open={showAI} onOpenChange={setShowAI}>
//             <DialogTrigger asChild>
//               <Button variant="outline" size="sm" className="flex-1">
//                 <Sparkles className="h-4 w-4 mr-2" />
//                 AI Assist
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-lg">
//               <DialogHeader>
//                 <DialogTitle>AI Content Suggestions</DialogTitle>
//               </DialogHeader>
//               <AiSuggestions
//                 resumeData={resumeData}
//                 onClose={() => setShowAI(false)}
//               />
//             </DialogContent>
//           </Dialog>

//           <Dialog open={showATS} onOpenChange={setShowATS}>
//             <DialogTrigger asChild>
//               <Button variant="outline" size="sm" className="flex-1">
//                 <FileCheck className="h-4 w-4 mr-2" />
//                 ATS Check
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-lg">
//               <DialogHeader>
//                 <DialogTitle>ATS Compatibility Check</DialogTitle>
//               </DialogHeader>
//               <AtsChecker
//                 resumeData={resumeData}
//                 onClose={() => setShowATS(false)}
//               />
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* Section Navigation */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="grid grid-cols-2 gap-2">
//           {sectionConfig.map((section) => {
//             const Icon = section.icon;
//             const isActive = activeSection === section.id;
//             const sectionData = resumeData.sections[section.id as keyof typeof resumeData.sections];
//             const isVisible = sectionData && typeof sectionData === 'object' && 'visible' in sectionData 
//               ? sectionData.visible 
//               : true;

//             return (
//               <Button
//                 key={section.id}
//                 variant="ghost"
//                 className={cn(
//                   "justify-start h-auto py-3 px-3 transition-all duration-200",
//                   isActive
//                     ? `${section.bgColor} ${section.color} border ${section.borderColor}`
//                     : "hover:bg-gray-50"
//                 )}
//                 onClick={() => onSectionChange(section.id)}
//               >
//                 <div className="flex items-center w-full">
//                   <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
//                   <div className="flex-1 text-left">
//                     <div className="text-sm font-medium">{section.label}</div>
//                     {!isVisible && (
//                       <Badge variant="secondary" className="text-xs mt-1">
//                         Hidden
//                       </Badge>
//                     )}
//                   </div>
//                 </div>
//               </Button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Section Content */}
//       <ScrollArea className="flex-1">
//         <div className="p-4">
//           {renderSectionContent()}
//         </div>
//       </ScrollArea>
//     </div>
//   );
// }


// // // "use client";

// // // import React, { useState, useMemo } from "react";
// // // import { Tabs, TabsContent } from "@/components/ui/tabs";
// // // import { Progress } from "@/components/ui/progress";
// // // import { PersonalSection } from "@/components/builder/sections/personal-section";
// // // import { EducationSection } from "@/components/builder/sections/education-section";
// // // import { ExperienceSection } from "@/components/builder/sections/experience-section";
// // // import { SkillsSection } from "@/components/builder/sections/skills-section";
// // // import { ProjectsSection } from "@/components/builder/sections/projects-section";
// // // import { CertificationsSection } from "@/components/builder/sections/certifications-section";
// // // import { LanguagesSection } from "@/components/builder/sections/languages-section";
// // // import { InterestsSection } from "@/components/builder/sections/interests-section";
// // // import { ReferencesSection } from "@/components/builder/sections/references-section";
// // // import { AiSuggestions } from "@/components/builder/ai-suggestions";
// // // import { ResumeData } from "@/lib/types";
// // // import {
// // //   User,
// // //   GraduationCap,
// // //   Briefcase,
// // //   Code,
// // //   Lightbulb,
// // //   Award,
// // //   Globe,
// // //   Heart,
// // //   UserCheck,
// // //   Brain,
// // //   CheckCircle2,
// // //   AlertCircle,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   Sparkles,
// // //   TrendingUp,
// // //   Target,
// // //   Rocket,
// // // } from "lucide-react";
// // // import { cn } from "@/lib/utils";

// // // interface EditorSidebarProps {
// // //   resumeData: ResumeData;
// // //   activeSection: string;
// // //   onSectionChange: (section: string) => void;
// // //   onDataChange: (sectionKey: string, data: any) => void;
// // //   handleNestedDataChange: (sectionKey: string, data: any) => void;
// // // }

// // // const SECTIONS = [
// // //   {
// // //     key: "personal",
// // //     icon: User,
// // //     label: "Personal",
// // //     description: "Your basic contact details",
// // //   },
// // //   {
// // //     key: "education",
// // //     icon: GraduationCap,
// // //     label: "Education",
// // //     description: "Your academic background",
// // //   },
// // //   {
// // //     key: "experience",
// // //     icon: Briefcase,
// // //     label: "Experience",
// // //     description: "Your work history",
// // //   },
// // //   {
// // //     key: "skills",
// // //     icon: Code,
// // //     label: "Skills",
// // //     description: "Your technical skills",
// // //   },
// // //   {
// // //     key: "projects",
// // //     icon: Lightbulb,
// // //     label: "Projects",
// // //     description: "Your portfolio items",
// // //   },
// // //   {
// // //     key: "certifications",
// // //     icon: Award,
// // //     label: "Certifications",
// // //     description: "Your professional credentials",
// // //   },
// // //   {
// // //     key: "languages",
// // //     icon: Globe,
// // //     label: "Languages",
// // //     description: "Your language proficiencies",
// // //   },
// // //   {
// // //     key: "interests",
// // //     icon: Heart,
// // //     label: "Interests",
// // //     description: "Your personal interests",
// // //   },
// // //   {
// // //     key: "references",
// // //     icon: UserCheck,
// // //     label: "References",
// // //     description: "Your professional references",
// // //   },
// // //   {
// // //     key: "ai",
// // //     icon: Brain,
// // //     label: "AI Assistant",
// // //     description: "Get AI-powered suggestions",
// // //   },
// // // ] as const;

// // // function getStatus(
// // //   key: string,
// // //   resumeData: ResumeData
// // // ): "complete" | "incomplete" | "optional" {
// // //   switch (key) {
// // //     case "personal":
// // //       return resumeData.personal.name && resumeData.personal.email
// // //         ? "complete"
// // //         : "incomplete";
// // //     case "experience":
// // //       return resumeData.sections.experience.items?.length
// // //         ? "complete"
// // //         : "incomplete";
// // //     case "education":
// // //       return resumeData.sections.education.items?.length
// // //         ? "complete"
// // //         : "incomplete";
// // //     case "skills":
// // //       return resumeData.sections.skills.groups?.length
// // //         ? "complete"
// // //         : "incomplete";
// // //     default:
// // //       return "optional";
// // //   }
// // // }

// // // const COLLAPSED_WIDTH = "w-16";
// // // const EXPANDED_WIDTH = "w-80";

// // // export function EditorSidebar({
// // //   resumeData,
// // //   activeSection,
// // //   onSectionChange,
// // //   onDataChange,
// // //   handleNestedDataChange,
// // // }: EditorSidebarProps) {
// // //   const [showAi, setShowAi] = useState(false);
// // //   const [collapsed, setCollapsed] = useState(false);

// // //   const completion = useMemo(() => {
// // //     let done = 0,
// // //       total = 0;
// // //     // personal bits
// // //     total += 5;
// // //     if (resumeData.personal.name) done++;
// // //     if (resumeData.personal.title) done++;
// // //     if (resumeData.personal.email) done++;
// // //     if (resumeData.personal.phone) done++;
// // //     if (resumeData.personal.summary) done++;
// // //     // core sections
// // //     total += 3;
// // //     if (resumeData.sections.experience.items?.length) done++;
// // //     if (resumeData.sections.education.items?.length) done++;
// // //     if (resumeData.sections.skills.groups?.length) done++;
// // //     return Math.round((done / total) * 100);
// // //   }, [resumeData]);

// // //   return (
// // //     <div className="relative flex h-full">
// // //       {/* Sidebar */}
// // //       <div
// // //         className={cn(
// // //           "flex flex-col bg-white border-r shadow-sm overflow-hidden transition-all",
// // //           collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH
// // //         )}
// // //       >
// // //         {/* Header */}
// // //         <div
// // //           className={cn(
// // //             "flex items-center bg-white border-b transition-all",
// // //             collapsed ? "justify-center px-2 py-4" : "justify-between px-6 py-4"
// // //           )}
// // //         >
// // //           <div className="flex items-center gap-3">
// // //             <div className="p-2 bg-blue-500 rounded-xl shadow-sm">
// // //               <Rocket className="w-5 h-5 text-white" />
// // //             </div>
// // //             {!collapsed && (
// // //               <div>
// // //                 <h2 className="text-lg font-semibold">Resume Builder</h2>
// // //                 <p className="text-sm text-gray-500">
// // //                   Build your perfect resume
// // //                 </p>
// // //               </div>
// // //             )}
// // //           </div>
// // //           {!collapsed && (
// // //             <div className="text-right">
// // //               <div className="text-xl font-bold">{completion}%</div>
// // //               <div className="text-xs text-gray-500">Complete</div>
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Progress */}
// // //         {!collapsed && (
// // //           <div className="px-6 py-2">
// // //             <Progress
// // //               value={completion ?? 0}
// // //               className="h-2 bg-gray-200 rounded-full shadow-inner"
// // //               max={100}
// // //             />
// // //             <div className="flex justify-between text-xs text-gray-500 mt-1">
// // //               <span>Getting started</span>
// // //               <span>Ready to export</span>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Navigation */}
// // //         <nav
// // //           className={cn(
// // //             "flex-1 overflow-y-auto transition-all",
// // //             collapsed ? "px-2 py-4" : "px-4 py-6 space-y-3"
// // //           )}
// // //         >
// // //           {SECTIONS.map((sec) => {
// // //             const status = getStatus(sec.key, resumeData);
// // //             const isActive = activeSection === sec.key;
// // //             return (
// // //               <button
// // //                 key={sec.key}
// // //                 onClick={() => {
// // //                   setCollapsed(false);
// // //                   setShowAi(false);
// // //                   onSectionChange(sec.key);
// // //                 }}
// // //                 className={cn(
// // //                   "flex items-center rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all",
// // //                   isActive
// // //                     ? "bg-white shadow-sm border-l-4 border-blue-500"
// // //                     : "border-l-4 border-transparent hover:bg-gray-50",
// // //                   collapsed ? "justify-center p-2" : "justify-start gap-3 p-3"
// // //                 )}
// // //               >
// // //                 <sec.icon
// // //                   className={cn(
// // //                     "transition-colors",
// // //                     isActive ? "text-blue-500" : "text-gray-600"
// // //                   )}
// // //                 />
// // //                 {!collapsed && (
// // //                   <>
// // //                     <div className="flex-1 text-left">
// // //                       <div className="font-medium text-gray-800">
// // //                         {sec.label}
// // //                       </div>
// // //                       <div className="text-xs text-gray-500">
// // //                         {sec.description}
// // //                       </div>
// // //                     </div>
// // //                     {status === "complete" && (
// // //                       <CheckCircle2 className="w-4 h-4 text-green-500" />
// // //                     )}
// // //                     {status === "incomplete" && (
// // //                       <AlertCircle className="w-4 h-4 text-orange-500" />
// // //                     )}
// // //                   </>
// // //                 )}
// // //               </button>
// // //             );
// // //           })}
// // //         </nav>

// // //         {/* Collapse Toggle */}
// // //         <div className="border-t">
// // //           <button
// // //             onClick={() => setCollapsed((c) => !c)}
// // //             className={cn(
// // //               "w-full flex items-center justify-center gap-2 py-3 focus:outline-none hover:bg-gray-100 transition-all",
// // //               collapsed ? "" : "px-4"
// // //             )}
// // //           >
// // //             {collapsed ? (
// // //               <ChevronRight className="w-5 h-5 text-gray-600" />
// // //             ) : (
// // //               <>
// // //                 <ChevronLeft className="w-5 h-5 text-gray-600" />
// // //                 <span className="text-sm text-gray-600">Collapse</span>
// // //               </>
// // //             )}
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="flex-1 overflow-y-auto">
// // //         <Tabs value={activeSection} onValueChange={onSectionChange}>
// // //           {/* ——— Personal ——— */}
// // //           <TabsContent value="personal" className="p-6 space-y-6">
// // //             <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
// // //               <div className="p-3 bg-blue-500 rounded-lg">
// // //                 <User className="w-6 h-6 text-white" />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-lg font-semibold text-gray-800">
// // //                   Personal Information
// // //                 </h3>
// // //                 <p className="text-sm text-gray-600">Tell us about yourself</p>
// // //               </div>
// // //             </div>
// // //             <PersonalSection
// // //               data={resumeData.personal}
// // //               onChange={(d) => onDataChange("personal", d)}
// // //             />
// // //           </TabsContent>

// // //           {/* ——— Education ——— */}
// // //           <TabsContent value="education" className="p-6 space-y-6">
// // //             <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
// // //               <div className="p-3 bg-emerald-500 rounded-lg">
// // //                 <GraduationCap className="w-6 h-6 text-white" />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-lg font-semibold text-gray-800">
// // //                   Education
// // //                 </h3>
// // //                 <p className="text-sm text-gray-600">
// // //                   Your academic achievements
// // //                 </p>
// // //               </div>
// // //             </div>
// // //             <EducationSection
// // //               data={resumeData.sections.education}
// // //               onChange={(d) => handleNestedDataChange("education", d)}
// // //             />
// // //           </TabsContent>

// // //           {/* ——— Experience ——— */}
// // //           <TabsContent value="experience" className="p-6 space-y-6">
// // //             <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
// // //               <div className="p-3 bg-purple-500 rounded-lg">
// // //                 <Briefcase className="w-6 h-6 text-white" />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-lg font-semibold text-gray-800">
// // //                   Work Experience
// // //                 </h3>
// // //                 <p className="text-sm text-gray-600">
// // //                   Your professional journey
// // //                 </p>
// // //               </div>
// // //             </div>
// // //             <ExperienceSection
// // //               data={resumeData.sections.experience}
// // //               onChange={(d) => handleNestedDataChange("experience", d)}
// // //             />
// // //           </TabsContent>

// // //           {/* ——— Skills ——— */}
// // //           <TabsContent value="skills" className="p-6 space-y-6">
// // //             <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
// // //               <div className="p-3 bg-orange-500 rounded-lg">
// // //                 <Code className="w-6 h-6 text-white" />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-lg font-semibold text-gray-800">
// // //                   Skills & Expertise
// // //                 </h3>
// // //                 <p className="text-sm text-gray-600">What you’re great at</p>
// // //               </div>
// // //             </div>
// // //             <SkillsSection
// // //               data={resumeData.sections.skills}
// // //               onChange={(d) => handleNestedDataChange("skills", d)}
// // //             />
// // //           </TabsContent>

// // //           {/* ——— AI Assistant ——— */}
// // //           <TabsContent value="ai" className="p-6 space-y-6">
// // //             <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl border border-violet-100">
// // //               <div className="p-3 bg-violet-500 rounded-lg">
// // //                 <Brain className="w-6 h-6 text-white" />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-lg font-semibold text-gray-800">
// // //                   AI Assistant
// // //                 </h3>
// // //                 <p className="text-sm text-gray-600">
// // //                   Let AI enhance your resume
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             {showAi ? (
// // //               <AiSuggestions
// // //                 resumeData={resumeData}
// // //                 onClose={() => setShowAi(false)}
// // //               />
// // //             ) : (
// // //               <div className="space-y-4">
// // //                 <p className="text-gray-600 leading-relaxed">
// // //                   Get personalized suggestions to make your resume stand out
// // //                   from the crowd.
// // //                 </p>
// // //                 <div className="grid gap-3">
// // //                   <button
// // //                     onClick={() => setShowAi(true)}
// // //                     className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition"
// // //                   >
// // //                     <div className="p-2 bg-blue-500 rounded-lg">
// // //                       <Sparkles className="w-5 h-5 text-white" />
// // //                     </div>
// // //                     <div className="text-left">
// // //                       <div className="font-semibold text-blue-800">
// // //                         Improve Summary
// // //                       </div>
// // //                       <div className="text-sm text-blue-600">
// // //                         Make it more compelling
// // //                       </div>
// // //                     </div>
// // //                   </button>
// // //                   <button
// // //                     onClick={() => setShowAi(true)}
// // //                     className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition"
// // //                   >
// // //                     <div className="p-2 bg-purple-500 rounded-lg">
// // //                       <TrendingUp className="w-5 h-5 text-white" />
// // //                     </div>
// // //                     <div className="text-left">
// // //                       <div className="font-semibold text-purple-800">
// // //                         Enhance Experience
// // //                       </div>
// // //                       <div className="text-sm text-purple-600">
// // //                         Highlight achievements
// // //                       </div>
// // //                     </div>
// // //                   </button>
// // //                   <button
// // //                     onClick={() => setShowAi(true)}
// // //                     className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition"
// // //                   >
// // //                     <div className="p-2 bg-green-500 rounded-lg">
// // //                       <Target className="w-5 h-5 text-white" />
// // //                     </div>
// // //                     <div className="text-left">
// // //                       <div className="font-semibold text-green-800">
// // //                         Optimize Keywords
// // //                       </div>
// // //                       <div className="text-sm text-green-600">
// // //                         Beat ATS systems
// // //                       </div>
// // //                     </div>
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </TabsContent>

// // //           {/* ——— Projects ——— */}
// // //           <TabsContent value="projects" className="p-6 space-y-6">
// // //             <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
// // //               <div className="p-3 bg-yellow-500 rounded-lg">
// // //                 <Lightbulb className="w-6 h-6 text-white" />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-lg font-semibold text-gray-800">
// // //                   Projects
// // //                 </h3>
// // //                 <p className="text-sm text-gray-600">Your portfolio items</p>
// // //               </div>
// // //             </div>
// // //             <ProjectsSection
// // //               data={resumeData.sections.projects}
// // //               onChange={(d) => handleNestedDataChange("projects", d)}
// // //             />
// // //           </TabsContent>

// // //           {/* ——— Certifications ——— */}
// // //           <TabsContent value="certifications" className="p-6 space-y-6">
// // //             <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
// // //               <div className="p-3 bg-red-500 rounded-lg">
// // //                 <Award className="w-6 h-6 text-white" />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-lg font-semibold text-gray-800">
// // //                   Certifications
// // //                 </h3>
// // //                 <p className="text-sm text-gray-600">
// // //                   Your professional credentials
// // //                 </p>
// // //               </div>
// // //             </div>
// // //             <CertificationsSection
// // //               data={resumeData.sections.certifications}
// // //               onChange={(d) => handleNestedDataChange("certifications", d)}
// // //             />
// // //           </TabsContent>

// // //           {/* ——— Languages ——— */}
// // //           <TabsContent value="languages" className="p-6 space-y-6">
// // //             <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
// // //               <div className="p-3 bg-teal-500 rounded-lg">
// // //                 <Globe className="w-6 h-6 text-white" />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-lg font-semibold text-gray-800">
// // //                   Languages
// // //                 </h3>
// // //                 <p className="text-sm text-gray-600">
// // //                   Your language proficiencies
// // //                 </p>
// // //               </div>
// // //             </div>
// // //             <LanguagesSection
// // //               data={resumeData.sections.languages}
// // //               onChange={(d) => handleNestedDataChange("languages", d)}
// // //             />
// // //           </TabsContent>

// // //           {/* ——— Interests ——— */}
// // //           <TabsContent value="interests" className="p-6 space-y-6">
// // //             <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl border border-pink-100">
// // //               <div className="p-3 bg-pink-500 rounded-lg">
// // //                 <Heart className="w-6 h-6 text-white" />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-lg font-semibold text-gray-800">
// // //                   Interests
// // //                 </h3>
// // //                 <p className="text-sm text-gray-600">Your personal interests</p>
// // //               </div>
// // //             </div>
// // //             <InterestsSection
// // //               data={resumeData.sections.interests}
// // //               onChange={(d) => handleNestedDataChange("interests", d)}
// // //             />
// // //           </TabsContent>

// // //           {/* ——— References ——— */}
// // //           <TabsContent value="references" className="p-6 space-y-6">
// // //             <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
// // //               <div className="p-3 bg-indigo-500 rounded-lg">
// // //                 <UserCheck className="w-6 h-6 text-white" />
// // //               </div>
// // //               <div>
// // //                 <h3 className="text-lg font-semibold text-gray-800">
// // //                   References
// // //                 </h3>
// // //                 <p className="text-sm text-gray-600">
// // //                   Your professional references
// // //                 </p>
// // //               </div>
// // //             </div>
// // //             <ReferencesSection
// // //               data={resumeData.sections.references}
// // //               onChange={(d) => handleNestedDataChange("references", d)}
// // //             />
// // //           </TabsContent>
// // //         </Tabs>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React, { useState, useMemo, useRef, useEffect } from "react";
// // import { Tabs, TabsContent } from "@/components/ui/tabs";
// // import { Progress } from "@/components/ui/progress";
// // import { PersonalSection } from "@/components/builder/sections/personal-section";
// // import { EducationSection } from "@/components/builder/sections/education-section";
// // import { ExperienceSection } from "@/components/builder/sections/experience-section";
// // import { SkillsSection } from "@/components/builder/sections/skills-section";
// // import { ProjectsSection } from "@/components/builder/sections/projects-section";
// // import { CertificationsSection } from "@/components/builder/sections/certifications-section";
// // import { LanguagesSection } from "@/components/builder/sections/languages-section";
// // import { InterestsSection } from "@/components/builder/sections/interests-section";
// // import { ReferencesSection } from "@/components/builder/sections/references-section";
// // import { AiSuggestions } from "@/components/builder/ai-suggestions";
// // import { ResumeData } from "@/lib/types";
// // import {
// //   User,
// //   GraduationCap,
// //   Briefcase,
// //   Code,
// //   Lightbulb,
// //   Award,
// //   Globe,
// //   Heart,
// //   UserCheck,
// //   Brain,
// //   CheckCircle2,
// //   AlertCircle,
// //   ChevronLeft,
// //   ChevronRight,
// //   Sparkles,
// //   TrendingUp,
// //   Target,
// //   Rocket,
// //   Menu,
// //   X,
// // } from "lucide-react";
// // import { cn } from "@/lib/utils";

// // interface EditorSidebarProps {
// //   resumeData: ResumeData;
// //   activeSection: string;
// //   onSectionChange: (section: string) => void;
// //   onDataChange: (sectionKey: string, data: any) => void;
// //   handleNestedDataChange: (sectionKey: string, data: any) => void;
// // }

// // const SECTIONS = [
// //   {
// //     key: "personal",
// //     icon: User,
// //     label: "Personal",
// //     description: "Your basic contact details",
// //     color: "blue",
// //     required: true,
// //   },
// //   {
// //     key: "education",
// //     icon: GraduationCap,
// //     label: "Education",
// //     description: "Your academic background",
// //     color: "emerald",
// //     required: true,
// //   },
// //   {
// //     key: "experience",
// //     icon: Briefcase,
// //     label: "Experience",
// //     description: "Your work history",
// //     color: "purple",
// //     required: true,
// //   },
// //   {
// //     key: "skills",
// //     icon: Code,
// //     label: "Skills",
// //     description: "Your technical skills",
// //     color: "orange",
// //     required: true,
// //   },
// //   {
// //     key: "projects",
// //     icon: Lightbulb,
// //     label: "Projects",
// //     description: "Your portfolio items",
// //     color: "yellow",
// //     required: false,
// //   },
// //   {
// //     key: "certifications",
// //     icon: Award,
// //     label: "Certifications",
// //     description: "Your professional credentials",
// //     color: "red",
// //     required: false,
// //   },
// //   {
// //     key: "languages",
// //     icon: Globe,
// //     label: "Languages",
// //     description: "Your language proficiencies",
// //     color: "teal",
// //     required: false,
// //   },
// //   {
// //     key: "interests",
// //     icon: Heart,
// //     label: "Interests",
// //     description: "Your personal interests",
// //     color: "pink",
// //     required: false,
// //   },
// //   {
// //     key: "references",
// //     icon: UserCheck,
// //     label: "References",
// //     description: "Your professional references",
// //     color: "indigo",
// //     required: false,
// //   },
// //   {
// //     key: "ai",
// //     icon: Brain,
// //     label: "AI Assistant",
// //     description: "Get AI-powered suggestions",
// //     color: "violet",
// //     required: false,
// //   },
// // ] as const;

// // function getStatus(
// //   key: string,
// //   resumeData: ResumeData
// // ): "complete" | "incomplete" | "optional" {
// //   switch (key) {
// //     case "personal":
// //       return resumeData.personal.name && resumeData.personal.email
// //         ? "complete"
// //         : "incomplete";
// //     case "experience":
// //       return resumeData.sections.experience.items?.length
// //         ? "complete"
// //         : "incomplete";
// //     case "education":
// //       return resumeData.sections.education.items?.length
// //         ? "complete"
// //         : "incomplete";
// //     case "skills":
// //       return resumeData.sections.skills.groups?.length
// //         ? "complete"
// //         : "incomplete";
// //     default:
// //       return "optional";
// //   }
// // }

// // export function EditorSidebar({
// //   resumeData,
// //   activeSection,
// //   onSectionChange,
// //   onDataChange,
// //   handleNestedDataChange,
// // }: EditorSidebarProps) {
// //   const [showAi, setShowAi] = useState(false);
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const sidebarRef = useRef<HTMLDivElement>(null);
// //   const activeItemRef = useRef<HTMLButtonElement>(null);

// //   // Auto-scroll to active item when section changes
// //   useEffect(() => {
// //     if (activeItemRef.current && !collapsed) {
// //       activeItemRef.current.scrollIntoView({
// //         behavior: "smooth",
// //         block: "nearest",
// //       });
// //     }
// //   }, [activeSection, collapsed]);

// //   // Close mobile sidebar when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (
// //         sidebarRef.current &&
// //         !sidebarRef.current.contains(event.target as Node) &&
// //         mobileOpen
// //       ) {
// //         setMobileOpen(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, [mobileOpen]);

// //   // Handle keyboard navigation
// //   useEffect(() => {
// //     const handleKeyDown = (event: KeyboardEvent) => {
// //       if (event.key === "Escape" && mobileOpen) {
// //         setMobileOpen(false);
// //       }
// //     };

// //     document.addEventListener("keydown", handleKeyDown);
// //     return () => document.removeEventListener("keydown", handleKeyDown);
// //   }, [mobileOpen]);

// //   const completion = useMemo(() => {
// //     let done = 0,
// //       total = 0;

// //     // Personal bits (weighted more heavily)
// //     total += 8;
// //     if (resumeData.personal.name) done += 2;
// //     if (resumeData.personal.title) done += 1;
// //     if (resumeData.personal.email) done += 2;
// //     if (resumeData.personal.phone) done += 1;
// //     if (resumeData.personal.summary) done += 2;

// //     // Core sections
// //     total += 6;
// //     if (resumeData.sections.experience.items?.length) done += 3;
// //     if (resumeData.sections.education.items?.length) done += 2;
// //     if (resumeData.sections.skills.groups?.length) done += 1;

// //     return Math.round((done / total) * 100);
// //   }, [resumeData]);

// //   const requiredSections = SECTIONS.filter(s => s.required);
// //   const optionalSections = SECTIONS.filter(s => !s.required);

// //   const handleSectionClick = (sectionKey: string) => {
// //     if (sectionKey === "ai") {
// //       setShowAi(true);
// //     } else {
// //       setShowAi(false);
// //     }
// //     onSectionChange(sectionKey);
// //     setMobileOpen(false);
// //   };

// //   const getColorClasses = (color: string, isActive: boolean) => {
// //     const colors = {
// //       blue: isActive ? "bg-blue-50 border-blue-200 text-blue-700" : "hover:bg-blue-50",
// //       emerald: isActive ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "hover:bg-emerald-50",
// //       purple: isActive ? "bg-purple-50 border-purple-200 text-purple-700" : "hover:bg-purple-50",
// //       orange: isActive ? "bg-orange-50 border-orange-200 text-orange-700" : "hover:bg-orange-50",
// //       yellow: isActive ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "hover:bg-yellow-50",
// //       red: isActive ? "bg-red-50 border-red-200 text-red-700" : "hover:bg-red-50",
// //       teal: isActive ? "bg-teal-50 border-teal-200 text-teal-700" : "hover:bg-teal-50",
// //       pink: isActive ? "bg-pink-50 border-pink-200 text-pink-700" : "hover:bg-pink-50",
// //       indigo: isActive ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "hover:bg-indigo-50",
// //       violet: isActive ? "bg-violet-50 border-violet-200 text-violet-700" : "hover:bg-violet-50",
// //     };
// //     return colors[color as keyof typeof colors] || colors.blue;
// //   };

// //   const SidebarContent = () => (
// //     <>
// //       {/* Header */}
// //       <div className="flex-shrink-0 p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center gap-3">
// //             <div className="relative">
// //               <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
// //                 <Rocket className="w-5 h-5 text-white" />
// //               </div>
// //               <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
// //             </div>
// //             {!collapsed && (
// //               <div>
// //                 <h2 className="text-lg font-bold text-gray-800">Resume Builder</h2>
// //                 <p className="text-sm text-gray-600">Build your perfect resume</p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Mobile close button */}
// //           <button
// //             onClick={() => setMobileOpen(false)}
// //             className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
// //           >
// //             <X className="w-5 h-5 text-gray-600" />
// //           </button>
// //         </div>

// //         {/* Progress Section */}
// //         {!collapsed && (
// //           <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border">
// //             <div className="flex items-center justify-between mb-2">
// //               <span className="text-sm font-medium text-gray-700">Progress</span>
// //               <span className="text-2xl font-bold text-gray-800">{completion}%</span>
// //             </div>
// //             <Progress
// //               value={completion}
// //               className="h-2.5 bg-gray-200 rounded-full overflow-hidden"
// //             />
// //             <div className="flex justify-between text-xs text-gray-500 mt-2">
// //               <span>Getting started</span>
// //               <span>Ready to export</span>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Navigation */}
// //       <div className="flex-1 overflow-y-auto overscroll-contain">
// //         <div className="p-4 space-y-6">
// //           {/* Required Sections */}
// //           <div>
// //             {!collapsed && (
// //               <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
// //                 Required Sections
// //               </h3>
// //             )}
// //             <div className="space-y-1">
// //               {requiredSections.map((section) => {
// //                 const status = getStatus(section.key, resumeData);
// //                 const isActive = activeSection === section.key;
// //                 return (
// //                   <button
// //                     key={section.key}
// //                     ref={isActive ? activeItemRef : null}
// //                     onClick={() => handleSectionClick(section.key)}
// //                     className={cn(
// //                       "w-full flex items-center rounded-xl border-2 border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 group",
// //                       collapsed ? "justify-center p-3" : "gap-3 p-3",
// //                       getColorClasses(section.color, isActive),
// //                       isActive && "shadow-md scale-[1.02] border-opacity-100",
// //                       !isActive && "hover:scale-[1.01] hover:shadow-sm"
// //                     )}
// //                   >
// //                     <div className="relative">
// //                       <section.icon
// //                         className={cn(
// //                           "w-5 h-5 transition-all duration-200",
// //                           isActive ? `text-${section.color}-600` : "text-gray-600 group-hover:text-gray-700"
// //                         )}
// //                       />
// //                       {status === "complete" && (
// //                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
// //                       )}
// //                       {status === "incomplete" && (
// //                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
// //                       )}
// //                     </div>

// //                     {!collapsed && (
// //                       <>
// //                         <div className="flex-1 text-left min-w-0">
// //                           <div className="font-semibold text-gray-800 truncate">
// //                             {section.label}
// //                           </div>
// //                           <div className="text-xs text-gray-600 truncate">
// //                             {section.description}
// //                           </div>
// //                         </div>
// //                         <div className="flex items-center gap-1">
// //                           {status === "complete" && (
// //                             <CheckCircle2 className="w-4 h-4 text-green-500" />
// //                           )}
// //                           {status === "incomplete" && (
// //                             <AlertCircle className="w-4 h-4 text-orange-500" />
// //                           )}
// //                           {isActive && (
// //                             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
// //                           )}
// //                         </div>
// //                       </>
// //                     )}
// //                   </button>
// //                 );
// //               })}
// //             </div>
// //           </div>

// //           {/* Optional Sections */}
// //           <div>
// //             {!collapsed && (
// //               <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
// //                 Optional Sections
// //               </h3>
// //             )}
// //             <div className="space-y-1">
// //               {optionalSections.map((section) => {
// //                 const status = getStatus(section.key, resumeData);
// //                 const isActive = activeSection === section.key;
// //                 return (
// //                   <button
// //                     key={section.key}
// //                     ref={isActive ? activeItemRef : null}
// //                     onClick={() => handleSectionClick(section.key)}
// //                     className={cn(
// //                       "w-full flex items-center rounded-xl border-2 border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 group",
// //                       collapsed ? "justify-center p-3" : "gap-3 p-3",
// //                       getColorClasses(section.color, isActive),
// //                       isActive && "shadow-md scale-[1.02] border-opacity-100",
// //                       !isActive && "hover:scale-[1.01] hover:shadow-sm"
// //                     )}
// //                   >
// //                     <div className="relative">
// //                       <section.icon
// //                         className={cn(
// //                           "w-5 h-5 transition-all duration-200",
// //                           isActive ? `text-${section.color}-600` : "text-gray-600 group-hover:text-gray-700"
// //                         )}
// //                       />
// //                       {status === "complete" && (
// //                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
// //                       )}
// //                     </div>

// //                     {!collapsed && (
// //                       <>
// //                         <div className="flex-1 text-left min-w-0">
// //                           <div className="font-semibold text-gray-800 truncate">
// //                             {section.label}
// //                           </div>
// //                           <div className="text-xs text-gray-600 truncate">
// //                             {section.description}
// //                           </div>
// //                         </div>
// //                         <div className="flex items-center gap-1">
// //                           {status === "complete" && (
// //                             <CheckCircle2 className="w-4 h-4 text-green-500" />
// //                           )}
// //                           {isActive && (
// //                             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
// //                           )}
// //                         </div>
// //                       </>
// //                     )}
// //                   </button>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Footer */}
// //       <div className="flex-shrink-0 border-t bg-gray-50">
// //         <button
// //           onClick={() => setCollapsed(!collapsed)}
// //           className="w-full flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
// //         >
// //           {collapsed ? (
// //             <ChevronRight className="w-5 h-5" />
// //           ) : (
// //             <>
// //               <ChevronLeft className="w-5 h-5" />
// //               <span>Collapse</span>
// //             </>
// //           )}
// //         </button>
// //       </div>
// //     </>
// //   );

// //   return (
// //     <div className="relative flex h-full">
// //       {/* Mobile Menu Button */}
// //       <button
// //         onClick={() => setMobileOpen(true)}
// //         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border hover:bg-gray-50 transition-colors"
// //       >
// //         <Menu className="w-5 h-5 text-gray-600" />
// //       </button>

// //       {/* Mobile Overlay */}
// //       {mobileOpen && (
// //         <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" />
// //       )}

// //       {/* Sidebar */}
// //       <div
// //         ref={sidebarRef}
// //         className={cn(
// //           "flex flex-col bg-white border-r shadow-lg transition-all duration-300 ease-in-out z-40",
// //           // Desktop
// //           "hidden md:flex",
// //           collapsed ? "w-20" : "w-80",
// //           // Mobile
// //           "md:relative md:translate-x-0",
// //           mobileOpen && "fixed inset-y-0 left-0 w-80 translate-x-0 md:hidden flex"
// //         )}
// //       >
// //         <SidebarContent />
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 overflow-hidden">
// //         <div className="h-full overflow-y-auto overscroll-contain">
// //           <Tabs value={activeSection} onValueChange={onSectionChange}>
// //             {/* Personal Section */}
// //             <TabsContent value="personal" className="p-6 space-y-6 animate-in fade-in-50 duration-300">
// //               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
// //                 <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
// //                   <User className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
// //                   <p className="text-sm text-gray-600">Tell us about yourself</p>
// //                 </div>
// //               </div>
// //               <PersonalSection
// //                 data={resumeData.personal}
// //                 onChange={(d) => onDataChange("personal", d)}
// //               />
// //             </TabsContent>

// //             {/* Education Section */}
// //             <TabsContent value="education" className="p-6 space-y-6 animate-in fade-in-50 duration-300">
// //               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
// //                 <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg">
// //                   <GraduationCap className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-800">Education</h3>
// //                   <p className="text-sm text-gray-600">Your academic achievements</p>
// //                 </div>
// //               </div>
// //               <EducationSection
// //                 data={resumeData.sections.education}
// //                 onChange={(d) => handleNestedDataChange("education", d)}
// //               />
// //             </TabsContent>

// //             {/* Experience Section */}
// //             <TabsContent value="experience" className="p-6 space-y-6 animate-in fade-in-50 duration-300">
// //               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
// //                 <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
// //                   <Briefcase className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-800">Work Experience</h3>
// //                   <p className="text-sm text-gray-600">Your professional journey</p>
// //                 </div>
// //               </div>
// //               <ExperienceSection
// //                 data={resumeData.sections.experience}
// //                 onChange={(d) => handleNestedDataChange("experience", d)}
// //               />
// //             </TabsContent>

// //             {/* Skills Section */}
// //             <TabsContent value="skills" className="p-6 space-y-6 animate-in fade-in-50 duration-300">
// //               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
// //                 <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
// //                   <Code className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-800">Skills & Expertise</h3>
// //                   <p className="text-sm text-gray-600">What you're great at</p>
// //                 </div>
// //               </div>
// //               <SkillsSection
// //                 data={resumeData.sections.skills}
// //                 onChange={(d) => handleNestedDataChange("skills", d)}
// //               />
// //             </TabsContent>

// //             {/* AI Assistant Section */}
// //             <TabsContent value="ai" className="p-6 space-y-6 animate-in fade-in-50 duration-300">
// //               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-violet-50 to-violet-100 rounded-xl border border-violet-200">
// //                 <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg shadow-lg">
// //                   <Brain className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-800">AI Assistant</h3>
// //                   <p className="text-sm text-gray-600">Let AI enhance your resume</p>
// //                 </div>
// //               </div>

// //               {showAi ? (
// //                 <AiSuggestions
// //                   resumeData={resumeData}
// //                   onClose={() => setShowAi(false)}
// //                 />
// //               ) : (
// //                 <div className="space-y-4">
// //                   <p className="text-gray-600 leading-relaxed">
// //                     Get personalized suggestions to make your resume stand out from the crowd.
// //                   </p>
// //                   <div className="grid gap-3">
// //                     <button
// //                       onClick={() => setShowAi(true)}
// //                       className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
// //                     >
// //                       <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
// //                         <Sparkles className="w-5 h-5 text-white" />
// //                       </div>
// //                       <div className="text-left">
// //                         <div className="font-bold text-blue-800">Improve Summary</div>
// //                         <div className="text-sm text-blue-600">Make it more compelling</div>
// //                       </div>
// //                     </button>
// //                     <button
// //                       onClick={() => setShowAi(true)}
// //                       className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
// //                     >
// //                       <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md">
// //                         <TrendingUp className="w-5 h-5 text-white" />
// //                       </div>
// //                       <div className="text-left">
// //                         <div className="font-bold text-purple-800">Enhance Experience</div>
// //                         <div className="text-sm text-purple-600">Highlight achievements</div>
// //                       </div>
// //                     </button>
// //                     <button
// //                       onClick={() => setShowAi(true)}
// //                       className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
// //                     >
// //                       <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md">
// //                         <Target className="w-5 h-5 text-white" />
// //                       </div>
// //                       <div className="text-left">
// //                         <div className="font-bold text-green-800">Optimize Keywords</div>
// //                         <div className="text-sm text-green-600">Beat ATS systems</div>
// //                       </div>
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </TabsContent>

// //             {/* Projects Section */}
// //             <TabsContent value="projects" className="p-6 space-y-6 animate-in fade-in-50 duration-300">
// //               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
// //                 <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg">
// //                   <Lightbulb className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-800">Projects</h3>
// //                   <p className="text-sm text-gray-600">Your portfolio items</p>
// //                 </div>
// //               </div>
// //               <ProjectsSection
// //                 data={resumeData.sections.projects}
// //                 onChange={(d) => handleNestedDataChange("projects", d)}
// //               />
// //             </TabsContent>

// //             {/* Certifications Section */}
// //             <TabsContent value="certifications" className="p-6 space-y-6 animate-in fade-in-50 duration-300">
// //               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
// //                 <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg">
// //                   <Award className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-800">Certifications</h3>
// //                   <p className="text-sm text-gray-600">Your professional credentials</p>
// //                 </div>
// //               </div>
// //               <CertificationsSection
// //                 data={resumeData.sections.certifications}
// //                 onChange={(d) => handleNestedDataChange("certifications", d)}
// //               />
// //             </TabsContent>

// //             {/* Languages Section */}
// //             <TabsContent value="languages" className="p-6 space-y-6 animate-in fade-in-50 duration-300">
// //               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl border border-teal-200">
// //                 <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg">
// //                   <Globe className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-800">Languages</h3>
// //                   <p className="text-sm text-gray-600">Your language proficiencies</p>
// //                 </div>
// //               </div>
// //               <LanguagesSection
// //                 data={resumeData.sections.languages}
// //                 onChange={(d) => handleNestedDataChange("languages", d)}
// //               />
// //             </TabsContent>

// //             {/* Interests Section */}
// //             <TabsContent value="interests" className="p-6 space-y-6 animate-in fade-in-50 duration-300">
// //               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl border border-pink-200">
// //                 <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg">
// //                   <Heart className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-800">Interests</h3>
// //                   <p className="text-sm text-gray-600">Your personal interests</p>
// //                 </div>
// //               </div>
// //               <InterestsSection
// //                 data={resumeData.sections.interests}
// //                 onChange={(d) => handleNestedDataChange("interests", d)}
// //               />
// //             </TabsContent>

// //             {/* References Section */}
// //             <TabsContent value="references" className="p-6 space-y-6 animate-in fade-in-50 duration-300">
// //               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
// //                 <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
// //                   <UserCheck className="w-6 h-6 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-800">References</h3>
// //                   <p className="text-sm text-gray-600">Your professional references</p>
// //                 </div>
// //               </div>
// //               <ReferencesSection
// //                 data={resumeData.sections.references}
// //                 onChange={(d) => handleNestedDataChange("references", d)}
// //               />
// //             </TabsContent>
// //           </Tabs>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useMemo, useRef, useEffect } from "react";
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
//   Menu,
//   X,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface EditorSidebarProps {
//   resumeData: ResumeData;
//   activeSection: string;
//   onSectionChange: (section: string) => void;
//   onDataChange: (sectionKey: string, data: any) => void;
//   handleNestedDataChange: (sectionKey: string, data: any) => void;
// }

// const SECTIONS = [
//   { key: "personal",      icon: User,        label: "Personal",       description: "Your basic contact details",    color: "blue",    required: true  },
//   { key: "education",     icon: GraduationCap,label: "Education",    description: "Your academic background",       color: "emerald", required: true  },
//   { key: "experience",    icon: Briefcase,    label: "Experience",   description: "Your work history",              color: "purple",  required: true  },
//   { key: "skills",        icon: Code,         label: "Skills",       description: "Your technical skills",          color: "orange",  required: true  },
//   { key: "projects",      icon: Lightbulb,    label: "Projects",     description: "Your portfolio items",           color: "yellow",  required: false },
//   { key: "certifications",icon: Award,        label: "Certifications",description: "Your professional credentials",  color: "red",     required: false },
//   { key: "languages",     icon: Globe,        label: "Languages",    description: "Your language proficiencies",     color: "teal",    required: false },
//   { key: "interests",     icon: Heart,        label: "Interests",    description: "Your personal interests",         color: "pink",    required: false },
//   { key: "references",    icon: UserCheck,    label: "References",   description: "Your professional references",    color: "indigo",  required: false },
//   { key: "ai",            icon: Brain,        label: "AI Assistant", description: "Get AI-powered suggestions",     color: "violet",  required: false },
// ] as const;

// function getStatus(key: string, resumeData: ResumeData) {
//   switch (key) {
//     case "personal":
//       return resumeData.personal.name && resumeData.personal.email ? "complete" : "incomplete";
//     case "experience":
//       return resumeData.sections.experience.items?.length ? "complete" : "incomplete";
//     case "education":
//       return resumeData.sections.education.items?.length ? "complete" : "incomplete";
//     case "skills":
//       return resumeData.sections.skills.groups?.length ? "complete" : "incomplete";
//     default:
//       return "optional";
//   }
// }

// export function EditorSidebar({
//   resumeData,
//   activeSection,
//   onSectionChange,
//   onDataChange,
//   handleNestedDataChange,
// }: EditorSidebarProps) {
//   // NEW: two collapse states
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [contentCollapsed, setContentCollapsed] = useState(false);

//   // existing
//   const [showAi, setShowAi] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const activeItemRef = useRef<HTMLButtonElement>(null);

//   // auto-scroll
//   useEffect(() => {
//     if (activeItemRef.current && !sidebarCollapsed) {
//       activeItemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
//     }
//   }, [activeSection, sidebarCollapsed]);

//   // click outside to close mobile
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node) && mobileOpen) {
//         setMobileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [mobileOpen]);

//   // ESC to close mobile
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
//     };
//     document.addEventListener("keydown", handler);
//     return () => document.removeEventListener("keydown", handler);
//   }, [mobileOpen]);

//   // progress computation
//   const completion = useMemo(() => {
//     let done = 0, total = 0;
//     total += 8;
//     if (resumeData.personal.name)    done += 2;
//     if (resumeData.personal.title)   done += 1;
//     if (resumeData.personal.email)   done += 2;
//     if (resumeData.personal.phone)   done += 1;
//     if (resumeData.personal.summary) done += 2;
//     total += 6;
//     if (resumeData.sections.experience.items?.length) done += 3;
//     if (resumeData.sections.education.items?.length)  done += 2;
//     if (resumeData.sections.skills.groups?.length)    done += 1;
//     return Math.round((done/total)*100);
//   }, [resumeData]);

//   const requiredSections = SECTIONS.filter(s => s.required);
//   const optionalSections = SECTIONS.filter(s => !s.required);

//   const handleSectionClick = (key: string) => {
//     setShowAi(key === "ai");
//     onSectionChange(key);
//     setMobileOpen(false);
//   };

//   const getColorClasses = (color: string, isActive: boolean) => {
//     const map: Record<string,string> = {
//       blue:    isActive ? "bg-blue-50 border-blue-200 text-blue-700"   : "hover:bg-blue-50",
//       emerald: isActive ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "hover:bg-emerald-50",
//       purple:  isActive ? "bg-purple-50 border-purple-200 text-purple-700" : "hover:bg-purple-50",
//       orange:  isActive ? "bg-orange-50 border-orange-200 text-orange-700" : "hover:bg-orange-50",
//       yellow:  isActive ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "hover:bg-yellow-50",
//       red:     isActive ? "bg-red-50 border-red-200 text-red-700"    : "hover:bg-red-50",
//       teal:    isActive ? "bg-teal-50 border-teal-200 text-teal-700" : "hover:bg-teal-50",
//       pink:    isActive ? "bg-pink-50 border-pink-200 text-pink-700" : "hover:bg-pink-50",
//       indigo:  isActive ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "hover:bg-indigo-50",
//       violet:  isActive ? "bg-violet-50 border-violet-200 text-violet-700" : "hover:bg-violet-50",
//     };
//     return map[color] || map.blue;
//   };

//   /** Sidebar (left) content */
//   const SidebarContent = () => (
//     <>
//       {/* ── Header + Progress ─────────────────── */}
//       <div className="flex-shrink-0 p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
//                 <Rocket className="w-5 h-5 text-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
//             </div>
//             {!sidebarCollapsed && (
//               <div>
//                 <h2 className="text-lg font-bold text-gray-800">Resume Builder</h2>
//                 <p className="text-sm text-gray-600">Build your perfect resume</p>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={() => setMobileOpen(false)}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100"
//           >
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//         {!sidebarCollapsed && (
//           <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm font-medium text-gray-700">Progress</span>
//               <span className="text-2xl font-bold text-gray-800">{completion}%</span>
//             </div>
//             <Progress value={completion} className="h-2.5 bg-gray-200 rounded-full" />
//             <div className="flex justify-between text-xs text-gray-500 mt-2">
//               <span>Getting started</span><span>Ready to export</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── Nav Buttons ───────────────────────── */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-4 space-y-6">
//           {/* Required */}
//           {!sidebarCollapsed && (
//             <h3 className="text-xs font-semibold text-gray-500 uppercase px-2 mb-2">
//               Required
//             </h3>
//           )}
//           <div className="space-y-1">
//             {requiredSections.map((section) => {
//               const isActive = activeSection === section.key;
//               const status = getStatus(section.key, resumeData);
//               return (
//                 <button
//                   key={section.key}
//                   ref={isActive ? activeItemRef : undefined}
//                   onClick={() => handleSectionClick(section.key)}
//                   className={cn(
//                     "w-full flex items-center rounded-xl border-2 border-transparent transition-all",
//                     sidebarCollapsed ? "justify-center p-3" : "gap-3 p-3",
//                     getColorClasses(section.color, isActive),
//                     isActive
//                       ? "shadow-md scale-[1.02] border-opacity-100"
//                       : "hover:scale-[1.01] hover:shadow-sm"
//                   )}
//                 >
//                   <div className="relative">
//                     <section.icon
//                       className={cn(
//                         "w-5 h-5",
//                         isActive
//                           ? `text-${section.color}-600`
//                           : "text-gray-600 group-hover:text-gray-700"
//                       )}
//                     />
//                     {status === "complete" && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
//                     )}
//                     {status === "incomplete" && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
//                     )}
//                   </div>
//                   {!sidebarCollapsed && (
//                     <div className="flex-1 text-left min-w-0">
//                       <div className="font-semibold text-gray-800 truncate">
//                         {section.label}
//                       </div>
//                       <div className="text-xs text-gray-600 truncate">
//                         {section.description}
//                       </div>
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Optional */}
//           {!sidebarCollapsed && (
//             <h3 className="mt-6 text-xs font-semibold text-gray-500 uppercase px-2 mb-2">
//               Optional
//             </h3>
//           )}
//           <div className="space-y-1">
//             {optionalSections.map((section) => {
//               const isActive = activeSection === section.key;
//               const status = getStatus(section.key, resumeData);
//               return (
//                 <button
//                   key={section.key}
//                   ref={isActive ? activeItemRef : undefined}
//                   onClick={() => handleSectionClick(section.key)}
//                   className={cn(
//                     "w-full flex items-center rounded-xl border-2 border-transparent transition-all",
//                     sidebarCollapsed ? "justify-center p-3" : "gap-3 p-3",
//                     getColorClasses(section.color, isActive),
//                     isActive
//                       ? "shadow-md scale-[1.02] border-opacity-100"
//                       : "hover:scale-[1.01] hover:shadow-sm"
//                   )}
//                 >
//                   <div className="relative">
//                     <section.icon
//                       className={cn(
//                         "w-5 h-5",
//                         isActive
//                           ? `text-${section.color}-600`
//                           : "text-gray-600 group-hover:text-gray-700"
//                       )}
//                     />
//                     {status === "complete" && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
//                     )}
//                   </div>
//                   {!sidebarCollapsed && (
//                     <div className="flex-1 text-left min-w-0">
//                       <div className="font-semibold text-gray-800 truncate">
//                         {section.label}
//                       </div>
//                       <div className="text-xs text-gray-600 truncate">
//                         {section.description}
//                       </div>
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* ── Sidebar Footer ────────────────────── */}
//       <div className="flex-shrink-0 border-t bg-gray-50">
//         <button
//           onClick={() => setSidebarCollapsed((c) => !c)}
//           className="w-full flex items-center justify-center gap-2 py-4 px-4 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition"
//         >
//           {sidebarCollapsed ? (
//             <ChevronRight className="w-5 h-5" />
//           ) : (
//             <>
//               <ChevronLeft className="w-5 h-5" />
//               <span>Collapse</span>
//             </>
//           )}
//         </button>
//       </div>
//     </>
//   );

//   /** ── RENDER WHOLE LAYOUT ───────────────────────────── */
//   return (
//     <div className="relative flex h-full">
//       {/* mobile hamburger */}
//       <button
//         onClick={() => setMobileOpen(true)}
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow hover:bg-gray-50"
//       >
//         <Menu className="w-5 h-5 text-gray-600" />
//       </button>
//       {mobileOpen && (
//         <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
//       )}

//       {/* ── Sidebar Panel ─────────────────────── */}
//       <div
//         ref={sidebarRef}
//         className={cn(
//           "flex flex-col bg-white border-r shadow-lg transition-all duration-300 ease-in-out z-40",
//           "hidden md:flex",
//           sidebarCollapsed ? "w-20" : "w-80",
//           mobileOpen && "fixed inset-y-0 left-0 w-80 md:hidden flex"
//         )}
//       >
//         <SidebarContent />
//       </div>

//       {/* ── Main “side section” ────────────────── */}
//       <div
//         className={cn(
//           "flex flex-col transition-all duration-300 ease-in-out",
//           contentCollapsed ? "w-0 overflow-hidden" : "flex-1"
//         )}
//       >
//         {/* collapse toggle for the content */}
//         <div className="flex justify-end bg-gray-100 border-b p-2">
//           <button
//             onClick={() => setContentCollapsed((c) => !c)}
//             className="p-2 rounded hover:bg-gray-200 transition"
//           >
//             {contentCollapsed ? (
//               <ChevronLeft className="w-5 h-5 text-gray-600" />
//             ) : (
//               <ChevronRight className="w-5 h-5 text-gray-600" />
//             )}
//           </button>
//         </div>

//         {!contentCollapsed && (
//           <div className="flex-1 overflow-y-auto overscroll-contain">
//             <Tabs value={activeSection} onValueChange={onSectionChange}>
//               {/* … your TabsContent sections go here exactly as before … */}
//               <TabsContent value="personal" className="p-6 space-y-6">
//                 {/* … */}
//               </TabsContent>
//               {/* etc. */}
//             </Tabs>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useMemo, useRef, useEffect } from "react";
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
//   Menu,
//   X,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface EditorSidebarProps {
//   resumeData: ResumeData;
//   activeSection: string;
//   onSectionChange: (section: string) => void;
//   onDataChange: (sectionKey: string, data: any) => void;
//   handleNestedDataChange: (sectionKey: string, data: any) => void;
// }

// const SECTIONS = [
//   { key: "personal",      icon: User,        label: "Personal",       description: "Your basic contact details",    color: "blue",    required: true  },
//   { key: "education",     icon: GraduationCap,label: "Education",    description: "Your academic background",       color: "emerald", required: true  },
//   { key: "experience",    icon: Briefcase,    label: "Experience",   description: "Your work history",              color: "purple",  required: true  },
//   { key: "skills",        icon: Code,         label: "Skills",       description: "Your technical skills",          color: "orange",  required: true  },
//   { key: "projects",      icon: Lightbulb,    label: "Projects",     description: "Your portfolio items",           color: "yellow",  required: false },
//   { key: "certifications",icon: Award,        label: "Certifications",description: "Your professional credentials",  color: "red",     required: false },
//   { key: "languages",     icon: Globe,        label: "Languages",    description: "Your language proficiencies",     color: "teal",    required: false },
//   { key: "interests",     icon: Heart,        label: "Interests",    description: "Your personal interests",         color: "pink",    required: false },
//   { key: "references",    icon: UserCheck,    label: "References",   description: "Your professional references",    color: "indigo",  required: false },
//   { key: "ai",            icon: Brain,        label: "AI Assistant", description: "Get AI-powered suggestions",     color: "violet",  required: false },
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

// export function EditorSidebar({
//   resumeData,
//   activeSection,
//   onSectionChange,
//   onDataChange,
//   handleNestedDataChange,
// }: EditorSidebarProps) {
//   // two independent collapse states
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [contentCollapsed, setContentCollapsed] = useState(false);

//   // existing
//   const [showAi, setShowAi] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const activeItemRef = useRef<HTMLButtonElement>(null);

//   // Auto-scroll active nav item
//   useEffect(() => {
//     if (activeItemRef.current && !sidebarCollapsed) {
//       activeItemRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//       });
//     }
//   }, [activeSection, sidebarCollapsed]);

//   // Close mobile on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(e.target as Node) &&
//         mobileOpen
//       ) {
//         setMobileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [mobileOpen]);

//   // Close mobile on ESC
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && mobileOpen) {
//         setMobileOpen(false);
//       }
//     };
//     document.addEventListener("keydown", handler);
//     return () => document.removeEventListener("keydown", handler);
//   }, [mobileOpen]);

//   // Overall completion %
//   const completion = useMemo(() => {
//     let done = 0,
//       total = 0;
//     total += 8;
//     if (resumeData.personal.name) done += 2;
//     if (resumeData.personal.title) done += 1;
//     if (resumeData.personal.email) done += 2;
//     if (resumeData.personal.phone) done += 1;
//     if (resumeData.personal.summary) done += 2;
//     total += 6;
//     if (resumeData.sections.experience.items?.length) done += 3;
//     if (resumeData.sections.education.items?.length) done += 2;
//     if (resumeData.sections.skills.groups?.length) done += 1;
//     return Math.round((done / total) * 100);
//   }, [resumeData]);

//   const requiredSections = SECTIONS.filter((s) => s.required);
//   const optionalSections = SECTIONS.filter((s) => !s.required);

//   const handleSectionClick = (key: string) => {
//     setShowAi(key === "ai");
//     onSectionChange(key);
//     setMobileOpen(false);
//   };

//   const getColorClasses = (color: string, isActive: boolean) => {
//     const map: Record<string, string> = {
//       blue:    isActive ? "bg-blue-50 border-blue-200 text-blue-700"   : "hover:bg-blue-50",
//       emerald: isActive ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "hover:bg-emerald-50",
//       purple:  isActive ? "bg-purple-50 border-purple-200 text-purple-700" : "hover:bg-purple-50",
//       orange:  isActive ? "bg-orange-50 border-orange-200 text-orange-700" : "hover:bg-orange-50",
//       yellow:  isActive ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "hover:bg-yellow-50",
//       red:     isActive ? "bg-red-50 border-red-200 text-red-700"    : "hover:bg-red-50",
//       teal:    isActive ? "bg-teal-50 border-teal-200 text-teal-700" : "hover:bg-teal-50",
//       pink:    isActive ? "bg-pink-50 border-pink-200 text-pink-700" : "hover:bg-pink-50",
//       indigo:  isActive ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "hover:bg-indigo-50",
//       violet:  isActive ? "bg-violet-50 border-violet-200 text-violet-700" : "hover:bg-violet-50",
//     };
//     return map[color] || map.blue;
//   };

//   /** Left‐hand sidebar nav */
//   const SidebarContent = () => (
//     <>
//       {/* Header + Progress */}
//       <div className="flex-shrink-0 p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
//                 <Rocket className="w-5 h-5 text-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
//             </div>
//             {!sidebarCollapsed && (
//               <div>
//                 <h2 className="text-lg font-bold text-gray-800">Resume Builder</h2>
//                 <p className="text-sm text-gray-600">Build your perfect resume</p>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={() => setMobileOpen(false)}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100"
//           >
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//         {!sidebarCollapsed && (
//           <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm font-medium text-gray-700">Progress</span>
//               <span className="text-2xl font-bold text-gray-800">{completion}%</span>
//             </div>
//             <Progress value={completion} className="h-2.5 bg-gray-200 rounded-full" />
//             <div className="flex justify-between text-xs text-gray-500 mt-2">
//               <span>Getting started</span>
//               <span>Ready to export</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Navigation Links */}
//       <div className="flex-1 overflow-y-auto overscroll-contain">
//         <div className="p-4 space-y-6">
//           {/* Required */}
//           {!sidebarCollapsed && (
//             <h3 className="text-xs font-semibold text-gray-500 uppercase px-2 mb-2">
//               Required Sections
//             </h3>
//           )}
//           <div className="space-y-1">
//             {requiredSections.map((section) => {
//               const isActive = activeSection === section.key;
//               const status = getStatus(section.key, resumeData);
//               return (
//                 <button
//                   key={section.key}
//                   ref={isActive ? activeItemRef : undefined}
//                   onClick={() => handleSectionClick(section.key)}
//                   className={cn(
//                     "w-full flex items-center rounded-xl border-2 border-transparent transition-all",
//                     sidebarCollapsed ? "justify-center p-3" : "gap-3 p-3",
//                     getColorClasses(section.color, isActive),
//                     isActive
//                       ? "shadow-md scale-[1.02] border-opacity-100"
//                       : "hover:scale-[1.01] hover:shadow-sm"
//                   )}
//                 >
//                   <div className="relative">
//                     <section.icon
//                       className={cn(
//                         "w-5 h-5",
//                         isActive
//                           ? `text-${section.color}-600`
//                           : "text-gray-600 group-hover:text-gray-700"
//                       )}
//                     />
//                     {status === "complete" && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
//                     )}
//                     {status === "incomplete" && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
//                     )}
//                   </div>
//                   {!sidebarCollapsed && (
//                     <div className="flex-1 text-left min-w-0">
//                       <div className="font-semibold text-gray-800 truncate">
//                         {section.label}
//                       </div>
//                       <div className="text-xs text-gray-600 truncate">
//                         {section.description}
//                       </div>
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Optional */}
//           {!sidebarCollapsed && (
//             <h3 className="mt-6 text-xs font-semibold text-gray-500 uppercase px-2 mb-2">
//               Optional Sections
//             </h3>
//           )}
//           <div className="space-y-1">
//             {optionalSections.map((section) => {
//               const isActive = activeSection === section.key;
//               const status = getStatus(section.key, resumeData);
//               return (
//                 <button
//                   key={section.key}
//                   ref={isActive ? activeItemRef : undefined}
//                   onClick={() => handleSectionClick(section.key)}
//                   className={cn(
//                     "w-full flex items-center rounded-xl border-2 border-transparent transition-all",
//                     sidebarCollapsed ? "justify-center p-3" : "gap-3 p-3",
//                     getColorClasses(section.color, isActive),
//                     isActive
//                       ? "shadow-md scale-[1.02] border-opacity-100"
//                       : "hover:scale-[1.01] hover:shadow-sm"
//                   )}
//                 >
//                   <div className="relative">
//                     <section.icon
//                       className={cn(
//                         "w-5 h-5",
//                         isActive
//                           ? `text-${section.color}-600`
//                           : "text-gray-600 group-hover:text-gray-700"
//                       )}
//                     />
//                     {status === "complete" && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
//                     )}
//                   </div>
//                   {!sidebarCollapsed && (
//                     <div className="flex-1 text-left min-w-0">
//                       <div className="font-semibold text-gray-800 truncate">
//                         {section.label}
//                       </div>
//                       <div className="text-xs text-gray-600 truncate">
//                         {section.description}
//                       </div>
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Sidebar Footer (collapse toggle) */}
//       <div className="flex-shrink-0 border-t bg-gray-50">
//         <button
//           onClick={() => setSidebarCollapsed((c) => !c)}
//           className="w-full flex items-center justify-center gap-2 py-4 px-4 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition"
//         >
//           {sidebarCollapsed ? (
//             <ChevronRight className="w-5 h-5" />
//           ) : (
//             <>
//               <ChevronLeft className="w-5 h-5" />
//               <span>Collapse</span>
//             </>
//           )}
//         </button>
//       </div>
//     </>
//   );

//   return (
//     <div className="relative flex h-full">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setMobileOpen(true)}
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border hover:bg-gray-50 transition-colors"
//       >
//         <Menu className="w-5 h-5 text-gray-600" />
//       </button>

//       {/* Mobile Overlay */}
//       {mobileOpen && (
//         <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
//       )}

//       {/* Sidebar Nav */}
//       <div
//         ref={sidebarRef}
//         className={cn(
//           "flex flex-col bg-white border-r shadow-lg transition-all duration-300 ease-in-out z-40",
//           "hidden md:flex",
//           sidebarCollapsed ? "w-20" : "w-80",
//           mobileOpen && "fixed inset-y-0 left-0 w-80 md:hidden flex"
//         )}
//       >
//         <SidebarContent />
//       </div>

//       {/* Right‐hand Content */}
//       <div
//         className={cn(
//           "flex flex-col transition-all duration-300 ease-in-out",
//           contentCollapsed ? "w-0 overflow-hidden" : "flex-1"
//         )}
//       >
//         {/* Content collapse toggle */}
//         <div className="flex justify-end border-b bg-gray-100 p-2">
//           <button
//             onClick={() => setContentCollapsed((c) => !c)}
//             className="p-2 rounded hover:bg-gray-200 transition"
//           >
//             {contentCollapsed ? (
//               <ChevronLeft className="w-5 h-5 text-gray-600" />
//             ) : (
//               <ChevronRight className="w-5 h-5 text-gray-600" />
//             )}
//           </button>
//         </div>

//         {!contentCollapsed && (
//           <div className="flex-1 overflow-y-auto overscroll-contain">
//             <Tabs value={activeSection} onValueChange={onSectionChange}>
//               {/* Personal */}
//               <TabsContent
//                 value="personal"
//                 className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//               >
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
//                   <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
//                     <User className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">
//                       Personal Information
//                     </h3>
//                     <p className="text-sm text-gray-600">Tell us about yourself</p>
//                   </div>
//                 </div>
//                 <PersonalSection
//                   data={resumeData.personal}
//                   onChange={(d) => onDataChange("personal", d)}
//                 />
//               </TabsContent>

//               {/* Education */}
//               <TabsContent
//                 value="education"
//                 className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//               >
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
//                   <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg">
//                     <GraduationCap className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">Education</h3>
//                     <p className="text-sm text-gray-600">
//                       Your academic achievements
//                     </p>
//                   </div>
//                 </div>
//                 <EducationSection
//                   data={resumeData.sections.education}
//                   onChange={(d) => handleNestedDataChange("education", d)}
//                 />
//               </TabsContent>

//               {/* Experience */}
//               <TabsContent
//                 value="experience"
//                 className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//               >
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
//                   <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
//                     <Briefcase className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">
//                       Work Experience
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       Your professional journey
//                     </p>
//                   </div>
//                 </div>
//                 <ExperienceSection
//                   data={resumeData.sections.experience}
//                   onChange={(d) => handleNestedDataChange("experience", d)}
//                 />
//               </TabsContent>

//               {/* Skills */}
//               <TabsContent
//                 value="skills"
//                 className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//               >
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
//                   <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
//                     <Code className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">
//                       Skills & Expertise
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       What you're great at
//                     </p>
//                   </div>
//                 </div>
//                 <SkillsSection
//                   data={resumeData.sections.skills}
//                   onChange={(d) => handleNestedDataChange("skills", d)}
//                 />
//               </TabsContent>

//               {/* AI Assistant */}
//               <TabsContent
//                 value="ai"
//                 className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//               >
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-violet-50 to-violet-100 rounded-xl border border-violet-200">
//                   <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg shadow-lg">
//                     <Brain className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">
//                       AI Assistant
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       Let AI enhance your resume
//                     </p>
//                   </div>
//                 </div>
//                 {showAi ? (
//                   <AiSuggestions
//                     resumeData={resumeData}
//                     onClose={() => setShowAi(false)}
//                   />
//                 ) : (
//                   <div className="space-y-4">
//                     <p className="text-gray-600 leading-relaxed">
//                       Get personalized suggestions to make your resume stand out
//                       from the crowd.
//                     </p>
//                     <div className="grid gap-3">
//                       <button
//                         onClick={() => setShowAi(true)}
//                         className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
//                       >
//                         <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
//                           <Sparkles className="w-5 h-5 text-white" />
//                         </div>
//                         <div className="text-left">
//                           <div className="font-bold text-blue-800">
//                             Improve Summary
//                           </div>
//                           <div className="text-sm text-blue-600">
//                             Make it more compelling
//                           </div>
//                         </div>
//                       </button>

//                       <button
//                         onClick={() => setShowAi(true)}
//                         className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
//                       >
//                         <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md">
//                           <TrendingUp className="w-5 h-5 text-white" />
//                         </div>
//                         <div className="text-left">
//                           <div className="font-bold text-purple-800">
//                             Enhance Experience
//                           </div>
//                           <div className="text-sm text-purple-600">
//                             Highlight achievements
//                           </div>
//                         </div>
//                       </button>

//                       <button
//                         onClick={() => setShowAi(true)}
//                         className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
//                       >
//                         <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md">
//                           <Target className="w-5 h-5 text-white" />
//                         </div>
//                         <div className="text-left">
//                           <div className="font-bold text-green-800">
//                             Optimize Keywords
//                           </div>
//                           <div className="text-sm text-green-600">
//                             Beat ATS systems
//                           </div>
//                         </div>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </TabsContent>

//               {/* Projects */}
//               <TabsContent
//                 value="projects"
//                 className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//               >
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
//                   <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg">
//                     <Lightbulb className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">Projects</h3>
//                     <p className="text-sm text-gray-600">Your portfolio items</p>
//                   </div>
//                 </div>
//                 <ProjectsSection
//                   data={resumeData.sections.projects}
//                   onChange={(d) => handleNestedDataChange("projects", d)}
//                 />
//               </TabsContent>

//               {/* Certifications */}
//               <TabsContent
//                 value="certifications"
//                 className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//               >
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
//                   <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg">
//                     <Award className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">
//                       Certifications
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       Your professional credentials
//                     </p>
//                   </div>
//                 </div>
//                 <CertificationsSection
//                   data={resumeData.sections.certifications}
//                   onChange={(d) => handleNestedDataChange("certifications", d)}
//                 />
//               </TabsContent>

//               {/* Languages */}
//               <TabsContent
//                 value="languages"
//                 className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//               >
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl border border-teal-200">
//                   <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg">
//                     <Globe className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">Languages</h3>
//                     <p className="text-sm text-gray-600">
//                       Your language proficiencies
//                     </p>
//                   </div>
//                 </div>
//                 <LanguagesSection
//                   data={resumeData.sections.languages}
//                   onChange={(d) => handleNestedDataChange("languages", d)}
//                 />
//               </TabsContent>

//               {/* Interests */}
//               <TabsContent
//                 value="interests"
//                 className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//               >
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl border border-pink-200">
//                   <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg">
//                     <Heart className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">Interests</h3>
//                     <p className="text-sm text-gray-600">
//                       Your personal interests
//                     </p>
//                   </div>
//                 </div>
//                 <InterestsSection
//                   data={resumeData.sections.interests}
//                   onChange={(d) => handleNestedDataChange("interests", d)}
//                 />
//               </TabsContent>

//               {/* References */}
//               <TabsContent
//                 value="references"
//                 className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//               >
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
//                   <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
//                     <UserCheck className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">References</h3>
//                     <p className="text-sm text-gray-600">
//                       Your professional references
//                     </p>
//                   </div>
//                 </div>
//                 <ReferencesSection
//                   data={resumeData.sections.references}
//                   onChange={(d) => handleNestedDataChange("references", d)}
//                 />
//               </TabsContent>
//             </Tabs>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useMemo, useRef, useEffect } from "react";
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
//   Menu,
//   X,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface EditorSidebarProps {
//   resumeData: ResumeData;
//   activeSection: string;
//   onSectionChange: (section: string) => void;
//   onDataChange: (sectionKey: string, data: any) => void;
//   handleNestedDataChange: (sectionKey: string, data: any) => void;
// }

// const SECTIONS = [
//   { key: "personal",       icon: User,         label: "Personal",       description: "Your basic contact details",    color: "blue",    required: true  },
//   { key: "education",      icon: GraduationCap,label: "Education",      description: "Your academic background",       color: "emerald", required: true  },
//   { key: "experience",     icon: Briefcase,    label: "Experience",     description: "Your work history",              color: "purple",  required: true  },
//   { key: "skills",         icon: Code,         label: "Skills",         description: "Your technical skills",          color: "orange",  required: true  },
//   { key: "projects",       icon: Lightbulb,    label: "Projects",       description: "Your portfolio items",           color: "yellow",  required: false },
//   { key: "certifications", icon: Award,        label: "Certifications", description: "Your professional credentials",  color: "red",     required: false },
//   { key: "languages",      icon: Globe,        label: "Languages",      description: "Your language proficiencies",     color: "teal",    required: false },
//   { key: "interests",      icon: Heart,        label: "Interests",      description: "Your personal interests",         color: "pink",    required: false },
//   { key: "references",     icon: UserCheck,    label: "References",     description: "Your professional references",    color: "indigo",  required: false },
//   { key: "ai",             icon: Brain,        label: "AI Assistant",   description: "Get AI-powered suggestions",      color: "violet",  required: false },
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

// export function EditorSidebar({
//   resumeData,
//   activeSection,
//   onSectionChange,
//   onDataChange,
//   handleNestedDataChange,
// }: EditorSidebarProps) {
//   const [showAi, setShowAi] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const activeItemRef = useRef<HTMLButtonElement>(null);

//   // Auto-scroll to active item
//   useEffect(() => {
//     if (activeItemRef.current && !collapsed) {
//       activeItemRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//       });
//     }
//   }, [activeSection, collapsed]);

//   // Close mobile sidebar when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(e.target as Node) &&
//         mobileOpen
//       ) {
//         setMobileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [mobileOpen]);

//   // Close on Escape
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && mobileOpen) {
//         setMobileOpen(false);
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [mobileOpen]);

//   // Compute progress
//   const completion = useMemo(() => {
//     let done = 0, total = 0;
//     total += 8;
//     if (resumeData.personal.name) done += 2;
//     if (resumeData.personal.title) done += 1;
//     if (resumeData.personal.email) done += 2;
//     if (resumeData.personal.phone) done += 1;
//     if (resumeData.personal.summary) done += 2;
//     total += 6;
//     if (resumeData.sections.experience.items?.length) done += 3;
//     if (resumeData.sections.education.items?.length) done += 2;
//     if (resumeData.sections.skills.groups?.length) done += 1;
//     return Math.round((done / total) * 100);
//   }, [resumeData]);

//   const requiredSections = SECTIONS.filter((s) => s.required);
//   const optionalSections = SECTIONS.filter((s) => !s.required);

//   // Expand if collapsed, then switch section
//   const handleSectionClick = (sectionKey: string) => {
//     if (collapsed) setCollapsed(false);
//     setShowAi(sectionKey === "ai");
//     onSectionChange(sectionKey);
//     setMobileOpen(false);
//   };

//   const getColorClasses = (color: string, isActive: boolean) => {
//     const colors: Record<string, string> = {
//       blue:    isActive ? "bg-blue-50 border-blue-200 text-blue-700"   : "hover:bg-blue-50",
//       emerald: isActive ? "bg-emerald-50 border-emerald-200 text-emerald-700": "hover:bg-emerald-50",
//       purple:  isActive ? "bg-purple-50 border-purple-200 text-purple-700" : "hover:bg-purple-50",
//       orange:  isActive ? "bg-orange-50 border-orange-200 text-orange-700" : "hover:bg-orange-50",
//       yellow:  isActive ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "hover:bg-yellow-50",
//       red:     isActive ? "bg-red-50 border-red-200 text-red-700"      : "hover:bg-red-50",
//       teal:    isActive ? "bg-teal-50 border-teal-200 text-teal-700"   : "hover:bg-teal-50",
//       pink:    isActive ? "bg-pink-50 border-pink-200 text-pink-700"   : "hover:bg-pink-50",
//       indigo:  isActive ? "bg-indigo-50 border-indigo-200 text-indigo-700": "hover:bg-indigo-50",
//       violet:  isActive ? "bg-violet-50 border-violet-200 text-violet-700": "hover:bg-violet-50",
//     };
//     return colors[color] || colors.blue;
//   };

//   const SidebarContent = () => (
//     <>
//       {/* Header */}
//       <div className="flex-shrink-0 p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
//                 <Rocket className="w-5 h-5 text-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
//             </div>
//             {!collapsed && (
//               <div>
//                 <h2 className="text-lg font-bold text-gray-800">Resume Builder</h2>
//                 <p className="text-sm text-gray-600">Build your perfect resume</p>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={() => setMobileOpen(false)}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100"
//           >
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         {/* only show this when NOT collapsed */}
//         {!collapsed && (
//           <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm font-medium text-gray-700">Progress</span>
//               <span className="text-2xl font-bold text-gray-800">{completion}%</span>
//             </div>
//             <Progress
//               value={completion}
//               className="h-2.5 bg-gray-200 rounded-full overflow-hidden"
//             />
//             <div className="flex justify-between text-xs text-gray-500 mt-2">
//               <span>Getting started</span>
//               <span>Ready to export</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Navigation */}
//       <div className="flex-1 overflow-y-auto overscroll-contain">
//         <div className="p-4 space-y-6">
//           {/* Required Sections */}
//           {!collapsed && (
//             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
//               Required Sections
//             </h3>
//           )}
//           <div className="space-y-1">
//             {requiredSections.map((section) => {
//               const status = getStatus(section.key, resumeData);
//               const isActive = activeSection === section.key;
//               return (
//                 <button
//                   key={section.key}
//                   ref={isActive ? activeItemRef : null}
//                   onClick={() => handleSectionClick(section.key)}
//                   className={cn(
//                     "w-full flex items-center rounded-xl border-2 border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 group",
//                     collapsed ? "justify-center p-3" : "gap-3 p-3",
//                     getColorClasses(section.color, isActive),
//                     isActive && "shadow-md scale-[1.02] border-opacity-100",
//                     !isActive && "hover:scale-[1.01] hover:shadow-sm"
//                   )}
//                 >
//                   <div className="relative">
//                     <section.icon
//                       className={cn(
//                         "w-5 h-5 transition-all duration-200",
//                         isActive
//                           ? `text-${section.color}-600`
//                           : "text-gray-600 group-hover:text-gray-700"
//                       )}
//                     />
//                     {status === "complete" && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
//                     )}
//                     {status === "incomplete" && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
//                     )}
//                   </div>
//                   {!collapsed && (
//                     <>
//                       <div className="flex-1 text-left min-w-0">
//                         <div className="font-semibold text-gray-800 truncate">
//                           {section.label}
//                         </div>
//                         <div className="text-xs text-gray-600 truncate">
//                           {section.description}
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {status === "complete" && (
//                           <CheckCircle2 className="w-4 h-4 text-green-500" />
//                         )}
//                         {status === "incomplete" && (
//                           <AlertCircle className="w-4 h-4 text-orange-500" />
//                         )}
//                         {isActive && (
//                           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Optional Sections */}
//           {!collapsed && (
//             <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
//               Optional Sections
//             </h3>
//           )}
//           <div className="space-y-1">
//             {optionalSections.map((section) => {
//               const status = getStatus(section.key, resumeData);
//               const isActive = activeSection === section.key;
//               return (
//                 <button
//                   key={section.key}
//                   ref={isActive ? activeItemRef : null}
//                   onClick={() => handleSectionClick(section.key)}
//                   className={cn(
//                     "w-full flex items-center rounded-xl border-2 border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 group",
//                     collapsed ? "justify-center p-3" : "gap-3 p-3",
//                     getColorClasses(section.color, isActive),
//                     isActive && "shadow-md scale-[1.02] border-opacity-100",
//                     !isActive && "hover:scale-[1.01] hover:shadow-sm"
//                   )}
//                 >
//                   <div className="relative">
//                     <section.icon
//                       className={cn(
//                         "w-5 h-5 transition-all duration-200",
//                         isActive
//                           ? `text-${section.color}-600`
//                           : "text-gray-600 group-hover:text-gray-700"
//                       )}
//                     />
//                     {status === "complete" && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
//                     )}
//                   </div>
//                   {!collapsed && (
//                     <>
//                       <div className="flex-1 text-left min-w-0">
//                         <div className="font-semibold text-gray-800 truncate">
//                           {section.label}
//                         </div>
//                         <div className="text-xs text-gray-600 truncate">
//                           {section.description}
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {isActive && (
//                           <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Footer Collapse Button */}
//       <div className="flex-shrink-0 border-t bg-gray-50">
//         <button
//           onClick={() => setCollapsed((c) => !c)}
//           className="w-full flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
//         >
//           {collapsed ? (
//             <ChevronRight className="w-5 h-5" />
//           ) : (
//             <>
//               <ChevronLeft className="w-5 h-5" />
//               <span>Collapse</span>
//             </>
//           )}
//         </button>
//       </div>
//     </>
//   );

//   return (
//     <div className="relative flex h-full">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setMobileOpen(true)}
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border hover:bg-gray-50 transition-colors"
//       >
//         <Menu className="w-5 h-5 text-gray-600" />
//       </button>

//       {/* Mobile Overlay */}
//       {mobileOpen && (
//         <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
//       )}

//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={cn(
//           "flex flex-col bg-white border-r shadow-lg transition-all duration-300 ease-in-out z-40",
//           "hidden md:flex",
//           collapsed ? "w-20" : "w-80",
//           mobileOpen && "fixed inset-y-0 left-0 w-80 md:hidden flex"
//         )}
//       >
//         <SidebarContent />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-hidden">
//         <div className="h-full overflow-y-auto overscroll-contain">
//           <Tabs value={activeSection} onValueChange={onSectionChange}>
//             {/* Personal Section */}
//             <TabsContent
//               value="personal"
//               className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//             >
//               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
//                 <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
//                   <User className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
//                   <p className="text-sm text-gray-600">Tell us about yourself</p>
//                 </div>
//               </div>
//               <PersonalSection
//                 data={resumeData.personal}
//                 onChange={(d) => onDataChange("personal", d)}
//               />
//             </TabsContent>

//             {/* Education Section */}
//             <TabsContent
//               value="education"
//               className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//             >
//               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
//                 <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg">
//                   <GraduationCap className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">Education</h3>
//                   <p className="text-sm text-gray-600">Your academic achievements</p>
//                 </div>
//               </div>
//               <EducationSection
//                 data={resumeData.sections.education}
//                 onChange={(d) => handleNestedDataChange("education", d)}
//               />
//             </TabsContent>

//             {/* Experience Section */}
//             <TabsContent
//               value="experience"
//               className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//             >
//               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
//                 <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
//                   <Briefcase className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">Work Experience</h3>
//                   <p className="text-sm text-gray-600">Your professional journey</p>
//                 </div>
//               </div>
//               <ExperienceSection
//                 data={resumeData.sections.experience}
//                 onChange={(d) => handleNestedDataChange("experience", d)}
//               />
//             </TabsContent>

//             {/* Skills Section */}
//             <TabsContent
//               value="skills"
//               className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//             >
//               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
//                 <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
//                   <Code className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">Skills & Expertise</h3>
//                   <p className="text-sm text-gray-600">What you're great at</p>
//                 </div>
//               </div>
//               <SkillsSection
//                 data={resumeData.sections.skills}
//                 onChange={(d) => handleNestedDataChange("skills", d)}
//               />
//             </TabsContent>

//             {/* AI Assistant Section */}
//             <TabsContent
//               value="ai"
//               className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//             >
//               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-violet-50 to-violet-100 rounded-xl border border-violet-200">
//                 <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg shadow-lg">
//                   <Brain className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">AI Assistant</h3>
//                   <p className="text-sm text-gray-600">Let AI enhance your resume</p>
//                 </div>
//               </div>

//               {showAi ? (
//                 <AiSuggestions
//                   resumeData={resumeData}
//                   onClose={() => setShowAi(false)}
//                 />
//               ) : (
//                 <div className="space-y-4">
//                   <p className="text-gray-600 leading-relaxed">
//                     Get personalized suggestions to make your resume stand out from the crowd.
//                   </p>
//                   <div className="grid gap-3">
//                     <button
//                       onClick={() => setShowAi(true)}
//                       className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
//                     >
//                       <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
//                         <Sparkles className="w-5 h-5 text-white" />
//                       </div>
//                       <div className="text-left">
//                         <div className="font-bold text-blue-800">Improve Summary</div>
//                         <div className="text-sm text-blue-600">Make it more compelling</div>
//                       </div>
//                     </button>
//                     <button
//                       onClick={() => setShowAi(true)}
//                       className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
//                     >
//                       <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md">
//                         <TrendingUp className="w-5 h-5 text-white" />
//                       </div>
//                       <div className="text-left">
//                         <div className="font-bold text-purple-800">Enhance Experience</div>
//                         <div className="text-sm text-purple-600">Highlight achievements</div>
//                       </div>
//                     </button>
//                     <button
//                       onClick={() => setShowAi(true)}
//                       className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
//                     >
//                       <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md">
//                         <Target className="w-5 h-5 text-white" />
//                       </div>
//                       <div className="text-left">
//                         <div className="font-bold text-green-800">Optimize Keywords</div>
//                         <div className="text-sm text-green-600">Beat ATS systems</div>
//                       </div>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </TabsContent>

//             {/* Projects Section */}
//             <TabsContent
//               value="projects"
//               className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//             >
//               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
//                 <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg">
//                   <Lightbulb className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">Projects</h3>
//                   <p className="text-sm text-gray-600">Your portfolio items</p>
//                 </div>
//               </div>
//               <ProjectsSection
//                 data={resumeData.sections.projects}
//                 onChange={(d) => handleNestedDataChange("projects", d)}
//               />
//             </TabsContent>

//             {/* Certifications Section */}
//             <TabsContent
//               value="certifications"
//               className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//             >
//               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
//                 <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg">
//                   <Award className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">Certifications</h3>
//                   <p className="text-sm text-gray-600">Your professional credentials</p>
//                 </div>
//               </div>
//               <CertificationsSection
//                 data={resumeData.sections.certifications}
//                 onChange={(d) => handleNestedDataChange("certifications", d)}
//               />
//             </TabsContent>

//             {/* Languages Section */}
//             <TabsContent
//               value="languages"
//               className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//             >
//               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl border border-teal-200">
//                 <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg">
//                   <Globe className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">Languages</h3>
//                   <p className="text-sm text-gray-600">Your language proficiencies</p>
//                 </div>
//               </div>
//               <LanguagesSection
//                 data={resumeData.sections.languages}
//                 onChange={(d) => handleNestedDataChange("languages", d)}
//               />
//             </TabsContent>

//             {/* Interests Section */}
//             <TabsContent
//               value="interests"
//               className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//             >
//               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl border border-pink-200">
//                 <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg">
//                   <Heart className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">Interests</h3>
//                   <p className="text-sm text-gray-600">Your personal interests</p>
//                 </div>
//               </div>
//               <InterestsSection
//                 data={resumeData.sections.interests}
//                 onChange={(d) => handleNestedDataChange("interests", d)}
//               />
//             </TabsContent>

//             {/* References Section */}
//             <TabsContent
//               value="references"
//               className="p-6 space-y-6 animate-in fade-in-50 duration-300"
//             >
//               <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
//                 <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
//                   <UserCheck className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">References</h3>
//                   <p className="text-sm text-gray-600">Your professional references</p>
//                 </div>
//               </div>
//               <ReferencesSection
//                 data={resumeData.sections.references}
//                 onChange={(d) => handleNestedDataChange("references", d)}
//               />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
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
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorSidebarProps {
  resumeData: ResumeData;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onDataChange: (sectionKey: string, data: any) => void;
  handleNestedDataChange: (sectionKey: string, data: any) => void;

  // added props:
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const SECTIONS = [
  {
    key: "personal",
    icon: User,
    label: "Personal",
    description: "Your basic contact details",
    color: "blue",
    required: true,
  },
  {
    key: "education",
    icon: GraduationCap,
    label: "Education",
    description: "Your academic background",
    color: "emerald",
    required: true,
  },
  {
    key: "experience",
    icon: Briefcase,
    label: "Experience",
    description: "Your work history",
    color: "purple",
    required: true,
  },
  {
    key: "skills",
    icon: Code,
    label: "Skills",
    description: "Your technical skills",
    color: "orange",
    required: true,
  },
  {
    key: "projects",
    icon: Lightbulb,
    label: "Projects",
    description: "Your portfolio items",
    color: "yellow",
    required: false,
  },
  {
    key: "certifications",
    icon: Award,
    label: "Certifications",
    description: "Your professional credentials",
    color: "red",
    required: false,
  },
  {
    key: "languages",
    icon: Globe,
    label: "Languages",
    description: "Your language proficiencies",
    color: "teal",
    required: false,
  },
  {
    key: "interests",
    icon: Heart,
    label: "Interests",
    description: "Your personal interests",
    color: "pink",
    required: false,
  },
  {
    key: "references",
    icon: UserCheck,
    label: "References",
    description: "Your professional references",
    color: "indigo",
    required: false,
  },
  {
    key: "ai",
    icon: Brain,
    label: "AI Assistant",
    description: "Get AI-powered suggestions",
    color: "violet",
    required: false,
  },
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

export function EditorSidebar({
  resumeData,
  activeSection,
  onSectionChange,
  onDataChange,
  handleNestedDataChange,
  collapsed,
  onToggleCollapse,
}: EditorSidebarProps) {
  const [showAi, setShowAi] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to active item
  useEffect(() => {
    if (activeItemRef.current && !collapsed) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeSection, collapsed]);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        mobileOpen
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Compute progress
  const completion = useMemo(() => {
    let done = 0,
      total = 0;
    total += 8;
    if (resumeData.personal.name) done += 2;
    if (resumeData.personal.title) done += 1;
    if (resumeData.personal.email) done += 2;
    if (resumeData.personal.phone) done += 1;
    if (resumeData.personal.summary) done += 2;
    total += 6;
    if (resumeData.sections.experience.items?.length) done += 3;
    if (resumeData.sections.education.items?.length) done += 2;
    if (resumeData.sections.skills.groups?.length) done += 1;
    return Math.round((done / total) * 100);
  }, [resumeData]);

  const requiredSections = SECTIONS.filter((s) => s.required);
  const optionalSections = SECTIONS.filter((s) => !s.required);

  // Expand if collapsed, then switch section
  const handleSectionClick = (sectionKey: string) => {
    if (collapsed) onToggleCollapse();
    setShowAi(sectionKey === "ai");
    onSectionChange(sectionKey);
    setMobileOpen(false);
  };

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors: Record<string, string> = {
      blue: isActive
        ? "bg-blue-50 border-blue-200 text-blue-700"
        : "hover:bg-blue-50",
      emerald: isActive
        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
        : "hover:bg-emerald-50",
      purple: isActive
        ? "bg-purple-50 border-purple-200 text-purple-700"
        : "hover:bg-purple-50",
      orange: isActive
        ? "bg-orange-50 border-orange-200 text-orange-700"
        : "hover:bg-orange-50",
      yellow: isActive
        ? "bg-yellow-50 border-yellow-200 text-yellow-700"
        : "hover:bg-yellow-50",
      red: isActive
        ? "bg-red-50 border-red-200 text-red-700"
        : "hover:bg-red-50",
      teal: isActive
        ? "bg-teal-50 border-teal-200 text-teal-700"
        : "hover:bg-teal-50",
      pink: isActive
        ? "bg-pink-50 border-pink-200 text-pink-700"
        : "hover:bg-pink-50",
      indigo: isActive
        ? "bg-indigo-50 border-indigo-200 text-indigo-700"
        : "hover:bg-indigo-50",
      violet: isActive
        ? "bg-violet-50 border-violet-200 text-violet-700"
        : "hover:bg-violet-50",
    };
    return colors[color] || colors.blue;
  };

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Resume Builder
                </h2>
                <p className="text-sm text-gray-600">
                  Build your perfect resume
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* only show this when NOT collapsed */}
        {!collapsed && (
          <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress
              </span>
              <span className="text-2xl font-bold text-gray-800">
                {completion}%
              </span>
            </div>
            <Progress
              value={completion}
              className="h-2.5 bg-gray-200 rounded-full overflow-hidden"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Getting started</span>
              <span>Ready to export</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="p-4 space-y-6">
          {/* Required Sections */}
          {!collapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Required Sections
            </h3>
          )}
          <div className="space-y-1">
            {requiredSections.map((section) => {
              const status = getStatus(section.key, resumeData);
              const isActive = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  ref={isActive ? activeItemRef : null}
                  onClick={() => handleSectionClick(section.key)}
                  className={cn(
                    "w-full flex items-center rounded-xl border-2 border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 group",
                    collapsed ? "justify-center p-3" : "gap-3 p-3",
                    getColorClasses(section.color, isActive),
                    isActive && "shadow-md scale-[1.02] border-opacity-100",
                    !isActive && "hover:scale-[1.01] hover:shadow-sm"
                  )}
                >
                  <div className="relative">
                    <section.icon
                      className={cn(
                        "w-5 h-5 transition-all duration-200",
                        isActive
                          ? `text-${section.color}-600`
                          : "text-gray-600 group-hover:text-gray-700"
                      )}
                    />
                    {status === "complete" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                    {status === "incomplete" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white animate-pulse" />
                    )}
                  </div>
                  {!collapsed && (
                    <>
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-semibold text-gray-800 truncate">
                          {section.label}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {section.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {status === "complete" && (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        )}
                        {status === "incomplete" && (
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                        )}
                        {isActive && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        )}
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Optional Sections */}
          {!collapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Optional Sections
            </h3>
          )}
          <div className="space-y-1">
            {optionalSections.map((section) => {
              const status = getStatus(section.key, resumeData);
              const isActive = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  ref={isActive ? activeItemRef : null}
                  onClick={() => handleSectionClick(section.key)}
                  className={cn(
                    "w-full flex items-center rounded-xl border-2 border-transparent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 group",
                    collapsed ? "justify-center p-3" : "gap-3 p-3",
                    getColorClasses(section.color, isActive),
                    isActive && "shadow-md scale-[1.02] border-opacity-100",
                    !isActive && "hover:scale-[1.01] hover:shadow-sm"
                  )}
                >
                  <div className="relative">
                    <section.icon
                      className={cn(
                        "w-5 h-5 transition-all duration-200",
                        isActive
                          ? `text-${section.color}-600`
                          : "text-gray-600 group-hover:text-gray-700"
                      )}
                    />
                    {status === "complete" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  {!collapsed && (
                    <>
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-semibold text-gray-800 truncate">
                          {section.label}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {section.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {isActive && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        )}
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Collapse Button */}
      <div className="flex-shrink-0 border-t bg-gray-50">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </>
  );

  return (
    <div className="relative flex h-full">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border hover:bg-gray-50 transition-colors"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "flex flex-col bg-white border-r shadow-lg transition-all duration-300 ease-in-out z-40",
          "hidden md:flex",
          collapsed ? "w-20" : "w-80",
          mobileOpen && "fixed inset-y-0 left-0 w-80 md:hidden flex"
        )}
      >
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto overscroll-contain">
          <Tabs value={activeSection} onValueChange={onSectionChange}>
            {/* Personal Section */}
            <TabsContent
              value="personal"
              className="p-6 space-y-6 animate-in fade-in-50 duration-300"
            >
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
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

            {/* Education Section */}
            <TabsContent
              value="education"
              className="p-6 space-y-6 animate-in fade-in-50 duration-300"
            >
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Education</h3>
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

            {/* Experience Section */}
            <TabsContent
              value="experience"
              className="p-6 space-y-6 animate-in fade-in-50 duration-300"
            >
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
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

            {/* Skills Section */}
            <TabsContent
              value="skills"
              className="p-6 space-y-6 animate-in fade-in-50 duration-300"
            >
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Skills & Expertise
                  </h3>
                  <p className="text-sm text-gray-600">What you're great at</p>
                </div>
              </div>
              <SkillsSection
                data={resumeData.sections.skills}
                onChange={(d) => handleNestedDataChange("skills", d)}
              />
            </TabsContent>

            {/* Projects Section */}
            <TabsContent
              value="projects"
              className="p-6 space-y-6 animate-in fade-in-50 duration-300"
            >
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Projects</h3>
                  <p className="text-sm text-gray-600">Your portfolio items</p>
                </div>
              </div>
              <ProjectsSection
                data={resumeData.sections.projects}
                onChange={(d) => handleNestedDataChange("projects", d)}
              />
            </TabsContent>

            {/* Certifications Section */}
            <TabsContent
              value="certifications"
              className="p-6 space-y-6 animate-in fade-in-50 duration-300"
            >
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
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

            {/* Languages Section */}
            <TabsContent
              value="languages"
              className="p-6 space-y-6 animate-in fade-in-50 duration-300"
            >
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl border border-teal-200">
                <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Languages</h3>
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

            {/* Interests Section */}
            <TabsContent
              value="interests"
              className="p-6 space-y-6 animate-in fade-in-50 duration-300"
            >
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl border border-pink-200">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Interests</h3>
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

            {/* References Section */}
            <TabsContent
              value="references"
              className="p-6 space-y-6 animate-in fade-in-50 duration-300"
            >
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
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

            {/* AI Assistant Section */}
            <TabsContent
              value="ai"
              className="p-6 space-y-6 animate-in fade-in-50 duration-300"
            >
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-violet-50 to-violet-100 rounded-xl border border-violet-200">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
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
                    Get personalized suggestions to make your resume stand out
                    from the crowd.
                  </p>
                  <div className="grid gap-3">
                    <button
                      onClick={() => setShowAi(true)}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                    >
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-blue-800">
                          Improve Summary
                        </div>
                        <div className="text-sm text-blue-600">
                          Make it more compelling
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setShowAi(true)}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                    >
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-purple-800">
                          Enhance Experience
                        </div>
                        <div className="text-sm text-purple-600">
                          Highlight achievements
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setShowAi(true)}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                    >
                      <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-green-800">
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
          </Tabs>
        </div>
      </div>
    </div>
  );
}