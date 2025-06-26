import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ResumeData } from "./types";

export type ExportFormat = "pdf" | "png";

export interface ExportOptions {
  format: ExportFormat;
  fileName?: string;
  quality?: number;
  scale?: number;
  includeBackground?: boolean;
}

export interface ExportProgress {
  stage: "preparing" | "rendering" | "converting" | "downloading" | "complete" | "error";
  progress: number;
  message: string;
}

export class EnhancedResumeExporter {
  private progressCallback?: (progress: ExportProgress) => void;

  constructor(progressCallback?: (progress: ExportProgress) => void) {
    this.progressCallback = progressCallback;
  }

  private updateProgress(
    stage: ExportProgress["stage"],
    progress: number,
    message: string
  ) {
    if (this.progressCallback) {
      this.progressCallback({ stage, progress, message });
    }
  }

  async exportResume(
    elementId: string,
    resumeData: ResumeData,
    options: ExportOptions
  ): Promise<void> {
    try {
      this.updateProgress("preparing", 0, "Preparing export...");

      // Validate resume content
      this.validateResumeContent(resumeData);

      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error("Resume element not found");
      }

      // Generate filename if not provided
      const fileName = options.fileName || this.generateFileName(resumeData, options.format);

      // Prepare element for high-quality export
      const preparedElement = await this.prepareElementForExport(element);

      try {
        switch (options.format) {
          case "pdf":
            await this.exportToPDF(preparedElement, fileName, options);
            break;
          case "png":
            await this.exportToPNG(preparedElement, fileName, options);
            break;
          default:
            throw new Error(`Unsupported export format: ${options.format}`);
        }

        this.updateProgress("complete", 100, "Export completed successfully!");
      } finally {
        // Cleanup
        if (preparedElement.parentNode) {
          preparedElement.parentNode.removeChild(preparedElement);
        }
      }
    } catch (error) {
      console.error("Export error:", error);
      this.updateProgress(
        "error",
        0,
        `Export failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      throw error;
    }
  }

  private validateResumeContent(resumeData: ResumeData): void {
    if (!resumeData.personal.name.trim()) {
      throw new Error("Name is required for export");
    }
    if (!resumeData.personal.email.trim()) {
      throw new Error("Email is required for export");
    }
  }

  private generateFileName(resumeData: ResumeData, format: ExportFormat): string {
    const name = resumeData.personal.name.replace(/[^a-zA-Z0-9]/g, "_");
    const timestamp = new Date().toISOString().split("T")[0];
    return `${name}_Resume_${timestamp}.${format}`;
  }

  private async prepareElementForExport(element: HTMLElement): Promise<HTMLElement> {
    this.updateProgress("preparing", 10, "Preparing element for export...");

    // Clone the element
    const clonedElement = element.cloneNode(true) as HTMLElement;

    // Apply print-specific styles
    this.applyPrintStyles(clonedElement);

    // Position off-screen but visible for rendering
    clonedElement.style.position = "absolute";
    clonedElement.style.left = "-9999px";
    clonedElement.style.top = "0";
    clonedElement.style.zIndex = "-1000";
    clonedElement.style.visibility = "visible";
    clonedElement.style.opacity = "1";

    // Set fixed dimensions for consistent rendering
    const originalRect = element.getBoundingClientRect();
    clonedElement.style.width = `${originalRect.width}px`;
    clonedElement.style.height = "auto";
    clonedElement.style.minHeight = `${originalRect.height}px`;

    // Remove interactive elements
    this.removeInteractiveElements(clonedElement);

    // Ensure fonts are loaded
    await this.ensureFontsLoaded(clonedElement);

    // Add to DOM for rendering
    document.body.appendChild(clonedElement);

    // Wait for layout to settle
    await new Promise(resolve => setTimeout(resolve, 100));

    return clonedElement;
  }

  private applyPrintStyles(element: HTMLElement): void {
    // Create and inject print-specific CSS
    const printStyles = `
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      body {
        margin: 0 !important;
        padding: 0 !important;
      }
      
      .no-print {
        display: none !important;
      }
      
      .print-break-before {
        page-break-before: always !important;
      }
      
      .print-break-after {
        page-break-after: always !important;
      }
      
      .print-break-inside-avoid {
        page-break-inside: avoid !important;
      }
      
      /* Ensure backgrounds and colors are preserved */
      .bg-gradient-to-r,
      .bg-gradient-to-l,
      .bg-gradient-to-t,
      .bg-gradient-to-b,
      .bg-gradient-to-br,
      .bg-gradient-to-bl,
      .bg-gradient-to-tr,
      .bg-gradient-to-tl {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = printStyles;
    element.appendChild(styleElement);

    // Apply print-friendly classes
    element.classList.add('print-optimized');
  }

  private removeInteractiveElements(element: HTMLElement): void {
    // Remove buttons, hover states, and other interactive elements
    const interactiveSelectors = [
      'button:not(.print-keep)',
      '.hover\\:',
      '.focus\\:',
      '.group-hover\\:',
      '[role="button"]:not(.print-keep)',
      '.cursor-pointer:not(.print-keep)',
      '.interactive:not(.print-keep)'
    ];

    interactiveSelectors.forEach(selector => {
      try {
        const elements = element.querySelectorAll(selector);
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'none';
          }
        });
      } catch (e) {
        // Ignore invalid selectors
      }
    });
  }

  private async ensureFontsLoaded(element: HTMLElement): Promise<void> {
    const fontFamilies = new Set<string>();

    // Collect all font families used in the element
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_ELEMENT,
      null
    );

    let node;
    while (node = walker.nextNode()) {
      if (node instanceof HTMLElement) {
        const computedStyle = window.getComputedStyle(node);
        const fontFamily = computedStyle.fontFamily;
        if (fontFamily) {
          fontFamilies.add(fontFamily);
        }
      }
    }

    // Wait for fonts to load
    const fontPromises = Array.from(fontFamilies).map(async (fontFamily) => {
      try {
        await document.fonts.load(`16px ${fontFamily}`);
      } catch (e) {
        console.warn(`Failed to load font: ${fontFamily}`);
      }
    });

    await Promise.all(fontPromises);
    await document.fonts.ready;
  }

  private async exportToPDF(
    element: HTMLElement,
    fileName: string,
    options: ExportOptions
  ): Promise<void> {
    this.updateProgress("rendering", 30, "Rendering resume for PDF...");

    const canvas = await html2canvas(element, {
      scale: options.scale || 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: options.includeBackground ? "#ffffff" : null,
      logging: false,
      imageTimeout: 15000,
      removeContainer: false,
      foreignObjectRendering: true,
      onclone: (clonedDoc, clonedElement) => {
        // Ensure all styles are properly applied in the cloned document
        this.applyClonedDocumentStyles(clonedDoc, clonedElement);
      }
    });

    this.updateProgress("converting", 70, "Converting to PDF...");

    // Calculate PDF dimensions (A4 size in points)
    const pdfWidth = 595.28; // A4 width in points
    const pdfHeight = 841.89; // A4 height in points
    
    // Calculate scale to fit content to page width
    const scale = pdfWidth / canvas.width;
    const scaledHeight = canvas.height * scale;

    // Create PDF
    const pdf = new jsPDF({
      orientation: scaledHeight > pdfHeight ? 'portrait' : 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    // Add image to PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    
    if (scaledHeight <= pdfHeight) {
      // Fits on one page
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, scaledHeight);
    } else {
      // Multiple pages needed
      let yPosition = 0;
      let pageHeight = pdfHeight;
      
      while (yPosition < scaledHeight) {
        if (yPosition > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(
          imgData, 
          'PNG', 
          0, 
          -yPosition, 
          pdfWidth, 
          scaledHeight
        );
        
        yPosition += pageHeight;
      }
    }

    this.updateProgress("downloading", 90, "Preparing download...");

    // Save the PDF
    pdf.save(fileName);
  }

  private async exportToPNG(
    element: HTMLElement,
    fileName: string,
    options: ExportOptions
  ): Promise<void> {
    this.updateProgress("rendering", 30, "Rendering resume for PNG...");

    const canvas = await html2canvas(element, {
      scale: options.scale || 3,
      useCORS: true,
      allowTaint: false,
      backgroundColor: options.includeBackground ? "#ffffff" : null,
      logging: false,
      imageTimeout: 15000,
      removeContainer: false,
      foreignObjectRendering: true
    });

    this.updateProgress("converting", 70, "Converting to PNG...");

    // Convert to blob with high quality
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create PNG blob"));
            return;
          }

          this.updateProgress("downloading", 90, "Preparing download...");

          // Download the PNG
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          resolve();
        },
        "image/png",
        options.quality || 1.0
      );
    });
  }

  private applyClonedDocumentStyles(clonedDoc: Document, clonedElement: HTMLElement): void {
    // Copy all stylesheets to the cloned document
    const originalStyleSheets = Array.from(document.styleSheets);
    
    originalStyleSheets.forEach((styleSheet) => {
      try {
        if (styleSheet.href) {
          // External stylesheet
          const link = clonedDoc.createElement('link');
          link.rel = 'stylesheet';
          link.href = styleSheet.href;
          clonedDoc.head.appendChild(link);
        } else if (styleSheet.cssRules) {
          // Inline stylesheet
          const style = clonedDoc.createElement('style');
          const cssText = Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
          style.textContent = cssText;
          clonedDoc.head.appendChild(style);
        }
      } catch (e) {
        // Ignore CORS errors for external stylesheets
        console.warn('Could not copy stylesheet:', e);
      }
    });

    // Ensure fonts are available in cloned document
    if (document.fonts) {
      document.fonts.forEach((fontFace) => {
        try {
          clonedDoc.fonts.add(fontFace);
        } catch (e) {
          console.warn('Could not add font to cloned document:', e);
        }
      });
    }
  }

  async exportMultiple(
    elementId: string,
    resumeData: ResumeData,
    formats: ExportFormat[],
    baseFileName?: string
  ): Promise<void> {
    const totalFormats = formats.length;
    let completedFormats = 0;

    for (const format of formats) {
      try {
        const fileName = baseFileName
          ? `${baseFileName}.${format}`
          : this.generateFileName(resumeData, format);

        await this.exportResume(elementId, resumeData, { format, fileName });
        completedFormats++;

        this.updateProgress(
          "converting",
          (completedFormats / totalFormats) * 100,
          `Exported ${completedFormats}/${totalFormats} formats`
        );
      } catch (error) {
        console.error(`Failed to export ${format}:`, error);
      }
    }

    this.updateProgress(
      "complete",
      100,
      `Exported ${completedFormats}/${totalFormats} formats successfully`
    );
  }
}

export const createEnhancedResumeExporter = (
  progressCallback?: (progress: ExportProgress) => void
) => {
  return new EnhancedResumeExporter(progressCallback);
};