"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface CreativeTemplateProps {
  resumeData: ResumeData;
}

export function CreativeTemplate({ resumeData }: CreativeTemplateProps) {
  const { personal, sections, settings } = resumeData;
  const accentColor = settings.accentColor || "#8B5CF6";
  
  return (
    <div className="w-full h-full flex font-sans text-gray-800 bg-white">
      {/* Creative Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-8 flex flex-col">
        {/* Profile Section */}
        <div className="text-center mb-8">
          {personal.profileImage ? (
            <img
              src={personal.profileImage}
              alt={personal.name}
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg mx-auto mb-4"
            />
          ) : (
            <div className="w-32 h-32 bg-white/20 rounded-full border-4 border-white shadow-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {personal.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          <h1 className="text-2xl font-bold mb-2">{personal.name}</h1>
          <h2 className="text-lg font-light opacity-90">{personal.title}</h2>
        </div>
        
        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">CONTACT</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <span className="w-4 h-4 bg-white/20 rounded mr-3"></span>
              <span>{personal.email}</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-white/20 rounded mr-3"></span>
              <span>{personal.phone}</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-white/20 rounded mr-3"></span>
              <span>{personal.location}</span>
            </div>
            {personal.website && (
              <div className="flex items-center">
                <span className="w-4 h-4 bg-white/20 rounded mr-3"></span>
                <span>{personal.website}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center">
                <span className="w-4 h-4 bg-white/20 rounded mr-3"></span>
                <span>{personal.linkedin}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Skills */}
        {sections.skills.visible && sections.skills.groups && sections.skills.groups.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">SKILLS</h3>
            <div className="space-y-4">
              {sections.skills.groups.map((group) => (
                <div key={group.id}>
                  <h4 className="font-semibold text-sm mb-2 opacity-90">{group.name}</h4>
                  <div className="space-y-2">
                    {group.skills.map((skill) => (
                      <div key={skill.id} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span className="text-xs opacity-75">{skill.level}/5</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full transition-all duration-300"
                            style={{ width: `${(skill.level / 5) * 100}%` }}
                          ></div>
                        </div>
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
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">LANGUAGES</h3>
            <div className="space-y-2">
              {sections.languages.items.map((language) => (
                <div key={language.id} className="flex justify-between text-sm">
                  <span>{language.name}</span>
                  <span className="opacity-75">{language.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Interests */}
        {sections.interests.visible && sections.interests.items && sections.interests.items.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">INTERESTS</h3>
            <div className="flex flex-wrap gap-2">
              {sections.interests.items.map((interest) => (
                <span key={interest.id} className="bg-white/20 px-2 py-1 rounded text-xs">
                  {interest.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-8 flex flex-col">
        {/* About */}
        {personal.summary && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 relative">
              ABOUT ME
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            </h3>
            <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
          </section>
        )}
        
        {/* Experience */}
        {sections.experience.visible && sections.experience.items && sections.experience.items.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 relative">
              EXPERIENCE
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            </h3>
            
            <div className="space-y-6">
              {sections.experience.items.map((experience, index) => (
                <div key={experience.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                  <div className="ml-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{experience.position}</h4>
                        <h5 className="text-base font-semibold text-purple-600">{experience.company}</h5>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{formatDate(experience.startDate)} - {formatDate(experience.endDate)}</div>
                        <div>{experience.location}</div>
                      </div>
                    </div>
                    
                    <ul className="space-y-1 text-sm text-gray-700">
                      {experience.description.map((point: any, pointIndex: any) => (
                        <li key={pointIndex} className="flex items-start">
                          <span className="text-purple-600 mr-2 mt-1.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {experience.technologies && experience.technologies.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {experience.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-2 py-1 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Timeline line */}
                  {index < sections.experience.items.length - 1 && (
                    <div className="absolute left-1.5 top-5 w-0.5 h-16 bg-gradient-to-b from-purple-300 to-pink-300"></div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Projects */}
        {sections.projects.visible && sections.projects.items && sections.projects.items.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 relative">
              PROJECTS
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.projects.items.map((project) => (
                <div key={project.id} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-gray-900 mb-2">{project.name}</h4>
                  <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-white/70 text-purple-800 px-2 py-1 rounded text-xs"
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
        
        {/* Education */}
        {sections.education.visible && sections.education.items && sections.education.items.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 relative">
              EDUCATION
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            </h3>
            
            <div className="space-y-4">
              {sections.education.items.map((education) => (
                <div key={education.id} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900">{education.degree} in {education.field}</h4>
                    <h5 className="text-purple-600 font-semibold">{education.institution}</h5>
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
      </div>
    </div>
  );
}