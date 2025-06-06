export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  description?: string;
  gpa?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  technologies?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  level?: number; // 1-5
}

export interface SkillGroup {
  id: string;
  name: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  url?: string;
  technologies?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  organization: string;
  date: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
}

export interface InterestItem {
  id: string;
  name: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  company: string;
  position: string;
  email?: string;
  phone?: string;
  reference?: string;
}

export interface ResumeSection {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  items?: any[];
}

export interface ResumeData {
  personal: PersonalInfo;
  sections: {
    education: ResumeSection;
    experience: ResumeSection;
    skills: ResumeSection & { groups: SkillGroup[] };
    projects: ResumeSection;
    certifications: ResumeSection;
    languages: ResumeSection;
    interests: ResumeSection;
    references: ResumeSection;
    custom: ResumeSection[];
  };
  settings: {
    template: string;
    fontSize: 'small' | 'medium' | 'large';
    fontFamily: string;
    lineSpacing: 'compact' | 'normal' | 'spacious';
    showBulletPoints: boolean;
    accentColor: string;
    showProfilePhoto: boolean;
  };
  meta: {
    created: string;
    lastModified: string;
    atsScore?: number;
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  category: 'professional' | 'modern' | 'creative' | 'simple';
  popular?: boolean;
}

export interface DragItem {
  type: string;
  id: string;
  index: number;
}