"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { templateConfigs, freeTemplates, premiumTemplates } from '@/lib/template-config';
import { getUserSubscription, canUseTemplate } from '@/lib/subscription';
import { PremiumBadge } from '@/components/ui/premium-badge';
import { PremiumUpgradeDialog } from '@/components/dialogs/premium-upgrade-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Lock } from 'lucide-react';

interface TemplateSelectorProps {
  currentTemplateId: string;
  onTemplateSelect?: (templateId: string) => void;
}

export function TemplateSelector({ currentTemplateId, onTemplateSelect }: TemplateSelectorProps) {
  const router = useRouter();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [selectedPremiumTemplate, setSelectedPremiumTemplate] = useState<string>('');
  const subscription = getUserSubscription();

  const handleTemplateSelect = (templateId: string) => {
    if (!canUseTemplate(templateId)) {
      const template = templateConfigs.find(t => t.id === templateId);
      setSelectedPremiumTemplate(template?.name || '');
      setShowUpgradeDialog(true);
      return;
    }

    if (onTemplateSelect) {
      onTemplateSelect(templateId);
    } else {
      router.push(`/builder?template=${templateId}`);
    }
  };

  const TemplateCard = ({ template }: { template: typeof templateConfigs[0] }) => {
    const isSelected = template.id === currentTemplateId;
    const canUse = canUseTemplate(template.id);

    return (
      <Card 
        className={`group cursor-pointer transition-all duration-200 hover:shadow-lg ${
          isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
        } ${!canUse ? 'opacity-75' : ''}`}
        onClick={() => handleTemplateSelect(template.id)}
      >
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
            <img
              src={template.previewImage}
              alt={template.name}
              className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
            />
            
            {/* Overlay for premium templates */}
            {!canUse && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Lock className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Premium Template</p>
                </div>
              </div>
            )}

            {/* Preview button */}
            {canUse && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button variant="secondary" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {template.popular && (
                <Badge variant="secondary" className="text-xs">
                  Popular
                </Badge>
              )}
              {template.premium && (
                <PremiumBadge size="sm" />
              )}
            </div>

            {/* Selected indicator */}
            {isSelected && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
            <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
            
            <div className="flex flex-wrap gap-1">
              {template.features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {template.features.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{template.features.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Choose Your Template</h2>
          <p className="text-muted-foreground">
            Select from our collection of professional resume templates
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="free">Free ({freeTemplates.length})</TabsTrigger>
            <TabsTrigger value="premium" className="gap-1">
              Premium ({premiumTemplates.length})
              <PremiumBadge size="sm" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {templateConfigs.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="free" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {freeTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="premium" className="mt-6">
            {!subscription.isPremium && (
              <div className="text-center mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">Unlock Premium Templates</h3>
                <p className="text-muted-foreground mb-4">
                  Get access to our exclusive collection of premium templates designed for specific industries and roles.
                </p>
                <Button 
                  onClick={() => setShowUpgradeDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <PremiumBadge size="sm" className="mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {premiumTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <PremiumUpgradeDialog
        open={showUpgradeDialog}
        onOpenChange={setShowUpgradeDialog}
        feature="template"
        templateName={selectedPremiumTemplate}
      />
    </>
  );
}