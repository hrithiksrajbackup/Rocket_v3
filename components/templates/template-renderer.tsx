"use client";

import { ResumeData } from '@/lib/types';
import { ProfessionalTemplate } from './professional-template';
import { ModernTemplate } from './modern-template';
import { MinimalTemplate } from './minimal-template';
import { ExecutiveTemplate } from './executive-template';
import { CreativeTemplate } from './creative-template';
import { TechnicalTemplate } from './technical-template';
import { AcademicTemplate } from './academic-template';
import { HealthcareTemplate } from './healthcare-template';

interface TemplateRendererProps {
  resumeData: ResumeData;
  templateId: string;
}

export function TemplateRenderer({ resumeData, templateId }: TemplateRendererProps) {
  const renderTemplate = () => {
    switch (templateId) {
      case 'professional':
        return <ProfessionalTemplate resumeData={resumeData} />;
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate resumeData={resumeData} />;
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} />;
      case 'technical':
        return <TechnicalTemplate resumeData={resumeData} />;
      case 'academic':
        return <AcademicTemplate resumeData={resumeData} />;
      case 'healthcare':
        return <HealthcareTemplate resumeData={resumeData} />;
      case 'startup':
        return <ModernTemplate resumeData={resumeData} />; // Use modern as base
      case 'consulting':
        return <ProfessionalTemplate resumeData={resumeData} />; // Use professional as base
      case 'finance':
        return <ProfessionalTemplate resumeData={resumeData} />; // Use professional as base
      case 'sales':
        return <ModernTemplate resumeData={resumeData} />; // Use modern as base
      case 'marketing':
        return <CreativeTemplate resumeData={resumeData} />; // Use creative as base
      case 'legal':
        return <ProfessionalTemplate resumeData={resumeData} />; // Use professional as base
      case 'engineering':
        return <TechnicalTemplate resumeData={resumeData} />; // Use technical as base
      default:
        return <ProfessionalTemplate resumeData={resumeData} />;
    }
  };

  return (
    <div className="w-full h-full">
      {renderTemplate()}
    </div>
  );
}