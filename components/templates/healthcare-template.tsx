"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface HealthcareTemplateProps {
  resumeData: ResumeData;
}

export function HealthcareTemplate({ resumeData }: HealthcareTemplateProps) {
  const { personal, sections } = resumeData;
  
  return (
    <div className="w-full h-full p-8 flex flex-col font-sans text-gray-900 bg-white">
      {/* Header */}
      <header className="mb-8 pb-6 border-b-2 border-blue-600">
        <h1 className="text-3xl font-bold mb-2 text-blue-800">{personal.name}</h1>
        <h2 className="text-xl mb-4 text-blue-600">{personal.title}</h2>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <div className="mb-1"><span className="font-medium">Email:</span> {personal.email}</div>
            <div className="mb-1"><span className="font-medium">Phone:</span> {personal.phone}</div>
            <div><span className="font-medium">Location:</span> {personal.location}</div>
          </div>
          <div>
            {personal.linkedin && <div className="mb-1"><span className="font-medium">LinkedIn:</span> {personal.linkedin}</div>}
            {personal.website && <div className="mb-1"><span className="font-medium">Website:</span> {personal.website}</div>}
          </div>
        </div>
      </header>
      
      {/* Professional Summary */}
      {personal.summary && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-3 text-blue-800 border-b border-blue-300 pb-1">PROFESSIONAL SUMMARY</h3>
          <p className="text-sm leading-relaxed">{personal.summary}</p>
        </section>
      )}
      
      {/* Clinical Experience */}
      {sections.experience.visible && sections.experience.items && sections.experience.items.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-blue-800 border-b border-blue-300 pb-1">CLINICAL EXPERIENCE</h3>
          
          <div className="space-y-6">
            {sections.experience.items.map((experience) => (
              <div key={experience.id}>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-base text-gray-800">{experience.position}</h4>
                  <span className="text-sm text-gray-600">
                    {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-3">
                  <h5 className="text-blue-600 font-medium">{experience.company}</h5>
                  <span className="text-sm text-gray-600">{experience.location}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  {experience.description.map((point:any, index:any) => (
                    <li key={index} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="mt-3 text-sm">
                    <span className="font-medium text-blue-700">Specializations: </span>
                    <span className="text-gray-600">{experience.technologies.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education & Training */}
      {sections.education.visible && sections.education.items && sections.education.items.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-blue-800 border-b border-blue-300 pb-1">EDUCATION & TRAINING</h3>
          
          <div className="space-y-4">
            {sections.education.items.map((education) => (
              <div key={education.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-base">{education.degree} in {education.field}</h4>
                  <span className="text-sm text-gray-600">
                    {formatDate(education.startDate)} - {formatDate(education.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <h5 className="text-blue-600 font-medium">{education.institution}</h5>
                  <span className="text-sm text-gray-600">{education.location}</span>
                </div>
                {education.gpa && (
                  <div className="text-sm text-gray-600">GPA: {education.gpa}</div>
                )}
                {education.description && (
                  <p className="text-sm mt-2 leading-relaxed">{education.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      <div className="grid grid-cols-2 gap-8">
        {/* Clinical Skills */}
        {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-blue-800 border-b border-blue-300 pb-1">CLINICAL SKILLS</h3>
            
            <div className="space-y-3">
              {sections.skills.groups.map((group) => (
                <div key={group.id}>
                  <h4 className="font-bold text-sm mb-1 text-blue-700">{group.name}</h4>
                  <p className="text-sm leading-relaxed">{group.skills.map(skill => skill.name).join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Certifications & Licenses */}
        {sections.certifications.visible && sections.certifications.items && sections.certifications.items.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-blue-800 border-b border-blue-300 pb-1">CERTIFICATIONS & LICENSES</h3>
            
            <div className="space-y-3">
              {sections.certifications.items.map((certification) => (
                <div key={certification.id}>
                  <div className="font-medium text-sm">{certification.name}</div>
                  <div className="text-sm text-gray-600">
                    {certification.organization} • {formatDate(certification.date)}
                  </div>
                  {certification.url && (
                    <div className="text-xs text-blue-600">{certification.url}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      
      {/* Research & Publications */}
      {sections.projects.visible && sections.projects.items && sections.projects.items.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-blue-800 border-b border-blue-300 pb-1">RESEARCH & PUBLICATIONS</h3>
          
          <div className="space-y-4">
            {sections.projects.items.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-base">{project.name}</h4>
                  {project.url && (
                    <a href={project.url} className="text-sm text-blue-600 hover:underline">{project.url}</a>
                  )}
                </div>
                <p className="text-sm leading-relaxed mb-2">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Research Areas: </span>
                    {project.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      <div className="grid grid-cols-2 gap-8">
        {/* Languages */}
        {sections.languages.visible && sections.languages.items && sections.languages.items.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3 text-blue-800 border-b border-blue-300 pb-1">LANGUAGES</h3>
            
            <ul className="space-y-1 text-sm">
              {sections.languages.items.map((language) => (
                <li key={language.id}>
                  <span className="font-medium">{language.name}</span>
                  <span className="text-gray-600"> - {language.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {/* Professional Memberships */}
        {sections.interests.visible && sections.interests.items && sections.interests.items.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3 text-blue-800 border-b border-blue-300 pb-1">PROFESSIONAL MEMBERSHIPS</h3>
            
            <p className="text-sm leading-relaxed">{sections.interests.items.map(interest => interest.name).join(', ')}</p>
          </section>
        )}
      </div>
    </div>
  );
}