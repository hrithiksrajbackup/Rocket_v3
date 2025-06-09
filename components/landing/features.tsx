// import { 
//   Brain, 
//   FileCheck, 
//   LayoutDashboard, 
//   History, 
//   Download, 
//   GripHorizontal,
//   BarChart,
//   Sparkles
// } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// const features = [
//   {
//     icon: <Brain className="h-10 w-10 text-blue-500" />,
//     title: "AI-Powered Content",
//     description: "Google Gemini AI helps you craft compelling descriptions and suggests improvements to make your resume stand out."
//   },
//   {
//     icon: <FileCheck className="h-10 w-10 text-green-500" />,
//     title: "ATS Compatibility",
//     description: "Ensure your resume passes through Applicant Tracking Systems with our real-time compatibility checker."
//   },
//   {
//     icon: <LayoutDashboard className="h-10 w-10 text-purple-500" />,
//     title: "Multiple Templates",
//     description: "Choose from a variety of professionally designed templates suitable for different industries and career levels."
//   },
//   {
//     icon: <GripHorizontal className="h-10 w-10 text-orange-500" />,
//     title: "Drag & Drop Editor",
//     description: "Easily rearrange sections, add new elements, and customize your resume with our intuitive drag and drop interface."
//   },
//   {
//     icon: <Sparkles className="h-10 w-10 text-yellow-500" />,
//     title: "Job-Specific Tailoring",
//     description: "Automatically tailor your resume to specific job descriptions to increase your chances of getting noticed."
//   },
//   {
//     icon: <Download className="h-10 w-10 text-teal-500" />,
//     title: "Multiple Export Formats",
//     description: "Download your resume in PDF, DOCX, or plain text formats to meet any application requirement."
//   },
//   {
//     icon: <History className="h-10 w-10 text-indigo-500" />,
//     title: "Version History",
//     description: "Keep track of changes and revert to previous versions of your resume at any time."
//   },
//   {
//     icon: <BarChart className="h-10 w-10 text-red-500" />,
//     title: "Resume Analytics",
//     description: "Get insights on how your resume performs and receive suggestions for improvement."
//   }
// ];

// export function Features() {
//   return (
//     <section id="features\" className="py-20 bg-background">
//       <div className="container">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl font-bold tracking-tight mb-4">
//             Powerful Features for the Perfect Resume
//           </h2>
//           <p className="text-muted-foreground text-lg">
//             Our resume builder combines cutting-edge AI technology with user-friendly tools to help you create the best possible resume.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {features.map((feature, index) => (
//             <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
//               <CardHeader className="pb-2">
//                 <div className="mb-4">{feature.icon}</div>
//                 <CardTitle>{feature.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <CardDescription className="text-sm text-muted-foreground">
//                   {feature.description}
//                 </CardDescription>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import { 
  Brain, 
  FileCheck, 
  LayoutDashboard, 
  History, 
  Download, 
  GripHorizontal,
  BarChart,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI-Powered Content",
    description: "Google Gemini AI helps you craft compelling descriptions and suggests improvements to make your resume stand out.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 hover:bg-blue-100",
    borderColor: "border-blue-200 hover:border-blue-300"
  },
  {
    icon: <FileCheck className="h-8 w-8" />,
    title: "ATS Compatibility",
    description: "Ensure your resume passes through Applicant Tracking Systems with our real-time compatibility checker.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 hover:bg-green-100",
    borderColor: "border-green-200 hover:border-green-300"
  },
  {
    icon: <LayoutDashboard className="h-8 w-8" />,
    title: "Multiple Templates",
    description: "Choose from a variety of professionally designed templates suitable for different industries and career levels.",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50 hover:bg-purple-100",
    borderColor: "border-purple-200 hover:border-purple-300"
  },
  {
    icon: <GripHorizontal className="h-8 w-8" />,
    title: "Drag & Drop Editor",
    description: "Easily rearrange sections, add new elements, and customize your resume with our intuitive drag and drop interface.",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 hover:bg-orange-100",
    borderColor: "border-orange-200 hover:border-orange-300"
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Job-Specific Tailoring",
    description: "Automatically tailor your resume to specific job descriptions to increase your chances of getting noticed.",
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50 hover:bg-yellow-100",
    borderColor: "border-yellow-200 hover:border-yellow-300"
  },
  {
    icon: <Download className="h-8 w-8" />,
    title: "Multiple Export Formats",
    description: "Download your resume in PDF, DOCX, or plain text formats to meet any application requirement.",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50 hover:bg-teal-100",
    borderColor: "border-teal-200 hover:border-teal-300"
  },
  {
    icon: <History className="h-8 w-8" />,
    title: "Version History",
    description: "Keep track of changes and revert to previous versions of your resume at any time.",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50 hover:bg-indigo-100",
    borderColor: "border-indigo-200 hover:border-indigo-300"
  },
  {
    icon: <BarChart className="h-8 w-8" />,
    title: "Resume Analytics",
    description: "Get insights on how your resume performs and receive suggestions for improvement.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50 hover:bg-pink-100",
    borderColor: "border-pink-200 hover:border-pink-300"
  }
];

export default function EnhancedFeatures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100 opacity-30"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 leading-tight">
            Build the Perfect Resume
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our resume builder combines cutting-edge AI technology with user-friendly tools to help you create the best possible resume and land your dream job.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl border-2 ${feature.borderColor} p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${feature.bgColor}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient background overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              
              {/* Icon container */}
              <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                {/* Hover arrow */}
                {/* <div className={`flex items-center text-sm font-medium transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}> */}
                  {/* <span className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    Learn more
                  </span> */}
                  {/* <ArrowRight className={`w-4 h-4 ml-2 bg-gradient-to-r ${feature.color} text-transparent`} /> */}
                </div>
              {/* </div> */}

              {/* Animated border on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
            </div>
          ))}
        </div>

        {/* Call-to-action */}
        {/* <div className="text-center mt-20">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Building Your Resume
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
              View Templates
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}