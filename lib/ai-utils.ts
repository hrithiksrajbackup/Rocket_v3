"use client";

import { ResumeData } from "./types";

const GEMINI_API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export type AIFeedbackType = "improve" | "shorten" | "expand" | "professional" | "keywords";

interface AIFeedbackRequest {
  resumeData: ResumeData;
  sectionType: string;
  itemId: string;
  contentToImprove: string;
  feedbackType: AIFeedbackType;
  jobDescription?: string;
}

export async function getAIFeedback({
  resumeData,
  sectionType,
  itemId,
  contentToImprove,
  feedbackType,
  jobDescription
}: AIFeedbackRequest): Promise<string> {
  
  if (!API_KEY) {
    throw new Error("API key not configured. Please set the NEXT_PUBLIC_GEMINI_API_KEY environment variable.");
  }

  let prompt = "";
  
  switch (feedbackType) {
    case "improve":
      prompt = `As an expert resume writer, improve the following content for a ${resumeData.personal.title} resume. Make it more impactful, action-oriented, and professional:\n\n${contentToImprove}`;
      break;
    case "shorten":
      prompt = `As an expert resume writer, shorten the following content while preserving its impact and key information:\n\n${contentToImprove}`;
      break;
    case "expand":
      prompt = `As an expert resume writer, expand the following content with more details, quantifiable achievements, and professional language:\n\n${contentToImprove}`;
      break;
    case "professional":
      prompt = `As an expert resume writer, rewrite the following content to sound more professional, using industry-standard terminology for a ${resumeData.personal.title} position:\n\n${contentToImprove}`;
      break;
    case "keywords":
      if (!jobDescription) {
        throw new Error("Job description is required for keyword optimization");
      }
      prompt = `As an expert resume writer, optimize the following content to include relevant keywords from the job description to improve ATS compatibility. Make sure the content still sounds natural and professional.\n\nResume content:\n${contentToImprove}\n\nJob description:\n${jobDescription}`;
      break;
  }

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
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`AI service error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the generated text from the response
    const generatedText = data.candidates[0].content.parts[0].text;
    
    return generatedText;
  } catch (error) {
    console.error("Error getting AI feedback:", error);
    throw error;
  }
}

export async function checkATSCompatibility(resumeData: ResumeData, jobDescription?: string): Promise<{
  score: number;
  feedback: string[];
  missingKeywords?: string[];
}> {
  if (!API_KEY) {
    throw new Error("API key not configured. Please set the NEXT_PUBLIC_GEMINI_API_KEY environment variable.");
  }

  // Convert resume data to a string representation
  const resumeText = `
    ${resumeData.personal.name}
    ${resumeData.personal.title}
    ${resumeData.personal.summary}
    
    EXPERIENCE:
    ${resumeData.sections.experience.items?.map(item => 
      `${item.position} at ${item.company} (${item.startDate} - ${item.endDate})
      ${item.description.join('\n')}`
    ).join('\n\n')}
    
    EDUCATION:
    ${resumeData.sections.education.items?.map(item => 
      `${item.degree} in ${item.field}
      ${item.institution} (${item.startDate} - ${item.endDate})`
    ).join('\n\n')}
    
    SKILLS:
    ${resumeData.sections.skills.groups.map(group => 
      `${group.name}: ${group.skills.map(skill => skill.name).join(', ')}`
    ).join('\n')}
  `;

  let prompt = "As an expert in ATS (Applicant Tracking Systems), evaluate the following resume for ATS compatibility. Provide a score from 0-100 and specific feedback on how to improve compatibility. Include comments on format, keywords, and structure.";
  
  if (jobDescription) {
    prompt += " Also analyze if the resume contains the key requirements and skills mentioned in the job description and identify any missing important keywords.";
    prompt += `\n\nJOB DESCRIPTION:\n${jobDescription}\n\n`;
  }
  
  prompt += `\nRESUME:\n${resumeText}`;

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
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`AI service error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Parse the AI's response to extract the score and feedback
    // This is a simplified approach - in a real app, you might want to structure the AI's response more precisely
    const scoreMatch = generatedText.match(/score.*?(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 70;
    
    // Extract feedback points (look for bullet points or numbered lists)
    const feedbackLines = generatedText
      .split('\n')
      .filter(line => line.match(/^[•\-\*\d]\.?\s+/) || line.includes('improve') || line.includes('recommend') || line.includes('missing'))
      .map(line => line.trim());
    
    // Extract missing keywords if job description was provided
    let missingKeywords: string[] | undefined;
    if (jobDescription) {
      const keywordSection = generatedText.split(/missing keywords?|key skills missing|missing skills/i)[1];
      if (keywordSection) {
        missingKeywords = keywordSection
          .split('\n')
          .filter(line => line.match(/^[•\-\*\d]\.?\s+/))
          .map(line => line.replace(/^[•\-\*\d]\.?\s+/, '').trim());
      }
    }
    
    return {
      score,
      feedback: feedbackLines.length > 0 ? feedbackLines : ["Your resume appears to be ATS compatible. Consider tailoring it to specific job descriptions for better results."],
      missingKeywords
    };
  } catch (error) {
    console.error("Error checking ATS compatibility:", error);
    throw error;
  }
}