"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { EditorSidebar } from "@/components/builder/editor-sidebar";
import { ResumePreview } from "@/components/builder/resume-preview";
import { ResumeHeader } from "@/components/builder/resume-header";
import { useToast } from "@/hooks/use-toast";
import { initialResumeState } from "@/lib/resume-data";
import { ResumeData } from "@/lib/types";

export function ResumeBuilder() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "professional";
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);
  const [activeSection, setActiveSection] = useState("personal");
  const { toast } = useToast();

  console.log("INITAL", initialResumeState);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleDataChange = (sectionKey: string, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [sectionKey]: data,
    }));
  };


const handleNestedDataChange = (sectionKey: string, data: any) => {
  console.log("data", data, "sectionKey", sectionKey);

  setResumeData((prev: any) => ({
    ...prev,
    sections: {
      ...prev.sections,
      [sectionKey]: data,
    },
  }));

  console.log("Boom",resumeData)
};


  const handleSave = () => {
    // In a real application, this would save to a database
    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully.",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <ResumeHeader
        resumeData={resumeData}
        templateId={templateId}
        onSave={handleSave}
      />

      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar
          resumeData={resumeData}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onDataChange={handleDataChange}
          handleNestedDataChange={handleNestedDataChange}
        />

        <ResumePreview resumeData={resumeData} templateId={templateId} />
      </div>
    </div>
  );
}
