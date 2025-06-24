// // // import html2canvas from "html2canvas";
// // // import jsPDF from "jspdf";
// // // import htmlDocx from "html-docx-js/dist/html-docx";
// // // import { ResumeData } from "./types";

// // // export type ExportFormat = "pdf" | "png" | "docx";

// // // export interface ExportOptions {
// // //   format: ExportFormat;
// // //   fileName?: string;
// // //   quality?: number;
// // //   scale?: number;
// // // }

// // // export interface ExportProgress {
// // //   stage:
// // //     | "preparing"
// // //     | "rendering"
// // //     | "converting"
// // //     | "downloading"
// // //     | "complete"
// // //     | "error";
// // //   progress: number;
// // //   message: string;
// // // }

// // // export class ResumeExporter {
// // //   private progressCallback?: (progress: ExportProgress) => void;

// // //   constructor(progressCallback?: (progress: ExportProgress) => void) {
// // //     this.progressCallback = progressCallback;
// // //   }

// // //   private updateProgress(
// // //     stage: ExportProgress["stage"],
// // //     progress: number,
// // //     message: string
// // //   ) {
// // //     if (this.progressCallback) {
// // //       this.progressCallback({ stage, progress, message });
// // //     }
// // //   }

// // //   async exportResume(
// // //     elementId: string,
// // //     resumeData: ResumeData,
// // //     options: ExportOptions
// // //   ): Promise<void> {
// // //     try {
// // //       this.updateProgress("preparing", 0, "Preparing export...");

// // //       // Validate resume content
// // //       this.validateResumeContent(resumeData);

// // //       const element = document.getElementById(elementId);
// // //       if (!element) {
// // //         throw new Error("Resume element not found");
// // //       }

// // //       // Generate filename if not provided
// // //       const fileName =
// // //         options.fileName || this.generateFileName(resumeData, options.format);

// // //       switch (options.format) {
// // //         case "pdf":
// // //           await this.exportToPDF(element, fileName, options);
// // //           break;
// // //         case "png":
// // //           await this.exportToPNG(element, fileName, options);
// // //           break;
// // //         case "docx":
// // //           await this.exportToDOCX(element, resumeData, fileName, options);
// // //           break;
// // //         default:
// // //           throw new Error(`Unsupported export format: ${options.format}`);
// // //       }

// // //       this.updateProgress("complete", 100, "Export completed successfully!");
// // //     } catch (error) {
// // //       console.error("Export error:", error);
// // //       this.updateProgress(
// // //         "error",
// // //         0,
// // //         `Export failed: ${
// // //           error instanceof Error ? error.message : "Unknown error"
// // //         }`
// // //       );
// // //       throw error;
// // //     }
// // //   }

// // //   private validateResumeContent(resumeData: ResumeData): void {
// // //     if (!resumeData.personal.name.trim()) {
// // //       throw new Error("Name is required for export");
// // //     }
// // //     if (!resumeData.personal.email.trim()) {
// // //       throw new Error("Email is required for export");
// // //     }
// // //   }

// // //   private generateFileName(
// // //     resumeData: ResumeData,
// // //     format: ExportFormat
// // //   ): string {
// // //     const name = resumeData.personal.name.replace(/[^a-zA-Z0-9]/g, "_");
// // //     const timestamp = new Date().toISOString().split("T")[0];
// // //     return `${name}_Resume_${timestamp}.${format}`;
// // //   }

// // //   private async exportToPDF(
// // //     element: HTMLElement,
// // //     fileName: string,
// // //     options: ExportOptions
// // //   ): Promise<void> {
// // //     this.updateProgress("rendering", 20, "Rendering resume...");

// // //    console.log("sacccc",options)

// // //    console.log("element",element)



// // //     // Create a clone of the element for export
// // //     const clonedElement = await this.prepareElementForExport(element);

// // //     // Set fixed dimensions for A4 paper (210mm x 297mm at 96 DPI)
// // //     const a4Width = 794; // 210mm at 96 DPI
// // //     const a4Height = 1123; // 297mm at 96 DPI

// // //     const canvas = await html2canvas(clonedElement, {
// // //       scale: options.scale || 2,
// // //       useCORS: true,
// // //       allowTaint: true,
// // //       backgroundColor: "#ffffff",
// // //       width: a4Width,
// // //       height: a4Height,
// // //       onclone: (clonedDoc) => {
// // //         // Ensure fonts are loaded in the cloned document
// // //         this.loadFontsInClonedDocument(clonedDoc);
// // //       },
// // //     });

// // //     this.updateProgress("converting", 60, "Converting to PDF...");

// // //     // Create PDF with A4 dimensions
// // //     const pdf = new jsPDF({
// // //       orientation: "portrait",
// // //       unit: "mm",
// // //       format: "a4",
// // //     });

// // //     // Calculate dimensions to fit A4
// // //     const pdfWidth = 210; // A4 width in mm
// // //     const pdfHeight = 297; // A4 height in mm

// // //     // Add image to PDF, scaling to fit A4
// // //     pdf.addImage(
// // //       canvas.toDataURL("image/png", 1.0),
// // //       "PNG",
// // //       0,
// // //       0,
// // //       pdfWidth,
// // //       pdfHeight,
// // //       undefined,
// // //       "FAST"
// // //     );

// // //     this.updateProgress("downloading", 90, "Preparing download...");

// // //     // Download the PDF
// // //     pdf.save(fileName);

// // //     // Cleanup
// // //     document.body.removeChild(clonedElement);
// // //   }

// // //   private async exportToPNG(
// // //     element: HTMLElement,
// // //     fileName: string,
// // //     options: ExportOptions
// // //   ): Promise<void> {
// // //     this.updateProgress("rendering", 20, "Rendering resume...");

// // //     const clonedElement = await this.prepareElementForExport(element);

// // //     // Set high DPI for PNG export (300 DPI minimum)
// // //     const scale = options.scale || 3.125; // 300 DPI / 96 DPI = 3.125
// // //     const a4Width = 794; // 210mm at 96 DPI
// // //     const a4Height = 1123; // 297mm at 96 DPI

// // //     const canvas = await html2canvas(clonedElement, {
// // //       scale: scale,
// // //       useCORS: true,
// // //       allowTaint: true,
// // //       backgroundColor: "#ffffff",
// // //       width: a4Width,
// // //       height: a4Height,
// // //     });

// // //     this.updateProgress("converting", 60, "Converting to PNG...");

// // //     // Convert to blob with high quality
// // //     canvas.toBlob(
// // //       (blob) => {
// // //         if (!blob) {
// // //           throw new Error("Failed to create PNG blob");
// // //         }

// // //         this.updateProgress("downloading", 90, "Preparing download...");

// // //         // Download the PNG
// // //         const url = URL.createObjectURL(blob);
// // //         const link = document.createElement("a");
// // //         link.href = url;
// // //         link.download = fileName;
// // //         document.body.appendChild(link);
// // //         link.click();
// // //         document.body.removeChild(link);
// // //         URL.revokeObjectURL(url);

// // //         // Cleanup
// // //         document.body.removeChild(clonedElement);
// // //       },
// // //       "image/png",
// // //       1.0 // Maximum quality
// // //     );
// // //   }

// // //   private async exportToDOCX(
// // //     element: HTMLElement,
// // //     resumeData: ResumeData,
// // //     fileName: string,
// // //     options: ExportOptions
// // //   ): Promise<void> {
// // //     this.updateProgress("converting", 30, "Converting to DOCX...");

// // //     // Generate DOCX content from resume data
// // //     const docxContent = this.generateDOCXContent(resumeData);

// // //     this.updateProgress("downloading", 80, "Preparing download...");

// // //     // Convert HTML to DOCX blob
// // //     const blob = htmlDocx.asBlob(docxContent);

// // //     const url = URL.createObjectURL(blob);
// // //     const link = document.createElement("a");
// // //     link.href = url;
// // //     link.download = fileName;
// // //     document.body.appendChild(link);
// // //     link.click();
// // //     document.body.removeChild(link);
// // //     URL.revokeObjectURL(url);
// // //   }

// // //   private async prepareElementForExport(
// // //     element: HTMLElement
// // //   ): Promise<HTMLElement> {
// // //     // Clone the element
// // //     const clonedElement = element.cloneNode(true) as HTMLElement;

// // //     // Style the cloned element for export
// // //     clonedElement.style.position = "absolute";
// // //     clonedElement.style.left = "-9999px";
// // //     clonedElement.style.top = "0";
// // //     clonedElement.style.width = "210mm";
// // //     clonedElement.style.minHeight = "297mm";
// // //     clonedElement.style.backgroundColor = "#ffffff";
// // //     clonedElement.style.boxShadow = "none";
// // //     clonedElement.style.border = "none";
// // //     clonedElement.style.borderRadius = "0";
// // //     clonedElement.style.overflow = "visible";

// // //     // Remove any interactive elements that shouldn't be in export
// // //     const interactiveElements = clonedElement.querySelectorAll(
// // //       "button, .hover\\:, .focus\\:, [data-interactive]"
// // //     );
// // //     interactiveElements.forEach((el) => {
// // //       if (el instanceof HTMLElement) {
// // //         el.style.display = "none";
// // //       }
// // //     });

// // //     // Ensure all images are loaded
// // //     const images = clonedElement.querySelectorAll("img");
// // //     await Promise.all(
// // //       Array.from(images).map((img) => {
// // //         return new Promise((resolve) => {
// // //           if (img.complete) {
// // //             resolve(void 0);
// // //           } else {
// // //             img.onload = () => resolve(void 0);
// // //             img.onerror = () => resolve(void 0);
// // //           }
// // //         });
// // //       })
// // //     );

// // //     document.body.appendChild(clonedElement);
// // //     return clonedElement;
// // //   }

// // //   private loadFontsInClonedDocument(clonedDoc: Document): void {
// // //     const usedFonts = new Set<string>();

// // //     clonedDoc.querySelectorAll("*").forEach((el) => {
// // //       const style = clonedDoc.defaultView?.getComputedStyle(el as Element);
// // //       if (!style) return;
// // //       const family = style.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
// // //       const weight = style.fontWeight || "400";
// // //       const fontStyle = style.fontStyle || "normal";
// // //       usedFonts.add(`${family}|${weight}|${fontStyle}`);
// // //     });

// // //     document.fonts.forEach((fontFace) => {
// // //       const descriptor = `${fontFace.family.replace(/['"]/g, "").trim()}|${
// // //         fontFace.weight || "400"
// // //       }|${fontFace.style || "normal"}`;
// // //       if (usedFonts.has(descriptor)) {
// // //         fontFace
// // //           .load()
// // //           .then((loaded) => clonedDoc.fonts.add(loaded))
// // //           .catch(console.warn);
// // //       }
// // //     });
// // //   }

// // //   private generateDOCXContent(resumeData: ResumeData): string {
// // //     // Generate ATS-compatible HTML structure for DOCX conversion
// // //     let html = `
// // //       <!DOCTYPE html>
// // //       <html>
// // //       <head>
// // //         <meta charset="utf-8">
// // //         <style>
// // //           body { 
// // //             font-family: 'Times New Roman', serif; 
// // //             line-height: 1.6; 
// // //             margin: 40px; 
// // //             font-size: 11pt;
// // //             color: #000000;
// // //           }
// // //           h1 { 
// // //             color: #000000; 
// // //             border-bottom: 1px solid #000000; 
// // //             padding-bottom: 10px; 
// // //             font-size: 18pt;
// // //             margin-bottom: 10px;
// // //           }
// // //           h2 { 
// // //             color: #000000; 
// // //             margin-top: 20px; 
// // //             margin-bottom: 10px; 
// // //             font-size: 14pt;
// // //             font-weight: bold;
// // //           }
// // //           h3 { 
// // //             color: #000000; 
// // //             margin-bottom: 5px; 
// // //             font-size: 12pt;
// // //             font-weight: bold;
// // //           }
// // //           .contact-info { margin-bottom: 20px; text-align: center; }
// // //           .section { margin-bottom: 20px; }
// // //           .experience-item, .education-item { margin-bottom: 15px; }
// // //           .skills-group { margin-bottom: 10px; }
// // //           ul { margin: 5px 0; padding-left: 20px; }
// // //           li { margin-bottom: 3px; }
// // //           p { margin: 5px 0; }
// // //           .date-range { font-style: italic; }
// // //         </style>
// // //       </head>
// // //       <body>
// // //     `;

// // //     // Header
// // //     html += `
// // //       <h1>${resumeData.personal.name}</h1>
// // //       <div class="contact-info">
// // //         <p><strong>${resumeData.personal.title}</strong></p>
// // //         <p>${resumeData.personal.email} | ${resumeData.personal.phone}</p>
// // //         <p>${resumeData.personal.location}</p>
// // //         ${
// // //           resumeData.personal.linkedin
// // //             ? `<p>LinkedIn: ${resumeData.personal.linkedin}</p>`
// // //             : ""
// // //         }
// // //         ${
// // //           resumeData.personal.github
// // //             ? `<p>GitHub: ${resumeData.personal.github}</p>`
// // //             : ""
// // //         }
// // //         ${
// // //           resumeData.personal.website
// // //             ? `<p>Website: ${resumeData.personal.website}</p>`
// // //             : ""
// // //         }
// // //       </div>
// // //     `;

// // //     // Summary
// // //     if (resumeData.personal.summary) {
// // //       html += `
// // //         <div class="section">
// // //           <h2>PROFESSIONAL SUMMARY</h2>
// // //           <p>${resumeData.personal.summary}</p>
// // //         </div>
// // //       `;
// // //     }

// // //     // Experience
// // //     if (
// // //       resumeData.sections.experience.visible &&
// // //       resumeData.sections.experience.items?.length
// // //     ) {
// // //       html += `<div class="section"><h2>${resumeData.sections.experience.title.toUpperCase()}</h2>`;
// // //       resumeData.sections.experience.items.forEach((item) => {
// // //         html += `
// // //           <div class="experience-item">
// // //             <h3>${item.position}</h3>
// // //             <p><strong>${item.company}</strong> | ${item.location}</p>
// // //             <p class="date-range">${item.startDate} - ${item.endDate}</p>
// // //             <ul>
// // //               ${item.description
// // //                 .map((desc: any) => `<li>${desc}</li>`)
// // //                 .join("")}
// // //             </ul>
// // //             ${
// // //               item.technologies?.length
// // //                 ? `<p><strong>Technologies:</strong> ${item.technologies.join(
// // //                     ", "
// // //                   )}</p>`
// // //                 : ""
// // //             }
// // //           </div>
// // //         `;
// // //       });
// // //       html += "</div>";
// // //     }

// // //     // Education
// // //     if (
// // //       resumeData.sections.education.visible &&
// // //       resumeData.sections.education.items?.length
// // //     ) {
// // //       html += `<div class="section"><h2>${resumeData.sections.education.title.toUpperCase()}</h2>`;
// // //       resumeData.sections.education.items.forEach((item) => {
// // //         html += `
// // //           <div class="education-item">
// // //             <h3>${item.degree} in ${item.field}</h3>
// // //             <p><strong>${item.institution}</strong> | ${item.location}</p>
// // //             <p class="date-range">${item.startDate} - ${item.endDate}</p>
// // //             ${item.gpa ? `<p>GPA: ${item.gpa}</p>` : ""}
// // //             ${item.description ? `<p>${item.description}</p>` : ""}
// // //           </div>
// // //         `;
// // //       });
// // //       html += "</div>";
// // //     }

// // //     // Skills
// // //     if (
// // //       resumeData.sections.skills.visible &&
// // //       resumeData.sections.skills.groups?.length
// // //     ) {
// // //       html += `<div class="section"><h2>${resumeData.sections.skills.title.toUpperCase()}</h2>`;
// // //       resumeData.sections.skills.groups.forEach((group) => {
// // //         html += `
// // //           <div class="skills-group">
// // //             <p><strong>${group.name}:</strong> ${group.skills
// // //           .map((skill) => skill.name)
// // //           .join(", ")}</p>
// // //           </div>
// // //         `;
// // //       });
// // //       html += "</div>";
// // //     }

// // //     // Projects
// // //     if (
// // //       resumeData.sections.projects.visible &&
// // //       resumeData.sections.projects.items?.length
// // //     ) {
// // //       html += `<div class="section"><h2>${resumeData.sections.projects.title.toUpperCase()}</h2>`;
// // //       resumeData.sections.projects.items.forEach((item) => {
// // //         html += `
// // //           <div class="project-item">
// // //             <h3>${item.name}</h3>
// // //             <p>${item.description}</p>
// // //             ${item.url ? `<p><strong>URL:</strong> ${item.url}</p>` : ""}
// // //             ${
// // //               item.technologies?.length
// // //                 ? `<p><strong>Technologies:</strong> ${item.technologies.join(
// // //                     ", "
// // //                   )}</p>`
// // //                 : ""
// // //             }
// // //           </div>
// // //         `;
// // //       });
// // //       html += "</div>";
// // //     }

// // //     // Certifications
// // //     if (
// // //       resumeData.sections.certifications.visible &&
// // //       resumeData.sections.certifications.items?.length
// // //     ) {
// // //       html += `<div class="section"><h2>${resumeData.sections.certifications.title.toUpperCase()}</h2><ul>`;
// // //       resumeData.sections.certifications.items.forEach((item) => {
// // //         html += `<li><strong>${item.name}</strong> - ${item.organization} (${item.date})</li>`;
// // //       });
// // //       html += "</ul></div>";
// // //     }

// // //     // Languages
// // //     if (
// // //       resumeData.sections.languages.visible &&
// // //       resumeData.sections.languages.items?.length
// // //     ) {
// // //       html += `<div class="section"><h2>${resumeData.sections.languages.title.toUpperCase()}</h2><ul>`;
// // //       resumeData.sections.languages.items.forEach((item) => {
// // //         html += `<li><strong>${item.name}</strong> - ${item.proficiency}</li>`;
// // //       });
// // //       html += "</ul></div>";
// // //     }

// // //     html += "</body></html>";

// // //     return html;
// // //   }

// // //   async exportMultiple(
// // //     elementId: string,
// // //     resumeData: ResumeData,
// // //     formats: ExportFormat[],
// // //     baseFileName?: string
// // //   ): Promise<void> {
// // //     const totalFormats = formats.length;
// // //     let completedFormats = 0;

// // //     for (const format of formats) {
// // //       try {
// // //         const fileName = baseFileName
// // //           ? `${baseFileName}.${format}`
// // //           : this.generateFileName(resumeData, format);

// // //         await this.exportResume(elementId, resumeData, { format, fileName });
// // //         completedFormats++;

// // //         this.updateProgress(
// // //           "converting",
// // //           (completedFormats / totalFormats) * 100,
// // //           `Exported ${completedFormats}/${totalFormats} formats`
// // //         );
// // //       } catch (error) {
// // //         console.error(`Failed to export ${format}:`, error);
// // //       }
// // //     }

// // //     this.updateProgress(
// // //       "complete",
// // //       100,
// // //       `Exported ${completedFormats}/${totalFormats} formats successfully`
// // //     );
// // //   }
// // // }

// // // export const createResumeExporter = (
// // //   progressCallback?: (progress: ExportProgress) => void
// // // ) => {
// // //   return new ResumeExporter(progressCallback);
// // // };

// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";
// // import htmlDocx from "html-docx-js/dist/html-docx";
// // import { ResumeData } from "./types";

// // export type ExportFormat = "pdf" | "png" | "docx";

// // export interface ExportOptions {
// //   format: ExportFormat;
// //   fileName?: string;
// //   quality?: number;
// //   scale?: number;
// //   preserveText?: boolean; // New option for text-based PDF generation
// // }

// // export interface ExportProgress {
// //   stage:
// //     | "preparing"
// //     | "rendering"
// //     | "converting"
// //     | "downloading"
// //     | "complete"
// //     | "error";
// //   progress: number;
// //   message: string;
// // }

// // export class ResumeExporter {
// //   private progressCallback?: (progress: ExportProgress) => void;

// //   constructor(progressCallback?: (progress: ExportProgress) => void) {
// //     this.progressCallback = progressCallback;
// //   }

// //   private updateProgress(
// //     stage: ExportProgress["stage"],
// //     progress: number,
// //     message: string
// //   ) {
// //     if (this.progressCallback) {
// //       this.progressCallback({ stage, progress, message });
// //     }
// //   }

// //   async exportResume(
// //     elementId: string,
// //     resumeData: ResumeData,
// //     options: ExportOptions
// //   ): Promise<void> {
// //     try {
// //       this.updateProgress("preparing", 0, "Preparing export...");

// //       // Validate resume content
// //       this.validateResumeContent(resumeData);

// //       const element = document.getElementById(elementId);
// //       if (!element) {
// //         throw new Error("Resume element not found");
// //       }

// //       // Generate filename if not provided
// //       const fileName =
// //         options.fileName || this.generateFileName(resumeData, options.format);

// //       switch (options.format) {
// //         case "pdf":
// //           if (options.preserveText) {
// //             await this.exportToTextBasedPDF(resumeData, fileName, options);
// //           } else {
// //             await this.exportToVisualPDF(element, fileName, options);
// //           }
// //           break;
// //         case "png":
// //           await this.exportToPNG(element, fileName, options);
// //           break;
// //         case "docx":
// //           await this.exportToDOCX(element, resumeData, fileName, options);
// //           break;
// //         default:
// //           throw new Error(`Unsupported export format: ${options.format}`);
// //       }

// //       this.updateProgress("complete", 100, "Export completed successfully!");
// //     } catch (error) {
// //       console.error("Export error:", error);
// //       this.updateProgress(
// //         "error",
// //         0,
// //         `Export failed: ${
// //           error instanceof Error ? error.message : "Unknown error"
// //         }`
// //       );
// //       throw error;
// //     }
// //   }

// //   private validateResumeContent(resumeData: ResumeData): void {
// //     if (!resumeData.personal.name.trim()) {
// //       throw new Error("Name is required for export");
// //     }
// //     if (!resumeData.personal.email.trim()) {
// //       throw new Error("Email is required for export");
// //     }
// //   }

// //   private generateFileName(
// //     resumeData: ResumeData,
// //     format: ExportFormat
// //   ): string {
// //     const name = resumeData.personal.name.replace(/[^a-zA-Z0-9]/g, "_");
// //     const timestamp = new Date().toISOString().split("T")[0];
// //     return `${name}_Resume_${timestamp}.${format}`;
// //   }

// //   // Method specifically for visual PDF export (maintains exact appearance)
// //   private async exportToVisualPDF(
// //     element: HTMLElement,
// //     fileName: string,
// //     options: ExportOptions
// //   ): Promise<void> {
// //     this.updateProgress("rendering", 20, "Preparing visual export...");

// //     // Create a clone of the element for export
// //     const clonedElement = await this.prepareElementForExport(element);

// //     // Wait for fonts and layout to settle
// //     await this.waitForFonts();
// //     await new Promise(resolve => setTimeout(resolve, 500)); // Extra wait for complex layouts

// //     this.updateProgress("rendering", 40, "Capturing resume...");

// //     // Use higher scale for better quality
// //     const scale = options.scale || 3;
    
// //     // Get the final dimensions after all styling is applied
// //     const elementRect = clonedElement.getBoundingClientRect();
// //     const finalWidth = clonedElement.offsetWidth;
// //     const finalHeight = clonedElement.offsetHeight;

// //     console.log('Element dimensions:', { finalWidth, finalHeight, elementRect });

// //     const canvas = await html2canvas(clonedElement, {
// //       scale: scale,
// //       useCORS: true,
// //       allowTaint: true,
// //       backgroundColor: "#ffffff",
// //       width: finalWidth,
// //       height: finalHeight,
// //       scrollX: 0,
// //       scrollY: 0,
// //       windowWidth: finalWidth,
// //       windowHeight: finalHeight,
// //       logging: true, // Enable logging for debugging
// //       removeContainer: false,
// //       foreignObjectRendering: false, // Sometimes helps with complex layouts
// //       onclone: (clonedDoc) => {
// //         this.loadFontsInClonedDocument(clonedDoc);
        
// //         // Additional cleanup in cloned document
// //         const body = clonedDoc.body;
// //         if (body) {
// //           // Remove any overlays or fixed positioned elements that might interfere
// //           const problematicElements = body.querySelectorAll('[style*="position: fixed"], [style*="position: sticky"], .modal, .overlay, .tooltip');
// //           problematicElements.forEach(el => {
// //             if (el instanceof HTMLElement && el !== clonedElement) {
// //               el.remove();
// //             }
// //           });
// //         }
// //       },
// //     });

// //     this.updateProgress("converting", 70, "Creating PDF...");

// //     // Create PDF
// //     const pdf = new jsPDF({
// //       orientation: finalHeight > finalWidth ? "portrait" : "landscape",
// //       unit: "mm",
// //       // format: "a4",
// //     });

// //     const pdfWidth = 210; // A4 width in mm
// //     const pdfHeight = 297; // A4 height in mm
    
// //     // Calculate dimensions to fit content properly
// //     const canvasAspectRatio = canvas.height / canvas.width;
// //     const contentHeightMm = pdfWidth * canvasAspectRatio;

// //     if (contentHeightMm <= pdfHeight) {
// //       // Content fits on one page
// //       pdf.addImage(
// //         canvas.toDataURL("image/png", 0.95),
// //         "PNG",
// //         0,
// //         0,
// //         pdfWidth,
// //         contentHeightMm,
// //         undefined,
// //         "FAST"
// //       );
// //     } else {
// //       // Multiple pages needed
// //       const totalPages = Math.ceil(contentHeightMm / pdfHeight);
      
// //       for (let pageNum = 0; pageNum < totalPages; pageNum++) {
// //         if (pageNum > 0) {
// //           pdf.addPage();
// //         }

// //         const startY = pageNum * pdfHeight;
// //         const endY = Math.min(startY + pdfHeight, contentHeightMm);
// //         const pageContentHeight = endY - startY;
        
// //         // Calculate source area from canvas
// //         const sourceStartY = (startY / contentHeightMm) * canvas.height;
// //         const sourceHeight = (pageContentHeight / contentHeightMm) * canvas.height;

// //         // Create page canvas
// //         const pageCanvas = document.createElement('canvas');
// //         const pageCtx = pageCanvas.getContext('2d');
        
// //         if (pageCtx) {
// //           pageCanvas.width = canvas.width;
// //           pageCanvas.height = sourceHeight;
          
// //           // White background
// //           pageCtx.fillStyle = '#ffffff';
// //           pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          
// //           // Draw content
// //           pageCtx.drawImage(
// //             canvas,
// //             0, sourceStartY, canvas.width, sourceHeight,
// //             0, 0, canvas.width, sourceHeight
// //           );

// //           pdf.addImage(
// //             pageCanvas.toDataURL("image/png", 0.95),
// //             "PNG",
// //             0,
// //             0,
// //             pdfWidth,
// //             pageContentHeight,
// //             undefined,
// //             "FAST"
// //           );
// //         }
// //       }
// //     }

// //     this.updateProgress("downloading", 90, "Finalizing export...");

// //     // Save PDF
// //     pdf.save(fileName);

// //     // Cleanup
// //     document.body.removeChild(clonedElement);
// //   }

// //   // Enhanced PDF export with dynamic height calculation
// //   private async exportToPDF(
// //     element: HTMLElement,
// //     fileName: string,
// //     options: ExportOptions
// //   ): Promise<void> {
// //     this.updateProgress("rendering", 20, "Rendering resume...");

// //     // Create a clone of the element for export
// //     const clonedElement = await this.prepareElementForExport(element);

// //     // Wait for fonts to load
// //     await this.waitForFonts();

// //     // Use the existing element's dimensions as reference but ensure proper A4 ratio
// //     const originalRect = element.getBoundingClientRect();
// //     const scale = options.scale || 2;
    
// //     // A4 dimensions in pixels at 96 DPI
// //     const a4WidthPx = 794; // 210mm
// //     const a4HeightPx = 1123; // 297mm
    
// //     // Set the cloned element to A4 width and let height be determined by content
// //     clonedElement.style.width = `${a4WidthPx}px`;
// //     clonedElement.style.height = 'auto';
// //     clonedElement.style.maxHeight = 'none';
// //     clonedElement.style.overflow = 'visible';
    
// //     // Force layout recalculation
// //     clonedElement.offsetHeight;
    
// //     // Wait a bit more for layout to settle
// //     await new Promise(resolve => setTimeout(resolve, 300));
    
// //     // Get the final content dimensions
// //     const finalHeight = Math.max(clonedElement.scrollHeight, clonedElement.offsetHeight);
    
// //     this.updateProgress("rendering", 40, "Capturing content...");

// //     const canvas = await html2canvas(clonedElement, {
// //       scale: scale,
// //       useCORS: true,
// //       allowTaint: true,
// //       backgroundColor: "#ffffff",
// //       width: a4WidthPx,
// //       height: finalHeight,
// //       scrollX: 0,
// //       scrollY: 0,
// //       windowWidth: a4WidthPx,
// //       windowHeight: finalHeight,
// //       logging: false,
// //       removeContainer: false,
// //       onclone: (clonedDoc) => {
// //         this.loadFontsInClonedDocument(clonedDoc);
        
// //         // Ensure all elements in cloned document are visible
// //         const allElements = clonedDoc.querySelectorAll('*');
// //         allElements.forEach((el) => {
// //           if (el instanceof HTMLElement) {
// //             // Remove any transform or position that might hide content
// //             const style = clonedDoc.defaultView?.getComputedStyle(el);
// //             if (style?.visibility === 'hidden' || style?.display === 'none') {
// //               el.style.visibility = 'visible';
// //               el.style.display = 'block';
// //             }
// //           }
// //         });
// //       },
// //     });

// //     this.updateProgress("converting", 60, "Converting to PDF...");

// //     // Create PDF with A4 dimensions
// //     const pdf = new jsPDF({
// //       orientation: "portrait",
// //       unit: "mm",
// //       format: "a4",
// //     });

// //     const pdfWidth = 210; // A4 width in mm
// //     const pdfHeight = 297; // A4 height in mm
    
// //     // Calculate how much content we have relative to A4 page
// //     const canvasAspectRatio = canvas.height / canvas.width;
// //     const contentHeightMm = pdfWidth * canvasAspectRatio;

// //     if (contentHeightMm <= pdfHeight) {
// //       // Content fits on one page
// //       pdf.addImage(
// //         canvas.toDataURL("image/png", 1.0),
// //         "PNG",
// //         0,
// //         0,
// //         pdfWidth,
// //         contentHeightMm,
// //         undefined,
// //         "FAST"
// //       );
// //     } else {
// //       // Content needs multiple pages
// //       let currentY = 0;
// //       let pageNumber = 0;

// //       while (currentY < contentHeightMm) {
// //         if (pageNumber > 0) {
// //           pdf.addPage();
// //         }

// //         // Calculate the portion of the canvas to use for this page
// //         const remainingHeight = contentHeightMm - currentY;
// //         const pageContentHeight = Math.min(pdfHeight, remainingHeight);
        
// //         // Calculate source dimensions for canvas cropping
// //         const sourceY = (currentY / contentHeightMm) * canvas.height;
// //         const sourceHeight = (pageContentHeight / contentHeightMm) * canvas.height;

// //         // Create a temporary canvas for this page
// //         const pageCanvas = document.createElement('canvas');
// //         const pageCtx = pageCanvas.getContext('2d');
        
// //         if (pageCtx) {
// //           pageCanvas.width = canvas.width;
// //           pageCanvas.height = sourceHeight;
          
// //           // Fill background
// //           pageCtx.fillStyle = '#ffffff';
// //           pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          
// //           // Draw the portion of the original canvas
// //           pageCtx.drawImage(
// //             canvas,
// //             0, sourceY, canvas.width, sourceHeight,
// //             0, 0, canvas.width, sourceHeight
// //           );

// //           pdf.addImage(
// //             pageCanvas.toDataURL("image/png", 1.0),
// //             "PNG",
// //             0,
// //             0,
// //             pdfWidth,
// //             pageContentHeight,
// //             undefined,
// //             "FAST"
// //           );
// //         }

// //         currentY += pdfHeight;
// //         pageNumber++;
// //       }
// //     }

// //     this.updateProgress("downloading", 90, "Preparing download...");

// //     // Download the PDF
// //     pdf.save(fileName);

// //     // Cleanup
// //     document.body.removeChild(clonedElement);
// //   }

// //   // New method for text-based PDF generation (ATS-friendly)
// //   private async exportToTextBasedPDF(
// //     resumeData: ResumeData,
// //     fileName: string,
// //     options: ExportOptions
// //   ): Promise<void> {
// //     this.updateProgress("converting", 30, "Generating text-based PDF...");

// //     const pdf = new jsPDF({
// //       orientation: "portrait",
// //       unit: "mm",
// //       format: "a4",
// //     });

// //     const pageWidth = 210;
// //     const pageHeight = 297;
// //     const margin = 20;
// //     const contentWidth = pageWidth - (margin * 2);
    
// //     let currentY = margin;
// //     const lineHeight = 6;
// //     const sectionSpacing = 8;

// //     // Helper function to add text with word wrapping
// //     const addText = (text: string, fontSize: number, isBold: boolean = false, isItalic: boolean = false) => {
// //       pdf.setFontSize(fontSize);
// //       pdf.setFont("helvetica", isBold ? "bold" : (isItalic ? "italic" : "normal"));
      
// //       const lines = pdf.splitTextToSize(text, contentWidth);
      
// //       for (const line of lines) {
// //         if (currentY > pageHeight - margin) {
// //           pdf.addPage();
// //           currentY = margin;
// //         }
        
// //         pdf.text(line, margin, currentY);
// //         currentY += lineHeight;
// //       }
// //     };

// //     const addSection = (title: string) => {
// //       currentY += sectionSpacing;
// //       addText(title.toUpperCase(), 14, true);
// //       currentY += 2;
// //     };

// //     // Header
// //     addText(resumeData.personal.name, 18, true);
// //     addText(resumeData.personal.title, 12, false, true);
// //     addText(`${resumeData.personal.email} | ${resumeData.personal.phone}`, 10);
// //     addText(resumeData.personal.location, 10);
    
// //     if (resumeData.personal.linkedin) {
// //       addText(`LinkedIn: ${resumeData.personal.linkedin}`, 10);
// //     }
// //     if (resumeData.personal.github) {
// //       addText(`GitHub: ${resumeData.personal.github}`, 10);
// //     }
// //     if (resumeData.personal.website) {
// //       addText(`Website: ${resumeData.personal.website}`, 10);
// //     }

// //     // Summary
// //     if (resumeData.personal.summary) {
// //       addSection("Professional Summary");
// //       addText(resumeData.personal.summary, 11);
// //     }

// //     // Experience
// //     if (resumeData.sections.experience.visible && resumeData.sections.experience.items?.length) {
// //       addSection(resumeData.sections.experience.title);
      
// //       resumeData.sections.experience.items.forEach((item) => {
// //         addText(item.position, 12, true);
// //         addText(`${item.company} | ${item.location}`, 11);
// //         addText(`${item.startDate} - ${item.endDate}`, 10, false, true);
        
// //         item.description.forEach((desc: string) => {
// //           addText(`• ${desc}`, 11);
// //         });
        
// //         if (item.technologies?.length) {
// //           addText(`Technologies: ${item.technologies.join(", ")}`, 10, false, true);
// //         }
        
// //         currentY += 4;
// //       });
// //     }

// //     // Education
// //     if (resumeData.sections.education.visible && resumeData.sections.education.items?.length) {
// //       addSection(resumeData.sections.education.title);
      
// //       resumeData.sections.education.items.forEach((item) => {
// //         addText(`${item.degree} in ${item.field}`, 12, true);
// //         addText(`${item.institution} | ${item.location}`, 11);
// //         addText(`${item.startDate} - ${item.endDate}`, 10, false, true);
        
// //         if (item.gpa) {
// //           addText(`GPA: ${item.gpa}`, 10);
// //         }
// //         if (item.description) {
// //           addText(item.description, 11);
// //         }
        
// //         currentY += 4;
// //       });
// //     }

// //     // Skills
// //     if (resumeData.sections.skills.visible && resumeData.sections.skills.groups?.length) {
// //       addSection(resumeData.sections.skills.title);
      
// //       resumeData.sections.skills.groups.forEach((group) => {
// //         const skillsText = group.skills.map(skill => skill.name).join(", ");
// //         addText(`${group.name}: ${skillsText}`, 11);
// //       });
// //     }

// //     // Projects
// //     if (resumeData.sections.projects.visible && resumeData.sections.projects.items?.length) {
// //       addSection(resumeData.sections.projects.title);
      
// //       resumeData.sections.projects.items.forEach((item) => {
// //         addText(item.name, 12, true);
// //         addText(item.description, 11);
        
// //         if (item.url) {
// //           addText(`URL: ${item.url}`, 10);
// //         }
// //         if (item.technologies?.length) {
// //           addText(`Technologies: ${item.technologies.join(", ")}`, 10, false, true);
// //         }
        
// //         currentY += 4;
// //       });
// //     }

// //     this.updateProgress("downloading", 90, "Preparing download...");
// //     pdf.save(fileName);
// //   }

// //   private async exportToPNG(
// //     element: HTMLElement,
// //     fileName: string,
// //     options: ExportOptions
// //   ): Promise<void> {
// //     this.updateProgress("rendering", 20, "Rendering resume...");

// //     const clonedElement = await this.prepareElementForExport(element);
// //     await this.waitForFonts();

// //     // Set high DPI for PNG export
// //     const scale = options.scale || 3;
// //     const a4WidthPx = 794;

// //     // Allow dynamic height
// //     clonedElement.style.width = `${a4WidthPx}px`;
// //     clonedElement.style.height = 'auto';
// //     clonedElement.offsetHeight; // Force reflow

// //     const contentHeight = clonedElement.scrollHeight;

// //     const canvas = await html2canvas(clonedElement, {
// //       scale: scale,
// //       useCORS: true,
// //       allowTaint: true,
// //       backgroundColor: "#ffffff",
// //       width: a4WidthPx,
// //       height: contentHeight,
// //     });

// //     this.updateProgress("converting", 60, "Converting to PNG...");

// //     // Convert to blob with high quality
// //     canvas.toBlob(
// //       (blob) => {
// //         if (!blob) {
// //           throw new Error("Failed to create PNG blob");
// //         }

// //         this.updateProgress("downloading", 90, "Preparing download...");

// //         const url = URL.createObjectURL(blob);
// //         const link = document.createElement("a");
// //         link.href = url;
// //         link.download = fileName;
// //         document.body.appendChild(link);
// //         link.click();
// //         document.body.removeChild(link);
// //         URL.revokeObjectURL(url);

// //         document.body.removeChild(clonedElement);
// //       },
// //       "image/png",
// //       1.0
// //     );
// //   }

// //   private async exportToDOCX(
// //     element: HTMLElement,
// //     resumeData: ResumeData,
// //     fileName: string,
// //     options: ExportOptions
// //   ): Promise<void> {
// //     this.updateProgress("converting", 30, "Converting to DOCX...");

// //     const docxContent = this.generateDOCXContent(resumeData);

// //     this.updateProgress("downloading", 80, "Preparing download...");

// //     const blob = htmlDocx.asBlob(docxContent);

// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement("a");
// //     link.href = url;
// //     link.download = fileName;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //     URL.revokeObjectURL(url);
// //   }

// //   private async prepareElementForExport(
// //     element: HTMLElement
// //   ): Promise<HTMLElement> {
// //     const clonedElement = element.cloneNode(true) as HTMLElement;

// //     // Style the cloned element for export - preserve original styling as much as possible
// //     clonedElement.style.position = "absolute";
// //     clonedElement.style.left = "-9999px";
// //     clonedElement.style.top = "0";
// //     clonedElement.style.zIndex = "-1000";
    
// //     // Preserve the original dimensions but ensure it's A4 width
// //     clonedElement.style.width = "210mm"; // A4 width
// //     clonedElement.style.height = "auto";
// //     clonedElement.style.minHeight = "auto";
// //     clonedElement.style.maxHeight = "none";
// //     clonedElement.style.maxWidth = "none";
    
// //     // Ensure white background and clean appearance
// //     clonedElement.style.backgroundColor = "#ffffff";
// //     clonedElement.style.boxShadow = "none";
// //     clonedElement.style.border = "none";
// //     clonedElement.style.borderRadius = "0";
// //     clonedElement.style.overflow = "visible";
// //     clonedElement.style.pageBreakInside = "avoid";
// //     clonedElement.style.margin = "0";
// //     clonedElement.style.padding = "20px"; // Add some padding for better appearance

// //     // Remove or hide interactive elements and elements that shouldn't be printed
// //     const interactiveSelectors = [
// //       "button", 
// //       "[role='button']",
// //       ".hover\\:",
// //       ".focus\\:", 
// //       "[data-interactive]", 
// //       ".no-print",
// //       ".print\\:hidden",
// //       "[data-testid]", // Often used for test elements
// //       ".cursor-pointer:not(a):not([role])" // Interactive elements without semantic meaning
// //     ];
    
// //     const interactiveElements = clonedElement.querySelectorAll(interactiveSelectors.join(", "));
// //     interactiveElements.forEach((el) => {
// //       if (el instanceof HTMLElement) {
// //         el.style.display = "none";
// //       }
// //     });

// //     // Ensure all text is black for better printing/PDF quality
// //     const allTextElements = clonedElement.querySelectorAll("*");
// //     allTextElements.forEach((el) => {
// //       if (el instanceof HTMLElement) {
// //         const computedStyle = window.getComputedStyle(el);
        
// //         // Ensure good contrast for text
// //         if (computedStyle.color && computedStyle.color !== 'rgb(0, 0, 0)') {
// //           // Only change very light colors to black
// //           const rgb = computedStyle.color.match(/\d+/g);
// //           if (rgb && rgb.length >= 3) {
// //             const [r, g, b] = rgb.map(Number);
// //             const brightness = (r * 299 + g * 587 + b * 114) / 1000;
// //             if (brightness > 200) { // Light colors
// //               el.style.color = '#000000';
// //             }
// //           }
// //         }

// //         // Remove any transforms that might hide content
// //         if (computedStyle.transform && computedStyle.transform !== 'none') {
// //           el.style.transform = 'none';
// //         }

// //         // Ensure visibility
// //         if (computedStyle.visibility === 'hidden') {
// //           el.style.visibility = 'visible';
// //         }

// //         // Fix any display issues
// //         if (computedStyle.display === 'none' && !interactiveSelectors.some(selector => el.matches?.(selector))) {
// //           el.style.display = 'block';
// //         }
// //       }
// //     });

// //     // Ensure all images are loaded and visible
// //     const images = clonedElement.querySelectorAll("img");
// //     await Promise.all(
// //       Array.from(images).map((img) => {
// //         return new Promise<void>((resolve) => {
// //           if (img.complete) {
// //             resolve();
// //           } else {
// //             const timeoutId = setTimeout(() => resolve(), 5000); // 5 second timeout
// //             img.onload = () => {
// //               clearTimeout(timeoutId);
// //               resolve();
// //             };
// //             img.onerror = () => {
// //               clearTimeout(timeoutId);
// //               resolve();
// //             };
// //           }
// //         });
// //       })
// //     );

// //     // Append to document for measurement
// //     document.body.appendChild(clonedElement);
    
// //     // Force multiple layout recalculations to ensure everything is properly sized
// //     clonedElement.offsetHeight;
// //     await new Promise(resolve => setTimeout(resolve, 100));
// //     clonedElement.offsetHeight;
    
// //     return clonedElement;
// //   }

// //   private async waitForFonts(): Promise<void> {
// //     if (document.fonts && document.fonts.ready) {
// //       await document.fonts.ready;
// //     }
    
// //     // Additional wait for custom fonts
// //     return new Promise(resolve => {
// //       setTimeout(resolve, 500);
// //     });
// //   }

// //   private loadFontsInClonedDocument(clonedDoc: Document): void {
// //     const usedFonts = new Set<string>();

// //     clonedDoc.querySelectorAll("*").forEach((el) => {
// //       const style = clonedDoc.defaultView?.getComputedStyle(el as Element);
// //       if (!style) return;
      
// //       const family = style.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
// //       const weight = style.fontWeight || "400";
// //       const fontStyle = style.fontStyle || "normal";
// //       usedFonts.add(`${family}|${weight}|${fontStyle}`);
// //     });

// //     // Copy fonts from main document to cloned document
// //     document.fonts.forEach((fontFace) => {
// //       const descriptor = `${fontFace.family.replace(/['"]/g, "").trim()}|${
// //         fontFace.weight || "400"
// //       }|${fontFace.style || "normal"}`;
      
// //       if (usedFonts.has(descriptor)) {
// //         fontFace
// //           .load()
// //           .then((loaded) => {
// //             if (clonedDoc.fonts) {
// //               clonedDoc.fonts.add(loaded);
// //             }
// //           })
// //           .catch(console.warn);
// //       }
// //     });
// //   }

// //   private generateDOCXContent(resumeData: ResumeData): string {
// //     // Enhanced DOCX generation with better ATS compatibility
// //     let html = `
// //       <!DOCTYPE html>
// //       <html>
// //       <head>
// //         <meta charset="utf-8">
// //         <style>
// //           body { 
// //             font-family: 'Calibri', 'Arial', sans-serif; 
// //             line-height: 1.15; 
// //             margin: 0.5in; 
// //             font-size: 11pt;
// //             color: #000000;
// //           }
// //           h1 { 
// //             color: #000000; 
// //             font-size: 16pt;
// //             margin-bottom: 6pt;
// //             font-weight: bold;
// //             text-align: center;
// //           }
// //           h2 { 
// //             color: #000000; 
// //             margin-top: 12pt; 
// //             margin-bottom: 6pt; 
// //             font-size: 12pt;
// //             font-weight: bold;
// //             text-transform: uppercase;
// //             border-bottom: 1pt solid #000000;
// //           }
// //           h3 { 
// //             color: #000000; 
// //             margin-bottom: 3pt; 
// //             margin-top: 6pt;
// //             font-size: 11pt;
// //             font-weight: bold;
// //           }
// //           .contact-info { 
// //             margin-bottom: 12pt; 
// //             text-align: center; 
// //             font-size: 10pt;
// //           }
// //           .section { margin-bottom: 12pt; }
// //           .item { margin-bottom: 9pt; }
// //           ul { 
// //             margin: 3pt 0; 
// //             padding-left: 18pt; 
// //             list-style-type: disc;
// //           }
// //           li { margin-bottom: 2pt; }
// //           p { margin: 3pt 0; }
// //           .date-range { 
// //             font-style: italic; 
// //             font-size: 10pt;
// //           }
// //           .company { font-weight: bold; }
// //           .technologies { 
// //             font-style: italic; 
// //             font-size: 10pt; 
// //             color: #333333;
// //           }
// //         </style>
// //       </head>
// //       <body>
// //     `;

// //     // Header with better formatting
// //     html += `
// //       <h1>${resumeData.personal.name}</h1>
// //       <div class="contact-info">
// //         <p><strong>${resumeData.personal.title}</strong></p>
// //         <p>${resumeData.personal.email} • ${resumeData.personal.phone} • ${resumeData.personal.location}</p>
// //         ${
// //           resumeData.personal.linkedin || resumeData.personal.github || resumeData.personal.website
// //             ? `<p>
// //                 ${resumeData.personal.linkedin ? `LinkedIn: ${resumeData.personal.linkedin}` : ''}
// //                 ${resumeData.personal.linkedin && (resumeData.personal.github || resumeData.personal.website) ? ' • ' : ''}
// //                 ${resumeData.personal.github ? `GitHub: ${resumeData.personal.github}` : ''}
// //                 ${resumeData.personal.github && resumeData.personal.website ? ' • ' : ''}
// //                 ${resumeData.personal.website ? `Website: ${resumeData.personal.website}` : ''}
// //               </p>`
// //             : ""
// //         }
// //       </div>
// //     `;

// //     // Rest of the sections remain the same but with improved formatting
// //     // Summary
// //     if (resumeData.personal.summary) {
// //       html += `
// //         <div class="section">
// //           <h2>Professional Summary</h2>
// //           <p>${resumeData.personal.summary}</p>
// //         </div>
// //       `;
// //     }

// //     // Experience with enhanced formatting
// //     if (
// //       resumeData.sections.experience.visible &&
// //       resumeData.sections.experience.items?.length
// //     ) {
// //       html += `<div class="section"><h2>${resumeData.sections.experience.title}</h2>`;
// //       resumeData.sections.experience.items.forEach((item) => {
// //         html += `
// //           <div class="item">
// //             <h3>${item.position}</h3>
// //             <p><span class="company">${item.company}</span> • ${item.location}</p>
// //             <p class="date-range">${item.startDate} - ${item.endDate}</p>
// //             <ul>
// //               ${item.description
// //                 .map((desc: string) => `<li>${desc}</li>`)
// //                 .join("")}
// //             </ul>
// //             ${
// //               item.technologies?.length
// //                 ? `<p class="technologies">Technologies: ${item.technologies.join(
// //                     ", "
// //                   )}</p>`
// //                 : ""
// //             }
// //           </div>
// //         `;
// //       });
// //       html += "</div>";
// //     }

// //     // Continue with other sections...
// //     // Education
// //     if (
// //       resumeData.sections.education.visible &&
// //       resumeData.sections.education.items?.length
// //     ) {
// //       html += `<div class="section"><h2>${resumeData.sections.education.title}</h2>`;
// //       resumeData.sections.education.items.forEach((item) => {
// //         html += `
// //           <div class="item">
// //             <h3>${item.degree} in ${item.field}</h3>
// //             <p><span class="company">${item.institution}</span> • ${item.location}</p>
// //             <p class="date-range">${item.startDate} - ${item.endDate}</p>
// //             ${item.gpa ? `<p>GPA: ${item.gpa}</p>` : ""}
// //             ${item.description ? `<p>${item.description}</p>` : ""}
// //           </div>
// //         `;
// //       });
// //       html += "</div>";
// //     }

// //     // Skills
// //     if (
// //       resumeData.sections.skills.visible &&
// //       resumeData.sections.skills.groups?.length
// //     ) {
// //       html += `<div class="section"><h2>${resumeData.sections.skills.title}</h2>`;
// //       resumeData.sections.skills.groups.forEach((group) => {
// //         html += `
// //           <p><strong>${group.name}:</strong> ${group.skills
// //           .map((skill) => skill.name)
// //           .join(", ")}</p>
// //         `;
// //       });
// //       html += "</div>";
// //     }

// //     // Projects
// //     if (
// //       resumeData.sections.projects.visible &&
// //       resumeData.sections.projects.items?.length
// //     ) {
// //       html += `<div class="section"><h2>${resumeData.sections.projects.title}</h2>`;
// //       resumeData.sections.projects.items.forEach((item) => {
// //         html += `
// //           <div class="item">
// //             <h3>${item.name}</h3>
// //             <p>${item.description}</p>
// //             ${item.url ? `<p><strong>URL:</strong> ${item.url}</p>` : ""}
// //             ${
// //               item.technologies?.length
// //                 ? `<p class="technologies">Technologies: ${item.technologies.join(
// //                     ", "
// //                   )}</p>`
// //                 : ""
// //             }
// //           </div>
// //         `;
// //       });
// //       html += "</div>";
// //     }

// //     // Certifications
// //     if (
// //       resumeData.sections.certifications.visible &&
// //       resumeData.sections.certifications.items?.length
// //     ) {
// //       html += `<div class="section"><h2>${resumeData.sections.certifications.title}</h2>`;
// //       resumeData.sections.certifications.items.forEach((item) => {
// //         html += `<p><strong>${item.name}</strong> • ${item.organization} • ${item.date}</p>`;
// //       });
// //       html += "</div>";
// //     }

// //     // Languages
// //     if (
// //       resumeData.sections.languages.visible &&
// //       resumeData.sections.languages.items?.length
// //     ) {
// //       html += `<div class="section"><h2>${resumeData.sections.languages.title}</h2>`;
// //       resumeData.sections.languages.items.forEach((item) => {
// //         html += `<p><strong>${item.name}</strong> • ${item.proficiency}</p>`;
// //       });
// //       html += "</div>";
// //     }

// //     html += "</body></html>";
// //     return html;
// //   }

// //   // Convenience method specifically for resume preview pages
// //   async exportResumePreview(
// //     elementId: string,
// //     resumeData: ResumeData,
// //     options: Partial<ExportOptions> = {}
// //   ): Promise<void> {
// //     const defaultOptions: ExportOptions = {
// //       format: "pdf",
// //       preserveText: false, // Use visual export by default for preview
// //       scale: 3, // High quality
// //       ...options
// //     };

// //     return this.exportResume(elementId, resumeData, defaultOptions);
// //   }

// //   async exportMultiple(
// //     elementId: string,
// //     resumeData: ResumeData,
// //     formats: ExportFormat[],
// //     baseFileName?: string
// //   ): Promise<void> {
// //     const totalFormats = formats.length;
// //     let completedFormats = 0;

// //     for (const format of formats) {
// //       try {
// //         const fileName = baseFileName
// //           ? `${baseFileName}.${format}`
// //           : this.generateFileName(resumeData, format);

// //         // Use text-based PDF for better ATS compatibility
// //         const options: ExportOptions = { 
// //           format, 
// //           fileName,
// //           preserveText: format === 'pdf' // Enable text-based PDF
// //         };

// //         await this.exportResume(elementId, resumeData, options);
// //         completedFormats++;

// //         this.updateProgress(
// //           "converting",
// //           (completedFormats / totalFormats) * 100,
// //           `Exported ${completedFormats}/${totalFormats} formats`
// //         );
// //       } catch (error) {
// //         console.error(`Failed to export ${format}:`, error);
// //       }
// //     }

// //     this.updateProgress(
// //       "complete",
// //       100,
// //       `Exported ${completedFormats}/${totalFormats} formats successfully`
// //     );
// //   }
// // }

// // export const createResumeExporter = (
// //   progressCallback?: (progress: ExportProgress) => void
// // ) => {
// //   return new ResumeExporter(progressCallback);
// // };


// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import htmlDocx from "html-docx-js/dist/html-docx";
// import { ResumeData } from "./types";

// export type ExportFormat = "pdf" | "png" | "docx";

// export interface ExportOptions {
//   format: ExportFormat;
//   fileName?: string;
//   quality?: number;
//   scale?: number;
//   preserveText?: boolean;
// }

// export interface ExportProgress {
//   stage:
//     | "preparing"
//     | "rendering"
//     | "converting"
//     | "downloading"
//     | "complete"
//     | "error";
//   progress: number;
//   message: string;
// }

// export class ResumeExporter {
//   private progressCallback?: (progress: ExportProgress) => void;

//   constructor(progressCallback?: (progress: ExportProgress) => void) {
//     this.progressCallback = progressCallback;
//   }

//   private updateProgress(
//     stage: ExportProgress["stage"],
//     progress: number,
//     message: string
//   ) {
//     if (this.progressCallback) {
//       this.progressCallback({ stage, progress, message });
//     }
//   }

//   async exportResume(
//     elementId: string,
//     resumeData: ResumeData,
//     options: ExportOptions
//   ): Promise<void> {
//     try {
//       this.updateProgress("preparing", 0, "Preparing export...");

//       this.validateResumeContent(resumeData);

//       const element = document.getElementById(elementId);
//       if (!element) {
//         throw new Error("Resume element not found");
//       }

//       const fileName =
//         options.fileName || this.generateFileName(resumeData, options.format);

//       switch (options.format) {
//         case "pdf":
//           if (options.preserveText) {
//             await this.exportToTextBasedPDF(resumeData, fileName, options);
//           } else {
//             await this.exportToSinglePagePDF(element, fileName, options);
//           }
//           break;
//         case "png":
//           await this.exportToPNG(element, fileName, options);
//           break;
//         case "docx":
//           await this.exportToDOCX(element, resumeData, fileName, options);
//           break;
//         default:
//           throw new Error(`Unsupported export format: ${options.format}`);
//       }

//       this.updateProgress("complete", 100, "Export completed successfully!");
//     } catch (error) {
//       console.error("Export error:", error);
//       this.updateProgress(
//         "error",
//         0,
//         `Export failed: ${
//           error instanceof Error ? error.message : "Unknown error"
//         }`
//       );
//       throw error;
//     }
//   }

//   private validateResumeContent(resumeData: ResumeData): void {
//     if (!resumeData.personal.name.trim()) {
//       throw new Error("Name is required for export");
//     }
//     if (!resumeData.personal.email.trim()) {
//       throw new Error("Email is required for export");
//     }
//   }

//   private generateFileName(
//     resumeData: ResumeData,
//     format: ExportFormat
//   ): string {
//     const name = resumeData.personal.name.replace(/[^a-zA-Z0-9]/g, "_");
//     const timestamp = new Date().toISOString().split("T")[0];
//     return `${name}_Resume_${timestamp}.${format}`;
//   }

//   // NEW: Optimized single-page PDF export
//   private async exportToSinglePagePDF(
//     element: HTMLElement,
//     fileName: string,
//     options: ExportOptions
//   ): Promise<void> {
//     this.updateProgress("rendering", 20, "Preparing single-page export...");

//     // Create optimized clone for single-page export
//     const clonedElement = await this.prepareElementForSinglePageExport(element);

//     // Wait for fonts and layout
//     await this.waitForFonts();
//     await new Promise(resolve => setTimeout(resolve, 300));

//     this.updateProgress("rendering", 40, "Capturing resume...");

//     // Use higher scale for better quality
//     const scale = options.scale || 2.5;
    
//     // Get the actual content dimensions
//     const rect = clonedElement.getBoundingClientRect();
//     const contentWidth = clonedElement.scrollWidth;
//     const contentHeight = clonedElement.scrollHeight;

//     console.log('Single page dimensions:', { contentWidth, contentHeight, rect });

//     const canvas = await html2canvas(clonedElement, {
//       scale: scale,
//       useCORS: true,
//       allowTaint: true,
//       backgroundColor: "#ffffff",
//       width: contentWidth,
//       height: contentHeight,
//       scrollX: 0,
//       scrollY: 0,
//       windowWidth: contentWidth,
//       windowHeight: contentHeight,
//       logging: false,
//       removeContainer: false,
//       foreignObjectRendering: false,
//       onclone: (clonedDoc) => {
//         this.loadFontsInClonedDocument(clonedDoc);
        
//         // Ensure all content is visible in cloned document
//         const body = clonedDoc.body;
//         if (body) {
//           // Remove any problematic elements
//           const problematicElements = body.querySelectorAll(
//             '[style*="position: fixed"], [style*="position: sticky"], .modal, .overlay, .tooltip, .no-print'
//           );
//           problematicElements.forEach(el => {
//             if (el instanceof HTMLElement && el !== clonedElement) {
//               el.remove();
//             }
//           });
//         }
//       },
//     });

//     this.updateProgress("converting", 70, "Creating single-page PDF...");

//     // Create PDF with optimal dimensions
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });

//     const pdfWidth = 210; // A4 width in mm
//     const pdfHeight = 297; // A4 height in mm
    
//     // Calculate scaling to fit content on single page
//     const canvasAspectRatio = canvas.height / canvas.width;
//     const contentHeightMm = pdfWidth * canvasAspectRatio;

//     // Always fit to single page by scaling down if necessary
//     if (contentHeightMm > pdfHeight) {
//       // Scale down to fit height
//       const scaleFactor = pdfHeight / contentHeightMm;
//       const scaledWidth = pdfWidth * scaleFactor;
//       const scaledHeight = pdfHeight;
      
//       // Center horizontally if scaled down
//       const xOffset = (pdfWidth - scaledWidth) / 2;
      
//       pdf.addImage(
//         canvas.toDataURL("image/png", 0.95),
//         "PNG",
//         xOffset,
//         0,
//         scaledWidth,
//         scaledHeight,
//         undefined,
//         "FAST"
//       );
//     } else {
//       // Content fits naturally
//       pdf.addImage(
//         canvas.toDataURL("image/png", 0.95),
//         "PNG",
//         0,
//         0,
//         pdfWidth,
//         contentHeightMm,
//         undefined,
//         "FAST"
//       );
//     }

//     this.updateProgress("downloading", 90, "Finalizing export...");

//     pdf.save(fileName);
//     document.body.removeChild(clonedElement);
//   }

//   // NEW: Optimized element preparation for single-page export
//   private async prepareElementForSinglePageExport(
//     element: HTMLElement
//   ): Promise<HTMLElement> {
//     const clonedElement = element.cloneNode(true) as HTMLElement;

//     // Position off-screen for measurement
//     clonedElement.style.position = "absolute";
//     clonedElement.style.left = "-9999px";
//     clonedElement.style.top = "0";
//     clonedElement.style.zIndex = "-1000";
    
//     // Set optimal dimensions for single-page layout
//     clonedElement.style.width = "794px"; // A4 width at 96 DPI
//     clonedElement.style.height = "auto";
//     clonedElement.style.minHeight = "auto";
//     clonedElement.style.maxHeight = "1123px"; // A4 height at 96 DPI
//     clonedElement.style.maxWidth = "794px";
    
//     // Optimize for single-page layout
//     clonedElement.style.backgroundColor = "#ffffff";
//     clonedElement.style.overflow = "hidden"; // Prevent overflow
//     clonedElement.style.pageBreakInside = "avoid";
//     clonedElement.style.margin = "0";
//     clonedElement.style.padding = "16px"; // Reasonable padding
//     clonedElement.style.boxSizing = "border-box";
    
//     // Remove visual effects that don't print well
//     clonedElement.style.boxShadow = "none";
//     clonedElement.style.border = "none";
//     clonedElement.style.borderRadius = "0";

//     // Compact layout adjustments
//     const allElements = clonedElement.querySelectorAll("*");
//     allElements.forEach((el) => {
//       if (el instanceof HTMLElement) {
//         const computedStyle = window.getComputedStyle(el);
        
//         // Reduce excessive margins and padding for compact layout
//         const currentMarginTop = parseFloat(computedStyle.marginTop);
//         const currentMarginBottom = parseFloat(computedStyle.marginBottom);
//         const currentPaddingTop = parseFloat(computedStyle.paddingTop);
//         const currentPaddingBottom = parseFloat(computedStyle.paddingBottom);
        
//         if (currentMarginTop > 16) {
//           el.style.marginTop = "12px";
//         }
//         if (currentMarginBottom > 16) {
//           el.style.marginBottom = "12px";
//         }
//         if (currentPaddingTop > 16) {
//           el.style.paddingTop = "8px";
//         }
//         if (currentPaddingBottom > 16) {
//           el.style.paddingBottom = "8px";
//         }
        
//         // Optimize font sizes for better fit
//         const fontSize = parseFloat(computedStyle.fontSize);
//         if (fontSize > 24) {
//           el.style.fontSize = "22px";
//         } else if (fontSize > 18) {
//           el.style.fontSize = "16px";
//         }
        
//         // Ensure good contrast
//         if (computedStyle.color && computedStyle.color !== 'rgb(0, 0, 0)') {
//           el.style.color = '#000000';
//         }
        
//         // Remove transforms and ensure visibility
//         el.style.transform = 'none';
//         if (computedStyle.visibility === 'hidden') {
//           el.style.visibility = 'visible';
//         }
//       }
//     });

//     // Remove interactive and non-printable elements
//     const interactiveSelectors = [
//       "button", 
//       "[role='button']",
//       ".hover\\:",
//       ".focus\\:", 
//       "[data-interactive]", 
//       ".no-print",
//       ".print\\:hidden",
//       "[data-testid]",
//       ".cursor-pointer:not(a):not([role])"
//     ];
    
//     const interactiveElements = clonedElement.querySelectorAll(interactiveSelectors.join(", "));
//     interactiveElements.forEach((el) => {
//       if (el instanceof HTMLElement) {
//         el.style.display = "none";
//       }
//     });

//     // Handle images
//     const images = clonedElement.querySelectorAll("img");
//     await Promise.all(
//       Array.from(images).map((img) => {
//         return new Promise<void>((resolve) => {
//           if (img.complete) {
//             resolve();
//           } else {
//             const timeoutId = setTimeout(() => resolve(), 3000);
//             img.onload = () => {
//               clearTimeout(timeoutId);
//               resolve();
//             };
//             img.onerror = () => {
//               clearTimeout(timeoutId);
//               resolve();
//             };
//           }
//         });
//       })
//     );

//     // Append to document and force layout
//     document.body.appendChild(clonedElement);
    
//     // Multiple layout recalculations for stability
//     clonedElement.offsetHeight;
//     await new Promise(resolve => setTimeout(resolve, 100));
//     clonedElement.offsetHeight;
    
//     return clonedElement;
//   }

//   // Keep existing text-based PDF method
//   private async exportToTextBasedPDF(
//     resumeData: ResumeData,
//     fileName: string,
//     options: ExportOptions
//   ): Promise<void> {
//     this.updateProgress("converting", 30, "Generating text-based PDF...");

//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });

//     const pageWidth = 210;
//     const pageHeight = 297;
//     const margin = 15; // Reduced margin for more content
//     const contentWidth = pageWidth - (margin * 2);
    
//     let currentY = margin;
//     const lineHeight = 5; // Reduced line height for compactness
//     const sectionSpacing = 6; // Reduced section spacing

//     // Helper function to add text with word wrapping
//     const addText = (text: string, fontSize: number, isBold: boolean = false, isItalic: boolean = false) => {
//       pdf.setFontSize(fontSize);
//       pdf.setFont("helvetica", isBold ? "bold" : (isItalic ? "italic" : "normal"));
      
//       const lines = pdf.splitTextToSize(text, contentWidth);
      
//       for (const line of lines) {
//         if (currentY > pageHeight - margin - 10) {
//           // If we're running out of space, reduce font size or spacing
//           if (fontSize > 9) {
//             fontSize -= 0.5;
//             pdf.setFontSize(fontSize);
//           }
//         }
        
//         pdf.text(line, margin, currentY);
//         currentY += lineHeight;
//       }
//     };

//     const addSection = (title: string) => {
//       currentY += sectionSpacing;
//       addText(title.toUpperCase(), 12, true);
//       currentY += 2;
//     };

//     // Compact header
//     addText(resumeData.personal.name, 16, true);
//     addText(resumeData.personal.title, 11, false, true);
//     addText(`${resumeData.personal.email} | ${resumeData.personal.phone}`, 9);
//     addText(resumeData.personal.location, 9);
    
//     // Combine links on one line
//     const links = [];
//     if (resumeData.personal.linkedin) links.push(`LinkedIn: ${resumeData.personal.linkedin}`);
//     if (resumeData.personal.github) links.push(`GitHub: ${resumeData.personal.github}`);
//     if (resumeData.personal.website) links.push(`Website: ${resumeData.personal.website}`);
//     if (links.length > 0) {
//       addText(links.join(" | "), 9);
//     }

//     // Compact summary
//     if (resumeData.personal.summary) {
//       addSection("Summary");
//       addText(resumeData.personal.summary, 10);
//     }

//     // Compact experience
//     if (resumeData.sections.experience.visible && resumeData.sections.experience.items?.length) {
//       addSection(resumeData.sections.experience.title);
      
//       resumeData.sections.experience.items.forEach((item) => {
//         addText(item.position, 11, true);
//         addText(`${item.company} | ${item.location} | ${item.startDate} - ${item.endDate}`, 10);
        
//         // Limit description items for space
//         const descriptions = item.description.slice(0, 3); // Limit to 3 bullet points
//         descriptions.forEach((desc: string) => {
//           addText(`• ${desc}`, 10);
//         });
        
//         if (item.technologies?.length) {
//           addText(`Tech: ${item.technologies.join(", ")}`, 9, false, true);
//         }
        
//         currentY += 3;
//       });
//     }

//     // Continue with other sections in compact format...
//     // [Similar compact formatting for education, skills, projects, etc.]

//     this.updateProgress("downloading", 90, "Preparing download...");
//     pdf.save(fileName);
//   }

//   private async exportToPNG(
//     element: HTMLElement,
//     fileName: string,
//     options: ExportOptions
//   ): Promise<void> {
//     this.updateProgress("rendering", 20, "Rendering resume...");

//     const clonedElement = await this.prepareElementForSinglePageExport(element);
//     await this.waitForFonts();

//     const scale = options.scale || 3;
//     const contentWidth = clonedElement.scrollWidth;
//     const contentHeight = clonedElement.scrollHeight;

//     const canvas = await html2canvas(clonedElement, {
//       scale: scale,
//       useCORS: true,
//       allowTaint: true,
//       backgroundColor: "#ffffff",
//       width: contentWidth,
//       height: contentHeight,
//     });

//     this.updateProgress("converting", 60, "Converting to PNG...");

//     canvas.toBlob(
//       (blob) => {
//         if (!blob) {
//           throw new Error("Failed to create PNG blob");
//         }

//         this.updateProgress("downloading", 90, "Preparing download...");

//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = fileName;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);

//         document.body.removeChild(clonedElement);
//       },
//       "image/png",
//       1.0
//     );
//   }

//   private async exportToDOCX(
//     element: HTMLElement,
//     resumeData: ResumeData,
//     fileName: string,
//     options: ExportOptions
//   ): Promise<void> {
//     this.updateProgress("converting", 30, "Converting to DOCX...");

//     const docxContent = this.generateDOCXContent(resumeData);

//     this.updateProgress("downloading", 80, "Preparing download...");

//     const blob = htmlDocx.asBlob(docxContent);

//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   }

//   private async waitForFonts(): Promise<void> {
//     if (document.fonts && document.fonts.ready) {
//       await document.fonts.ready;
//     }
    
//     return new Promise(resolve => {
//       setTimeout(resolve, 300); // Reduced wait time
//     });
//   }

//   private loadFontsInClonedDocument(clonedDoc: Document): void {
//     const usedFonts = new Set<string>();

//     clonedDoc.querySelectorAll("*").forEach((el) => {
//       const style = clonedDoc.defaultView?.getComputedStyle(el as Element);
//       if (!style) return;
      
//       const family = style.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
//       const weight = style.fontWeight || "400";
//       const fontStyle = style.fontStyle || "normal";
//       usedFonts.add(`${family}|${weight}|${fontStyle}`);
//     });

//     document.fonts.forEach((fontFace) => {
//       const descriptor = `${fontFace.family.replace(/['"]/g, "").trim()}|${
//         fontFace.weight || "400"
//       }|${fontFace.style || "normal"}`;
      
//       if (usedFonts.has(descriptor)) {
//         fontFace
//           .load()
//           .then((loaded) => {
//             if (clonedDoc.fonts) {
//               clonedDoc.fonts.add(loaded);
//             }
//           })
//           .catch(console.warn);
//       }
//     });
//   }

//   private generateDOCXContent(resumeData: ResumeData): string {
//     // Your existing DOCX generation code
//     let html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <style>
//           body { 
//             font-family: 'Calibri', 'Arial', sans-serif; 
//             line-height: 1.1; 
//             margin: 0.5in; 
//             font-size: 10pt;
//             color: #000000;
//           }
//           h1 { 
//             color: #000000; 
//             font-size: 14pt;
//             margin-bottom: 4pt;
//             font-weight: bold;
//             text-align: center;
//           }
//           h2 { 
//             color: #000000; 
//             margin-top: 8pt; 
//             margin-bottom: 4pt; 
//             font-size: 11pt;
//             font-weight: bold;
//             text-transform: uppercase;
//             border-bottom: 1pt solid #000000;
//           }
//           .section { margin-bottom: 8pt; }
//           .item { margin-bottom: 6pt; }
//         </style>
//       </head>
//       <body>
//     `;

//     // Add content generation here...
//     html += "</body></html>";
//     return html;
//   }

//   // Convenience methods
//   async exportResumePreview(
//     elementId: string,
//     resumeData: ResumeData,
//     options: Partial<ExportOptions> = {}
//   ): Promise<void> {
//     const defaultOptions: ExportOptions = {
//       format: "pdf",
//       preserveText: false,
//       scale: 2.5,
//       ...options
//     };

//     return this.exportResume(elementId, resumeData, defaultOptions);
//   }

//   async exportMultiple(
//     elementId: string,
//     resumeData: ResumeData,
//     formats: ExportFormat[],
//     baseFileName?: string
//   ): Promise<void> {
//     const totalFormats = formats.length;
//     let completedFormats = 0;

//     for (const format of formats) {
//       try {
//         const fileName = baseFileName
//           ? `${baseFileName}.${format}`
//           : this.generateFileName(resumeData, format);

//         const options: ExportOptions = { 
//           format, 
//           fileName,
//           preserveText: format === 'pdf'
//         };

//         await this.exportResume(elementId, resumeData, options);
//         completedFormats++;

//         this.updateProgress(
//           "converting",
//           (completedFormats / totalFormats) * 100,
//           `Exported ${completedFormats}/${totalFormats} formats`
//         );
//       } catch (error) {
//         console.error(`Failed to export ${format}:`, error);
//       }
//     }

//     this.updateProgress(
//       "complete",
//       100,
//       `Exported ${completedFormats}/${totalFormats} formats successfully`
//     );
//   }
// }

// export const createResumeExporter = (
//   progressCallback?: (progress: ExportProgress) => void
// ) => {
//   return new ResumeExporter(progressCallback);
// };

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

    // Set fixed dimensions for A4 paper (210mm x 297mm at 96 DPI)
    const a4Width = 794; // 210mm at 96 DPI
    const a4Height = 1123; // 297mm at 96 DPI

    const canvas = await html2canvas(clonedElement, {
      scale: options.scale || 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: a4Width,
      height: a4Height,
      onclone: (clonedDoc) => {
        // Ensure fonts are loaded in the cloned document
        this.loadFontsInClonedDocument(clonedDoc);
      },
    });

    this.updateProgress("converting", 60, "Converting to PDF...");

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Calculate dimensions to fit A4
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    
    // Add image to PDF, scaling to fit A4
    pdf.addImage(
      canvas.toDataURL("image/png", 1.0),
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight,
      undefined,
      "FAST"
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

    // Set high DPI for PNG export (300 DPI minimum)
    const scale = options.scale || 3.125; // 300 DPI / 96 DPI = 3.125
    const a4Width = 794; // 210mm at 96 DPI
    const a4Height = 1123; // 297mm at 96 DPI

    const canvas = await html2canvas(clonedElement, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: a4Width,
      height: a4Height,
    });

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
      1.0 // Maximum quality
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

    // Convert HTML to DOCX blob
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

    // Style the cloned element for export
    clonedElement.style.position = "absolute";
    clonedElement.style.left = "-9999px";
    clonedElement.style.top = "0";
    clonedElement.style.width = "210mm";
    clonedElement.style.minHeight = "297mm";
    clonedElement.style.backgroundColor = "#ffffff";
    clonedElement.style.boxShadow = "none";
    clonedElement.style.border = "none";
    clonedElement.style.borderRadius = "0";
    clonedElement.style.overflow = "visible";

    // Remove any interactive elements that shouldn't be in export
    const interactiveElements = clonedElement.querySelectorAll(
      "button, .hover\\:, .focus\\:, [data-interactive]"
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
    // Generate ATS-compatible HTML structure for DOCX conversion
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: 'Times New Roman', serif; 
            line-height: 1.6; 
            margin: 40px; 
            font-size: 11pt;
            color: #000000;
          }
          h1 { 
            color: #000000; 
            border-bottom: 1px solid #000000; 
            padding-bottom: 10px; 
            font-size: 18pt;
            margin-bottom: 10px;
          }
          h2 { 
            color: #000000; 
            margin-top: 20px; 
            margin-bottom: 10px; 
            font-size: 14pt;
            font-weight: bold;
          }
          h3 { 
            color: #000000; 
            margin-bottom: 5px; 
            font-size: 12pt;
            font-weight: bold;
          }
          .contact-info { margin-bottom: 20px; text-align: center; }
          .section { margin-bottom: 20px; }
          .experience-item, .education-item { margin-bottom: 15px; }
          .skills-group { margin-bottom: 10px; }
          ul { margin: 5px 0; padding-left: 20px; }
          li { margin-bottom: 3px; }
          p { margin: 5px 0; }
          .date-range { font-style: italic; }
        </style>
      </head>
      <body>
    `;

    // Header
    html += `
      <h1>${resumeData.personal.name}</h1>
      <div class="contact-info">
        <p><strong>${resumeData.personal.title}</strong></p>
        <p>${resumeData.personal.email} | ${resumeData.personal.phone}</p>
        <p>${resumeData.personal.location}</p>
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
          <h2>PROFESSIONAL SUMMARY</h2>
          <p>${resumeData.personal.summary}</p>
        </div>
      `;
    }

    // Experience
    if (
      resumeData.sections.experience.visible &&
      resumeData.sections.experience.items?.length
    ) {
      html += `<div class="section"><h2>${resumeData.sections.experience.title.toUpperCase()}</h2>`;
      resumeData.sections.experience.items.forEach((item) => {
        html += `
          <div class="experience-item">
            <h3>${item.position}</h3>
            <p><strong>${item.company}</strong> | ${item.location}</p>
            <p class="date-range">${item.startDate} - ${item.endDate}</p>
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
      html += `<div class="section"><h2>${resumeData.sections.education.title.toUpperCase()}</h2>`;
      resumeData.sections.education.items.forEach((item) => {
        html += `
          <div class="education-item">
            <h3>${item.degree} in ${item.field}</h3>
            <p><strong>${item.institution}</strong> | ${item.location}</p>
            <p class="date-range">${item.startDate} - ${item.endDate}</p>
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
      html += `<div class="section"><h2>${resumeData.sections.skills.title.toUpperCase()}</h2>`;
      resumeData.sections.skills.groups.forEach((group) => {
        html += `
          <div class="skills-group">
            <p><strong>${group.name}:</strong> ${group.skills.map((skill) => skill.name).join(", ")}</p>
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
      html += `<div class="section"><h2>${resumeData.sections.projects.title.toUpperCase()}</h2>`;
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
      html += `<div class="section"><h2>${resumeData.sections.certifications.title.toUpperCase()}</h2><ul>`;
      resumeData.sections.certifications.items.forEach((item) => {
        html += `<li><strong>${item.name}</strong> - ${item.organization} (${item.date})</li>`;
      });
      html += "</ul></div>";
    }

    // Languages
    if (
      resumeData.sections.languages.visible &&
      resumeData.sections.languages.items?.length
    ) {
      html += `<div class="section"><h2>${resumeData.sections.languages.title.toUpperCase()}</h2><ul>`;
      resumeData.sections.languages.items.forEach((item) => {
        html += `<li><strong>${item.name}</strong> - ${item.proficiency}</li>`;
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