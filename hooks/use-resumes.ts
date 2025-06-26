"use client";

import { useState, useEffect, useCallback } from 'react';
import { ResumeDocument } from '@/lib/models/Resume';
import { useUser } from '@clerk/nextjs';
import { useToast } from './use-toast';

export function useResumes() {
  const { user } = useUser();
  const { toast } = useToast();
  
  const [resumes, setResumes] = useState<ResumeDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load user's resumes
  const loadResumes = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/resumes');
      if (response.ok) {
        const resumesData = await response.json();
        setResumes(resumesData);
      } else {
        throw new Error('Failed to load resumes');
      }
    } catch (error) {
      console.error('Error loading resumes:', error);
      toast({
        title: "Error",
        description: "Failed to load resumes",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Delete resume
  const deleteResume = useCallback(async (resumeId: string) => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setResumes(prev => prev.filter(resume => resume._id?.toString() !== resumeId));
        toast({
          title: "Deleted",
          description: "Resume deleted successfully",
        });
      } else {
        throw new Error('Failed to delete resume');
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive"
      });
    }
  }, [toast]);

  // Duplicate resume
  const duplicateResume = useCallback(async (resumeId: string, title?: string) => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/duplicate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const newResume = await response.json();
        setResumes(prev => [newResume, ...prev]);
        toast({
          title: "Duplicated",
          description: "Resume duplicated successfully",
        });
        return newResume;
      } else {
        throw new Error('Failed to duplicate resume');
      }
    } catch (error) {
      console.error('Error duplicating resume:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate resume",
        variant: "destructive"
      });
      return null;
    }
  }, [toast]);

  // Search resumes
  const searchResumes = useCallback(async (query: string, tags?: string[]) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (tags && tags.length > 0) params.append('tags', tags.join(','));

      const response = await fetch(`/api/resumes?${params.toString()}`);
      if (response.ok) {
        const resumesData = await response.json();
        setResumes(resumesData);
      } else {
        throw new Error('Failed to search resumes');
      }
    } catch (error) {
      console.error('Error searching resumes:', error);
      toast({
        title: "Error",
        description: "Failed to search resumes",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Load resumes on mount
  useEffect(() => {
    if (user) {
      loadResumes();
    }
  }, [user, loadResumes]);

  return {
    resumes,
    isLoading,
    loadResumes,
    deleteResume,
    duplicateResume,
    searchResumes
  };
}