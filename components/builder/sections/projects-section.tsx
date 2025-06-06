"use client";

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ResumeSection, ProjectItem } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { generateUniqueId } from '@/lib/utils';

interface ProjectsSectionProps {
  data: ResumeSection & { items?: ProjectItem[] };
  onChange: (data: ResumeSection & { items: ProjectItem[] }) => void;
}

export function ProjectsSection({ data, onChange }: ProjectsSectionProps) {
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

  const handleAddProject = () => {
    const newItem: ProjectItem = {
      id: generateUniqueId(),
      name: '',
      description: '',
      technologies: []
    };

    onChange({
      ...data,
      items: [...(data.items || []), newItem]
    });

    setExpandedItems(prev => ({
      ...prev,
      [newItem.id]: true
    }));
  };

  const handleRemoveProject = (itemId: string) => {
    onChange({
      ...data,
      items: (data.items || []).filter(item => item.id !== itemId)
    });
  };

  const handleItemChange = (itemId: string, field: keyof ProjectItem, value: any) => {
    onChange({
      ...data,
      items: (data.items || []).map(item => 
        item.id === itemId 
          ? { ...item, [field]: value } 
          : item
      )
    });
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
          <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
          <div className="flex items-center space-x-2">
            <Switch 
              id="projects-visible"
              checked={data.visible}
              onCheckedChange={handleVisibilityChange}
            />
            <Label htmlFor="projects-visible" className="text-sm">Visible</Label>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="projects-title" className="text-sm whitespace-nowrap">Section Title:</Label>
          <Input
            id="projects-title"
            value={data.title}
            onChange={handleTitleChange}
            className="h-8"
          />
        </div>
      </div>
      
      <Separator />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects-list">
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
                              {item.name || 'New Project'}
                            </div>
                            {item.technologies && item.technologies.length > 0 && (
                              <div className="text-xs text-muted-foreground">
                                {item.technologies.join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleRemoveProject(item.id)}
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
                              <Label htmlFor={`name-${item.id}`} className="text-sm">Project Name</Label>
                              <Input
                                id={`name-${item.id}`}
                                value={item.name}
                                onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                placeholder="E-commerce Platform"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`description-${item.id}`} className="text-sm">Description</Label>
                              <Textarea
                                id={`description-${item.id}`}
                                value={item.description}
                                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                placeholder="Describe your project, its features, and your role..."
                                className="min-h-[100px]"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`startDate-${item.id}`} className="text-sm">Start Date (Optional)</Label>
                                <Input
                                  id={`startDate-${item.id}`}
                                  type="month"
                                  value={item.startDate || ''}
                                  onChange={(e) => handleItemChange(item.id, 'startDate', e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`endDate-${item.id}`} className="text-sm">End Date (Optional)</Label>
                                <Input
                                  id={`endDate-${item.id}`}
                                  type="month"
                                  value={item.endDate || ''}
                                  onChange={(e) => handleItemChange(item.id, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`url-${item.id}`} className="text-sm">Project URL (Optional)</Label>
                              <Input
                                id={`url-${item.id}`}
                                value={item.url || ''}
                                onChange={(e) => handleItemChange(item.id, 'url', e.target.value)}
                                placeholder="https://github.com/username/project"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`technologies-${item.id}`} className="text-sm">Technologies Used (comma-separated)</Label>
                              <Input
                                id={`technologies-${item.id}`}
                                value={(item.technologies || []).join(', ')}
                                onChange={(e) => handleTechnologiesChange(item.id, e.target.value)}
                                placeholder="React, Node.js, MongoDB"
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
        onClick={handleAddProject}
      >
        <Plus className="h-4 w-4" />
        Add Project
      </Button>
    </div>
  );
}