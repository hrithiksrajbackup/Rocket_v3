"use client";

import { PersonalInfo } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Brain } from 'lucide-react';

interface PersonalSectionProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalSection({ data, onChange }: PersonalSectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Personal Information</h2>
        <p className="text-sm text-muted-foreground">
          This information will appear at the top of your resume.
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Software Engineer"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={data.location}
          onChange={handleChange}
          placeholder="San Francisco, CA"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (optional)</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="github">GitHub (optional)</Label>
          <Input
            id="github"
            name="github"
            value={data.github || ''}
            onChange={handleChange}
            placeholder="github.com/johndoe"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website">Personal Website (optional)</Label>
        <Input
          id="website"
          name="website"
          value={data.website || ''}
          onChange={handleChange}
          placeholder="johndoe.com"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary">Professional Summary</Label>
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
            <Brain className="h-3 w-3" />
            Improve with AI
          </Button>
        </div>
        <Textarea
          id="summary"
          name="summary"
          value={data.summary}
          onChange={handleChange}
          placeholder="Experienced software engineer with expertise in JavaScript and React..."
          className="min-h-[120px]"
        />
        <p className="text-xs text-muted-foreground">
          Write a brief summary highlighting your experience, skills, and career goals. Aim for 3-5 sentences.
        </p>
      </div>
    </div>
  );
}