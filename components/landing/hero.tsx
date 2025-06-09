// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { ArrowRight } from 'lucide-react';

// export function Hero() {
//   return (
//     <section className="px-4 py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
//       <div className="container mx-auto max-w-5xl">
//         <div className="text-center space-y-8">
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
//             Create ATS-Compatible Resumes with{' '}
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
//               AI-Powered Insights
//             </span>
//           </h1>
//           <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
//             Build professional resumes that stand out to both humans and applicant tracking systems.
//             Powered by Google Gemini AI to optimize your content.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
//             <Link href="/builder">
//               <Button size="lg" className="w-full sm:w-auto group">
//                 Build Your Resume
//                 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </Button>
//             </Link>
//             <Link href="#templates">
//               <Button size="lg" variant="outline" className="w-full sm:w-auto">
//                 Browse Templates
//               </Button>
//             </Link>
//           </div>
//         </div>
        
//         <div className="mt-16 relative rounded-xl overflow-hidden shadow-2xl">
//           <div className="aspect-[16/9] bg-gradient-to-br from-muted/80 to-card/80 p-6 md:p-10">
//             <div className="h-full w-full rounded-lg bg-card shadow-lg overflow-hidden">
//               <div className="h-8 bg-muted border-b flex items-center px-4">
//                 <div className="flex space-x-2">
//                   <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
//                 </div>
//                 <div className="mx-auto text-xs text-muted-foreground">Resume Builder</div>
//               </div>
//               <div className="grid grid-cols-3 h-[calc(100%-2rem)]">
//                 <div className="col-span-1 border-r p-4 bg-background/50">
//                   <div className="w-24 h-6 bg-muted rounded-md mb-4"></div>
//                   <div className="space-y-3">
//                     {[1, 2, 3, 4, 5].map((i) => (
//                       <div key={i} className="flex items-center gap-2">
//                         <div className="w-4 h-4 rounded-sm bg-primary/20"></div>
//                         <div className="w-24 h-4 bg-muted rounded-md"></div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="col-span-2 p-6 bg-background flex flex-col gap-4">
//                   <div className="w-40 h-8 bg-muted rounded-md"></div>
//                   <div className="grid grid-cols-6 gap-4">
//                     <div className="col-span-6 h-28 bg-muted/50 rounded-md border"></div>
//                     <div className="col-span-3 h-24 bg-muted/50 rounded-md border"></div>
//                     <div className="col-span-3 h-24 bg-muted/50 rounded-md border"></div>
//                     <div className="col-span-2 h-16 bg-muted/50 rounded-md border"></div>
//                     <div className="col-span-4 h-16 bg-muted/50 rounded-md border"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, CheckCircle, Zap, Users, Award, TrendingUp } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        {/* Subtle circle pattern */}
        <svg
          className="absolute inset-0 opacity-40"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <circle cx="30" cy="30" r="2" fill="#6366f1" fillOpacity="0.05" />
        </svg>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative px-4 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-8 lg:space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-700/50 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300">
              <Sparkles className="w-4 h-4" />
              AI-Powered Resume Builder
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight animate-pulse">
              Create{' '}
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
                  ATS-Compatible
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-lg blur opacity-20 animate-pulse"></div>
              </span>
              <br />
              Resumes with{' '}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
                  AI-Powered
                </span>
                <svg className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>{' '}
              Insights
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Build professional resumes that stand out to both humans and applicant tracking systems.{' '}
              <span className="font-semibold text-foreground">Powered by Google Gemini AI</span> to optimize your content and{' '}
              <span className="text-green-600 font-semibold">boost your chances by 3x</span>.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-foreground">50K+ Users</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Award className="w-5 h-5 text-purple-500" />
                <span className="text-foreground">98% ATS Pass Rate</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-foreground">3x More Interviews</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/builder">
                <Button
                  size="lg"
                  className="w-full sm:w-auto group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Build Your Resume
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#templates">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto font-semibold px-8 py-4 text-lg border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300"
                >
                  Browse Templates
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free Forever Plan</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Export to PDF/Word</span>
              </div>
            </div>
          </div>

          {/* Interactive Resume Preview */}
          <div className="mt-16 lg:mt-24 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform perspective-1000 hover:scale-105 transition-all duration-700">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-2xl blur opacity-20 animate-pulse"></div>

              {/* Main Preview Container */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-4 md:p-8">
                {/* Browser Header */}
                <div className="h-12 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-t-xl flex items-center px-6 shadow-sm">
                  <div className="flex space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm animate-pulse delay-100"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm animate-pulse delay-200"></div>
                  </div>
                  <div className="mx-auto text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI Resume Builder
                  </div>
                </div>

                {/* Resume Builder Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-5 h-[calc(100%-3rem)] bg-white dark:bg-gray-900 rounded-b-xl shadow-xl overflow-hidden">
                  {/* Sidebar */}
                  <div className="lg:col-span-2 border-r border-gray-200 dark:border-gray-700 p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="w-24 h-3 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full"></div>
                          <div className="w-16 h-2 bg-gray-300 rounded-full mt-2"></div>
                        </div>
                      </div>

                      {/* Form Sections */}
                      {[
                        { icon: '👤', name: 'Personal Info', active: true },
                        { icon: '💼', name: 'Experience', active: false },
                        { icon: '🎓', name: 'Education', active: false },
                        { icon: '⚡', name: 'Skills', active: false },
                        { icon: '🏆', name: 'Achievements', active: false }
                      ].map((section, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                            section.active
                              ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className="text-lg">{section.icon}</div>
                          <div className="flex-1">
                            <div
                              className={`h-3 rounded-full ${
                                section.active
                                  ? 'bg-gradient-to-r from-blue-400 to-purple-400'
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              style={{ width: section.active ? '80%' : '60%' }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resume Preview */}
                  <div className="lg:col-span-3 p-6 bg-white dark:bg-gray-900 overflow-hidden">
                    <div className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-6 relative overflow-hidden">
                      {/* Resume Content Simulation */}
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
                          <div className="w-32 h-8 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 rounded-lg mx-auto mb-2"></div>
                          <div className="w-48 h-4 bg-gray-400 rounded-full mx-auto mb-2"></div>
                          <div className="w-40 h-3 bg-gray-300 rounded-full mx-auto"></div>
                        </div>

                        {/* Content Blocks */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="w-24 h-5 bg-blue-500 rounded-md"></div>
                            <div className="space-y-2">
                              <div className="w-full h-3 bg-gray-300 rounded-full"></div>
                              <div className="w-4/5 h-3 bg-gray-300 rounded-full"></div>
                              <div className="w-3/5 h-3 bg-gray-300 rounded-full"></div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="w-20 h-5 bg-purple-500 rounded-md"></div>
                            <div className="space-y-2">
                              <div className="w-full h-3 bg-gray-300 rounded-full"></div>
                              <div className="w-5/6 h-3 bg-gray-300 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Magic Indicator */}
                      <div className="absolute top-4 right-4 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        <Sparkles className="w-3 h-3 animate-spin" />
                        AI Optimizing...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
