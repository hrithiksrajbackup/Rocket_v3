"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface AcademicTemplateProps {
  resumeData: ResumeData;
}

export function AcademicTemplate({ resumeData }: AcademicTemplateProps) {
  const { personal, sections, settings } = resumeData;
  
  return (
    <div className="w-full h-full p-8 flex flex-col font-serif text-gray-900 bg-white">
      {/* Academic Header */}
      <header className="mb-8 text-center border-b-2 border-gray-800 pb-6">
        <h1 className="text-4xl font-bold mb-3 text-gray-900">{personal.name}</h1>
        <h2 className="text-xl mb-4 text-gray-700">{personal.title}</h2>
        
        {/* Contact Information */}
        <div className="flex justify-center items-center space-x-6 text-sm text-gray-600 mb-4">
          <span>{personal.email}</span>
          <span>•</span>
          <span>{personal.phone}</span>
          <span>•</span>
          <span>{personal.location}</span>
          {personal.website && (
            <>
              <span>•</span>
              <span>{personal.website}</span>
            </>
          )}
        </div>
        
        {personal.profileImage && (
          <div className="flex justify-center mb-4">
            <img
              src={personal.profileImage}
              alt={personal.name}
              className="w-32 h-32 object-cover rounded border-2 border-gray-300"
            />
          </div>
        )}
        
        {/* Research Interests */}
        {personal.summary && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold mb-2 text-gray-900">Research Interests</h3>
            <p className="text-sm leading-relaxed text-gray-800">{personal.summary}</p>
          </div>
        )}
      </header>
      
      <div className="flex-1 space-y-8">
        {/* Education */}
        {sections.education.visible && sections.education.items && sections.education.items.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-400 pb-2">
              EDUCATION
            </h3>
            
            <div className="space-y-4">
              {sections.education.items.map((education) => (
                <div key={education.id}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">
                        {education.degree} in {education.field}
                      </h4>
                      <h5 className="text-gray-700 italic">{education.institution}, {education.location}</h5>
                      {education.gpa && (
                        <p className="text-sm text-gray-600">GPA: {education.gpa}</p>
                      )}
                      {education.description && (
                        <p className="text-sm text-gray-700 mt-1">{education.description}</p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      {formatDate(education.startDate)} - {formatDate(education.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Academic Experience */}
        {sections.experience.visible && sections.experience.items && sections.experience.items.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-400 pb-2">
              ACADEMIC EXPERIENCE
            </h3>
            
            <div className="space-y-6">
              {sections.experience.items.map((experience) => (
                <div key={experience.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{experience.position}</h4>
                      <h5 className="text-gray-700 italic">{experience.company}, {experience.location}</h5>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {experience.description.map((point: any, index: any) => (
                      <div key={index} className="mb-1">
                        <span className="text-gray-800 text-sm">• {point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Research Projects */}
        {sections.projects.visible && sections.projects.items && sections.projects.items.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-400 pb-2">
              RESEARCH PROJECTS
            </h3>
            
            <div className="space-y-4">
              {sections.projects.items.map((project) => (
                <div key={project.id}>
                  <h4 className="font-bold text-gray-900 mb-1">{project.name}</h4>
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Methods/Tools:</span> {project.technologies.join(', ')}
                    </div>
                  )}
                  {project.url && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Link:</span> {project.url}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Publications (using certifications section) */}
          {sections.certifications.visible && sections.certifications.items && sections.certifications.items.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-400 pb-2">
                PUBLICATIONS & PRESENTATIONS
              </h3>
              
              <div className="space-y-3">
                {sections.certifications.items.map((publication) => (
                  <div key={publication.id} className="text-sm">
                    <div className="font-medium text-gray-900">{publication.name}</div>
                    <div className="text-gray-700 italic">{publication.organization}</div>
                    <div className="text-gray-600">{formatDate(publication.date)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Skills & Expertise */}
          {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-400 pb-2">
                SKILLS & EXPERTISE
              </h3>
              
              <div className="space-y-3">
                {sections.skills.groups.map((group) => (
                  <div key={group.id}>
                    <h4 className="font-bold text-gray-800 mb-1">{group.name}</h4>
                    <p className="text-sm text-gray-700">
                      {group.skills.map(skill => skill.name).join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Languages */}
          {sections.languages.visible && sections.languages.items && sections.languages.items.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-400 pb-2">
                LANGUAGES
              </h3>
              
              <div className="space-y-1">
                {sections.languages.items.map((language) => (
                  <div key={language.id} className="flex justify-between text-sm">
                    <span className="font-medium text-gray-800">{language.name}</span>
                    <span className="text-gray-600">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Professional Memberships */}
          {sections.interests.visible && sections.interests.items && sections.interests.items.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-400 pb-2">
                PROFESSIONAL MEMBERSHIPS
              </h3>
              
              <div className="space-y-1">
                {sections.interests.items.map((membership) => (
                  <div key={membership.id} className="text-sm text-gray-800">
                    • {membership.name}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* References */}
        {sections.references.visible && sections.references.items && sections.references.items.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-400 pb-2">
              REFERENCES
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.references.items.map((reference) => (
                <div key={reference.id} className="text-sm">
                  <div className="font-bold text-gray-900">{reference.name}</div>
                  <div className="text-gray-700">{reference.position}</div>
                  <div className="text-gray-700">{reference.company}</div>
                  <div className="text-gray-600 mt-1">
                    {reference.email && <div>{reference.email}</div>}
                    {reference.phone && <div>{reference.phone}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}