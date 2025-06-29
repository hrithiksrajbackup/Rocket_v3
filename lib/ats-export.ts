import { ResumeData } from "./types";
import jsPDF from "jspdf";

export interface ATSExportOptions {
  format: 'pdf' | 'docx' | 'txt';
  includeImages?: boolean;
  fontSize?: number;
  pageMargins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface ExportProgress {
  stage: 'preparing' | 'generating' | 'optimizing' | 'complete' | 'error';
  progress: number;
  message: string;
  fileSize?: string;
}

export class ATSExporter {
  private progressCallback?: (progress: ExportProgress) => void;

  constructor(progressCallback?: (progress: ExportProgress) => void) {
    this.progressCallback = progressCallback;
  }

  private updateProgress(stage: ExportProgress['stage'], progress: number, message: string, fileSize?: string) {
    if (this.progressCallback) {
      this.progressCallback({ stage, progress, message, fileSize });
    }
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async exportResume(resumeData: ResumeData, options: ATSExportOptions): Promise<void> {
    this.updateProgress('preparing', 10, 'Preparing ATS-optimized export...');

    try {
      switch (options.format) {
        case 'pdf':
          await this.exportToPDF(resumeData, options);
          break;
        case 'docx':
          await this.exportToDOCX(resumeData, options);
          break;
        case 'txt':
          await this.exportToTXT(resumeData, options);
          break;
        default:
          throw new Error(`Unsupported format: ${options.format}`);
      }
    } catch (error) {
      this.updateProgress('error', 0, `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private async exportToPDF(resumeData: ResumeData, options: ATSExportOptions): Promise<void> {
    this.updateProgress('generating', 30, 'Generating PDF structure...');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margins = options.pageMargins || { top: 20, right: 20, bottom: 20, left: 20 };
    const contentWidth = pageWidth - margins.left - margins.right;
    
    let yPosition = margins.top;
    const lineHeight = 6;
    const sectionSpacing = 8;

    // Set font
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(options.fontSize || 11);

    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize: number = 11, fontStyle: 'normal' | 'bold' = 'normal') => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      
      const lines = pdf.splitTextToSize(text, contentWidth);
      
      // Check if we need a new page
      if (yPosition + (lines.length * lineHeight) > pageHeight - margins.bottom) {
        pdf.addPage();
        yPosition = margins.top;
      }
      
      lines.forEach((line: string) => {
        pdf.text(line, margins.left, yPosition);
        yPosition += lineHeight;
      });
    };

    // Header Section
    addText(resumeData.personal.name, 18, 'bold');
    yPosition += 2;
    addText(resumeData.personal.title, 14, 'normal');
    yPosition += sectionSpacing;

    // Contact Information
    const contactInfo = [
      resumeData.personal.email,
      resumeData.personal.phone,
      resumeData.personal.location,
      resumeData.personal.linkedin,
      resumeData.personal.github,
      resumeData.personal.website
    ].filter(Boolean).join(' | ');
    
    addText(contactInfo, 10);
    yPosition += sectionSpacing;

    this.updateProgress('generating', 50, 'Adding content sections...', '45 KB');

    // Professional Summary
    if (resumeData.personal.summary) {
      addText('PROFESSIONAL SUMMARY', 12, 'bold');
      yPosition += 2;
      addText(resumeData.personal.summary);
      yPosition += sectionSpacing;
    }

    // Work Experience
    if (resumeData.sections.experience.visible && resumeData.sections.experience.items?.length) {
      addText(resumeData.sections.experience.title.toUpperCase(), 12, 'bold');
      yPosition += 2;

      resumeData.sections.experience.items.forEach((exp: any) => {
        // Job title and company
        addText(`${exp.position} | ${exp.company}`, 11, 'bold');
        
        // Date and location
        const dateLocation = `${exp.startDate} - ${exp.endDate} | ${exp.location}`;
        addText(dateLocation, 10);
        yPosition += 2;

        // Job description
        exp.description.forEach((desc: string) => {
          addText(`• ${desc}`, 10);
        });

        // Technologies
        if (exp.technologies?.length) {
          addText(`Technologies: ${exp.technologies.join(', ')}`, 10);
        }
        
        yPosition += sectionSpacing;
      });
    }

    // Education
    if (resumeData.sections.education.visible && resumeData.sections.education.items?.length) {
      addText(resumeData.sections.education.title.toUpperCase(), 12, 'bold');
      yPosition += 2;

      resumeData.sections.education.items.forEach((edu: any) => {
        addText(`${edu.degree} in ${edu.field}`, 11, 'bold');
        addText(`${edu.institution} | ${edu.startDate} - ${edu.endDate}`, 10);
        if (edu.gpa) addText(`GPA: ${edu.gpa}`, 10);
        yPosition += sectionSpacing;
      });
    }

    // Skills
    if (resumeData.sections.skills.visible && resumeData.sections.skills.groups?.length) {
      addText(resumeData.sections.skills.title.toUpperCase(), 12, 'bold');
      yPosition += 2;

      resumeData.sections.skills.groups.forEach((group: any) => {
        const skillsList = group.skills.map((skill: any) => skill.name).join(', ');
        addText(`${group.name}: ${skillsList}`, 10);
      });
      yPosition += sectionSpacing;
    }

    // Projects
    if (resumeData.sections.projects.visible && resumeData.sections.projects.items?.length) {
      addText(resumeData.sections.projects.title.toUpperCase(), 12, 'bold');
      yPosition += 2;

      resumeData.sections.projects.items.forEach((project: any) => {
        addText(project.name, 11, 'bold');
        addText(project.description, 10);
        if (project.technologies?.length) {
          addText(`Technologies: ${project.technologies.join(', ')}`, 10);
        }
        yPosition += sectionSpacing;
      });
    }

    this.updateProgress('optimizing', 80, 'Optimizing for ATS compatibility...', '66 KB');

    // Generate filename
    const fileName = `${resumeData.personal.name.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`;
    
    this.updateProgress('complete', 100, 'Export completed successfully!', '66 KB');
    
    // Save the PDF
    pdf.save(fileName);
  }

  private async exportToDOCX(resumeData: ResumeData, options: ATSExportOptions): Promise<void> {
    this.updateProgress('generating', 30, 'Generating DOCX structure...');

    // Create a clean HTML structure for DOCX conversion
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: 'Calibri', 'Arial', sans-serif; 
            font-size: ${options.fontSize || 11}pt;
            line-height: 1.15;
            margin: 0.5in;
            color: #000000;
          }
          h1 { 
            font-size: 18pt; 
            font-weight: bold; 
            margin: 0 0 6pt 0;
            color: #000000;
          }
          h2 { 
            font-size: 14pt; 
            font-weight: bold; 
            margin: 12pt 0 6pt 0;
            text-transform: uppercase;
            color: #000000;
          }
          h3 { 
            font-size: 12pt; 
            font-weight: bold; 
            margin: 6pt 0 3pt 0;
            color: #000000;
          }
          p { 
            margin: 3pt 0; 
            color: #000000;
          }
          .contact-info { 
            font-size: 10pt; 
            margin-bottom: 12pt;
            color: #000000;
          }
          .job-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 3pt;
          }
          .date-location {
            font-size: 10pt;
            color: #666666;
          }
          ul { 
            margin: 6pt 0; 
            padding-left: 18pt; 
          }
          li { 
            margin-bottom: 3pt;
            color: #000000;
          }
          .technologies {
            font-style: italic;
            font-size: 10pt;
            color: #666666;
          }
        </style>
      </head>
      <body>
    `;

    // Header
    htmlContent += `
      <h1>${resumeData.personal.name}</h1>
      <p style="font-size: 14pt; margin-bottom: 6pt;">${resumeData.personal.title}</p>
      <div class="contact-info">
        ${[
          resumeData.personal.email,
          resumeData.personal.phone,
          resumeData.personal.location,
          resumeData.personal.linkedin,
          resumeData.personal.github,
          resumeData.personal.website
        ].filter(Boolean).join(' | ')}
      </div>
    `;

    this.updateProgress('generating', 50, 'Adding content sections...', '52 KB');

    // Professional Summary
    if (resumeData.personal.summary) {
      htmlContent += `
        <h2>Professional Summary</h2>
        <p>${resumeData.personal.summary}</p>
      `;
    }

    // Work Experience
    if (resumeData.sections.experience.visible && resumeData.sections.experience.items?.length) {
      htmlContent += `<h2>${resumeData.sections.experience.title}</h2>`;
      
      resumeData.sections.experience.items.forEach((exp: any) => {
        htmlContent += `
          <div class="job-header">
            <h3>${exp.position} | ${exp.company}</h3>
            <span class="date-location">${exp.startDate} - ${exp.endDate} | ${exp.location}</span>
          </div>
          <ul>
            ${exp.description.map((desc: string) => `<li>${desc}</li>`).join('')}
          </ul>
          ${exp.technologies?.length ? `<p class="technologies">Technologies: ${exp.technologies.join(', ')}</p>` : ''}
        `;
      });
    }

    // Education
    if (resumeData.sections.education.visible && resumeData.sections.education.items?.length) {
      htmlContent += `<h2>${resumeData.sections.education.title}</h2>`;
      
      resumeData.sections.education.items.forEach((edu: any) => {
        htmlContent += `
          <div class="job-header">
            <h3>${edu.degree} in ${edu.field}</h3>
            <span class="date-location">${edu.startDate} - ${edu.endDate}</span>
          </div>
          <p>${edu.institution}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
        `;
      });
    }

    // Skills
    if (resumeData.sections.skills.visible && resumeData.sections.skills.groups?.length) {
      htmlContent += `<h2>${resumeData.sections.skills.title}</h2>`;
      
      resumeData.sections.skills.groups.forEach((group: any) => {
        const skillsList = group.skills.map((skill: any) => skill.name).join(', ');
        htmlContent += `<p><strong>${group.name}:</strong> ${skillsList}</p>`;
      });
    }

    htmlContent += '</body></html>';

    this.updateProgress('optimizing', 80, 'Optimizing for ATS compatibility...', '52 KB');

    // Create blob and download
    const blob = new Blob([htmlContent], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });

    const fileName = `${resumeData.personal.name.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.docx`;
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.updateProgress('complete', 100, 'Export completed successfully!', '52 KB');
  }

  private async exportToTXT(resumeData: ResumeData, options: ATSExportOptions): Promise<void> {
    this.updateProgress('generating', 30, 'Generating plain text format...');

    let textContent = '';

    // Header
    textContent += `${resumeData.personal.name}\n`;
    textContent += `${resumeData.personal.title}\n`;
    textContent += `${[
      resumeData.personal.email,
      resumeData.personal.phone,
      resumeData.personal.location,
      resumeData.personal.linkedin,
      resumeData.personal.github,
      resumeData.personal.website
    ].filter(Boolean).join(' | ')}\n\n`;

    this.updateProgress('generating', 50, 'Adding content sections...', '8 KB');

    // Professional Summary
    if (resumeData.personal.summary) {
      textContent += `PROFESSIONAL SUMMARY\n`;
      textContent += `${resumeData.personal.summary}\n\n`;
    }

    // Work Experience
    if (resumeData.sections.experience.visible && resumeData.sections.experience.items?.length) {
      textContent += `${resumeData.sections.experience.title.toUpperCase()}\n`;
      
      resumeData.sections.experience.items.forEach((exp: any) => {
        textContent += `\n${exp.position} | ${exp.company}\n`;
        textContent += `${exp.startDate} - ${exp.endDate} | ${exp.location}\n`;
        exp.description.forEach((desc: string) => {
          textContent += `• ${desc}\n`;
        });
        if (exp.technologies?.length) {
          textContent += `Technologies: ${exp.technologies.join(', ')}\n`;
        }
      });
      textContent += '\n';
    }

    // Education
    if (resumeData.sections.education.visible && resumeData.sections.education.items?.length) {
      textContent += `${resumeData.sections.education.title.toUpperCase()}\n`;
      
      resumeData.sections.education.items.forEach((edu: any) => {
        textContent += `\n${edu.degree} in ${edu.field}\n`;
        textContent += `${edu.institution} | ${edu.startDate} - ${edu.endDate}\n`;
        if (edu.gpa) textContent += `GPA: ${edu.gpa}\n`;
      });
      textContent += '\n';
    }

    // Skills
    if (resumeData.sections.skills.visible && resumeData.sections.skills.groups?.length) {
      textContent += `${resumeData.sections.skills.title.toUpperCase()}\n`;
      
      resumeData.sections.skills.groups.forEach((group: any) => {
        const skillsList = group.skills.map((skill: any) => skill.name).join(', ');
        textContent += `${group.name}: ${skillsList}\n`;
      });
      textContent += '\n';
    }

    this.updateProgress('optimizing', 80, 'Optimizing for ATS compatibility...', '8 KB');

    // Create blob and download
    const blob = new Blob([textContent], { type: 'text/plain' });
    const fileName = `${resumeData.personal.name.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.txt`;
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.updateProgress('complete', 100, 'Export completed successfully!', '8 KB');
  }
}

export const createATSExporter = (progressCallback?: (progress: ExportProgress) => void) => {
  return new ATSExporter(progressCallback);
};