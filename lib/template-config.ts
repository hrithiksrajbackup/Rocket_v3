export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  category: 'professional' | 'modern' | 'creative' | 'simple';
  popular?: boolean;
  premium: boolean;
  features: string[];
}

export const templateConfigs: TemplateConfig[] = [
  {
    id: "professional",
    name: "Professional",
    description: "A clean, traditional design perfect for corporate roles",
    previewImage: "https://images.pexels.com/photos/8867281/pexels-photo-8867281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "professional",
    popular: true,
    premium: false,
    features: ["ATS-friendly", "Clean layout", "Professional styling"]
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with a creative touch",
    previewImage: "https://images.pexels.com/photos/8867265/pexels-photo-8867265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "modern",
    popular: true,
    premium: false,
    features: ["Modern design", "Color accents", "Sidebar layout"]
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and straightforward for maximum readability",
    previewImage: "https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "simple",
    popular: true,
    premium: false,
    features: ["Minimal design", "Easy to read", "Simple layout"]
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior positions",
    previewImage: "https://images.pexels.com/photos/8867274/pexels-photo-8867274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "professional",
    popular: false,
    premium: true,
    features: ["Executive styling", "Premium layout", "Sophisticated design"]
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative industries",
    previewImage: "https://images.pexels.com/photos/8867279/pexels-photo-8867279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "creative",
    popular: false,
    premium: true,
    features: ["Creative layout", "Bold colors", "Unique design"]
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for technical roles with skills emphasis",
    previewImage: "https://images.pexels.com/photos/8867270/pexels-photo-8867270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "professional",
    popular: false,
    premium: true,
    features: ["Skills focused", "Technical layout", "Data visualization"]
  },
  {
    id: "academic",
    name: "Academic",
    description: "Designed for academic and research positions",
    previewImage: "https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "professional",
    popular: false,
    premium: true,
    features: ["Academic format", "Research focused", "Publication ready"]
  },
  {
    id: "compact",
    name: "Compact",
    description: "Condensed format for fitting more content",
    previewImage: "https://images.pexels.com/photos/8867265/pexels-photo-8867265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "simple",
    popular: false,
    premium: true,
    features: ["Space efficient", "Compact layout", "More content"]
  }
];

export const freeTemplates = templateConfigs.filter(t => !t.premium);
export const premiumTemplates = templateConfigs.filter(t => t.premium);

export function getTemplateConfig(id: string): TemplateConfig | undefined {
  return templateConfigs.find(template => template.id === id);
}

export function isTemplatePremium(templateId: string): boolean {
  const template = getTemplateConfig(templateId);
  return template?.premium || false;
}