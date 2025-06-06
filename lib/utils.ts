import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  // Handle 'Present' case
  if (dateString === 'Present') return 'Present';

  // Parse YYYY-MM format
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return dateString;
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short'
  }).format(date);
}

export function generateUniqueId(): string {
  return uuidv4();
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

export function downloadPDF(elementId: string, fileName: string) {
  // This function would need to be implemented with a PDF generation library
  // like html2pdf, jsPDF, or similar.
  // For demonstration purposes, showing an alert
  alert(`PDF download functionality would be implemented here for element ${elementId}`);
}

export function extractKeywords(text: string): string[] {
  // Simple implementation - in a real app, this would be more sophisticated
  const commonWords = new Set([
    'the', 'and', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'of',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'but', 'or', 'as', 'if', 'then', 'else', 'when',
    'up', 'down', 'that', 'this', 'these', 'those'
  ]);
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word))
    .filter((word, index, self) => self.indexOf(word) === index); // Remove duplicates
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}