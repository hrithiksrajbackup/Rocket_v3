"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ExecutiveTemplateProps {
  resumeData: ResumeData;
}

export function ExecutiveTemplate({ resumeData }: ExecutiveTemplateProps) {
  const { personal, sections } = resumeData;
  
  return (
    <div className="w-full h-full p-10 flex flex-col font-serif text-gray-900 bg-white">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3 text-gray-800">{personal.name}</h1>
        <h2 className="text-2xl mb-6 text-gray-600 font-light">{personal.title}</h2>
        
        <div className="flex flex-wrap justify-center text-sm text-gray-600 gap-6 border-t border-b border-gray-300 py-4">
          <div className="flex items-center">
            <span className="font-medium">Email:</span>
            <span className="ml-1">{personal.email}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Phone:</span>
            <span className="ml-1">{personal.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Location:</span>
            <span className="ml-1">{personal.location}</span>
          </div>
          {personal.linkedin && (
            <div className="flex items-center">
              <span className="font-medium">LinkedIn:</span>
              <span className="ml-1">{personal.linkedin}</span>
            </div>
          )}
        </div>
      </header>
      
      {/* Executive Summary */}
      {personal.summary && (
        <section className="mb-10">
          <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-800 pb-2">EXECUTIVE SUMMARY</h3>
          <p className="text-base leading-relaxed text-justify">{personal.summary}</p>
        </section>
      )}
      
      {/* Professional Experience */}
      {sections.experience.visible && sections.experience.items && sections.experience.items.length > 0 && (
        <section className="mb-10">
          <h3 className="text-xl font-bold mb-6 text-gray-800 border-b-2 border-gray-800 pb-2">PROFESSIONAL EXPERIENCE</h3>
          
          <div className="space-y-8">
            {sections.experience.items.map((experience) => (
              <div key={experience.id}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{experience.position}</h4>
                    <h5 className="text-base font-semibold text-gray-700">{experience.company}</h5>
                    <div className="text-sm text-gray-600">{experience.location}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-600">
                      {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                    </span>
                  </div>
                </div>
                <ul className="list-disc ml-6 space-y-2 text-sm">
                  {experience.description.map((point:any, index:any) => (
                    <li key={index} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="mt-3 text-sm">
                    <span className="font-semibold text-gray-700">Key Technologies: </span>
                    <span className="text-gray-600">{experience.technologies.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {sections.education.visible && sections.education.items && sections.education.items.length > 0 && (
        <section className="mb-10">
          <h3 className="text-xl font-bold mb-6 text-gray-800 border-b-2 border-gray-800 pb-2">EDUCATION</h3>
          
          <div className="space-y-4">
            {sections.education.items.map((education) => (
              <div key={education.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-base">{education.degree} in {education.field}</h4>
                    <h5 className="font-semibold text-gray-700">{education.institution}</h5>
                    <div className="text-sm text-gray-600">{education.location}</div>
                    {education.gpa && (
                      <div className="text-sm text-gray-600">GPA: {education.gpa}</div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {formatDate(education.startDate)} - {formatDate(education.endDate)}
                  </span>
                </div>
                {education.description && (
                  <p className="text-sm mt-2 leading-relaxed text-gray-700">{education.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      <div className="grid grid-cols-2 gap-10">
        {/* Core Competencies */}
        {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-800 pb-2">CORE COMPETENCIES</h3>
            
            <div className="space-y-4">
              {sections.skills.groups.map((group) => (
                <div key={group.id}>
                  <h4 className="font-bold text-sm mb-2 text-gray-700">{group.name}</h4>
                  <div className="text-sm leading-relaxed text-gray-600">
                    {group.skills.map(skill => skill.name).join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Professional Certifications */}
        {sections.certifications.visible && sections.certifications.items && sections.certifications.items.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-800 pb-2">CERTIFICATIONS</h3>
            
            <div className="space-y-3">
              {sections.certifications.items.map((certification) => (
                <div key={certification.id}>
                  <div className="font-semibold text-sm">{certification.name}</div>
                  <div className="text-sm text-gray-600">
                    {certification.organization} • {formatDate(certification.date)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      
      {/* Board Positions / Projects */}
      {sections.projects.visible && sections.projects.items && sections.projects.items.length > 0 && (
        <section className="mt-10">
          <h3 className="text-xl font-bold mb-6 text-gray-800 border-b-2 border-gray-800 pb-2">STRATEGIC INITIATIVES</h3>
          
          <div className="space-y-4">
            {sections.projects.items.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-base">{project.name}</h4>
                  {project.url && (
                    <a href={project.url} className="text-sm text-blue-600 hover:underline">{project.url}</a>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Key Areas: </span>
                    {project.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}