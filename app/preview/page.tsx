"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Edit } from "lucide-react";
import Link from "next/link";
import { ResumeData } from "@/lib/types";
import { initialResumeState } from "@/lib/resume-data";
import { ProfessionalTemplate } from "@/components/templates/professional-template";
import { ModernTemplate } from "@/components/templates/modern-template";
import { MinimalTemplate } from "@/components/templates/minimal-template";
import { ExportButton } from "@/components/builder/export-button";

export default function PreviewPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get('resume');
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);
  const [templateId, setTemplateId] = useState('professional');

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (resumeId && user?.id) {
      // Load resume data from localStorage (in production, this would be from a database)
      const savedData = localStorage.getItem(`resume_${resumeId}_${user.id}`);
      if (savedData) {
        const data = JSON.parse(savedData);
        setResumeData(data);
        setTemplateId(data.settings?.template || 'professional');
      }
    }
  }, [resumeId, user?.id]);

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} />;
      case 'professional':
      default:
        return <ProfessionalTemplate resumeData={resumeData} />;
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-lg font-semibold text-gray-900">Resume Preview</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link href={`/builder?resume=${resumeId}`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Resume
                </Button>
              </Link>
              <ExportButton
                resumeData={resumeData}
                elementId="resume-preview-content"
                variant="default"
                size="sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Preview Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div 
            id="resume-preview-content"
            className="w-full"
            style={{ 
              width: '210mm',
              minHeight: '297mm',
              margin: '0 auto',
              backgroundColor: 'white'
            }}
          >
            {renderTemplate()}
          </div>
        </div>
      </main>
    </div>
  );
}