"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface HealthcareTemplateProps {
  resumeData: ResumeData;
}

export function HealthcareTemplate({ resumeData }: HealthcareTemplateProps) {
  const { personal, sections, settings } = resumeData;
  
  return (
    <div className="w-full h-full p-8 flex flex-col font-sans text-gray-900 bg-white">
      {/* Header */}
      <header className="mb-8 pb-6 border-b-2 border-teal-600">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">{personal.name}</h1>
            <h2 className="text-xl mb-4 text-teal-600 font-medium">{personal.title}</h2>
            
            {/* Professional Summary */}
            {personal.summary && (
              <div className="mb-4 bg-teal-50 p-4 rounded-lg border-l-4 border-teal-600">
                <h3 className="font-semibold text-teal-800 mb-2">Professional Summary</h3>
                <p className="text-sm leading-relaxed text-gray-800">{personal.summary}</p>
              </div>
            )}
          </div>
          
          {personal.profileImage && (
            <div className="ml-8">
              <img
                src={personal.profileImage}
                alt={personal.name}
                className="w-28 h-28 object-cover rounded-lg border-2 border-teal-600 shadow-md"
              />
            </div>
          )}
        </div>
        
        {/* Contact Information */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mt-4">
          <div>
            <span className="font-medium text-teal-700">Email:</span>
            <div>{personal.email}</div>
          </div>
          <div>
            <span className="font-medium text-teal-700">Phone:</span>
            <div>{personal.phone}</div>
          </div>
          <div>
            <span className="font-medium text-teal-700">Location:</span>
            <div>{personal.location}</div>
          </div>
          {personal.linkedin && (
            <div>
              <span className="font-medium text-teal-700">LinkedIn:</span>
              <div>{personal.linkedin}</div>
            </div>
          )}
        </div>
      </header>
      
      <div className="flex-1 space-y-8">
        {/* Clinical Experience */}
        {sections.experience.visible && sections.experience.items && sections.experience.items.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4 text-teal-700 border-b border-teal-300 pb-2">
              CLINICAL EXPERIENCE
            </h3>
            
            <div className="space-y-6">
              {sections.experience.items.map((experience) => (
                <div key={experience.id} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{experience.position}</h4>
                      <h5 className="text-base font-semibold text-teal-600">{experience.company}</h5>
                    </div>
                    <div className="text-right text-sm text-gray-600 bg-white px-3 py-1 rounded border">
                      <div className="font-medium">{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</div>
                      <div>{experience.location}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {experience.description.map((point: any, index: any) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-sm leading-relaxed text-gray-800">{point}</p>
                      </div>
                    ))}
                  </div>
                  
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <span className="text-xs font-semibold text-teal-700">Specializations & Systems: </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {experience.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs"
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education & Training */}
          {sections.education.visible && sections.education.items && sections.education.items.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-teal-700 border-b border-teal-300 pb-2">
                EDUCATION & TRAINING
              </h3>
              
              <div className="space-y-4">
                {sections.education.items.map((education) => (
                  <div key={education.id} className="bg-white border border-teal-200 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-1">{education.degree}</h4>
                    <h5 className="text-teal-600 font-semibold mb-1">{education.field}</h5>
                    <div className="text-sm text-gray-600">
                      <div className="font-medium">{education.institution}</div>
                      <div>{formatDate(education.startDate)} - {formatDate(education.endDate)}</div>
                      <div>{education.location}</div>
                      {education.gpa && (
                        <div className="mt-1 text-teal-700">GPA: {education.gpa}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Certifications & Licenses */}
          {sections.certifications.visible && sections.certifications.items && sections.certifications.items.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-teal-700 border-b border-teal-300 pb-2">
                CERTIFICATIONS & LICENSES
              </h3>
              
              <div className="space-y-3">
                {sections.certifications.items.map((certification) => (
                  <div key={certification.id} className="bg-white border border-teal-200 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-1">{certification.name}</h4>
                    <div className="text-sm text-gray-600">
                      <div className="font-medium text-teal-600">{certification.organization}</div>
                      <div>Issued: {formatDate(certification.date)}</div>
                      {certification.url && (
                        <div className="mt-1">
                          <a href={certification.url} className="text-teal-600 hover:underline text-xs">
                            View Credential
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Core Competencies */}
        {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
          <section>
            <h3 className="text-xl font-bold mb-4 text-teal-700 border-b border-teal-300 pb-2">
              CORE COMPETENCIES
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.skills.groups.map((group) => (
                <div key={group.id} className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                  <h4 className="font-bold text-teal-800 mb-3">{group.name}</h4>
                  <div className="space-y-2">
                    {group.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">{skill.name}</span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-2 h-2 rounded-full ${
                                level <= skill.level 
                                  ? 'bg-teal-600' 
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Languages */}
          {sections.languages.visible && sections.languages.items && sections.languages.items.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-teal-700 border-b border-teal-300 pb-2">
                LANGUAGES
              </h3>
              
              <div className="bg-white border border-teal-200 p-4 rounded-lg">
                <div className="space-y-2">
                  {sections.languages.items.map((language) => (
                    <div key={language.id} className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{language.name}</span>
                      <span className="text-sm text-teal-600 bg-teal-50 px-2 py-1 rounded">
                        {language.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          
          {/* Professional Interests */}
          {sections.interests.visible && sections.interests.items && sections.interests.items.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 text-teal-700 border-b border-teal-300 pb-2">
                PROFESSIONAL INTERESTS
              </h3>
              
              <div className="bg-white border border-teal-200 p-4 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {sections.interests.items.map((interest) => (
                    <span
                      key={interest.id}
                      className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm"
                    >
                      {interest.name}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}