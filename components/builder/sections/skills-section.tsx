"use client";

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ResumeSection, SkillGroup, SkillItem } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { generateUniqueId } from '@/lib/utils';

interface SkillsSectionProps {
  data: ResumeSection & { groups: SkillGroup[] };
  onChange: (data: ResumeSection & { groups: SkillGroup[] }) => void;
}

export function SkillsSection({ data, onChange }: SkillsSectionProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroupExpanded = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      title: e.target.value,
      groups: data.groups
    });
  };

  const handleVisibilityChange = (checked: boolean) => {
    onChange({
      ...data,
      visible: checked,
      groups: data.groups
    });
  };

  const handleAddGroup = () => {
    const newGroup: SkillGroup = {
      id: generateUniqueId(),
      name: '',
      skills: []
    };

    onChange({
      ...data,
      groups: [...data.groups, newGroup]
    });

    setExpandedGroups(prev => ({
      ...prev,
      [newGroup.id]: true
    }));
  };

  const handleRemoveGroup = (groupId: string) => {
    onChange({
      ...data,
      groups: data.groups.filter(group => group.id !== groupId)
    });
  };

  const handleGroupNameChange = (groupId: string, name: string) => {
    onChange({
      ...data,
      groups: data.groups.map(group =>
        group.id === groupId
          ? { ...group, name }
          : group
      )
    });
  };

  const handleAddSkill = (groupId: string) => {
    const newSkill: SkillItem = {
      id: generateUniqueId(),
      name: '',
      level: 3
    };

    onChange({
      ...data,
      groups: data.groups.map(group =>
        group.id === groupId
          ? { ...group, skills: [...group.skills, newSkill] }
          : group
      )
    });
  };

  const handleRemoveSkill = (groupId: string, skillId: string) => {
    onChange({
      ...data,
      groups: data.groups.map(group =>
        group.id === groupId
          ? { ...group, skills: group.skills.filter(skill => skill.id !== skillId) }
          : group
      )
    });
  };

  const handleSkillChange = (groupId: string, skillId: string, field: keyof SkillItem, value: any) => {
    onChange({
      ...data,
      groups: data.groups.map(group =>
        group.id === groupId
          ? {
              ...group,
              skills: group.skills.map(skill =>
                skill.id === skillId
                  ? { ...skill, [field]: value }
                  : skill
              )
            }
          : group
      )
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceGroupId = result.source.droppableId;
    const destGroupId = result.destination.droppableId;

    if (result.type === 'group') {
      const groups = Array.from(data.groups);
      const [reorderedGroup] = groups.splice(result.source.index, 1);
      groups.splice(result.destination.index, 0, reorderedGroup);

      onChange({
        ...data,
        groups
      });
    } else if (result.type === 'skill') {
      const sourceGroup = data.groups.find(g => g.id === sourceGroupId);
      const destGroup = data.groups.find(g => g.id === destGroupId);

      if (!sourceGroup || !destGroup) return;

      const sourceSkills = Array.from(sourceGroup.skills);
      const [movedSkill] = sourceSkills.splice(result.source.index, 1);

      if (sourceGroupId === destGroupId) {
        sourceSkills.splice(result.destination.index, 0, movedSkill);
        onChange({
          ...data,
          groups: data.groups.map(group =>
            group.id === sourceGroupId
              ? { ...group, skills: sourceSkills }
              : group
          )
        });
      } else {
        const destSkills = Array.from(destGroup.skills);
        destSkills.splice(result.destination.index, 0, movedSkill);
        onChange({
          ...data,
          groups: data.groups.map(group => {
            if (group.id === sourceGroupId) {
              return { ...group, skills: sourceSkills };
            }
            if (group.id === destGroupId) {
              return { ...group, skills: destSkills };
            }
            return group;
          })
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Skills</h2>
          <div className="flex items-center space-x-2">
            <Switch 
              id="skills-visible"
              checked={data.visible}
              onCheckedChange={handleVisibilityChange}
            />
            <Label htmlFor="skills-visible" className="text-sm">Visible</Label>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="skills-title" className="text-sm whitespace-nowrap">Section Title:</Label>
          <Input
            id="skills-title"
            value={data.title}
            onChange={handleTitleChange}
            className="h-8"
          />
        </div>
      </div>
      
      <Separator />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="groups" type="group">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {data.groups.map((group, index) => (
                <Draggable key={group.id} draggableId={group.id} index={index}>
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
                          <Input
                            value={group.name}
                            onChange={(e) => handleGroupNameChange(group.id, e.target.value)}
                            placeholder="Skill Group Name"
                            className="h-8 w-48"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleRemoveGroup(group.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => toggleGroupExpanded(group.id)}
                          >
                            {expandedGroups[group.id] ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      {expandedGroups[group.id] && (
                        <div className="p-4">
                          <Droppable droppableId={group.id} type="skill">
                            {(provided) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-2"
                              >
                                {group.skills.map((skill, skillIndex) => (
                                  <Draggable key={skill.id} draggableId={skill.id} index={skillIndex}>
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
                                          value={skill.name}
                                          onChange={(e) => handleSkillChange(group.id, skill.id, 'name', e.target.value)}
                                          placeholder="Skill name"
                                          className="flex-1"
                                        />
                                        
                                        <Input
                                          type="number"
                                          min="1"
                                          max="5"
                                          value={skill.level}
                                          onChange={(e) => handleSkillChange(group.id, skill.id, 'level', parseInt(e.target.value))}
                                          className="w-20"
                                        />
                                        
                                        <Button 
                                          variant="ghost" 
                                          size="icon"
                                          onClick={() => handleRemoveSkill(group.id, skill.id)}
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
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAddSkill(group.id)}
                            className="mt-2 w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Skill
                          </Button>
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
        onClick={handleAddGroup}
      >
        <Plus className="h-4 w-4" />
        Add Skill Group
      </Button>
    </div>
  );
}