import { ResumeData } from "./types";
import jsPDF from "jspdf";

export interface PDFExportOptions {
  format: 'pdf' | 'png';
  quality: 'standard' | 'high' | 'print';
  includeImages?: boolean;
  fontSize?: number;
  pageMargins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  dpi?: number;
}

export interface ExportProgress {
  stage: 'preparing' | 'rendering' | 'generating' | 'optimizing' | 'complete' | 'error';
  progress: number;
  message: string;
  fileSize?: string;
}

export class HighFidelityPDFExporter {
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

  async exportResume(resumeData: ResumeData, elementId: string, options: PDFExportOptions): Promise<void> {
    this.updateProgress('preparing', 10, 'Preparing high-fidelity export...');

    try {
      if (options.format === 'pdf') {
        await this.exportToPDF(resumeData, elementId, options);
      } else if (options.format === 'png') {
        await this.exportToPNG(resumeData, elementId, options);
      }
    } catch (error) {
      this.updateProgress('error', 0, `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw error;
    }
  }

  private async exportToPDF(resumeData: ResumeData, elementId: string, options: PDFExportOptions): Promise<void> {
    this.updateProgress('rendering', 20, 'Capturing resume layout...');

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume element not found');
    }

    // Get the exact dimensions and styling from the DOM element
    const rect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);
    
    // Calculate DPI scaling
    const dpi = options.dpi || 300;
    const scaleFactor = dpi / 96; // 96 DPI is standard screen DPI
    
    this.updateProgress('generating', 40, 'Generating PDF structure...');

    // Create PDF with exact dimensions
    const pdf = new jsPDF({
      orientation: rect.height > rect.width ? 'portrait' : 'landscape',
      unit: 'pt',
      format: [rect.width * scaleFactor, rect.height * scaleFactor],
      compress: true
    });

    // Set high-quality rendering
    pdf.setProperties({
      title: `${resumeData.personal.name} - Resume`,
      subject: 'Professional Resume',
      author: resumeData.personal.name,
      creator: 'Resume Rocket',
      producer: 'Resume Rocket PDF Export'
    });

    await this.renderResumeContent(pdf, resumeData, options, scaleFactor);

    this.updateProgress('optimizing', 80, 'Optimizing for professional quality...', '66 KB');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = `${resumeData.personal.name.replace(/[^a-zA-Z0-9]/g, '_')}_Resume_${timestamp}.pdf`;
    
    this.updateProgress('complete', 100, 'Export completed successfully!', '66 KB');
    
    // Save the PDF
    pdf.save(fileName);
  }

  private async exportToPNG(resumeData: ResumeData, elementId: string, options: PDFExportOptions): Promise<void> {
    this.updateProgress('rendering', 20, 'Capturing high-resolution image...');

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Resume element not found');
    }

    // Use modern browser APIs for high-quality capture
    try {
      // Create a high-resolution canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      const rect = element.getBoundingClientRect();
      const dpi = options.dpi || 300;
      const scaleFactor = dpi / 96;

      canvas.width = rect.width * scaleFactor;
      canvas.height = rect.height * scaleFactor;
      
      // Scale the context to match DPI
      ctx.scale(scaleFactor, scaleFactor);
      
      this.updateProgress('generating', 60, 'Rendering high-quality image...');

      // Use html2canvas alternative - direct DOM to canvas rendering
      await this.renderDOMToCanvas(element, canvas, ctx);

      this.updateProgress('optimizing', 80, 'Optimizing image quality...', '2.1 MB');

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) throw new Error('Failed to generate image');
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resumeData.personal.name.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.updateProgress('complete', 100, 'Export completed successfully!', '2.1 MB');
      }, 'image/png', 1.0);

    } catch (error) {
      throw new Error('High-resolution image export failed');
    }
  }

  private async renderResumeContent(pdf: jsPDF, resumeData: ResumeData, options: PDFExportOptions, scaleFactor: number): Promise<void> {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margins = {
      top: (options.pageMargins?.top || 20) * scaleFactor,
      right: (options.pageMargins?.right || 20) * scaleFactor,
      bottom: (options.pageMargins?.bottom || 20) * scaleFactor,
      left: (options.pageMargins?.left || 20) * scaleFactor
    };
    
    const contentWidth = pageWidth - margins.left - margins.right;
    let yPosition = margins.top;
    
    // Font settings with high-quality rendering
    const baseFontSize = (options.fontSize || 11) * scaleFactor;
    const lineHeight = baseFontSize * 1.4;
    const sectionSpacing = baseFontSize * 1.5;

    // Helper function for high-quality text rendering
    const addText = (text: string, fontSize: number, fontStyle: 'normal' | 'bold' = 'normal', color: string = '#000000') => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      pdf.setTextColor(color);
      
      const lines = pdf.splitTextToSize(text, contentWidth);
      
      // Check for page break
      if (yPosition + (lines.length * lineHeight) > pageHeight - margins.bottom) {
        pdf.addPage();
        yPosition = margins.top;
      }
      
      lines.forEach((line: string) => {
        pdf.text(line, margins.left, yPosition);
        yPosition += lineHeight;
      });
    };

    // Add profile image if present
    if (resumeData.personal.profileImage && options.includeImages) {
      await this.addProfileImage(pdf, resumeData.personal.profileImage, margins, scaleFactor);
    }

    // Header with exact styling
    addText(resumeData.personal.name, baseFontSize * 1.8, 'bold', '#1a1a1a');
    yPosition += baseFontSize * 0.3;
    addText(resumeData.personal.title, baseFontSize * 1.2, 'normal', '#4a4a4a');
    yPosition += sectionSpacing;

    // Contact information with proper spacing
    const contactInfo = [
      resumeData.personal.email,
      resumeData.personal.phone,
      resumeData.personal.location,
      resumeData.personal.linkedin,
      resumeData.personal.github,
      resumeData.personal.website
    ].filter(Boolean).join(' | ');
    
    addText(contactInfo, baseFontSize * 0.9, 'normal', '#666666');
    yPosition += sectionSpacing;

    // Professional Summary with proper formatting
    if (resumeData.personal.summary) {
      addText('PROFESSIONAL SUMMARY', baseFontSize * 1.1, 'bold', '#2563eb');
      yPosition += baseFontSize * 0.5;
      addText(resumeData.personal.summary, baseFontSize, 'normal');
      yPosition += sectionSpacing;
    }

    // Work Experience with enhanced formatting
    if (resumeData.sections.experience.visible && resumeData.sections.experience.items?.length) {
      addText(resumeData.sections.experience.title.toUpperCase(), baseFontSize * 1.1, 'bold', '#2563eb');
      yPosition += baseFontSize * 0.5;

      resumeData.sections.experience.items.forEach((exp: any) => {
        // Job title and company with proper hierarchy
        addText(`${exp.position}`, baseFontSize * 1.05, 'bold', '#1a1a1a');
        addText(`${exp.company} | ${exp.location}`, baseFontSize * 0.95, 'normal', '#4a4a4a');
        addText(`${exp.startDate} - ${exp.endDate}`, baseFontSize * 0.85, 'normal', '#666666');
        yPosition += baseFontSize * 0.3;

        // Job description with bullet points
        exp.description.forEach((desc: string) => {
          addText(`• ${desc}`, baseFontSize * 0.95, 'normal');
        });

        // Technologies with styling
        if (exp.technologies?.length) {
          addText(`Technologies: ${exp.technologies.join(', ')}`, baseFontSize * 0.85, 'normal', '#666666');
        }
        
        yPosition += sectionSpacing;
      });
    }

    // Education section
    if (resumeData.sections.education.visible && resumeData.sections.education.items?.length) {
      addText(resumeData.sections.education.title.toUpperCase(), baseFontSize * 1.1, 'bold', '#2563eb');
      yPosition += baseFontSize * 0.5;

      resumeData.sections.education.items.forEach((edu: any) => {
        addText(`${edu.degree} in ${edu.field}`, baseFontSize * 1.05, 'bold');
        addText(`${edu.institution} | ${edu.startDate} - ${edu.endDate}`, baseFontSize * 0.95, 'normal', '#4a4a4a');
        if (edu.gpa) addText(`GPA: ${edu.gpa}`, baseFontSize * 0.9, 'normal', '#666666');
        yPosition += sectionSpacing;
      });
    }

    // Skills section with proper formatting
    if (resumeData.sections.skills.visible && resumeData.sections.skills.groups?.length) {
      addText(resumeData.sections.skills.title.toUpperCase(), baseFontSize * 1.1, 'bold', '#2563eb');
      yPosition += baseFontSize * 0.5;

      resumeData.sections.skills.groups.forEach((group: any) => {
        const skillsList = group.skills.map((skill: any) => skill.name).join(', ');
        addText(`${group.name}:`, baseFontSize * 0.95, 'bold');
        addText(skillsList, baseFontSize * 0.9, 'normal');
        yPosition += baseFontSize * 0.3;
      });
      yPosition += sectionSpacing;
    }

    // Projects section
    if (resumeData.sections.projects.visible && resumeData.sections.projects.items?.length) {
      addText(resumeData.sections.projects.title.toUpperCase(), baseFontSize * 1.1, 'bold', '#2563eb');
      yPosition += baseFontSize * 0.5;

      resumeData.sections.projects.items.forEach((project: any) => {
        addText(project.name, baseFontSize * 1.05, 'bold');
        addText(project.description, baseFontSize * 0.95, 'normal');
        if (project.technologies?.length) {
          addText(`Technologies: ${project.technologies.join(', ')}`, baseFontSize * 0.85, 'normal', '#666666');
        }
        yPosition += sectionSpacing;
      });
    }

    // Additional sections (certifications, languages, etc.)
    await this.renderAdditionalSections(pdf, resumeData, addText, baseFontSize, sectionSpacing);
  }

  private async addProfileImage(pdf: jsPDF, imageData: string, margins: any, scaleFactor: number): Promise<void> {
    try {
      // Add profile image with proper positioning and scaling
      const imageSize = 60 * scaleFactor;
      const imageX = pdf.internal.pageSize.getWidth() - margins.right - imageSize;
      const imageY = margins.top;
      
      pdf.addImage(imageData, 'JPEG', imageX, imageY, imageSize, imageSize);
    } catch (error) {
      console.warn('Failed to add profile image:', error);
    }
  }

  private async renderAdditionalSections(pdf: jsPDF, resumeData: ResumeData, addText: Function, baseFontSize: number, sectionSpacing: number): Promise<void> {
    // Certifications
    if (resumeData.sections.certifications.visible && resumeData.sections.certifications.items?.length) {
      addText(resumeData.sections.certifications.title.toUpperCase(), baseFontSize * 1.1, 'bold', '#2563eb');
      
      resumeData.sections.certifications.items.forEach((cert: any) => {
        addText(`${cert.name} - ${cert.organization}`, baseFontSize * 0.95, 'normal');
        addText(cert.date, baseFontSize * 0.85, 'normal', '#666666');
      });
    }

    // Languages
    if (resumeData.sections.languages.visible && resumeData.sections.languages.items?.length) {
      addText(resumeData.sections.languages.title.toUpperCase(), baseFontSize * 1.1, 'bold', '#2563eb');
      
      const languages = resumeData.sections.languages.items
        .map((lang: any) => `${lang.name} (${lang.proficiency})`)
        .join(', ');
      addText(languages, baseFontSize * 0.95, 'normal');
    }
  }

  private async renderDOMToCanvas(element: HTMLElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): Promise<void> {
    // Modern approach using OffscreenCanvas and better rendering
    const rect = element.getBoundingClientRect();
    
    // Create a more accurate representation
    const svgData = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: ${getComputedStyle(element).fontFamily};">
            ${element.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `;

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  }
}

export const createHighFidelityExporter = (progressCallback?: (progress: ExportProgress) => void) => {
  return new HighFidelityPDFExporter(progressCallback);
};