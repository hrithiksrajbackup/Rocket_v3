"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ModernTemplateProps {
  resumeData: ResumeData;
}

export function ModernTemplate({ resumeData }: ModernTemplateProps) {
  const { personal, sections, settings } = resumeData;
  const accentColor = settings.accentColor || '#2563eb';
  
  return (
    <div className="w-full h-full flex font-sans text-gray-800">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-8 flex flex-col">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold mb-1">{personal.name}</h1>
          <h2 className="text-lg font-medium" style={{ color: accentColor }}>{personal.title}</h2>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor }}>Contact</h3>
          <div className="space-y-2 text-sm">
            <div>{personal.email}</div>
            <div>{personal.phone}</div>
            <div>{personal.location}</div>
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.github && <div>{personal.github}</div>}
            {personal.website && <div>{personal.website}</div>}
          </div>
        </div>
        
        {/* Skills */}
        {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor }}>{sections.skills.title}</h3>
            
            <div className="space-y-4">
              {sections.skills.groups.map((group) => (
                <div key={group.id}>
                  <h4 className="font-medium text-sm mb-2">{group.name}</h4>
                  <div className="space-y-2">
                    {group.skills.map((skill) => (
                      <div key={skill.id} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          {skill.level && (
                            <span className="text-xs">{skill.level}/5</span>
                          )}
                        </div>
                        {skill.level && (
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${(skill.level / 5) * 100}%`,
                                backgroundColor: accentColor
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Languages */}
        {sections.languages.visible && sections.languages.items && sections.languages.items.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor }}>{sections.languages.title}</h3>
            
            <ul className="space-y-1 text-sm">
              {sections.languages.items.map((language) => (
                <li key={language.id} className="flex justify-between">
                  <span>{language.name}</span>
                  <span className="text-gray-500">{language.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Interests */}
        {sections.interests.visible && sections.interests.items && sections.interests.items.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ borderColor: accentColor }}>{sections.interests.title}</h3>
            
            <div className="flex flex-wrap gap-2">
              {sections.interests.items.map((interest) => (
                <span 
                  key={interest.id} 
                  className="inline-block px-2 py-1 text-xs rounded" 
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  {interest.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-8 flex flex-col">
        {/* Summary */}
        {personal.summary && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3\" style={{ color: accentColor }}>Profile</h3>
            <p className="text-sm">{personal.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {sections.experience.visible && sections.experience.items && sections.experience.items.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: accentColor }}>{sections.experience.title}</h3>
            
            <div className="space-y-6">
              {sections.experience.items.map((experience) => (
                <div key={experience.id} className="relative pl-6 border-l-2" style={{ borderColor: `${accentColor}40` }}>
                  <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  
                  <div className="mb-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-base">{experience.position}</h4>
                      <span className="text-xs text-gray-500">
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {experience.company} • {experience.location}
                    </div>
                  </div>
                  
                  <ul className="list-disc text-sm space-y-1 ml-4">
                    {experience.description.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                  
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {experience.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="inline-block px-2 py-0.5 text-xs rounded" 
                          style={{ backgroundColor: `${accentColor}15` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education */}
        {sections.education.visible && sections.education.items && sections.education.items.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: accentColor }}>{sections.education.title}</h3>
            
            <div className="space-y-4">
              {sections.education.items.map((education) => (
                <div key={education.id} className="relative pl-6 border-l-2" style={{ borderColor: `${accentColor}40` }}>
                  <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                  
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold">{education.institution}</h4>
                    <span className="text-xs text-gray-500">
                      {formatDate(education.startDate)} - {formatDate(education.endDate)}
                    </span>
                  </div>
                  <div className="text-sm">
                    {education.degree} {education.field ? `in ${education.field}` : ''}
                    {education.gpa ? ` • GPA: ${education.gpa}` : ''}
                  </div>
                  <div className="text-xs text-gray-500">{education.location}</div>
                  
                  {education.description && (
                    <p className="text-sm mt-1">{education.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Projects */}
        {sections.projects.visible && sections.projects.items && sections.projects.items.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: accentColor }}>{sections.projects.title}</h3>
            
            <div className="space-y-4">
              {sections.projects.items.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold">{project.name}</h4>
                    {project.url && (
                      <a href={project.url} className="text-xs" style={{ color: accentColor }}>{project.url}</a>
                    )}
                  </div>
                  <p className="text-sm">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="inline-block px-2 py-0.5 text-xs rounded" 
                          style={{ backgroundColor: `${accentColor}15` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Certifications */}
        {sections.certifications.visible && sections.certifications.items && sections.certifications.items.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: accentColor }}>{sections.certifications.title}</h3>
            
            <div className="space-y-2">
              {sections.certifications.items.map((certification) => (
                <div key={certification.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">{certification.name}</span>
                    {certification.organization && (
                      <span className="text-sm text-gray-600"> • {certification.organization}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(certification.date)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}