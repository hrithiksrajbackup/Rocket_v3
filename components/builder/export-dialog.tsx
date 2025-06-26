// "use client";

// import { useState } from 'react';
// import { ResumeData } from '@/lib/types';
// import { ExportFormat, ExportProgress, createResumeExporter } from '@/lib/export-utils';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Progress } from '@/components/ui/progress';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { 
//   Download, 
//   FileText, 
//   Image, 
//   File, 
//   CheckCircle, 
//   AlertCircle, 
//   Loader2,
//   Eye
// } from 'lucide-react';

// interface ExportDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   resumeData: ResumeData;
//   elementId: string;
// }

// const formatOptions = [
//   {
//     value: 'pdf' as ExportFormat,
//     label: 'PDF',
//     description: 'Portable Document Format - Best for sharing and printing',
//     icon: FileText,
//     recommended: true
//   },
//   {
//     value: 'png' as ExportFormat,
//     label: 'PNG Image',
//     description: 'High-quality image format - Great for online portfolios',
//     icon: Image,
//     recommended: false
//   },
//   {
//     value: 'docx' as ExportFormat,
//     label: 'Word Document',
//     description: 'Editable document format - Easy to customize further',
//     icon: File,
//     recommended: false
//   }
// ];

// export function ExportDialog({ open, onOpenChange, resumeData, elementId }: ExportDialogProps) {
//   const [selectedFormats, setSelectedFormats] = useState<ExportFormat[]>(['pdf']);
//   const [fileName, setFileName] = useState('');
//   const [quality, setQuality] = useState('high');
//   const [isExporting, setIsExporting] = useState(false);
//   const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null);
//   const [showPreview, setShowPreview] = useState(false);

//   const handleFormatToggle = (format: ExportFormat, checked: boolean) => {
//     if (checked) {
//       setSelectedFormats(prev => [...prev, format]);
//     } else {
//       setSelectedFormats(prev => prev.filter(f => f !== format));
//     }
//   };

//   const generateDefaultFileName = () => {
//     const name = resumeData.personal.name.replace(/[^a-zA-Z0-9]/g, '_');
//     const timestamp = new Date().toISOString().split('T')[0];
//     return `${name}_Resume_${timestamp}`;
//   };

//   const handleExport = async () => {
//     if (selectedFormats.length === 0) {
//       return;
//     }

//     setIsExporting(true);
//     setExportProgress(null);

//     try {
//       const exporter = createResumeExporter((progress) => {
//         setExportProgress(progress);
//       });

//       const baseFileName = fileName.trim() || generateDefaultFileName();
//       const scale = quality === 'high' ? 3 : quality === 'medium' ? 2 : 1;

//       if (selectedFormats.length === 1) {
//         // Single format export
//         await exporter.exportResume(elementId, resumeData, {
//           format: selectedFormats[0],
//           fileName: `${baseFileName}.${selectedFormats[0]}`,
//           scale
//         });
//       } else {
//         // Multiple format export
//         await exporter.exportMultiple(elementId, resumeData, selectedFormats, baseFileName);
//       }

//       // Close dialog after successful export
//       setTimeout(() => {
//         onOpenChange(false);
//         setIsExporting(false);
//         setExportProgress(null);
//       }, 2000);

//     } catch (error) {
//       console.error('Export failed:', error);
//       setIsExporting(false);
//     }
//   };

//   const handlePreview = () => {
//     setShowPreview(true);
//     // In a real implementation, this would open a preview modal
//     // For now, we'll just scroll to the resume preview
//     const previewElement = document.getElementById(elementId);
//     if (previewElement) {
//       previewElement.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const getProgressColor = () => {
//     if (!exportProgress) return '';
//     switch (exportProgress.stage) {
//       case 'error': return 'bg-red-500';
//       case 'complete': return 'bg-green-500';
//       default: return 'bg-blue-500';
//     }
//   };

//   const getProgressIcon = () => {
//     if (!exportProgress) return null;
//     switch (exportProgress.stage) {
//       case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
//       case 'complete': return <CheckCircle className="h-4 w-4 text-green-500" />;
//       default: return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <Download className="h-5 w-5" />
//             Export Resume
//           </DialogTitle>
//           <DialogDescription>
//             Choose your preferred format(s) and customize export settings.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-6">
//           {/* Format Selection */}
//           <div className="space-y-4">
//             <Label className="text-base font-medium">Export Formats</Label>
//             <div className="grid gap-3">
//               {formatOptions.map((format) => {
//                 const Icon = format.icon;
//                 const isSelected = selectedFormats.includes(format.value);
                
//                 return (
//                   <div
//                     key={format.value}
//                     className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
//                       isSelected 
//                         ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                     onClick={() => handleFormatToggle(format.value, !isSelected)}
//                   >
//                     <Checkbox
//                       checked={isSelected}
//                       onCheckedChange={(checked) => 
//                         handleFormatToggle(format.value, checked as boolean)
//                       }
//                       className="mt-1"
//                     />
//                     <Icon className="h-5 w-5 mt-0.5 text-gray-600" />
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2">
//                         <span className="font-medium">{format.label}</span>
//                         {format.recommended && (
//                           <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
//                             Recommended
//                           </span>
//                         )}
//                       </div>
//                       <p className="text-sm text-gray-600 mt-1">{format.description}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* File Name */}
//           <div className="space-y-2">
//             <Label htmlFor="fileName">File Name (optional)</Label>
//             <Input
//               id="fileName"
//               value={fileName}
//               onChange={(e) => setFileName(e.target.value)}
//               placeholder={generateDefaultFileName()}
//               disabled={isExporting}
//             />
//             <p className="text-xs text-gray-500">
//               Leave empty to use default name. File extension will be added automatically.
//             </p>
//           </div>

//           {/* Quality Settings */}
//           <div className="space-y-2">
//             <Label htmlFor="quality">Export Quality</Label>
//             <Select value={quality} onValueChange={setQuality} disabled={isExporting}>
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="high">High Quality (Larger file size)</SelectItem>
//                 <SelectItem value="medium">Medium Quality (Balanced)</SelectItem>
//                 <SelectItem value="low">Low Quality (Smaller file size)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Export Progress */}
//           {exportProgress && (
//             <div className="space-y-3">
//               <div className="flex items-center gap-2">
//                 {getProgressIcon()}
//                 <span className="text-sm font-medium">{exportProgress.message}</span>
//               </div>
//               <Progress 
//                 value={exportProgress.progress} 
//                 className="h-2"
//               />
//               {exportProgress.stage === 'error' && (
//                 <Alert variant="destructive">
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertDescription>
//                     Export failed. Please try again or contact support if the issue persists.
//                   </AlertDescription>
//                 </Alert>
//               )}
//               {exportProgress.stage === 'complete' && (
//                 <Alert>
//                   <CheckCircle className="h-4 w-4" />
//                   <AlertDescription>
//                     Your resume has been exported successfully! Check your downloads folder.
//                   </AlertDescription>
//                 </Alert>
//               )}
//             </div>
//           )}

//           {/* Validation Warnings */}
//           {!resumeData.personal.name.trim() && (
//             <Alert variant="destructive">
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription>
//                 Please add your name before exporting.
//               </AlertDescription>
//             </Alert>
//           )}
//         </div>

//         <DialogFooter className="flex gap-2">
//           <Button
//             variant="outline"
//             onClick={handlePreview}
//             disabled={isExporting}
//             className="flex items-center gap-2"
//           >
//             <Eye className="h-4 w-4" />
//             Preview
//           </Button>
//           <Button
//             onClick={handleExport}
//             disabled={selectedFormats.length === 0 || isExporting || !resumeData.personal.name.trim()}
//             className="flex items-center gap-2"
//           >
//             {isExporting ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <Download className="h-4 w-4" />
//             )}
//             {isExporting 
//               ? 'Exporting...' 
//               : selectedFormats.length > 1 
//                 ? `Export ${selectedFormats.length} Formats`
//                 : 'Export Resume'
//             }
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState } from 'react';
import { ResumeData } from '@/lib/types';
import { ExportFormat, ExportProgress, createResumeExporter } from '@/lib/export-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Download, 
  FileText, 
  Image, 
  File, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Eye
} from 'lucide-react';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeData: ResumeData;
  elementId: string;
  onExportStart?: (() => void) | (() => Promise<void>); // Added: callback for tracking
}

const formatOptions = [
  {
    value: 'pdf' as ExportFormat,
    label: 'PDF',
    description: 'Portable Document Format - Best for sharing and printing',
    icon: FileText,
    recommended: true
  },
  {
    value: 'png' as ExportFormat,
    label: 'PNG Image',
    description: 'High-quality image format - Great for online portfolios',
    icon: Image,
    recommended: false
  },
  {
    value: 'docx' as ExportFormat,
    label: 'Word Document',
    description: 'Editable document format - Easy to customize further',
    icon: File,
    recommended: false
  }
];

export function ExportDialog({ 
  open, 
  onOpenChange, 
  resumeData, 
  elementId, 
  onExportStart 
}: ExportDialogProps) {
  const [selectedFormats, setSelectedFormats] = useState<ExportFormat[]>(['pdf']);
  const [fileName, setFileName] = useState('');
  const [quality, setQuality] = useState('high');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFormatToggle = (format: ExportFormat, checked: boolean) => {
    if (checked) {
      setSelectedFormats(prev => [...prev, format]);
    } else {
      setSelectedFormats(prev => prev.filter(f => f !== format));
    }
  };

  const generateDefaultFileName = () => {
    const name = resumeData.personal?.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Resume';
    const timestamp = new Date().toISOString().split('T')[0];
    return `${name}_Resume_${timestamp}`;
  };

  const handleExportStart = async () => {
    if (onExportStart) {
      try {
        await onExportStart();
      } catch (error) {
        console.error('Failed to track export:', error);
        // Don't prevent export if tracking fails
      }
    }
  };

  const handleExport = async () => {
    if (selectedFormats.length === 0) {
      return;
    }

    setIsExporting(true);
    setExportProgress(null);

    try {
      // Track the export start
      await handleExportStart();

      const exporter = createResumeExporter((progress) => {
        setExportProgress(progress);
      });

      const baseFileName = fileName.trim() || generateDefaultFileName();
      const scale = quality === 'high' ? 3 : quality === 'medium' ? 2 : 1;

      if (selectedFormats.length === 1) {
        // Single format export
        await exporter.exportResume(elementId, resumeData, {
          format: selectedFormats[0],
          fileName: `${baseFileName}.${selectedFormats[0]}`,
          scale
        });
      } else {
        // Multiple format export
        await exporter.exportMultiple(elementId, resumeData, selectedFormats, baseFileName);
      }

      // Close dialog after successful export
      setTimeout(() => {
        onOpenChange(false);
        setIsExporting(false);
        setExportProgress(null);
      }, 2000);

    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
      setExportProgress({
        stage: 'error',
        progress: 0,
        message: 'Export failed. Please try again.'
      });
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
    // In a real implementation, this would open a preview modal
    // For now, we'll just scroll to the resume preview
    const previewElement = document.getElementById(elementId);
    if (previewElement) {
      previewElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getProgressColor = () => {
    if (!exportProgress) return '';
    switch (exportProgress.stage) {
      case 'error': return 'bg-red-500';
      case 'complete': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getProgressIcon = () => {
    if (!exportProgress) return null;
    switch (exportProgress.stage) {
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'complete': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
    }
  };

  const hasValidName = resumeData.personal?.name?.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Resume
          </DialogTitle>
          <DialogDescription>
            Choose your preferred format(s) and customize export settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Export Formats</Label>
            <div className="grid gap-3">
              {formatOptions.map((format) => {
                const Icon = format.icon;
                const isSelected = selectedFormats.includes(format.value);
                
                return (
                  <div
                    key={format.value}
                    className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleFormatToggle(format.value, !isSelected)}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => 
                        handleFormatToggle(format.value, checked as boolean)
                      }
                      className="mt-1"
                    />
                    <Icon className="h-5 w-5 mt-0.5 text-gray-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{format.label}</span>
                        {format.recommended && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{format.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* File Name */}
          <div className="space-y-2">
            <Label htmlFor="fileName">File Name (optional)</Label>
            <Input
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder={generateDefaultFileName()}
              disabled={isExporting}
            />
            <p className="text-xs text-gray-500">
              Leave empty to use default name. File extension will be added automatically.
            </p>
          </div>

          {/* Quality Settings */}
          <div className="space-y-2">
            <Label htmlFor="quality">Export Quality</Label>
            <Select value={quality} onValueChange={setQuality} disabled={isExporting}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High Quality (Larger file size)</SelectItem>
                <SelectItem value="medium">Medium Quality (Balanced)</SelectItem>
                <SelectItem value="low">Low Quality (Smaller file size)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Progress */}
          {exportProgress && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {getProgressIcon()}
                <span className="text-sm font-medium">{exportProgress.message}</span>
              </div>
              <Progress 
                value={exportProgress.progress} 
                className="h-2"
              />
              {exportProgress.stage === 'error' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Export failed. Please try again or contact support if the issue persists.
                  </AlertDescription>
                </Alert>
              )}
              {exportProgress.stage === 'complete' && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your resume has been exported successfully! Check your downloads folder.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Validation Warnings */}
          {!hasValidName && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please add your name before exporting.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePreview}
            disabled={isExporting}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button
            onClick={handleExport}
            disabled={selectedFormats.length === 0 || isExporting || !hasValidName}
            className="flex items-center gap-2"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isExporting 
              ? 'Exporting...' 
              : selectedFormats.length > 1 
                ? `Export ${selectedFormats.length} Formats`
                : 'Export Resume'
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}