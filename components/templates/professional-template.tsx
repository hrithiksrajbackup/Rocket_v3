"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ProfessionalTemplateProps {
  resumeData: ResumeData;
}

export function ProfessionalTemplate({ resumeData }: ProfessionalTemplateProps) {
  const { personal, sections, settings } = resumeData;
  
  return (
    <div className="w-full h-full p-8 flex flex-col font-sans text-[#333] bg-white">
      {/* Header */}
      <header className="mb-6 pb-6 border-b-2 border-gray-300">
        <h1 className="text-3xl font-bold mb-1">{personal.name}</h1>
        <h2 className="text-xl mb-3 text-gray-600">{personal.title}</h2>
        
        <div className="flex flex-wrap text-sm text-gray-600">
          <div className="mr-6 mb-2">{personal.location}</div>
          <div className="mr-6 mb-2">{personal.phone}</div>
          <div className="mr-6 mb-2">{personal.email}</div>
          {personal.linkedin && <div className="mr-6 mb-2">{personal.linkedin}</div>}
          {personal.github && <div className="mr-6 mb-2">{personal.github}</div>}
          {personal.website && <div className="mb-2">{personal.website}</div>}
        </div>
      </header>
      
      <div className="flex-1 space-y-6">
        {/* Summary */}
        {personal.summary && (
          <section>
            <h3 className="text-lg font-bold mb-2">Professional Summary</h3>
            <p className="text-sm leading-relaxed">{personal.summary}</p>
          </section>
        )}
        
        {/* Experience */}
        {sections.experience.visible && sections.experience.items && sections.experience.items.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">{sections.experience.title}</h3>
            
            <div className="space-y-4">
              {sections.experience.items.map((experience) => (
                <div key={experience.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-base">{experience.position}</h4>
                    <span className="text-sm text-gray-600">
                      {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h5 className="text-gray-700 font-medium">{experience.company}</h5>
                    <span className="text-sm text-gray-600">{experience.location}</span>
                  </div>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    {experience.description.map((point:any, index:any) => (
                      <li key={index} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Technologies:</strong> {experience.technologies.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education */}
        {sections.education.visible && sections.education.items && sections.education.items.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">{sections.education.title}</h3>
            
            <div className="space-y-3">
              {sections.education.items.map((education) => (
                <div key={education.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold">{education.institution}</h4>
                    <span className="text-sm text-gray-600">
                      {formatDate(education.startDate)} - {formatDate(education.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h5 className="text-gray-700">
                      {education.degree} {education.field ? `in ${education.field}` : ''}
                      {education.gpa ? `, GPA: ${education.gpa}` : ''}
                    </h5>
                    <span className="text-sm text-gray-600">{education.location}</span>
                  </div>
                  {education.description && (
                    <p className="text-sm mt-1 leading-relaxed">{education.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Skills */}
        {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">{sections.skills.title}</h3>
            
            <div className="space-y-2">
              {sections.skills.groups.map((group) => (
                <div key={group.id}>
                  <h4 className="font-bold text-sm mb-1">{group.name}:</h4>
                  <p className="text-sm leading-relaxed">{group.skills.map(skill => skill.name).join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {sections.projects.visible && sections.projects.items && sections.projects.items.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">{sections.projects.title}</h3>
            
            <div className="space-y-3">
              {sections.projects.items.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold">{project.name}</h4>
                    {project.url && (
                      <a href={project.url} className="text-sm text-blue-600 hover:underline">{project.url}</a>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed mb-1">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <strong>Technologies:</strong> {project.technologies.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Certifications */}
        {sections.certifications.visible && sections.certifications.items && sections.certifications.items.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">{sections.certifications.title}</h3>
            
            <div className="space-y-2">
              {sections.certifications.items.map((certification) => (
                <div key={certification.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-medium">{certification.name}</span>
                    {certification.organization && (
                      <span className="text-gray-600"> • {certification.organization}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{formatDate(certification.date)}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        
        <div className="grid grid-cols-2 gap-6">
          {/* Languages */}
          {sections.languages.visible && sections.languages.items && sections.languages.items.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">{sections.languages.title}</h3>
              
              <ul className="space-y-1">
                {sections.languages.items.map((language) => (
                  <li key={language.id} className="text-sm">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-gray-600"> - {language.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* Interests */}
          {sections.interests.visible && sections.interests.items && sections.interests.items.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">{sections.interests.title}</h3>
              
              <p className="text-sm leading-relaxed">{sections.interests.items.map(interest => interest.name).join(', ')}</p>
            </section>
          )}
        </div>
        
        {/* References */}
        {sections.references.visible && sections.references.items && sections.references.items.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">{sections.references.title}</h3>
            
            <div className="space-y-3">
              {sections.references.items.map((reference) => (
                <div key={reference.id} className="text-sm">
                  <div className="font-bold">{reference.name}</div>
                  <div className="text-gray-700">{reference.position}, {reference.company}</div>
                  {reference.email && <div className="text-gray-600">{reference.email}</div>}
                  {reference.phone && <div className="text-gray-600">{reference.phone}</div>}
                  {reference.reference && <div className="italic mt-1 text-gray-600">"{reference.reference}"</div>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}