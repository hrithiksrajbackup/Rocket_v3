"use client";

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ResumeSection, CertificationItem } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { generateUniqueId } from '@/lib/utils';

interface CertificationsSectionProps {
  data: ResumeSection & { items?: CertificationItem[] };
  onChange: (data: ResumeSection & { items: CertificationItem[] }) => void;
}

export function CertificationsSection({ data, onChange }: CertificationsSectionProps) {
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

  const handleAddCertification = () => {
    const newItem: CertificationItem = {
      id: generateUniqueId(),
      name: '',
      organization: '',
      date: '',
      url: ''
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

  const handleRemoveCertification = (itemId: string) => {
    onChange({
      ...data,
      items: (data.items || []).filter(item => item.id !== itemId)
    });
  };

  const handleItemChange = (itemId: string, field: keyof CertificationItem, value: string) => {
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
          <h2 className="text-lg font-semibold tracking-tight">Certifications</h2>
          <div className="flex items-center space-x-2">
            <Switch 
              id="certifications-visible"
              checked={data.visible}
              onCheckedChange={handleVisibilityChange}
            />
            <Label htmlFor="certifications-visible" className="text-sm">Visible</Label>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="certifications-title" className="text-sm whitespace-nowrap">Section Title:</Label>
          <Input
            id="certifications-title"
            value={data.title}
            onChange={handleTitleChange}
            className="h-8"
          />
        </div>
      </div>
      
      <Separator />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="certifications-list">
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
                              {item.name || 'New Certification'}
                            </div>
                            {item.organization && (
                              <div className="text-xs text-muted-foreground">
                                {item.organization}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleRemoveCertification(item.id)}
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
                              <Label htmlFor={`name-${item.id}`} className="text-sm">Certification Name</Label>
                              <Input
                                id={`name-${item.id}`}
                                value={item.name}
                                onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                placeholder="AWS Certified Solutions Architect"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`organization-${item.id}`} className="text-sm">Issuing Organization</Label>
                              <Input
                                id={`organization-${item.id}`}
                                value={item.organization}
                                onChange={(e) => handleItemChange(item.id, 'organization', e.target.value)}
                                placeholder="Amazon Web Services"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`date-${item.id}`} className="text-sm">Date Issued</Label>
                              <Input
                                id={`date-${item.id}`}
                                type="month"
                                value={item.date}
                                onChange={(e) => handleItemChange(item.id, 'date', e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`url-${item.id}`} className="text-sm">Credential URL (Optional)</Label>
                              <Input
                                id={`url-${item.id}`}
                                value={item.url || ''}
                                onChange={(e) => handleItemChange(item.id, 'url', e.target.value)}
                                placeholder="https://www.credly.com/badges/..."
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
        onClick={handleAddCertification}
      >
        <Plus className="h-4 w-4" />
        Add Certification
      </Button>
    </div>
  );
}