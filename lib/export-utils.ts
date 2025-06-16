import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import htmlDocx from "html-docx-js/dist/html-docx";
import { ResumeData } from "./types";

export type ExportFormat = "pdf" | "png" | "docx";

export interface ExportOptions {
  format: ExportFormat;
  fileName?: string;
  quality?: number;
  scale?: number;
}

export interface ExportProgress {
  stage:
    | "preparing"
    | "rendering"
    | "converting"
    | "downloading"
    | "complete"
    | "error";
  progress: number;
  message: string;
}

export class ResumeExporter {
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
      const fileName =
        options.fileName || this.generateFileName(resumeData, options.format);

      switch (options.format) {
        case "pdf":
          await this.exportToPDF(element, fileName, options);
          break;
        case "png":
          await this.exportToPNG(element, fileName, options);
          break;
        case "docx":
          await this.exportToDOCX(element, resumeData, fileName, options);
          break;
        default:
          throw new Error(`Unsupported export format: ${options.format}`);
      }

      this.updateProgress("complete", 100, "Export completed successfully!");
    } catch (error) {
      console.error("Export error:", error);
      this.updateProgress(
        "error",
        0,
        `Export failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
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

  private generateFileName(
    resumeData: ResumeData,
    format: ExportFormat
  ): string {
    const name = resumeData.personal.name.replace(/[^a-zA-Z0-9]/g, "_");
    const timestamp = new Date().toISOString().split("T")[0];
    return `${name}_Resume_${timestamp}.${format}`;
  }

  private async exportToPDF(
    element: HTMLElement,
    fileName: string,
    options: ExportOptions
  ): Promise<void> {
    this.updateProgress("rendering", 20, "Rendering resume...");

    // Create a clone of the element for export
    const clonedElement = await this.prepareElementForExport(element);

    const expectedWidth = clonedElement.scrollWidth;
    const expectedHeight = clonedElement.scrollHeight;

    const canvas = await html2canvas(clonedElement, {
      scale: options.scale || 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: expectedWidth,
      height: expectedHeight,
      onclone: (clonedDoc) => {
        // Ensure fonts are loaded in the cloned document
        this.loadFontsInClonedDocument(clonedDoc);
      },
    });

    if (canvas.width !== expectedWidth || canvas.height !== expectedHeight) {
      console.warn(
        `Canvas size mismatch: expected ${expectedWidth}x${expectedHeight}, got ${canvas.width}x${canvas.height}`
      );
    }

    this.updateProgress("converting", 60, "Converting to PDF...");

    const pdf = new jsPDF({
      orientation: canvas.width >= canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      0,
      canvas.width,
      canvas.height
    );

    this.updateProgress("downloading", 90, "Preparing download...");

    // Download the PDF
    pdf.save(fileName);

    // Cleanup
    document.body.removeChild(clonedElement);
  }

  private async exportToPNG(
    element: HTMLElement,
    fileName: string,
    options: ExportOptions
  ): Promise<void> {
    this.updateProgress("rendering", 20, "Rendering resume...");

    const clonedElement = await this.prepareElementForExport(element);

    const expectedWidth = clonedElement.scrollWidth;
    const expectedHeight = clonedElement.scrollHeight;

    const canvas = await html2canvas(clonedElement, {
      scale: options.scale || 3, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: expectedWidth,
      height: expectedHeight,
    });

    if (canvas.width !== expectedWidth || canvas.height !== expectedHeight) {
      console.warn(
        `Canvas size mismatch: expected ${expectedWidth}x${expectedHeight}, got ${canvas.width}x${canvas.height}`
      );
    }

    this.updateProgress("converting", 60, "Converting to PNG...");

    // Convert to blob with high quality
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          throw new Error("Failed to create PNG blob");
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

        // Cleanup
        document.body.removeChild(clonedElement);
      },
      "image/png",
      options.quality || 1.0
    );
  }

  private async exportToDOCX(
    element: HTMLElement,
    resumeData: ResumeData,
    fileName: string,
    options: ExportOptions
  ): Promise<void> {
    this.updateProgress("converting", 30, "Converting to DOCX...");

    // Generate DOCX content from resume data
    const docxContent = this.generateDOCXContent(resumeData);

    this.updateProgress("downloading", 80, "Preparing download...");

    // Convert HTML to a real DOCX blob
    const blob = htmlDocx.asBlob(docxContent);

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private async prepareElementForExport(
    element: HTMLElement
  ): Promise<HTMLElement> {
    // Clone the element
    const clonedElement = element.cloneNode(true) as HTMLElement;

    // Style the cloned element for export using computed styles
    const computed = window.getComputedStyle(element);
    clonedElement.style.position = "absolute";
    clonedElement.style.left = "-9999px";
    clonedElement.style.top = "0";
    clonedElement.style.width = `${element.scrollWidth}px`;
    clonedElement.style.height = `${element.scrollHeight}px`;
    clonedElement.style.backgroundColor = computed.backgroundColor;
    clonedElement.style.boxShadow = "none";
    clonedElement.style.transform = computed.transform;
    clonedElement.style.transformOrigin = computed.transformOrigin;
    (clonedElement.style as any).zoom = (computed as any).zoom || "1";

    // Remove any interactive elements that shouldn't be in export
    const interactiveElements = clonedElement.querySelectorAll(
      "button, .hover\\:, .focus\\:"
    );
    interactiveElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.display = "none";
      }
    });

    // Ensure all images are loaded
    const images = clonedElement.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve(void 0);
          } else {
            img.onload = () => resolve(void 0);
            img.onerror = () => resolve(void 0);
          }
        });
      })
    );

    document.body.appendChild(clonedElement);
    return clonedElement;
  }

  private loadFontsInClonedDocument(clonedDoc: Document): void {
    const usedFonts = new Set<string>();

    clonedDoc.querySelectorAll("*").forEach((el) => {
      const style = clonedDoc.defaultView?.getComputedStyle(el as Element);
      if (!style) return;
      const family = style.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
      const weight = style.fontWeight || "400";
      const fontStyle = style.fontStyle || "normal";
      usedFonts.add(`${family}|${weight}|${fontStyle}`);
    });

    document.fonts.forEach((fontFace) => {
      const descriptor = `${fontFace.family.replace(/['"]/g, "").trim()}|${fontFace.weight || "400"}|${fontFace.style || "normal"}`;
      if (usedFonts.has(descriptor)) {
        fontFace
          .load()
          .then((loaded) => clonedDoc.fonts.add(loaded))
          .catch(console.warn);
      }
    });
  }

  private generateDOCXContent(resumeData: ResumeData): string {
    // Generate a simplified HTML structure that can be converted to DOCX
    // This is a basic implementation - for production, consider using a proper DOCX library
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
          h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
          h2 { color: #374151; margin-top: 30px; margin-bottom: 15px; }
          h3 { color: #4b5563; margin-bottom: 10px; }
          .contact-info { margin-bottom: 20px; }
          .section { margin-bottom: 25px; }
          .experience-item, .education-item { margin-bottom: 20px; }
          .skills-group { margin-bottom: 15px; }
          ul { margin: 10px 0; padding-left: 20px; }
          li { margin-bottom: 5px; }
        </style>
      </head>
      <body>
    `;

    // Header
    html += `
      <h1>${resumeData.personal.name}</h1>
      <div class="contact-info">
        <p><strong>${resumeData.personal.title}</strong></p>
        <p>Email: ${resumeData.personal.email} | Phone: ${
      resumeData.personal.phone
    }</p>
        <p>Location: ${resumeData.personal.location}</p>
        ${
          resumeData.personal.linkedin
            ? `<p>LinkedIn: ${resumeData.personal.linkedin}</p>`
            : ""
        }
        ${
          resumeData.personal.github
            ? `<p>GitHub: ${resumeData.personal.github}</p>`
            : ""
        }
        ${
          resumeData.personal.website
            ? `<p>Website: ${resumeData.personal.website}</p>`
            : ""
        }
      </div>
    `;

    // Summary
    if (resumeData.personal.summary) {
      html += `
        <div class="section">
          <h2>Professional Summary</h2>
          <p>${resumeData.personal.summary}</p>
        </div>
      `;
    }

    // Experience
    if (
      resumeData.sections.experience.visible &&
      resumeData.sections.experience.items?.length
    ) {
      html += `<div class="section"><h2>${resumeData.sections.experience.title}</h2>`;
      resumeData.sections.experience.items.forEach((item) => {
        html += `
          <div class="experience-item">
            <h3>${item.position} - ${item.company}</h3>
            <p><em>${item.startDate} to ${item.endDate} | ${
          item.location
        }</em></p>
            <ul>
              ${item.description
                .map((desc: any) => `<li>${desc}</li>`)
                .join("")}
            </ul>
            ${
              item.technologies?.length
                ? `<p><strong>Technologies:</strong> ${item.technologies.join(
                    ", "
                  )}</p>`
                : ""
            }
          </div>
        `;
      });
      html += "</div>";
    }

    // Education
    if (
      resumeData.sections.education.visible &&
      resumeData.sections.education.items?.length
    ) {
      html += `<div class="section"><h2>${resumeData.sections.education.title}</h2>`;
      resumeData.sections.education.items.forEach((item) => {
        html += `
          <div class="education-item">
            <h3>${item.degree} in ${item.field}</h3>
            <p><em>${item.institution} | ${item.startDate} to ${
          item.endDate
        }</em></p>
            <p>${item.location}</p>
            ${item.gpa ? `<p>GPA: ${item.gpa}</p>` : ""}
            ${item.description ? `<p>${item.description}</p>` : ""}
          </div>
        `;
      });
      html += "</div>";
    }

    // Skills
    if (
      resumeData.sections.skills.visible &&
      resumeData.sections.skills.groups?.length
    ) {
      html += `<div class="section"><h2>${resumeData.sections.skills.title}</h2>`;
      resumeData.sections.skills.groups.forEach((group) => {
        html += `
          <div class="skills-group">
            <h3>${group.name}</h3>
            <p>${group.skills.map((skill) => skill.name).join(", ")}</p>
          </div>
        `;
      });
      html += "</div>";
    }

    // Projects
    if (
      resumeData.sections.projects.visible &&
      resumeData.sections.projects.items?.length
    ) {
      html += `<div class="section"><h2>${resumeData.sections.projects.title}</h2>`;
      resumeData.sections.projects.items.forEach((item) => {
        html += `
          <div class="project-item">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            ${item.url ? `<p><strong>URL:</strong> ${item.url}</p>` : ""}
            ${
              item.technologies?.length
                ? `<p><strong>Technologies:</strong> ${item.technologies.join(
                    ", "
                  )}</p>`
                : ""
            }
          </div>
        `;
      });
      html += "</div>";
    }

    // Certifications
    if (
      resumeData.sections.certifications.visible &&
      resumeData.sections.certifications.items?.length
    ) {
      html += `<div class="section"><h2>${resumeData.sections.certifications.title}</h2><ul>`;
      resumeData.sections.certifications.items.forEach((item) => {
        html += `<li>${item.name} - ${item.organization} (${item.date})</li>`;
      });
      html += "</ul></div>";
    }

    // Languages
    if (
      resumeData.sections.languages.visible &&
      resumeData.sections.languages.items?.length
    ) {
      html += `<div class="section"><h2>${resumeData.sections.languages.title}</h2><ul>`;
      resumeData.sections.languages.items.forEach((item) => {
        html += `<li>${item.name} - ${item.proficiency}</li>`;
      });
      html += "</ul></div>";
    }

    html += "</body></html>";

    return html;
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

export const createResumeExporter = (
  progressCallback?: (progress: ExportProgress) => void
) => {
  return new ResumeExporter(progressCallback);
};
