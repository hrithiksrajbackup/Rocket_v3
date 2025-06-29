"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface AcademicTemplateProps {
  resumeData: ResumeData;
}

export function AcademicTemplate({ resumeData }: AcademicTemplateProps) {
  const { personal, sections } = resumeData;
  
  return (
    <div className="w-full h-full p-8 flex flex-col font-serif text-gray-900 bg-white">
      {/* Header */}
      <header className="mb-8 text-center border-b-2 border-gray-800 pb-6">
        <h1 className="text-4xl font-bold mb-2">{personal.name}</h1>
        <h2 className="text-xl mb-4 text-gray-700">{personal.title}</h2>
        
        <div className="flex flex-wrap justify-center text-sm text-gray-600 gap-4">
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.location}</div>
          {personal.website && <div>{personal.website}</div>}
        </div>
      </header>
      
      {/* Summary */}
      {personal.summary && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">RESEARCH INTERESTS</h3>
          <p className="text-sm leading-relaxed">{personal.summary}</p>
        </section>
      )}
      
      {/* Education */}
      {sections.education.visible && sections.education.items && sections.education.items.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800 border-b border-gray-300 pb-1">{sections.education.title}</h3>
          
          <div className="space-y-4">
            {sections.education.items.map((education) => (
              <div key={education.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-base">{education.degree} in {education.field}</h4>
                  <span className="text-sm text-gray-600">
                    {formatDate(education.startDate)} - {formatDate(education.endDate)}
                  </span>
                </div>
                <div className="text-gray-700 font-medium mb-1">{education.institution}, {education.location}</div>
                {education.gpa && (
                  <div className="text-sm">GPA: {education.gpa}</div>
                )}
                {education.description && (
                  <p className="text-sm mt-2 leading-relaxed">{education.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Experience */}
      {sections.experience.visible && sections.experience.items && sections.experience.items.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800 border-b border-gray-300 pb-1">ACADEMIC EXPERIENCE</h3>
          
          <div className="space-y-6">
            {sections.experience.items.map((experience) => (
              <div key={experience.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-base">{experience.position}</h4>
                  <span className="text-sm text-gray-600">
                    {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                  </span>
                </div>
                <div className="text-gray-700 font-medium mb-2">{experience.company}, {experience.location}</div>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  {experience.description.map((point:any, index:any) => (
                    <li key={index} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Publications/Projects */}
      {sections.projects.visible && sections.projects.items && sections.projects.items.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800 border-b border-gray-300 pb-1">PUBLICATIONS & RESEARCH</h3>
          
          <div className="space-y-4">
            {sections.projects.items.map((project) => (
              <div key={project.id}>
                <h4 className="font-bold text-base mb-1">{project.name}</h4>
                <p className="text-sm leading-relaxed mb-2">{project.description}</p>
                {project.url && (
                  <div className="text-sm text-blue-600">{project.url}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-800 border-b border-gray-300 pb-1">TECHNICAL SKILLS</h3>
          
          <div className="space-y-3">
            {sections.skills.groups.map((group) => (
              <div key={group.id}>
                <h4 className="font-bold text-sm mb-1">{group.name}:</h4>
                <p className="text-sm leading-relaxed">{group.skills.map(skill => skill.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      <div className="grid grid-cols-2 gap-8">
        {/* Languages */}
        {sections.languages.visible && sections.languages.items && sections.languages.items.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">{sections.languages.title}</h3>
            
            <ul className="space-y-1 text-sm">
              {sections.languages.items.map((language) => (
                <li key={language.id}>
                  <span className="font-medium">{language.name}</span>
                  <span className="text-gray-600"> ({language.proficiency})</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {/* Certifications */}
        {sections.certifications.visible && sections.certifications.items && sections.certifications.items.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">CERTIFICATIONS</h3>
            
            <div className="space-y-2 text-sm">
              {sections.certifications.items.map((certification) => (
                <div key={certification.id}>
                  <div className="font-medium">{certification.name}</div>
                  <div className="text-gray-600">{certification.organization}, {formatDate(certification.date)}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}