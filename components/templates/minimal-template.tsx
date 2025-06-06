"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface MinimalTemplateProps {
  resumeData: ResumeData;
}

export function MinimalTemplate({ resumeData }: MinimalTemplateProps) {
  const { personal, sections, settings } = resumeData;
  
  return (
    <div className="w-full h-full p-10 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{personal.name}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{personal.title}</h2>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
          {personal.github && <div>{personal.github}</div>}
          {personal.website && <div>{personal.website}</div>}
        </div>
      </header>
      
      {/* Summary */}
      {personal.summary && (
        <section className="mb-6">
          <p className="text-center">{personal.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {sections.experience.visible && sections.experience.items && sections.experience.items.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-4 text-center uppercase tracking-wide">{sections.experience.title}</h3>
          
          <div className="space-y-6">
            {sections.experience.items.map((experience) => (
              <div key={experience.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold">{experience.position}</h4>
                  <span className="text-sm text-gray-600">
                    {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-3">
                  <h5 className="text-gray-700">{experience.company}</h5>
                  <span className="text-sm text-gray-600">{experience.location}</span>
                </div>
                <ul className="list-disc ml-5 space-y-1">
                  {experience.description.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {sections.education.visible && sections.education.items && sections.education.items.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-4 text-center uppercase tracking-wide">{sections.education.title}</h3>
          
          <div className="space-y-4">
            {sections.education.items.map((education) => (
              <div key={education.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold">{education.institution}</h4>
                  <span className="text-sm text-gray-600">
                    {formatDate(education.startDate)} - {formatDate(education.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <h5 className="text-gray-700">
                    {education.degree} {education.field ? `in ${education.field}` : ''}
                  </h5>
                  <span className="text-sm text-gray-600">{education.location}</span>
                </div>
                {education.gpa && (
                  <div className="text-sm">GPA: {education.gpa}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-4 text-center uppercase tracking-wide">{sections.skills.title}</h3>
          
          <div className="space-y-3">
            {sections.skills.groups.map((group) => (
              <div key={group.id}>
                <h4 className="font-bold text-sm mb-1">{group.name}:</h4>
                <p>{group.skills.map(skill => skill.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {sections.projects.visible && sections.projects.items && sections.projects.items.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-4 text-center uppercase tracking-wide">{sections.projects.title}</h3>
          
          <div className="space-y-4">
            {sections.projects.items.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold">{project.name}</h4>
                  {project.url && (
                    <a href={project.url} className="text-sm text-gray-600">{project.url}</a>
                  )}
                </div>
                <p className="text-sm">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mt-1 text-sm text-gray-600">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      <div className="flex flex-wrap">
        {/* Certifications */}
        {sections.certifications.visible && sections.certifications.items && sections.certifications.items.length > 0 && (
          <section className="mb-4 w-full md:w-1/2 md:pr-4">
            <h3 className="text-lg font-bold mb-3 text-center uppercase tracking-wide">{sections.certifications.title}</h3>
            
            <ul className="list-inside space-y-1">
              {sections.certifications.items.map((certification) => (
                <li key={certification.id}>
                  <span className="font-medium">{certification.name}</span>
                  {certification.organization && (
                    <span className="text-gray-600"> - {certification.organization}</span>
                  )}
                  <span className="text-sm text-gray-600 ml-1">({formatDate(certification.date)})</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        
        {/* Languages */}
        {sections.languages.visible && sections.languages.items && sections.languages.items.length > 0 && (
          <section className="mb-4 w-full md:w-1/2 md:pl-4">
            <h3 className="text-lg font-bold mb-3 text-center uppercase tracking-wide">{sections.languages.title}</h3>
            
            <ul className="list-inside space-y-1">
              {sections.languages.items.map((language) => (
                <li key={language.id}>
                  <span className="font-medium">{language.name}</span>
                  <span className="text-gray-600"> - {language.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      
      {/* Interests */}
      {sections.interests.visible && sections.interests.items && sections.interests.items.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-center uppercase tracking-wide">{sections.interests.title}</h3>
          
          <p className="text-center">{sections.interests.items.map(interest => interest.name).join(' • ')}</p>
        </section>
      )}
    </div>
  );
}