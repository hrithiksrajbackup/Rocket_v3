"use client";

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ResumeSection, EducationItem } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { generateUniqueId } from '@/lib/utils';

interface EducationSectionProps {
  data: ResumeSection & { items?: EducationItem[] };
  onChange: (data: ResumeSection & { items: EducationItem[] }) => void;
}

export function EducationSection({ data, onChange }: EducationSectionProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItemExpanded = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

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

  const handleAddEducation = () => {
    const newItem: EducationItem = {
      id: generateUniqueId(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      gpa: ''
    };

    onChange({
      ...data,
      items: [...(data.items || []), newItem]
    });

    // Auto-expand the new item
    setExpandedItems(prev => ({
      ...prev,
      [newItem.id]: true
    }));
  };

  const handleRemoveEducation = (itemId: string) => {
    onChange({
      ...data,
      items: (data.items || []).filter(item => item.id !== itemId)
    });
  };

  const handleItemChange = (itemId: string, field: keyof EducationItem, value: string) => {
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
          <h2 className="text-lg font-semibold tracking-tight">Education</h2>
          <div className="flex items-center space-x-2">
            <Switch 
              id="education-visible"
              checked={data.visible}
              onCheckedChange={handleVisibilityChange}
            />
            <Label htmlFor="education-visible" className="text-sm">Visible</Label>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="education-title" className="text-sm whitespace-nowrap">Section Title:</Label>
          <Input
            id="education-title"
            value={data.title}
            onChange={handleTitleChange}
            className="h-8"
          />
        </div>
      </div>
      
      <Separator />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="education-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {(data.items || []).map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="border rounded-md"
                    >
                      <div className="p-3 bg-muted/30 rounded-t-md flex items-center justify-between">
                        <div 
                          {...provided.dragHandleProps}
                          className="flex items-center gap-3"
                        >
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">
                              {item.institution || 'New Education'}
                            </div>
                            {item.degree && (
                              <div className="text-xs text-muted-foreground">
                                {item.degree} {item.field ? `in ${item.field}` : ''}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleRemoveEducation(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => toggleItemExpanded(item.id)}
                          >
                            {expandedItems[item.id] ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      {expandedItems[item.id] && (
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`institution-${item.id}`} className="text-sm">Institution</Label>
                              <Input
                                id={`institution-${item.id}`}
                                value={item.institution}
                                onChange={(e) => handleItemChange(item.id, 'institution', e.target.value)}
                                placeholder="University of California, Berkeley"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`degree-${item.id}`} className="text-sm">Degree</Label>
                                <Input
                                  id={`degree-${item.id}`}
                                  value={item.degree}
                                  onChange={(e) => handleItemChange(item.id, 'degree', e.target.value)}
                                  placeholder="Bachelor of Science"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`field-${item.id}`} className="text-sm">Field of Study</Label>
                                <Input
                                  id={`field-${item.id}`}
                                  value={item.field}
                                  onChange={(e) => handleItemChange(item.id, 'field', e.target.value)}
                                  placeholder="Computer Science"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`startDate-${item.id}`} className="text-sm">Start Date</Label>
                                <Input
                                  id={`startDate-${item.id}`}
                                  type="month"
                                  value={item.startDate}
                                  onChange={(e) => handleItemChange(item.id, 'startDate', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`endDate-${item.id}`} className="text-sm">End Date</Label>
                                <Input
                                  id={`endDate-${item.id}`}
                                  type="month"
                                  value={item.endDate}
                                  onChange={(e) => handleItemChange(item.id, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`location-${item.id}`} className="text-sm">Location</Label>
                                <Input
                                  id={`location-${item.id}`}
                                  value={item.location}
                                  onChange={(e) => handleItemChange(item.id, 'location', e.target.value)}
                                  placeholder="Berkeley, CA"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`gpa-${item.id}`} className="text-sm">GPA (Optional)</Label>
                                <Input
                                  id={`gpa-${item.id}`}
                                  value={item.gpa || ''}
                                  onChange={(e) => handleItemChange(item.id, 'gpa', e.target.value)}
                                  placeholder="3.8/4.0"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`description-${item.id}`} className="text-sm">Description (Optional)</Label>
                              <Textarea
                                id={`description-${item.id}`}
                                value={item.description || ''}
                                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                placeholder="Relevant coursework, honors, or achievements..."
                                className="min-h-[80px]"
                              />
                            </div>
                          </div>
                        </div>
                      )}
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
        onClick={handleAddEducation}
      >
        <Plus className="h-4 w-4" />
        Add Education
      </Button>
    </div>
  );
}