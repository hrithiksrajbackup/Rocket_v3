export interface JobSearchParams {
  role: string;
  experienceLevel: number;
  location: string;
  skills: string[];
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  jobType?: 'full-time' | 'part-time' | 'contract' | 'remote';
  companySize?: 'startup' | 'small' | 'medium' | 'large';
}

export interface JobListing {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
    size?: string;
    industry?: string;
  };
  location: string;
  salary?: {
    min?: number;
    max?: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  description: string;
  requirements: string[];
  benefits?: string[];
  jobType: string;
  experienceRequired: string;
  postedDate: Date;
  applicationDeadline?: Date;
  applicationUrl: string;
  skills: string[];
  remote: boolean;
  saved?: boolean;
}

export interface JobSearchResponse {
  jobs: JobListing[];
  totalCount: number;
  searchParams: JobSearchParams;
  suggestions?: string[];
}

export class JobSearchService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || 'AIzaSyBDuQBZoTaU8-UrHA142WNebYL5pEO4Y80';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  }

  async searchJobs(params: JobSearchParams): Promise<JobSearchResponse> {
    try {
      // Generate job search prompt
      const prompt = this.generateSearchPrompt(params);
      
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;

      // Parse the generated job listings
      const jobs = this.parseJobListings(generatedText);

      return {
        jobs,
        totalCount: jobs.length,
        searchParams: params,
        suggestions: this.generateSearchSuggestions(params)
      };
    } catch (error) {
      console.error('Job search error:', error);
      throw new Error('Failed to search jobs');
    }
  }

  private generateSearchPrompt(params: JobSearchParams): string {
    return `
Generate a realistic list of 10-15 job listings for the following criteria:

Role: ${params.role}
Experience Level: ${params.experienceLevel} years
Location: ${params.location}
Skills: ${params.skills.join(', ')}
${params.salaryRange ? `Salary Range: ${params.salaryRange.min} - ${params.salaryRange.max} ${params.salaryRange.currency}` : ''}
${params.jobType ? `Job Type: ${params.jobType}` : ''}

For each job listing, provide the following information in JSON format:
{
  "id": "unique_job_id",
  "title": "Job Title",
  "company": {
    "name": "Company Name",
    "size": "startup|small|medium|large",
    "industry": "Industry"
  },
  "location": "City, Country",
  "salary": {
    "min": 50000,
    "max": 80000,
    "currency": "USD",
    "period": "yearly"
  },
  "description": "Detailed job description (2-3 paragraphs)",
  "requirements": ["Requirement 1", "Requirement 2", "Requirement 3"],
  "benefits": ["Benefit 1", "Benefit 2"],
  "jobType": "full-time|part-time|contract|remote",
  "experienceRequired": "2-4 years",
  "postedDate": "2024-01-15",
  "applicationUrl": "https://company.com/careers/job-id",
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "remote": true|false
}

Make the job listings realistic and relevant to the search criteria. Include a mix of companies (startups, established companies, tech giants). Ensure salary ranges are appropriate for the role and experience level. Make job descriptions detailed and engaging.

Return only valid JSON array of job objects, no additional text.
`;
  }

  private parseJobListings(generatedText: string): JobListing[] {
    try {
      // Clean the generated text to extract JSON
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      const jobsData = JSON.parse(jsonMatch[0]);
      
      return jobsData.map((job: any) => ({
        ...job,
        id: job.id || `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        postedDate: new Date(job.postedDate || new Date()),
        applicationDeadline: job.applicationDeadline ? new Date(job.applicationDeadline) : undefined,
        saved: false
      }));
    } catch (error) {
      console.error('Error parsing job listings:', error);
      // Return fallback jobs if parsing fails
      return this.getFallbackJobs();
    }
  }

  private generateSearchSuggestions(params: JobSearchParams): string[] {
    const suggestions = [
      `Try searching for "${params.role}" in nearby cities`,
      `Consider remote positions for "${params.role}"`,
      `Look for junior/senior variations of "${params.role}"`,
      `Explore related roles like "${this.getRelatedRoles(params.role)}"`,
      `Check for contract opportunities in ${params.location}`
    ];

    return suggestions.slice(0, 3);
  }

  private getRelatedRoles(role: string): string {
    const roleMap: { [key: string]: string[] } = {
      'software engineer': ['full stack developer', 'backend developer', 'frontend developer'],
      'data scientist': ['data analyst', 'machine learning engineer', 'data engineer'],
      'product manager': ['project manager', 'program manager', 'product owner'],
      'designer': ['ui designer', 'ux designer', 'graphic designer'],
      'marketing': ['digital marketing', 'content marketing', 'growth marketing']
    };

    const lowerRole = role.toLowerCase();
    for (const [key, related] of Object.entries(roleMap)) {
      if (lowerRole.includes(key)) {
        return related[0];
      }
    }

    return 'related positions';
  }

  private getFallbackJobs(): JobListing[] {
    return [
      {
        id: 'fallback_1',
        title: 'Software Engineer',
        company: {
          name: 'Tech Solutions Inc.',
          size: 'medium',
          industry: 'Technology'
        },
        location: 'San Francisco, CA',
        salary: {
          min: 80000,
          max: 120000,
          currency: 'USD',
          period: 'yearly'
        },
        description: 'We are looking for a talented Software Engineer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.',
        requirements: ['3+ years of experience', 'JavaScript/TypeScript', 'React or Vue.js'],
        benefits: ['Health insurance', 'Remote work options', '401k matching'],
        jobType: 'full-time',
        experienceRequired: '3-5 years',
        postedDate: new Date(),
        applicationUrl: 'https://example.com/apply',
        skills: ['JavaScript', 'React', 'Node.js'],
        remote: true,
        saved: false
      }
    ];
  }
}