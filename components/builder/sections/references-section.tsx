"use client";

import { useState } from 'react';
import { ResumeSection, ReferenceItem } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { generateUniqueId } from '@/lib/utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ReferencesSectionProps {
  data: ResumeSection & { items?: ReferenceItem[] };
  onChange: (data: ResumeSection & { items: ReferenceItem[] }) => void;
}

export function ReferencesSection({ data, onChange }: ReferencesSectionProps) {
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

  const handleAddReference = () => {
    const newItem: ReferenceItem = {
      id: generateUniqueId(),
      name: '',
      company: '',
      position: '',
      email: '',
      phone: '',
      reference: ''
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

  const handleRemoveReference = (itemId: string) => {
    onChange({
      ...data,
      items: (data.items || []).filter(item => item.id !== itemId)
    });
  };

  const handleItemChange = (itemId: string, field: keyof ReferenceItem, value: string) => {
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
          <h2 className="text-lg font-semibold tracking-tight">References</h2>
          <div className="flex items-center space-x-2">
            <Switch 
              id="references-visible"
              checked={data.visible}
              onCheckedChange={handleVisibilityChange}
            />
            <Label htmlFor="references-visible" className="text-sm">Visible</Label>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="references-title" className="text-sm whitespace-nowrap">Section Title:</Label>
          <Input
            id="references-title"
            value={data.title}
            onChange={handleTitleChange}
            className="h-8"
          />
        </div>
      </div>
      
      <Separator />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="references-list">
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
                              {item.name || 'New Reference'}
                            </div>
                            {item.company && (
                              <div className="text-xs text-muted-foreground">
                                {item.position} at {item.company}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleRemoveReference(item.id)}
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
                              <Label htmlFor={`name-${item.id}`} className="text-sm">Full Name</Label>
                              <Input
                                id={`name-${item.id}`}
                                value={item.name}
                                onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                placeholder="John Smith"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`company-${item.id}`} className="text-sm">Company</Label>
                                <Input
                                  id={`company-${item.id}`}
                                  value={item.company}
                                  onChange={(e) => handleItemChange(item.id, 'company', e.target.value)}
                                  placeholder="Company Name"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`position-${item.id}`} className="text-sm">Position</Label>
                                <Input
                                  id={`position-${item.id}`}
                                  value={item.position}
                                  onChange={(e) => handleItemChange(item.id, 'position', e.target.value)}
                                  placeholder="Senior Manager"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`email-${item.id}`} className="text-sm">Email</Label>
                                <Input
                                  id={`email-${item.id}`}
                                  type="email"
                                  value={item.email}
                                  onChange={(e) => handleItemChange(item.id, 'email', e.target.value)}
                                  placeholder="john.smith@example.com"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor={`phone-${item.id}`} className="text-sm">Phone</Label>
                                <Input
                                  id={`phone-${item.id}`}
                                  value={item.phone}
                                  onChange={(e) => handleItemChange(item.id, 'phone', e.target.value)}
                                  placeholder="(555) 123-4567"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`reference-${item.id}`} className="text-sm">Reference Text (Optional)</Label>
                              <Textarea
                                id={`reference-${item.id}`}
                                value={item.reference}
                                onChange={(e) => handleItemChange(item.id, 'reference', e.target.value)}
                                placeholder="Add a reference quote or additional details..."
                                className="min-h-[100px]"
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
        onClick={handleAddReference}
      >
        <Plus className="h-4 w-4" />
        Add Reference
      </Button>
    </div>
  );
}