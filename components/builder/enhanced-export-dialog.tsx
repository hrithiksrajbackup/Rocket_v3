"use client";

import { useState } from 'react';
import { ResumeData } from '@/lib/types';
import { HighFidelityPDFExporter, PDFExportOptions, ExportProgress } from '@/lib/pdf-export';
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
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Zap,
  Shield,
  Printer,
  Monitor,
  Smartphone
} from 'lucide-react';

interface EnhancedExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeData: ResumeData;
  elementId: string;
  onExportStart?: (() => void) | (() => Promise<void>);
}

const formatOptions = [
  {
    value: 'pdf' as const,
    label: 'High-Quality PDF',
    description: 'Professional PDF with exact visual fidelity - Perfect for applications',
    icon: FileText,
    recommended: true,
    features: ['300 DPI', 'Print Ready', 'ATS Compatible']
  },
  {
    value: 'png' as const,
    label: 'High-Resolution PNG',
    description: 'Pixel-perfect image format - Great for portfolios and sharing',
    icon: ImageIcon,
    recommended: false,
    features: ['300 DPI', 'Transparent Background', 'Web Optimized']
  }
];

const qualityOptions = [
  {
    value: 'standard' as const,
    label: 'Standard Quality',
    description: '150 DPI - Good for digital viewing',
    dpi: 150,
    fileSize: '~500 KB'
  },
  {
    value: 'high' as const,
    label: 'High Quality',
    description: '300 DPI - Professional standard',
    dpi: 300,
    fileSize: '~1.2 MB',
    recommended: true
  },
  {
    value: 'print' as const,
    label: 'Print Quality',
    description: '600 DPI - Premium printing',
    dpi: 600,
    fileSize: '~2.8 MB'
  }
];

export function EnhancedExportDialog({ 
  open, 
  onOpenChange, 
  resumeData, 
  elementId,
  onExportStart 
}: EnhancedExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'png'>('pdf');
  const [selectedQuality, setSelectedQuality] = useState<'standard' | 'high' | 'print'>('high');
  const [fileName, setFileName] = useState('');
  const [includeImages, setIncludeImages] = useState(true);
  const [fontSize, setFontSize] = useState(11);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null);

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
      }
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(null);

    try {
      await handleExportStart();

      const exporter = new HighFidelityPDFExporter((progress) => {
        setExportProgress(progress);
      });

      const qualityConfig = qualityOptions.find(q => q.value === selectedQuality);
      
      const options: PDFExportOptions = {
        format: selectedFormat,
        quality: selectedQuality,
        includeImages,
        fontSize,
        dpi: qualityConfig?.dpi || 300,
        pageMargins: { top: 20, right: 20, bottom: 20, left: 20 }
      };

      await exporter.exportResume(resumeData, elementId, options);

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

  const selectedFormatOption = formatOptions.find(f => f.value === selectedFormat);
  const selectedQualityOption = qualityOptions.find(q => q.value === selectedQuality);

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
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export High-Quality Resume
          </DialogTitle>
          <DialogDescription>
            Export your resume with pixel-perfect quality that matches exactly what you see on screen.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quality Notice */}
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Professional Export:</strong> Our advanced export system maintains exact visual fidelity, 
              preserving all fonts, colors, spacing, and layout elements at professional print quality.
            </AlertDescription>
          </Alert>

          {/* Format Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Export Format</Label>
            <div className="grid gap-3">
              {formatOptions.map((format) => {
                const Icon = format.icon;
                const isSelected = selectedFormat === format.value;
                
                return (
                  <div
                    key={format.value}
                    className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedFormat(format.value)}
                  >
                    <div className="flex items-center pt-1">
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => setSelectedFormat(format.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                    </div>
                    <Icon className="h-5 w-5 mt-0.5 text-gray-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{format.label}</span>
                        {format.recommended && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{format.description}</p>
                      <div className="flex gap-2">
                        {format.features.map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quality Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Quality Settings</Label>
            <div className="grid gap-3">
              {qualityOptions.map((quality) => {
                const isSelected = selectedQuality === quality.value;
                
                return (
                  <div
                    key={quality.value}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedQuality(quality.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => setSelectedQuality(quality.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{quality.label}</span>
                          {quality.recommended && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{quality.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{quality.dpi} DPI</div>
                      <div className="text-xs text-gray-500">{quality.fileSize}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advanced Options */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Advanced Options</Label>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select value={fontSize.toString()} onValueChange={(value) => setFontSize(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10pt (Compact)</SelectItem>
                    <SelectItem value="11">11pt (Standard)</SelectItem>
                    <SelectItem value="12">12pt (Large)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fileName">File Name (optional)</Label>
                <Input
                  id="fileName"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder={generateDefaultFileName()}
                  disabled={isExporting}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeImages"
                checked={includeImages}
                onCheckedChange={(checked) => setIncludeImages(checked as boolean)}
                disabled={isExporting}
              />
              <Label htmlFor="includeImages" className="text-sm">
                Include profile image and graphics
              </Label>
            </div>
          </div>

          {/* Device Preview Icons */}
          <div className="flex items-center justify-center space-x-6 py-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Monitor className="h-4 w-4" />
              <span>Desktop</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Smartphone className="h-4 w-4" />
              <span>Mobile</span>
            </div>
          </div>

          {/* Export Progress */}
          {exportProgress && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {getProgressIcon()}
                <span className="text-sm font-medium">{exportProgress.message}</span>
                {exportProgress.fileSize && (
                  <span className="text-xs text-gray-500 ml-auto">
                    {exportProgress.fileSize}
                  </span>
                )}
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
                    Your high-quality resume has been exported successfully! The file maintains 
                    exact visual fidelity with professional print quality.
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
            onClick={() => onOpenChange(false)}
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting || !hasValidName}
            className="flex items-center gap-2"
          >
            {isExporting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {isExporting 
              ? 'Exporting...' 
              : `Export ${selectedFormatOption?.label}`
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}