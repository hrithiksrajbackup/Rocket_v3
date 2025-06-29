"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ExecutiveTemplateProps {
  resumeData: ResumeData;
}

export function ExecutiveTemplate({ resumeData }: ExecutiveTemplateProps) {
  const { personal, sections, settings } = resumeData;
  
  return (
    <div className="w-full h-full p-8 flex flex-col font-serif text-gray-900 bg-white">
      {/* Executive Header */}
      <header className="mb-8 pb-6 border-b-2 border-gray-800">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">{personal.name}</h1>
            <h2 className="text-2xl mb-4 text-gray-700 font-light">{personal.title}</h2>
            
            {/* Executive Summary */}
            {personal.summary && (
              <div className="mb-4">
                <p className="text-base leading-relaxed text-gray-800 max-w-3xl">{personal.summary}</p>
              </div>
            )}
          </div>
          
          {/* Profile Image */}
          {personal.profileImage && (
            <div className="ml-8">
              <img
                src={personal.profileImage}
                alt={personal.name}
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 shadow-lg"
              />
            </div>
          )}
        </div>
        
        {/* Contact Information */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-4">
          <div className="flex items-center">
            <span className="font-medium">Email:</span>
            <span className="ml-2">{personal.email}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Phone:</span>
            <span className="ml-2">{personal.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Location:</span>
            <span className="ml-2">{personal.location}</span>
          </div>
          {personal.linkedin && (
            <div className="flex items-center">
              <span className="font-medium">LinkedIn:</span>
              <span className="ml-2">{personal.linkedin}</span>
            </div>
          )}
        </div>
      </header>
      
      <div className="flex-1 space-y-8">
        {/* Executive Experience */}
        {sections.experience.visible && sections.experience.items && sections.experience.items.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-300 pb-2">
              EXECUTIVE EXPERIENCE
            </h3>
            
            <div className="space-y-6">
              {sections.experience.items.map((experience) => (
                <div key={experience.id} className="border-l-4 border-gray-800 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{experience.position}</h4>
                      <h5 className="text-base font-semibold text-gray-700">{experience.company}</h5>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div>{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</div>
                      <div>{experience.location}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {experience.description.map((point: any, index: any) => (
                      <div key={index} className="flex items-start">
                        <span className="text-gray-800 mr-3 mt-2">▪</span>
                        <p className="text-sm leading-relaxed text-gray-800">{point}</p>
                      </div>
                    ))}
                  </div>
                  
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div className="mt-3">
                      <span className="text-xs font-semibold text-gray-600">Key Technologies: </span>
                      <span className="text-xs text-gray-600">{experience.technologies.join(', ')}</span>
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
            <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-300 pb-2">
              EDUCATION
            </h3>
            
            <div className="space-y-4">
              {sections.education.items.map((education) => (
                <div key={education.id} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900">{education.degree} in {education.field}</h4>
                    <h5 className="text-gray-700">{education.institution}</h5>
                    {education.gpa && (
                      <p className="text-sm text-gray-600">GPA: {education.gpa}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>{formatDate(education.startDate)} - {formatDate(education.endDate)}</div>
                    <div>{education.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        <div className="grid grid-cols-2 gap-8">
          {/* Core Competencies */}
          {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-300 pb-2">
                CORE COMPETENCIES
              </h3>
              
              <div className="space-y-3">
                {sections.skills.groups.map((group) => (
                  <div key={group.id}>
                    <h4 className="font-semibold text-gray-800 mb-1">{group.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span key={skill.id} className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Certifications */}
          {sections.certifications.visible && sections.certifications.items && sections.certifications.items.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-300 pb-2">
                CERTIFICATIONS
              </h3>
              
              <div className="space-y-2">
                {sections.certifications.items.map((certification) => (
                  <div key={certification.id}>
                    <h4 className="font-semibold text-gray-800">{certification.name}</h4>
                    <p className="text-sm text-gray-600">
                      {certification.organization} • {formatDate(certification.date)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}