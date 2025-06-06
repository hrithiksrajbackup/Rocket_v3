"use client";

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ResumeSection, ExperienceItem } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  GripVertical, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  PlusCircle,
  MinusCircle,
  Brain
} from 'lucide-react';
import { generateUniqueId } from '@/lib/utils';

interface ExperienceSectionProps {
  data: ResumeSection & { items?: ExperienceItem[] };
  onChange: (data: ResumeSection & { items: ExperienceItem[] }) => void;
}

export function ExperienceSection({ data, onChange }: ExperienceSectionProps) {
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

  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: generateUniqueId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: [''],
      technologies: []
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

  const handleRemoveExperience = (itemId: string) => {
    onChange({
      ...data,
      items: (data.items || []).filter(item => item.id !== itemId)
    });
  };

  const handleItemChange = (itemId: string, field: keyof ExperienceItem, value: any) => {
    onChange({
      ...data,
      items: (data.items || []).map(item => 
        item.id === itemId 
          ? { ...item, [field]: value } 
          : item
      )
    });
  };

  const handleAddDescriptionPoint = (itemId: string) => {
    const item = (data.items || []).find(item => item.id === itemId);
    if (item) {
      handleItemChange(itemId, 'description', [...item.description, '']);
    }
  };

  const handleRemoveDescriptionPoint = (itemId: string, pointIndex: number) => {
    const item = (data.items || []).find(item => item.id === itemId);
    if (item && item.description.length > 1) {
      const newDescription = [...item.description];
      newDescription.splice(pointIndex, 1);
      handleItemChange(itemId, 'description', newDescription);
    }
  };

  const handleDescriptionPointChange = (itemId: string, pointIndex: number, value: string) => {
    const item = (data.items || []).find(item => item.id === itemId);
    if (item) {
      const newDescription = [...item.description];
      newDescription[pointIndex] = value;
      handleItemChange(itemId, 'description', newDescription);
    }
  };

  const handleTechnologiesChange = (itemId: string, technologiesString: string) => {
    const technologies = technologiesString
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech !== '');
    
    handleItemChange(itemId, 'technologies', technologies);
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
          <h2 className="text-lg font-semibold tracking-tight">Work Experience</h2>
          <div className="flex items-center space-x-2">
            <Switch 
              id="experience-visible"
              checked={data.visible}
              onCheckedChange={handleVisibilityChange}
            />
            <Label htmlFor="experience-visible" className="text-sm">Visible</Label>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="experience-title" className="text-sm whitespace-nowrap">Section Title:</Label>
          <Input
            id="experience-title"
            value={data.title}
            onChange={handleTitleChange}
            className="h-8"
          />
        </div>
      </div>
      
      <Separator />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="experience-list">
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
                              {item.position || 'New Position'}
                            </div>
                            {item.company && (
                              <div className="text-xs text-muted-foreground">
                                {item.company} {item.location ? `• ${item.location}` : ''}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleRemoveExperience(item.id)}
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
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`company-${item.id}`} className="text-sm">Company</Label>
                                <Input
                                  id={`company-${item.id}`}
                                  value={item.company}
                                  onChange={(e) => handleItemChange(item.id, 'company', e.target.value)}
                                  placeholder="Google, Inc."
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`position-${item.id}`} className="text-sm">Position</Label>
                                <Input
                                  id={`position-${item.id}`}
                                  value={item.position}
                                  onChange={(e) => handleItemChange(item.id, 'position', e.target.value)}
                                  placeholder="Senior Software Engineer"
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
                                  type={item.endDate === 'Present' ? 'text' : 'month'}
                                  value={item.endDate}
                                  onChange={(e) => handleItemChange(item.id, 'endDate', e.target.value)}
                                  placeholder="Present"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`location-${item.id}`} className="text-sm">Location</Label>
                              <Input
                                id={`location-${item.id}`}
                                value={item.location}
                                onChange={(e) => handleItemChange(item.id, 'location', e.target.value)}
                                placeholder="San Francisco, CA"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-sm">Job Description</Label>
                                <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                                  <Brain className="h-3 w-3" />
                                  Improve with AI
                                </Button>
                              </div>
                              
                              <div className="space-y-2">
                                {item.description.map((point, pointIndex) => (
                                  <div key={pointIndex} className="flex gap-2 items-start">
                                    <Textarea
                                      value={point}
                                      onChange={(e) => handleDescriptionPointChange(item.id, pointIndex, e.target.value)}
                                      placeholder="Describe your responsibilities and achievements..."
                                      className="min-h-[80px] flex-1"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 mt-1"
                                      onClick={() => handleRemoveDescriptionPoint(item.id, pointIndex)}
                                      disabled={item.description.length <= 1}
                                    >
                                      <MinusCircle className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2 text-xs"
                                onClick={() => handleAddDescriptionPoint(item.id)}
                              >
                                <PlusCircle className="h-3 w-3 mr-1" />
                                Add Bullet Point
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`technologies-${item.id}`} className="text-sm">Technologies Used (comma-separated)</Label>
                              <Input
                                id={`technologies-${item.id}`}
                                value={(item.technologies || []).join(', ')}
                                onChange={(e) => handleTechnologiesChange(item.id, e.target.value)}
                                placeholder="React, Node.js, TypeScript, AWS"
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
        onClick={handleAddExperience}
      >
        <Plus className="h-4 w-4" />
        Add Work Experience
      </Button>
    </div>
  );
}