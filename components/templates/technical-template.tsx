"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface TechnicalTemplateProps {
  resumeData: ResumeData;
}

export function TechnicalTemplate({ resumeData }: TechnicalTemplateProps) {
  const { personal, sections } = resumeData;
  
  return (
    <div className="w-full h-full p-8 flex flex-col font-mono text-gray-900 bg-white">
      {/* Header */}
      <header className="mb-8 pb-6 border-b-2 border-green-500">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{personal.name}</h1>
        <h2 className="text-xl mb-4 text-green-600 font-medium">{personal.title}</h2>
        
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div>📧 {personal.email}</div>
          <div>📱 {personal.phone}</div>
          <div>📍 {personal.location}</div>
          {personal.github && <div>🔗 {personal.github}</div>}
          {personal.linkedin && <div>💼 {personal.linkedin}</div>}
          {personal.website && <div>🌐 {personal.website}</div>}
        </div>
      </header>
      
      {/* Summary */}
      {personal.summary && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-3 text-green-600 border-b border-green-300 pb-1">// TECHNICAL SUMMARY</h3>
          <p className="text-sm leading-relaxed bg-gray-50 p-4 rounded border-l-4 border-green-500">{personal.summary}</p>
        </section>
      )}
      
      {/* Technical Skills */}
      {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-green-600 border-b border-green-300 pb-1">// TECHNICAL STACK</h3>
          
          <div className="grid grid-cols-2 gap-6">
            {sections.skills.groups.map((group) => (
              <div key={group.id} className="bg-gray-50 p-4 rounded border-l-4 border-blue-400">
                <h4 className="font-bold text-sm mb-3 text-blue-600">{group.name.toUpperCase()}</h4>
                <div className="space-y-2">
                  {group.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 mr-1 rounded-sm ${
                              i < skill.level ? 'bg-green-500' : 'bg-gray-300'
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
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-green-600 border-b border-green-300 pb-1">// PROFESSIONAL EXPERIENCE</h3>
          
          <div className="space-y-6">
            {sections.experience.items.map((experience, index) => (
              <div key={experience.id} className="bg-gray-50 p-4 rounded border-l-4 border-purple-400">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-base text-purple-600">
                    [{index + 1}] {experience.position}
                  </h4>
                  <span className="text-sm text-gray-600 font-mono">
                    {formatDate(experience.startDate)} → {formatDate(experience.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-3">
                  <h5 className="text-gray-700 font-medium">{experience.company}</h5>
                  <span className="text-sm text-gray-600">{experience.location}</span>
                </div>
                <ul className="list-none space-y-1 text-sm mb-3">
                  {experience.description.map((point:any, index:any) => (
                    <li key={index} className="leading-relaxed">
                      <span className="text-green-600 mr-2">▸</span>{point}
                    </li>
                  ))}
                </ul>
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {experience.technologies.map((tech:any, index:any) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded font-mono border"
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
      
      {/* Projects */}
      {sections.projects.visible && sections.projects.items && sections.projects.items.length > 0 && (
        <section className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-green-600 border-b border-green-300 pb-1">// NOTABLE PROJECTS</h3>
          
          <div className="space-y-4">
            {sections.projects.items.map((project, index) => (
              <div key={project.id} className="bg-gray-50 p-4 rounded border-l-4 border-orange-400">
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-bold text-base text-orange-600">
                    [{index + 1}] {project.name}
                  </h4>
                  {project.url && (
                    <a href={project.url} className="text-sm text-blue-600 hover:underline font-mono">
                      🔗 {project.url}
                    </a>
                  )}
                </div>
                <p className="text-sm leading-relaxed mb-3">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech:any, index:any) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded font-mono border"
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
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-green-600 border-b border-green-300 pb-1">// EDUCATION</h3>
            
            <div className="space-y-3">
              {sections.education.items.map((education) => (
                <div key={education.id} className="bg-gray-50 p-3 rounded border-l-4 border-indigo-400">
                  <h4 className="font-bold text-sm text-indigo-600">{education.degree}</h4>
                  <div className="text-sm text-gray-700">{education.field}</div>
                  <div className="text-sm text-gray-600">{education.institution}</div>
                  <div className="text-xs text-gray-500 font-mono">
                    {formatDate(education.startDate)} → {formatDate(education.endDate)}
                  </div>
                  {education.gpa && (
                    <div className="text-xs text-gray-600">GPA: {education.gpa}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Certifications */}
        {sections.certifications.visible && sections.certifications.items && sections.certifications.items.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-green-600 border-b border-green-300 pb-1">// CERTIFICATIONS</h3>
            
            <div className="space-y-2">
              {sections.certifications.items.map((certification) => (
                <div key={certification.id} className="bg-gray-50 p-3 rounded border-l-4 border-yellow-400">
                  <div className="font-medium text-sm text-yellow-600">{certification.name}</div>
                  <div className="text-sm text-gray-600">{certification.organization}</div>
                  <div className="text-xs text-gray-500 font-mono">{formatDate(certification.date)}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}