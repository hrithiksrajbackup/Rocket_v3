"use client";

import { ResumeData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface CreativeTemplateProps {
  resumeData: ResumeData;
}

export function CreativeTemplate({ resumeData }: CreativeTemplateProps) {
  const { personal, sections } = resumeData;
  
  return (
    <div className="w-full h-full flex font-sans text-gray-800 bg-white">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{personal.name}</h1>
          <h2 className="text-xl font-light opacity-90">{personal.title}</h2>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">CONTACT</h3>
          <div className="space-y-2 text-sm">
            <div>{personal.email}</div>
            <div>{personal.phone}</div>
            <div>{personal.location}</div>
            {personal.website && <div>{personal.website}</div>}
            {personal.linkedin && <div>{personal.linkedin}</div>}
            {personal.github && <div>{personal.github}</div>}
          </div>
        </div>

        {/* Skills */}
        {sections.skills.visible && sections.skills.groups?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">SKILLS</h3>
            <div className="space-y-4">
              {sections.skills.groups.map((group) => (
                <div key={group.id}>
                  <h4 className="font-semibold text-sm mb-2">{group.name}</h4>
                  <div className="space-y-2">
                    {group.skills.map((skill) => (
                      <div key={skill.id} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span className="text-xs">{skill.level}/5</span>
                        </div>
                        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full transition-all"
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
        {sections.languages.visible && sections.languages.items?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">LANGUAGES</h3>
            <ul className="space-y-2 text-sm">
              {sections.languages.items.map((language) => (
                <li key={language.id} className="flex justify-between">
                  <span>{language.name}</span>
                  <span className="opacity-80">{language.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        {personal.summary && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-purple-600">ABOUT ME</h3>
            <p className="text-sm leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {sections.experience.visible && sections.experience.items?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-purple-600">EXPERIENCE</h3>
            <div className="space-y-6">
              {sections.experience.items.map((experience) => (
                <div key={experience.id} className="relative pl-6 border-l-4 border-purple-300">
                  <div className="absolute top-0 left-[-8px] w-4 h-4 bg-purple-600 rounded-full"></div>
                  <div className="mb-2">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-lg text-gray-800">{experience.position}</h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                      </span>
                    </div>
                    <div className="text-purple-600 font-medium">{experience.company} • {experience.location}</div>
                  </div>
                  <ul className="list-disc text-sm space-y-1 ml-4">
                    {experience.description.map((point: any, index: any) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                  {experience.technologies?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {experience.technologies.map((tech: any, index: any) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
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
        {sections.education.visible && sections.education.items?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-purple-600">EDUCATION</h3>
            <div className="space-y-4">
              {sections.education.items.map((education) => (
                <div key={education.id} className="relative pl-6 border-l-4 border-pink-300">
                  <div className="absolute top-0 left-[-8px] w-4 h-4 bg-pink-500 rounded-full"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-lg">{education.institution}</h4>
                    <span className="text-sm text-gray-500">
                      {formatDate(education.startDate)} - {formatDate(education.endDate)}
                    </span>
                  </div>
                  <div className="text-pink-600 font-medium">
                    {education.degree} in {education.field}
                    {education.gpa && ` • GPA: ${education.gpa}`}
                  </div>
                  <div className="text-sm text-gray-600">{education.location}</div>
                  {education.description && (
                    <p className="text-sm mt-2">{education.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {sections.projects.visible && sections.projects.items?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-purple-600">PROJECTS</h3>
            <div className="grid gap-4">
              {sections.projects.items.map((project) => (
                <div key={project.id} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-400">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-bold text-lg">{project.name}</h4>
                    {project.url && (
                      <a href={project.url} className="text-sm text-purple-600 hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-sm mb-3">{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: any, index: any) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs bg-white text-purple-700 rounded-full border border-purple-200"
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
      </div>
    </div>
  );
}