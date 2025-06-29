"use client";

import { ResumeData } from "./types";

const GEMINI_API_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
  "AIzaSyBDuQBZoTaU8-UrHA142WNebYL5pEO4Y80";

export interface SpellingError {
  word: string;
  suggestion: string;
  section: string;
  context: string;
}

export interface ATSIssue {
  issue: string;
  suggestion: string;
  severity: 'high' | 'medium' | 'low';
}

export interface Recommendation {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  section: string;
}

export interface AnalysisResult {
  overallScore: number;
  contentScore: number;
  atsScore: number;
  summary: string;
  spellingErrors: SpellingError[];
  atsIssues: ATSIssue[];
  recommendations: Recommendation[];
  keywordMatches: string[];
  suggestedKeywords: string[];
}

export async function analyzeResumeWithAI(resumeData: ResumeData): Promise<AnalysisResult> {
  if (!API_KEY) {
    throw new Error(
      "API key not configured. Please set the NEXT_PUBLIC_GEMINI_API_KEY environment variable."
    );
  }

  // Convert resume data to text for analysis
  const resumeText = convertResumeToText(resumeData);

  const prompt = `
As an expert resume analyst and ATS specialist, perform a comprehensive analysis of the following resume. Provide detailed feedback in the exact JSON format specified below.

RESUME CONTENT:
${resumeText}

Analyze the resume for:
1. Spelling and grammar errors
2. ATS compatibility issues
3. Content quality and impact
4. Keyword optimization
5. Professional recommendations

Provide your analysis in this EXACT JSON format (no additional text):

{
  "overallScore": <number 0-100>,
  "contentScore": <number 0-100>,
  "atsScore": <number 0-100>,
  "summary": "<brief overall assessment>",
  "spellingErrors": [
    {
      "word": "<incorrect word>",
      "suggestion": "<correct spelling>",
      "section": "<section name>",
      "context": "<surrounding text>"
    }
  ],
  "atsIssues": [
    {
      "issue": "<specific ATS issue>",
      "suggestion": "<how to fix>",
      "severity": "<high|medium|low>"
    }
  ],
  "recommendations": [
    {
      "title": "<recommendation title>",
      "description": "<detailed description>",
      "severity": "<high|medium|low>",
      "section": "<affected section>"
    }
  ],
  "keywordMatches": ["<keyword1>", "<keyword2>"],
  "suggestedKeywords": ["<suggested1>", "<suggested2>"]
}

Focus on:
- Spelling/grammar accuracy
- ATS-friendly formatting
- Strong action verbs
- Quantifiable achievements
- Industry-relevant keywords
- Professional language
- Consistent formatting
- Appropriate length and structure
`;

  try {
    const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `AI service error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    // Parse the JSON response
    try {
      // Clean the response to extract JSON
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in response");
      }

      const analysisResult: AnalysisResult = JSON.parse(jsonMatch[0]);
      
      // Validate and sanitize the result
      return {
        overallScore: Math.min(100, Math.max(0, analysisResult.overallScore || 70)),
        contentScore: Math.min(100, Math.max(0, analysisResult.contentScore || 70)),
        atsScore: Math.min(100, Math.max(0, analysisResult.atsScore || 70)),
        summary: analysisResult.summary || "Resume analysis completed",
        spellingErrors: Array.isArray(analysisResult.spellingErrors) ? analysisResult.spellingErrors : [],
        atsIssues: Array.isArray(analysisResult.atsIssues) ? analysisResult.atsIssues : [],
        recommendations: Array.isArray(analysisResult.recommendations) ? analysisResult.recommendations : [],
        keywordMatches: Array.isArray(analysisResult.keywordMatches) ? analysisResult.keywordMatches : [],
        suggestedKeywords: Array.isArray(analysisResult.suggestedKeywords) ? analysisResult.suggestedKeywords : [],
      };
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      
      // Fallback analysis if JSON parsing fails
      return createFallbackAnalysis(resumeText);
    }
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
}

function convertResumeToText(resumeData: ResumeData): string {
  let text = `
NAME: ${resumeData.personal.name}
TITLE: ${resumeData.personal.title}
EMAIL: ${resumeData.personal.email}
PHONE: ${resumeData.personal.phone}
LOCATION: ${resumeData.personal.location}

SUMMARY:
${resumeData.personal.summary}

`;

  // Experience
  if (resumeData.sections.experience.visible && resumeData.sections.experience.items?.length) {
    text += `\nEXPERIENCE:\n`;
    resumeData.sections.experience.items.forEach((item) => {
      text += `
${item.position} at ${item.company} (${item.startDate} - ${item.endDate})
Location: ${item.location}
${item.description.join('\n')}
Technologies: ${item.technologies?.join(', ') || 'N/A'}
`;
    });
  }

  // Education
  if (resumeData.sections.education.visible && resumeData.sections.education.items?.length) {
    text += `\nEDUCATION:\n`;
    resumeData.sections.education.items.forEach((item) => {
      text += `
${item.degree} in ${item.field}
${item.institution} (${item.startDate} - ${item.endDate})
Location: ${item.location}
GPA: ${item.gpa || 'N/A'}
`;
    });
  }

  // Skills
  if (resumeData.sections.skills.visible && resumeData.sections.skills.groups?.length) {
    text += `\nSKILLS:\n`;
    resumeData.sections.skills.groups.forEach((group) => {
      text += `${group.name}: ${group.skills.map(skill => skill.name).join(', ')}\n`;
    });
  }

  // Projects
  if (resumeData.sections.projects.visible && resumeData.sections.projects.items?.length) {
    text += `\nPROJECTS:\n`;
    resumeData.sections.projects.items.forEach((item) => {
      text += `
${item.name}
${item.description}
Technologies: ${item.technologies?.join(', ') || 'N/A'}
URL: ${item.url || 'N/A'}
`;
    });
  }

  return text;
}

function createFallbackAnalysis(resumeText: string): AnalysisResult {
  // Basic analysis when AI parsing fails
  const wordCount = resumeText.split(/\s+/).length;
  const hasContact = resumeText.includes('@') && resumeText.includes('(');
  const hasExperience = resumeText.toLowerCase().includes('experience');
  const hasEducation = resumeText.toLowerCase().includes('education');
  
  let score = 60;
  if (hasContact) score += 10;
  if (hasExperience) score += 10;
  if (hasEducation) score += 10;
  if (wordCount > 200) score += 10;

  return {
    overallScore: Math.min(100, score),
    contentScore: Math.min(100, score + 5),
    atsScore: Math.min(100, score - 5),
    summary: "Basic analysis completed. For detailed insights, please try again.",
    spellingErrors: [],
    atsIssues: [
      {
        issue: "Unable to perform detailed ATS analysis",
        suggestion: "Please try the analysis again for comprehensive feedback",
        severity: 'medium'
      }
    ],
    recommendations: [
      {
        title: "Retry Analysis",
        description: "For detailed recommendations, please run the analysis again",
        severity: 'medium',
        section: 'general'
      }
    ],
    keywordMatches: [],
    suggestedKeywords: []
  };
}