"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface TechnicalTemplateProps {
  resumeData: ResumeData;
}

export function TechnicalTemplate({ resumeData }: TechnicalTemplateProps) {
  const { personal, sections, settings } = resumeData;
  
  return (
    <div className="w-full h-full p-8 flex flex-col font-mono text-gray-900 bg-white">
      {/* Header */}
      <header className="mb-8 pb-6 border-b-2 border-blue-600">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 font-sans">{personal.name}</h1>
            <h2 className="text-xl mb-4 text-blue-600 font-sans">{personal.title}</h2>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="mb-1"><span className="text-gray-600">Email:</span> {personal.email}</div>
                <div className="mb-1"><span className="text-gray-600">Phone:</span> {personal.phone}</div>
              </div>
              <div>
                <div className="mb-1"><span className="text-gray-600">Location:</span> {personal.location}</div>
                {personal.github && (
                  <div className="mb-1"><span className="text-gray-600">GitHub:</span> {personal.github}</div>
                )}
              </div>
            </div>
          </div>
          
          {personal.profileImage && (
            <div className="ml-8">
              <img
                src={personal.profileImage}
                alt={personal.name}
                className="w-24 h-24 object-cover rounded border-2 border-blue-600"
              />
            </div>
          )}
        </div>
      </header>
      
      <div className="flex-1 space-y-8">
        {/* Summary */}
        {personal.summary && (
          <section>
            <h3 className="text-lg font-bold mb-3 text-blue-600 font-sans">// TECHNICAL SUMMARY</h3>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-600">
              <p className="text-sm leading-relaxed font-sans">{personal.summary}</p>
            </div>
          </section>
        )}
        
        {/* Technical Skills Matrix */}
        {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-4 text-blue-600 font-sans">// TECHNICAL SKILLS</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.skills.groups.map((group) => (
                <div key={group.id} className="bg-gray-50 p-4 rounded">
                  <h4 className="font-bold text-gray-900 mb-3 font-sans">{group.name}</h4>
                  <div className="space-y-2">
                    {group.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <span className="text-sm">{skill.name}</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-3 h-3 rounded-sm ${
                                level <= skill.level 
                                  ? 'bg-blue-600' 
                                  : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Experience */}
        {sections.experience.visible && sections.experience.items && sections.experience.items.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-4 text-blue-600 font-sans">// PROFESSIONAL EXPERIENCE</h3>
            
            <div className="space-y-6">
              {sections.experience.items.map((experience) => (
                <div key={experience.id} className="border border-gray-300 rounded p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 font-sans">{experience.position}</h4>
                      <h5 className="text-sm font-semibold text-blue-600 font-sans">{experience.company}</h5>
                    </div>
                    <div className="text-right text-xs text-gray-600">
                      <div>{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</div>
                      <div>{experience.location}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {experience.description.map((point: any, index: any) => (
                      <div key={index} className="flex items-start text-sm">
                        <span className="text-blue-600 mr-2 mt-1">></span>
                        <span className="font-sans">{point}</span>
                      </div>
                    ))}
                  </div>
                  
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div className="bg-gray-100 p-3 rounded">
                      <div className="text-xs text-gray-600 mb-2">Tech Stack:</div>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {sections.projects.visible && sections.projects.items && sections.projects.items.length > 0 && (
          <section>
            <h3 className="text-lg font-bold mb-4 text-blue-600 font-sans">// TECHNICAL PROJECTS</h3>
            
            <div className="space-y-4">
              {sections.projects.items.map((project) => (
                <div key={project.id} className="border border-gray-300 rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900 font-sans">{project.name}</h4>
                    {project.url && (
                      <a href={project.url} className="text-xs text-blue-600 hover:underline">
                        {project.url}
                      </a>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 font-sans">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {sections.education.visible && sections.education.items && sections.education.items.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 text-blue-600 font-sans">// EDUCATION</h3>
              
              <div className="space-y-3">
                {sections.education.items.map((education) => (
                  <div key={education.id} className="bg-gray-50 p-3 rounded">
                    <h4 className="font-bold text-gray-900 text-sm font-sans">
                      {education.degree} in {education.field}
                    </h4>
                    <div className="text-xs text-gray-600 mt-1">
                      <div>{education.institution}</div>
                      <div>{formatDate(education.startDate)} - {formatDate(education.endDate)}</div>
                      {education.gpa && <div>GPA: {education.gpa}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Certifications */}
          {sections.certifications.visible && sections.certifications.items && sections.certifications.items.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 text-blue-600 font-sans">// CERTIFICATIONS</h3>
              
              <div className="space-y-3">
                {sections.certifications.items.map((certification) => (
                  <div key={certification.id} className="bg-gray-50 p-3 rounded">
                    <h4 className="font-bold text-gray-900 text-sm font-sans">{certification.name}</h4>
                    <div className="text-xs text-gray-600 mt-1">
                      <div>{certification.organization}</div>
                      <div>{formatDate(certification.date)}</div>
                    </div>
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