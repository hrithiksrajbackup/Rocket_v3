"use client";

import { useState } from 'react';
import { ResumeSection, LanguageItem } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Plus, GripVertical, Trash2 } from 'lucide-react';
import { generateUniqueId } from '@/lib/utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguagesSectionProps {
  data: ResumeSection & { items?: LanguageItem[] };
  onChange: (data: ResumeSection & { items: LanguageItem[] }) => void;
}

export function LanguagesSection({ data, onChange }: LanguagesSectionProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      title: e.target.value,
      items: data.items || []
    });
  };

  const handleVisibilityChange = (checked: boolean) => {
    onChange({
      ...data,
      visible: checked,
      items: data.items || []
    });
  };

  const handleAddLanguage = () => {
    const newItem: LanguageItem = {
      id: generateUniqueId(),
      name: '',
      proficiency: 'Basic'
    };

    onChange({
      ...data,
      items: [...(data.items || []), newItem]
    });
  };

  const handleRemoveLanguage = (itemId: string) => {
    onChange({
      ...data,
      items: (data.items || []).filter(item => item.id !== itemId)
    });
  };

  const handleLanguageChange = (itemId: string, field: keyof LanguageItem, value: string) => {
    onChange({
      ...data,
      items: (data.items || []).map(item => 
        item.id === itemId 
          ? { ...item, [field]: value } 
          : item
      )
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(data.items || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onChange({
      ...data,
      items
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Languages</h2>
          <div className="flex items-center space-x-2">
            <Switch 
              id="languages-visible"
              checked={data.visible}
              onCheckedChange={handleVisibilityChange}
            />
            <Label htmlFor="languages-visible" className="text-sm">Visible</Label>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="languages-title" className="text-sm whitespace-nowrap">Section Title:</Label>
          <Input
            id="languages-title"
            value={data.title}
            onChange={handleTitleChange}
            className="h-8"
          />
        </div>
      </div>
      
      <Separator />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="languages-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {(data.items || []).map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-2"
                    >
                      <div 
                        {...provided.dragHandleProps}
                        className="p-2"
                      >
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      <Input
                        value={item.name}
                        onChange={(e) => handleLanguageChange(item.id, 'name', e.target.value)}
                        placeholder="Language name..."
                        className="flex-1"
                      />
                      
                      <Select
                        value={item.proficiency}
                        onValueChange={(value) => handleLanguageChange(item.id, 'proficiency', value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Native">Native</SelectItem>
                          <SelectItem value="Fluent">Fluent</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Basic">Basic</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveLanguage(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2"
        onClick={handleAddLanguage}
      >
        <Plus className="h-4 w-4" />
        Add Language
      </Button>
    </div>
  );
}