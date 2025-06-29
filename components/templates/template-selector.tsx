"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  templates, 
  getTemplatesByCategory, 
  getFreeTemplates, 
  getPremiumTemplates,
  getPopularTemplates 
} from '@/lib/resume-data';
import { 
  Crown, 
  Search, 
  Filter, 
  Star, 
  Eye, 
  Check,
  Sparkles,
  Users,
  Briefcase,
  Palette,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  isPremium?: boolean;
  onUpgrade?: () => void;
}

export function TemplateSelector({ 
  selectedTemplate, 
  onTemplateSelect, 
  isPremium = false,
  onUpgrade 
}: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Templates', icon: FileText },
    { id: 'professional', label: 'Professional', icon: Briefcase },
    { id: 'modern', label: 'Modern', icon: Sparkles },
    { id: 'creative', label: 'Creative', icon: Palette },
    { id: 'simple', label: 'Simple', icon: FileText },
  ];

  const filters = [
    { id: 'all', label: 'All', count: templates.length },
    { id: 'free', label: 'Free', count: getFreeTemplates().length },
    { id: 'premium', label: 'Premium', count: getPremiumTemplates().length },
    { id: 'popular', label: 'Popular', count: getPopularTemplates().length },
  ];

  const getFilteredTemplates = () => {
    let filtered = templates;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = getTemplatesByCategory(selectedCategory);
    }

    // Apply type filter
    if (selectedFilter === 'free') {
      filtered = filtered.filter(t => !t.premium);
    } else if (selectedFilter === 'premium') {
      filtered = filtered.filter(t => t.premium);
    } else if (selectedFilter === 'popular') {
      filtered = filtered.filter(t => t.popular);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.industries?.some(industry => 
          industry.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    return filtered;
  };

  const handleTemplateSelect = (templateId: string, isPremiumTemplate: boolean) => {
    if (isPremiumTemplate && !isPremium) {
      if (onUpgrade) {
        onUpgrade();
      }
      return;
    }
    onTemplateSelect(templateId);
  };

  const filteredTemplates = getFilteredTemplates();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">
          Select from our collection of professional, ATS-optimized resume templates
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search templates by name, style, or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className="flex items-center gap-2"
            >
              {filter.id === 'popular' && <Star className="h-4 w-4" />}
              {filter.id === 'premium' && <Crown className="h-4 w-4" />}
              {filter.label}
              <Badge variant="secondary" className="ml-1">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "group cursor-pointer transition-all duration-200 hover:shadow-lg border-2",
              selectedTemplate === template.id
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300"
            )}
            onClick={() => handleTemplateSelect(template.id, template.premium)}
          >
            <CardContent className="p-0">
              {/* Template Preview */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    {selectedTemplate === template.id ? (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Check className="h-4 w-4 mr-2" />
                        Selected
                      </Button>
                    ) : (
                      <Button size="sm">
                        Select
                      </Button>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {template.popular && (
                    <Badge className="bg-orange-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {template.premium && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>

                {/* Selection Indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {template.description}
                </p>

                {/* Features */}
                {template.features && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {template.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Industries */}
                {template.industries && (
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Best for:</span> {template.industries.slice(0, 2).join(', ')}
                    {template.industries.length > 2 && '...'}
                  </div>
                )}

                {/* Premium Lock */}
                {template.premium && !isPremium && (
                  <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-center">
                    <div className="flex items-center justify-center text-amber-700 text-xs">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium Template
                    </div>
                    <Button
                      size="sm"
                      className="mt-2 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onUpgrade) onUpgrade();
                      }}
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Upgrade to Use
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Premium Upsell */}
      {!isPremium && (
        <Card className="border-2 border-dashed border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="p-6 text-center">
            <Crown className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-amber-900 mb-2">
              Unlock All Premium Templates
            </h3>
            <p className="text-amber-800 mb-4">
              Get access to {getPremiumTemplates().length} premium templates designed for specific industries and career levels.
            </p>
            <Button
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              onClick={onUpgrade}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Upgrade to Premium - $1
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}