
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
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export function ResumeBuilder() {
//   const searchParams = useSearchParams();
//   const templateId = searchParams.get("template") || "professional";

//   const [resumeData, setResumeData] = useState<ResumeData>(
//     initialResumeState
//   );
//   const [activeSection, setActiveSection] = useState("personal");
//   const [isLoading, setIsLoading] = useState(true);

//   // ◀︎ NEW:
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [previewCollapsed, setPreviewCollapsed] = useState(false);

//   const { toast } = useToast();

//   // simulate loading
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSectionChange = (section: string) => {
//     setActiveSection(section);
//   };

//   const handleDataChange = (sectionKey: string, data: any) => {
//     setResumeData((prev) => ({
//       ...prev,
//       [sectionKey]: data,
//       meta: { ...prev.meta, lastModified: new Date().toISOString() },
//     }));
//   };

//   const handleNestedDataChange = (sectionKey: string, data: any) => {
//     setResumeData((prev: any) => ({
//       ...prev,
//       sections: { ...prev.sections, [sectionKey]: data },
//       meta: { ...prev.meta, lastModified: new Date().toISOString() },
//     }));
//   };

//   const handleSave = () => {
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
//             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
//             <h2 className="text-xl font-semibold text-gray-900">
//               Loading Resume Builder
//             </h2>
//             <p className="text-gray-600">Setting up your workspace…</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* ─── Header ──────────────────────────────────────────── */}
//       <ResumeHeader
//         resumeData={resumeData}
//         templateId={templateId}
//         onSave={handleSave}
//       />

//       {/* ─── Main Area ──────────────────────────────────────── */}
//       <div className="flex flex-1 overflow-hidden relative">
//         {/* ─── Sidebar ───────────────────────────────────────── */}
//         <div
//           className={cn(
//             "transition-all duration-300 ease-in-out",
//             sidebarCollapsed ? "w-0" : "w-auto"
//           )}
//         >
//           <EditorSidebar
//             resumeData={resumeData}
//             activeSection={activeSection}
//             onSectionChange={handleSectionChange}
//             onDataChange={handleDataChange}
//             handleNestedDataChange={handleNestedDataChange}

//             // ◀︎ pass collapse props down:
//             collapsed={sidebarCollapsed}
//             onToggleCollapse={() =>
//               setSidebarCollapsed((c) => !c)
//             }
//           />
//         </div>

//         {/* ─── Sidebar toggle button ─────────────────────────── */}
//         <button
//           onClick={() =>
//             setSidebarCollapsed((c) => !c)
//           }
//           className={cn(
//             "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-r-lg p-2 shadow-lg hover:shadow-xl transition-all duration-200"
//           )}
//         >
//           {sidebarCollapsed ? (
//             <ChevronRight className="w-5 h-5 text-gray-600" />
//           ) : (
//             <ChevronLeft className="w-5 h-5 text-gray-600" />
//           )}
//         </button>

//         {/* ─── Preview ───────────────────────────────────────── */}
//         <div
//           className={cn(
//             "flex flex-col transition-all duration-300 ease-in-out",
//             previewCollapsed ? "w-0 overflow-hidden" : "flex-1"
//           )}
//         >
//           {/* Preview collapse header */}
//           <div className="flex justify-end bg-gray-100 border-b p-2">
//             <button
//               onClick={() =>
//                 setPreviewCollapsed((c) => !c)
//               }
//               className="p-2 rounded hover:bg-gray-200 transition"
//             >
//               {previewCollapsed ? (
//                 <ChevronLeft className="w-5 h-5 text-gray-600" />
//               ) : (
//                 <ChevronRight className="w-5 h-5 text-gray-600" />
//               )}
//             </button>
//           </div>

//           {/* Only render the preview when expanded */}
//           {!previewCollapsed && (
//             <div className="flex-1 overflow-auto">
//               <ResumePreview
//                 resumeData={resumeData}
//                 templateId={templateId}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { EditorSidebar } from "@/components/builder/editor-sidebar";
import { ResumePreview } from "@/components/builder/resume-preview";
import { ResumeHeader } from "@/components/builder/resume-header";
import { useToast } from "@/hooks/use-toast";
import { initialResumeState } from "@/lib/resume-data";
import { ResumeData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function ResumeBuilder() {
  const searchParams = useSearchParams();
  const { user, isLoaded } = useUser();
  const templateId = searchParams.get("template") || "professional";
  const resumeId = searchParams.get("resume");

  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);
  const [activeSection, setActiveSection] = useState("personal");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(resumeId);

  // Sidebar and preview collapse states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewCollapsed, setPreviewCollapsed] = useState(false);

  const { toast } = useToast();

  // Fetch resume data from database
  useEffect(() => {
    const fetchResumeData = async () => {
      if (!isLoaded) return;
      
      setIsLoading(true);
      setError(null);

      try {
        if (resumeId && user?.id) {
          // Fetch existing resume
          const response = await fetch(`/api/resumes/${resumeId}?userId=${user.id}`);
          
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('Resume not found. It may have been deleted.');
            }
            throw new Error('Failed to load resume');
          }
          
          const resumeFromDb = await response.json();
          
          // Transform database resume to ResumeData format
          const transformedData: ResumeData = {
            personal: resumeFromDb.personal || {},
            sections: resumeFromDb.sections || {},
            settings: {
              template: resumeFromDb.templateId || templateId,
              fontSize: resumeFromDb.settings?.fontSize || "medium",
              fontFamily: resumeFromDb.settings?.fontFamily || "Inter",
              lineSpacing: resumeFromDb.settings?.lineSpacing || "normal",
              ...resumeFromDb.settings
            },
            meta: {
              created: resumeFromDb.createdAt || new Date().toISOString(),
              lastModified: resumeFromDb.updatedAt || new Date().toISOString(),
              version: resumeFromDb.version || 1,
              exportCount: resumeFromDb.exportCount || 0,
            }
          };
          
          setResumeData(transformedData);
          setCurrentResumeId(resumeId);
          
          toast({
            title: "Resume Loaded",
            description: `Loaded "${resumeFromDb.title}" (Version ${resumeFromDb.version})`,
          });
        } else {
          // Use initial state for new resume, but set template
          const newResumeData = {
            ...initialResumeState,
            settings: {
              ...initialResumeState.settings,
              template: templateId,
            }
          };
          setResumeData(newResumeData);
          setCurrentResumeId(null);
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
        setError(error instanceof Error ? error.message : 'Failed to load resume');
        
        // Fallback to initial state
        setResumeData({
          ...initialResumeState,
          settings: {
            ...initialResumeState.settings,
            template: templateId,
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId, user?.id, isLoaded, templateId, toast]);

  // Update template when template parameter changes
  useEffect(() => {
    if (templateId) {
      setResumeData(prev => ({
        ...prev,
        settings: {
          ...prev.settings,
          template: templateId,
        }
      }));
    }
  }, [templateId]);

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

  const handleSave = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your resume.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (currentResumeId) {
        // Update existing resume
        const response = await fetch(`/api/resumes/${currentResumeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            updates: {
              personal: resumeData.personal,
              sections: resumeData.sections,
              settings: resumeData.settings,
              templateId: resumeData.settings.template,
            },
            changeDescription: 'Resume updated from builder',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save resume');
        }

        const data = await response.json();
        
        toast({
          title: "Resume Saved",
          description: `Your resume has been updated (Version ${data.resume.version}).`,
        });
      } else {
        // Create new resume
        const response = await fetch('/api/resumes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            resumeData: {
              personal: resumeData.personal,
              sections: resumeData.sections,
              settings: resumeData.settings,
              templateId: resumeData.settings.template,
            },
            title: resumeData.personal?.name 
              ? `${resumeData.personal.name}'s Resume` 
              : 'Untitled Resume',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create resume');
        }

        const data = await response.json();
        setCurrentResumeId(data.resume._id);
        
        // Update URL without page reload
        const newUrl = `/builder?resume=${data.resume._id}`;
        window.history.replaceState({}, '', newUrl);
        
        toast({
          title: "Resume Created",
          description: "Your resume has been saved successfully.",
        });
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResumeIdChange = (newResumeId: string) => {
    setCurrentResumeId(newResumeId);
  };

  const retryLoad = () => {
    setError(null);
    window.location.reload();
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="text-xl font-semibold text-gray-900">
              Initializing...
            </h2>
            <p className="text-gray-600">Please wait while we set up your account</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="text-xl font-semibold text-gray-900">
              Loading Resume Builder
            </h2>
            <p className="text-gray-600">
              {resumeId ? 'Loading your resume...' : 'Setting up your workspace...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="mt-2">
                <strong>Error loading resume:</strong>
                <br />
                {error}
              </AlertDescription>
            </Alert>
            <div className="flex gap-2 mt-4">
              <Button onClick={retryLoad} variant="outline">
                Try Again
              </Button>
              <Button onClick={() => window.location.href = '/dashboard'}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <ResumeHeader
        resumeData={resumeData}
        templateId={resumeData.settings.template}
        onSave={handleSave}
        resumeId={currentResumeId || undefined}
        onResumeIdChange={handleResumeIdChange}
      />

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
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
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
          />
        </div>

        {/* Sidebar toggle button */}
        <button
          onClick={() => setSidebarCollapsed((c) => !c)}
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

        {/* Preview */}
        <div
          className={cn(
            "flex flex-col transition-all duration-300 ease-in-out",
            previewCollapsed ? "w-0 overflow-hidden" : "flex-1"
          )}
        >
          {/* Preview collapse header */}
          <div className="flex justify-end bg-gray-100 border-b p-2">
            <button
              onClick={() => setPreviewCollapsed((c) => !c)}
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
                templateId={resumeData.settings.template}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}