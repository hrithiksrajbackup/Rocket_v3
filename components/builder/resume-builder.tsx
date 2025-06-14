// // "use client";

// // import { useState } from "react";
// // import { useSearchParams } from "next/navigation";
// // import { EditorSidebar } from "@/components/builder/editor-sidebar";
// // import { ResumePreview } from "@/components/builder/resume-preview";
// // import { ResumeHeader } from "@/components/builder/resume-header";
// // import { useToast } from "@/hooks/use-toast";
// // import { initialResumeState } from "@/lib/resume-data";
// // import { ResumeData } from "@/lib/types";

// // export function ResumeBuilder() {
// //   const searchParams = useSearchParams();
// //   const templateId = searchParams.get("template") || "professional";
// //   const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);
// //   const [activeSection, setActiveSection] = useState("personal");
// //   const { toast } = useToast();

// //   console.log("INITAL", initialResumeState);

// //   const handleSectionChange = (section: string) => {
// //     setActiveSection(section);
// //   };

// //   const handleDataChange = (sectionKey: string, data: any) => {
// //     setResumeData((prev) => ({
// //       ...prev,
// //       [sectionKey]: data,
// //     }));
// //   };


// // const handleNestedDataChange = (sectionKey: string, data: any) => {
// //   console.log("data", data, "sectionKey", sectionKey);

// //   setResumeData((prev: any) => ({
// //     ...prev,
// //     sections: {
// //       ...prev.sections,
// //       [sectionKey]: data,
// //     },
// //   }));

// //   console.log("Boom",resumeData)
// // };


// //   const handleSave = () => {
// //     // In a real application, this would save to a database
// //     toast({
// //       title: "Resume saved",
// //       description: "Your resume has been saved successfully.",
// //     });
// //   };

// //   return (
// //     <div className="flex flex-col h-screen">
// //       <ResumeHeader
// //         resumeData={resumeData}
// //         templateId={templateId}
// //         onSave={handleSave}
// //       />

// //       <div  className="flex flex-1 overflow-hidden">
// //         <EditorSidebar
// //           resumeData={resumeData}
// //           activeSection={activeSection}
// //           onSectionChange={handleSectionChange}
// //           onDataChange={handleDataChange}
// //           handleNestedDataChange={handleNestedDataChange}
// //         />

// //         <ResumePreview  resumeData={resumeData} templateId={templateId} />
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { EditorSidebar } from "@/components/builder/editor-sidebar";
// import { ResumePreview } from "@/components/builder/resume-preview";
// import { ResumeHeader } from "@/components/builder/resume-header";
// import { useToast } from "@/hooks/use-toast";
// import { initialResumeState } from "@/lib/resume-data";
// import { ResumeData } from "@/lib/types";
// import { cn } from "@/lib/utils";

// export function ResumeBuilder() {
//   const searchParams = useSearchParams();
//   const templateId = searchParams.get("template") || "professional";
//   const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);
//   const [activeSection, setActiveSection] = useState("personal");
//   const [isLoading, setIsLoading] = useState(true);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const { toast } = useToast();

//   // Simulate loading state
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSectionChange = (section: string) => {
//     setActiveSection(section);
//   };

//   const handleDataChange = (sectionKey: string, data: any) => {
//     setResumeData((prev) => ({
//       ...prev,
//       [sectionKey]: data,
//       meta: {
//         ...prev.meta,
//         lastModified: new Date().toISOString()
//       }
//     }));
//   };

//   const handleNestedDataChange = (sectionKey: string, data: any) => {
//     setResumeData((prev: any) => ({
//       ...prev,
//       sections: {
//         ...prev.sections,
//         [sectionKey]: data,
//       },
//       meta: {
//         ...prev.meta,
//         lastModified: new Date().toISOString()
//       }
//     }));
//   };

//   const handleSave = () => {
//     // In a real application, this would save to a database
//     toast({
//       title: "Resume saved successfully!",
//       description: "Your changes have been saved to the cloud.",
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-center space-y-4">
//             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//             <div className="space-y-2">
//               <h2 className="text-xl font-semibold text-gray-900">Loading Resume Builder</h2>
//               <p className="text-gray-600">Setting up your workspace...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       <ResumeHeader
//         resumeData={resumeData}
//         templateId={templateId}
//         onSave={handleSave}
//       />

//       <div className="flex flex-1 overflow-hidden relative">
//         {/* Sidebar */}
//         <div className={cn(
//           "transition-all duration-300 ease-in-out",
//           sidebarCollapsed ? "w-0" : "w-auto"
//         )}>
//           <EditorSidebar
//             resumeData={resumeData}
//             activeSection={activeSection}
//             onSectionChange={handleSectionChange}
//             onDataChange={handleDataChange}
//             handleNestedDataChange={handleNestedDataChange}
//           />
//         </div>

//         {/* Collapse/Expand Button */}
//         <button
//           onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//           className={cn(
//             "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-r-lg p-2 shadow-lg hover:shadow-xl transition-all duration-200",
//             sidebarCollapsed ? "translate-x-0" : "translate-x-[440px]"
//           )}
//         >
//           <div className={cn(
//             "w-4 h-4 transition-transform duration-200",
//             sidebarCollapsed ? "rotate-0" : "rotate-180"
//           )}>
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <polyline points="15,18 9,12 15,6"></polyline>
//             </svg>
//           </div>
//         </button>

//         {/* Preview */}
//         <div className="flex-1">
//           <ResumePreview resumeData={resumeData} templateId={templateId} />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { EditorSidebar } from "@/components/builder/editor-sidebar";
import { ResumePreview } from "@/components/builder/resume-preview";
import { ResumeHeader } from "@/components/builder/resume-header";
import { useToast } from "@/hooks/use-toast";
import { initialResumeState } from "@/lib/resume-data";
import { ResumeData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ResumeBuilder() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "professional";

  const [resumeData, setResumeData] = useState<ResumeData>(
    initialResumeState
  );
  const [activeSection, setActiveSection] = useState("personal");
  const [isLoading, setIsLoading] = useState(true);

  // ◀︎ NEW:
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewCollapsed, setPreviewCollapsed] = useState(false);

  const { toast } = useToast();

  // simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleDataChange = (sectionKey: string, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [sectionKey]: data,
      meta: { ...prev.meta, lastModified: new Date().toISOString() },
    }));
  };

  const handleNestedDataChange = (sectionKey: string, data: any) => {
    setResumeData((prev: any) => ({
      ...prev,
      sections: { ...prev.sections, [sectionKey]: data },
      meta: { ...prev.meta, lastModified: new Date().toISOString() },
    }));
  };

  const handleSave = () => {
    toast({
      title: "Resume saved successfully!",
      description: "Your changes have been saved to the cloud.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="text-xl font-semibold text-gray-900">
              Loading Resume Builder
            </h2>
            <p className="text-gray-600">Setting up your workspace…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* ─── Header ──────────────────────────────────────────── */}
      <ResumeHeader
        resumeData={resumeData}
        templateId={templateId}
        onSave={handleSave}
      />

      {/* ─── Main Area ──────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* ─── Sidebar ───────────────────────────────────────── */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            sidebarCollapsed ? "w-0" : "w-auto"
          )}
        >
          <EditorSidebar
            resumeData={resumeData}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onDataChange={handleDataChange}
            handleNestedDataChange={handleNestedDataChange}

            // ◀︎ pass collapse props down:
            collapsed={sidebarCollapsed}
            onToggleCollapse={() =>
              setSidebarCollapsed((c) => !c)
            }
          />
        </div>

        {/* ─── Sidebar toggle button ─────────────────────────── */}
        <button
          onClick={() =>
            setSidebarCollapsed((c) => !c)
          }
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-r-lg p-2 shadow-lg hover:shadow-xl transition-all duration-200"
          )}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* ─── Preview ───────────────────────────────────────── */}
        <div
          className={cn(
            "flex flex-col transition-all duration-300 ease-in-out",
            previewCollapsed ? "w-0 overflow-hidden" : "flex-1"
          )}
        >
          {/* Preview collapse header */}
          <div className="flex justify-end bg-gray-100 border-b p-2">
            <button
              onClick={() =>
                setPreviewCollapsed((c) => !c)
              }
              className="p-2 rounded hover:bg-gray-200 transition"
            >
              {previewCollapsed ? (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Only render the preview when expanded */}
          {!previewCollapsed && (
            <div className="flex-1 overflow-auto">
              <ResumePreview
                resumeData={resumeData}
                templateId={templateId}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
