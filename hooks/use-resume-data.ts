"use client";

import { useState, useEffect, useCallback } from 'react';
import { ResumeData } from '@/lib/types';
import { initialResumeState } from '@/lib/resume-data';
import { useUser } from '@clerk/nextjs';
import { useToast } from './use-toast';

interface UseResumeDataOptions {
  resumeId?: string;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

export function useResumeData(options: UseResumeDataOptions = {}) {
  const { resumeId, autoSave = true, autoSaveDelay = 2000 } = options;
  const { user } = useUser();
  const { toast } = useToast();
  
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load resume data
  const loadResume = useCallback(async (id: string) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/resumes/${id}`);
      if (response.ok) {
        const resume = await response.json();
        setResumeData(resume);
        setLastSaved(new Date(resume.updatedAt));
        setHasUnsavedChanges(false);
      } else {
        throw new Error('Failed to load resume');
      }
    } catch (error) {
      console.error('Error loading resume:', error);
      toast({
        title: "Error",
        description: "Failed to load resume data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Save resume data
  const saveResume = useCallback(async (data: ResumeData, showToast = true) => {
    if (!user || !resumeId) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedResume = await response.json();
        setLastSaved(new Date(updatedResume.updatedAt));
        setHasUnsavedChanges(false);
        
        if (showToast) {
          toast({
            title: "Saved",
            description: "Resume saved successfully",
          });
        }
      } else {
        throw new Error('Failed to save resume');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Error",
        description: "Failed to save resume",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  }, [user, resumeId, toast]);

  // Create new resume
  const createResume = useCallback(async (data: ResumeData, title: string) => {
    if (!user) return null;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeData: data, title }),
      });

      if (response.ok) {
        const newResume = await response.json();
        setResumeData(newResume);
        setLastSaved(new Date(newResume.createdAt));
        setHasUnsavedChanges(false);
        
        toast({
          title: "Created",
          description: "Resume created successfully",
        });
        
        return newResume;
      } else {
        throw new Error('Failed to create resume');
      }
    } catch (error) {
      console.error('Error creating resume:', error);
      toast({
        title: "Error",
        description: "Failed to create resume",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  }, [user, toast]);

  // Update resume data with auto-save
  const updateResumeData = useCallback((updates: Partial<ResumeData>) => {
    setResumeData(prev => {
      const newData = { ...prev, ...updates };
      setHasUnsavedChanges(true);
      
      // Auto-save if enabled
      if (autoSave && resumeId) {
        const timeoutId = setTimeout(() => {
          saveResume(newData, false);
        }, autoSaveDelay);
        
        // Clear previous timeout
        return newData;
      }
      
      return newData;
    });
  }, [autoSave, resumeId, autoSaveDelay, saveResume]);

  // Load resume on mount
  useEffect(() => {
    if (resumeId && user) {
      loadResume(resumeId);
    }
  }, [resumeId, user, loadResume]);

  // Handle user login
  useEffect(() => {
    if (user) {
      // Record login
      fetch('/api/auth/login', { method: 'POST' }).catch(console.error);
    }
  }, [user]);

  return {
    resumeData,
    setResumeData: updateResumeData,
    isLoading,
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    saveResume: () => saveResume(resumeData),
    createResume,
    loadResume
  };
}