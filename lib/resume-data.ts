import { ResumeData } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const initialResumeState: ResumeData = {
  personal: {
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    summary: "Experienced software engineer with 8+ years of expertise in building scalable web applications and leading development teams. Proficient in React, Node.js, and cloud technologies."
  },
  sections: {
    education: {
      id: "education",
      type: "education",
      title: "Education",
      visible: true,
      items: [
        {
          id: uuidv4(),
          institution: "Stanford University",
          degree: "Master of Science",
          field: "Computer Science",
          startDate: "2015-09",
          endDate: "2017-06",
          location: "Stanford, CA",
          gpa: "3.8/4.0"
        },
        {
          id: uuidv4(),
          institution: "University of California, Berkeley",
          degree: "Bachelor of Science",
          field: "Computer Science",
          startDate: "2011-09",
          endDate: "2015-05",
          location: "Berkeley, CA",
          gpa: "3.7/4.0"
        }
      ]
    },
    experience: {
      id: "experience",
      type: "experience",
      title: "Work Experience",
      visible: true,
      items: [
        {
          id: uuidv4(),
          company: "Tech Innovations Inc.",
          position: "Senior Software Engineer",
          startDate: "2020-03",
          endDate: "Present",
          location: "San Francisco, CA",
          description: [
            "Led a team of 5 engineers in developing a microservices architecture that improved system reliability by 35%",
            "Implemented CI/CD pipelines that reduced deployment time by 45% and minimized production issues",
            "Architected and developed a real-time data processing system handling over 1M transactions per day",
            "Mentored junior developers through code reviews and pair programming sessions"
          ],
          technologies: ["React", "Node.js", "AWS", "Docker", "Kubernetes"]
        },
        {
          id: uuidv4(),
          company: "Global Software Solutions",
          position: "Software Engineer",
          startDate: "2017-07",
          endDate: "2020-02",
          location: "San Jose, CA",
          description: [
            "Developed and maintained front-end applications using React and Redux, serving 100K+ daily users",
            "Collaborated with UX designers to implement responsive interfaces that improved user engagement by 25%",
            "Optimized database queries resulting in a 30% improvement in application performance",
            "Contributed to open-source projects and represented the company at tech conferences"
          ],
          technologies: ["React", "Redux", "MongoDB", "Express", "GraphQL"]
        }
      ]
    },
    skills: {
      id: "skills",
      type: "skills",
      title: "Skills",
      visible: true,
      groups: [
        {
          id: uuidv4(),
          name: "Programming Languages",
          skills: [
            { id: uuidv4(), name: "JavaScript", level: 5 },
            { id: uuidv4(), name: "TypeScript", level: 4 },
            { id: uuidv4(), name: "Python", level: 4 },
            { id: uuidv4(), name: "Java", level: 3 }
          ]
        },
        {
          id: uuidv4(),
          name: "Frameworks & Libraries",
          skills: [
            { id: uuidv4(), name: "React", level: 5 },
            { id: uuidv4(), name: "Node.js", level: 5 },
            { id: uuidv4(), name: "Express", level: 4 },
            { id: uuidv4(), name: "Next.js", level: 4 }
          ]
        },
        {
          id: uuidv4(),
          name: "Tools & Technologies",
          skills: [
            { id: uuidv4(), name: "Git", level: 5 },
            { id: uuidv4(), name: "Docker", level: 4 },
            { id: uuidv4(), name: "AWS", level: 4 },
            { id: uuidv4(), name: "CI/CD", level: 4 }
          ]
        }
      ]
    },
    projects: {
      id: "projects",
      type: "projects",
      title: "Projects",
      visible: true,
      items: [
        {
          id: uuidv4(),
          name: "E-commerce Platform",
          description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented payment processing, inventory management, and user authentication.",
          url: "github.com/alexjohnson/ecommerce",
          technologies: ["React", "Node.js", "MongoDB", "Stripe API"]
        },
        {
          id: uuidv4(),
          name: "Data Visualization Dashboard",
          description: "Created an interactive dashboard for visualizing complex datasets using D3.js and React. Implemented real-time updates and customizable charts.",
          url: "github.com/alexjohnson/dataviz",
          technologies: ["React", "D3.js", "WebSockets", "Material UI"]
        }
      ]
    },
    certifications: {
      id: "certifications",
      type: "certifications",
      title: "Certifications",
      visible: true,
      items: [
        {
          id: uuidv4(),
          name: "AWS Certified Solutions Architect",
          organization: "Amazon Web Services",
          date: "2021-05",
          url: "aws.amazon.com/certification"
        },
        {
          id: uuidv4(),
          name: "Google Cloud Professional Developer",
          organization: "Google",
          date: "2020-03",
          url: "cloud.google.com/certification"
        }
      ]
    },
    languages: {
      id: "languages",
      type: "languages",
      title: "Languages",
      visible: true,
      items: [
        {
          id: uuidv4(),
          name: "English",
          proficiency: "Native"
        },
        {
          id: uuidv4(),
          name: "Spanish",
          proficiency: "Professional"
        },
        {
          id: uuidv4(),
          name: "Mandarin Chinese",
          proficiency: "Basic"
        }
      ]
    },
    interests: {
      id: "interests",
      type: "interests",
      title: "Interests",
      visible: true,
      items: [
        { id: uuidv4(), name: "Rock Climbing" },
        { id: uuidv4(), name: "Open Source Contributing" },
        { id: uuidv4(), name: "Photography" },
        { id: uuidv4(), name: "Machine Learning" }
      ]
    },
    references: {
      id: "references",
      type: "references",
      title: "References",
      visible: false,
      items: [
        {
          id: uuidv4(),
          name: "Sarah Chen",
          company: "Tech Innovations Inc.",
          position: "Engineering Director",
          email: "sarah.chen@example.com",
          phone: "(555) 987-6543"
        }
      ]
    },
    custom: []
  },
  settings: {
    template: "professional",
    fontSize: "medium",
    fontFamily: "Inter",
    lineSpacing: "normal",
    showBulletPoints: true,
    accentColor: "#2563eb",
    showProfilePhoto: false
  },
  meta: {
    created: new Date().toISOString(),
    lastModified: new Date().toISOString()
  }
};

export const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "A clean, traditional design perfect for corporate roles",
    previewImage: "https://images.pexels.com/photos/8867281/pexels-photo-8867281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "professional",
    popular: true
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with a creative touch",
    previewImage: "https://images.pexels.com/photos/8867265/pexels-photo-8867265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "modern",
    popular: true
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and straightforward for maximum readability",
    previewImage: "https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "simple",
    popular: true
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior positions",
    previewImage: "https://images.pexels.com/photos/8867274/pexels-photo-8867274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "professional",
    popular: false
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative industries",
    previewImage: "https://images.pexels.com/photos/8867279/pexels-photo-8867279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "creative",
    popular: false
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for technical roles with skills emphasis",
    previewImage: "https://images.pexels.com/photos/8867270/pexels-photo-8867270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "professional",
    popular: false
  },
  {
    id: "academic",
    name: "Academic",
    description: "Designed for academic and research positions",
    previewImage: "https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "professional",
    popular: false
  },
  {
    id: "compact",
    name: "Compact",
    description: "Condensed format for fitting more content",
    previewImage: "https://images.pexels.com/photos/8867265/pexels-photo-8867265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "simple",
    popular: false
  }
];

export function getTemplateById(id: string) {
  return templates.find(template => template.id === id) || templates[0];
}