"use client";

import { useState } from 'react';
import { ResumeSection, InterestItem } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Plus, GripVertical, Trash2 } from 'lucide-react';
import { generateUniqueId } from '@/lib/utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface InterestsSectionProps {
  data: ResumeSection & { items?: InterestItem[] };
  onChange: (data: ResumeSection & { items: InterestItem[] }) => void;
}

export function InterestsSection({ data, onChange }: InterestsSectionProps) {
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

  const handleAddInterest = () => {
    const newItem: InterestItem = {
      id: generateUniqueId(),
      name: ''
    };

    onChange({
      ...data,
      items: [...(data.items || []), newItem]
    });
  };

  const handleRemoveInterest = (itemId: string) => {
    onChange({
      ...data,
      items: (data.items || []).filter(item => item.id !== itemId)
    });
  };

  const handleInterestChange = (itemId: string, value: string) => {
    onChange({
      ...data,
      items: (data.items || []).map(item => 
        item.id === itemId 
          ? { ...item, name: value } 
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
          <h2 className="text-lg font-semibold tracking-tight">Interests</h2>
          <div className="flex items-center space-x-2">
            <Switch 
              id="interests-visible"
              checked={data.visible}
              onCheckedChange={handleVisibilityChange}
            />
            <Label htmlFor="interests-visible" className="text-sm">Visible</Label>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="interests-title" className="text-sm whitespace-nowrap">Section Title:</Label>
          <Input
            id="interests-title"
            value={data.title}
            onChange={handleTitleChange}
            className="h-8"
          />
        </div>
      </div>
      
      <Separator />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="interests-list">
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
                        onChange={(e) => handleInterestChange(item.id, e.target.value)}
                        placeholder="Enter an interest..."
                        className="flex-1"
                      />
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveInterest(item.id)}
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
        onClick={handleAddInterest}
      >
        <Plus className="h-4 w-4" />
        Add Interest
      </Button>
    </div>
  );
}