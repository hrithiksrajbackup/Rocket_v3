// 

"use client";

import { useState } from 'react';
import { PersonalInfo } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Upload, X, Move } from 'lucide-react';

interface PersonalSectionProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalSection({ data, onChange }: PersonalSectionProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange({
          ...data,
          profileImage: result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const removeImage = () => {
    onChange({
      ...data,
      profileImage: ''
    });
  };

  const handlePositionChange = (position: string) => {
    onChange({
      ...data,
      profileImagePosition: position as any
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

      {/* Profile Image Section */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Profile Image (Optional)</Label>
        
        {data.profileImage ? (
          <div className="space-y-3">
            <div className="relative w-32 h-32 mx-auto">
              <img
                src={data.profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                onClick={removeImage}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm">Image Position</Label>
              <Select
                value={data.profileImagePosition || 'top-right'}
                onValueChange={handlePositionChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="top-center">Top Center</SelectItem>
                  <SelectItem value="left">Left Side</SelectItem>
                  <SelectItem value="right">Right Side</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop an image here, or click to select
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="image-upload"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              Choose Image
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Supports JPG, PNG, GIF up to 5MB
            </p>
          </div>
        )}
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