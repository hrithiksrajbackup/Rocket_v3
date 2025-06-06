import { 
  Brain, 
  FileCheck, 
  LayoutDashboard, 
  History, 
  Download, 
  GripHorizontal,
  BarChart,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <Brain className="h-10 w-10 text-blue-500" />,
    title: "AI-Powered Content",
    description: "Google Gemini AI helps you craft compelling descriptions and suggests improvements to make your resume stand out."
  },
  {
    icon: <FileCheck className="h-10 w-10 text-green-500" />,
    title: "ATS Compatibility",
    description: "Ensure your resume passes through Applicant Tracking Systems with our real-time compatibility checker."
  },
  {
    icon: <LayoutDashboard className="h-10 w-10 text-purple-500" />,
    title: "Multiple Templates",
    description: "Choose from a variety of professionally designed templates suitable for different industries and career levels."
  },
  {
    icon: <GripHorizontal className="h-10 w-10 text-orange-500" />,
    title: "Drag & Drop Editor",
    description: "Easily rearrange sections, add new elements, and customize your resume with our intuitive drag and drop interface."
  },
  {
    icon: <Sparkles className="h-10 w-10 text-yellow-500" />,
    title: "Job-Specific Tailoring",
    description: "Automatically tailor your resume to specific job descriptions to increase your chances of getting noticed."
  },
  {
    icon: <Download className="h-10 w-10 text-teal-500" />,
    title: "Multiple Export Formats",
    description: "Download your resume in PDF, DOCX, or plain text formats to meet any application requirement."
  },
  {
    icon: <History className="h-10 w-10 text-indigo-500" />,
    title: "Version History",
    description: "Keep track of changes and revert to previous versions of your resume at any time."
  },
  {
    icon: <BarChart className="h-10 w-10 text-red-500" />,
    title: "Resume Analytics",
    description: "Get insights on how your resume performs and receive suggestions for improvement."
  }
];

export function Features() {
  return (
    <section id="features\" className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Powerful Features for the Perfect Resume
          </h2>
          <p className="text-muted-foreground text-lg">
            Our resume builder combines cutting-edge AI technology with user-friendly tools to help you create the best possible resume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}