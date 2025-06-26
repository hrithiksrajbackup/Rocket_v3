// "use client";

// import { useUser } from "@clerk/nextjs";
// import { UserButton } from "@clerk/nextjs";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Plus,
//   FileText,
//   Download,
//   Edit,
//   Trash2,
//   Copy,
//   Calendar,
//   Eye,
//   MoreVertical,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface Resume {
//   id: string;
//   title: string;
//   template: string;
//   updatedAt: string;
//   created: string;
//   atsScore?: number;
// }

// export default function Dashboard() {
//   const { user, isLoaded } = useUser();
//   const [resumes, setResumes] = useState<Resume[]>([]);

//   useEffect(() => {
//     const fetchResumes = async () => {
//       try {
//         const res = await fetch("/api/resumes");
//         const data = await res.json();
//         setResumes(data);
//       } catch (error) {
//         console.error("Failed to load resumes", error);
//       }
//     };
//     fetchResumes();
//   }, []);

//   const handleDeleteResume = (resumeId: string) => {
//     const updatedResumes = resumes.filter((resume) => resume.id !== resumeId);
//     setResumes(updatedResumes);
//     localStorage.setItem(`resumes_${user?.id}`, JSON.stringify(updatedResumes));
//   };

//   const handleDuplicateResume = (resume: Resume) => {
//     const duplicatedResume: Resume = {
//       ...resume,
//       id: `${resume.id}-copy-${Date.now()}`,
//       title: `${resume.title} (Copy)`,
//       updatedAt: new Date().toISOString(),
//       created: new Date().toISOString(),
//     };
//     const updatedResumes = [...resumes, duplicatedResume];
//     setResumes(updatedResumes);
//     localStorage.setItem(`resumes_${user?.id}`, JSON.stringify(updatedResumes));
//   };

//   if (!isLoaded) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <Link href="/" className="flex items-center space-x-2">
//                 <FileText className="h-8 w-8 text-blue-600" />
//                 <span className="text-xl font-bold text-gray-900">
//                   Resume Rocket
//                 </span>
//               </Link>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-600">
//                 Welcome back, {user?.firstName}!
//               </span>
//               <UserButton afterSignOutUrl="/" />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Your Resume Dashboard
//           </h1>
//           <p className="text-gray-600">
//             Create, edit, and manage your professional resumes with
//             ATS-compatible templates.
//           </p>
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//             <CardHeader className="pb-3">
//               <CardTitle className="flex items-center text-lg">
//                 <Plus className="h-5 w-5 mr-2 text-blue-600" />
//                 Create New Resume
//               </CardTitle>
//               <CardDescription>
//                 Start with a professional template
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Link href="/builder">
//                 <Button className="w-full bg-blue-600 hover:bg-blue-700">
//                   Get Started
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="flex items-center text-lg">
//                 <FileText className="h-5 w-5 mr-2 text-green-600" />
//                 Total Resumes
//               </CardTitle>
//               <CardDescription>Resumes in your account</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-green-600">
//                 {resumes.length}
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="flex items-center text-lg">
//                 <Download className="h-5 w-5 mr-2 text-purple-600" />
//                 ATS Score
//               </CardTitle>
//               <CardDescription>Average compatibility score</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-purple-600">
//                 {resumes.length > 0
//                   ? Math.round(
//                       resumes.reduce(
//                         (acc, resume) => acc + (resume.atsScore || 0),
//                         0
//                       ) / resumes.length
//                     )
//                   : 0}
//                 %
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Resumes Grid */}
//         <div className="mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Your Resumes
//             </h2>
//             <Link href="/builder">
//               <Button variant="outline" className="flex items-center">
//                 <Plus className="h-4 w-4 mr-2" />
//                 New Resume
//               </Button>
//             </Link>
//           </div>

//           {resumes.length === 0 ? (
//             <Card className="text-center py-12">
//               <CardContent>
//                 <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No resumes yet
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   Create your first professional resume to get started.
//                 </p>
//                 <Link href="/builder">
//                   <Button className="bg-blue-600 hover:bg-blue-700">
//                     Create Your First Resume
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {resumes.map((resume) => (
//                 <Card
//                   key={resume.id}
//                   className="hover:shadow-lg transition-shadow"
//                 >
//                   <CardHeader className="pb-3">
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <CardTitle className="text-lg mb-1 truncate">
//                           {resume.title}
//                         </CardTitle>
//                         <CardDescription className="flex items-center">
//                           <Calendar className="h-4 w-4 mr-1" />
//                           {new Date(resume.updatedAt).toDateString()}
//                         </CardDescription>
//                       </div>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="sm">
//                             <MoreVertical className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem
//                             onClick={() => handleDuplicateResume(resume)}
//                           >
//                             <Copy className="h-4 w-4 mr-2" />
//                             Duplicate
//                           </DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => handleDeleteResume(resume.id)}
//                             className="text-red-600"
//                           >
//                             <Trash2 className="h-4 w-4 mr-2" />
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center">
//                         <Badge variant="secondary" className="capitalize">
//                           {resume.template}
//                         </Badge>
//                         {resume.atsScore && (
//                           <Badge
//                             variant={
//                               resume.atsScore >= 80
//                                 ? "default"
//                                 : resume.atsScore >= 60
//                                 ? "secondary"
//                                 : "destructive"
//                             }
//                           >
//                             ATS: {resume.atsScore}%
//                           </Badge>
//                         )}
//                       </div>

//                       <div className="flex space-x-2">
//                         <Link
//                           href={`/builder?resume=${resume.id}`}
//                           className="flex-1"
//                         >
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="w-full"
//                           >
//                             <Edit className="h-4 w-4 mr-2" />
//                             Edit
//                           </Button>
//                         </Link>
//                         <Link
//                           href={`/preview?resume=${resume.id}`}
//                           className="flex-1"
//                         >
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="w-full"
//                           >
//                             <Eye className="h-4 w-4 mr-2" />
//                             Preview
//                           </Button>
//                         </Link>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Tips Section */}
//         <Card className="bg-blue-50 border-blue-200">
//           <CardHeader>
//             <CardTitle className="text-blue-900">💡 Pro Tips</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ul className="space-y-2 text-blue-800">
//               <li>• Use action verbs and quantify your achievements</li>
//               <li>• Keep your resume to 1-2 pages for optimal ATS scanning</li>
//               <li>• Tailor your resume for each job application</li>
//               <li>• Use our ATS checker to ensure compatibility</li>
//             </ul>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }

"use client";

import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Plus,
  FileText,
  Download,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Eye,
  MoreVertical,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

interface Resume {
  _id: string;
  title: string;
  templateId: string;
  updatedAt: string;
  createdAt: string;
  version: number;
  exportCount: number;
  lastAccessedAt: string;
  isPublic: boolean;
  tags: string[];
  atsScore?: number; // You might want to add this to your schema
}

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchResumes = async (showToast = false) => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/resumes`);
      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }
      
      const data = await response.json();
      setResumes(data || []);
      
      if (showToast) {
        toast({
          title: "Refreshed",
          description: "Resume list has been updated.",
        });
      }
    } catch (error) {
      console.error("Failed to load resumes", error);
      setError("Failed to load resumes. Please try again.");
      
      if (showToast) {
        toast({
          title: "Error",
          description: "Failed to refresh resumes. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchResumes();
    }
  }, [user?.id, isLoaded]);

  const handleDeleteResume = async (resumeId: string) => {
    if (!user?.id) return;
    
    try {
      setActionLoading(resumeId);
      
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete resume');
      }

      // Update local state
      setResumes(prev => prev.filter(resume => resume._id !== resumeId));
      
      toast({
        title: "Success",
        description: "Resume deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Error",
        description: "Failed to delete resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDuplicateResume = async (resume: Resume) => {
    if (!user?.id) return;
    
    try {
      setActionLoading(resume._id);
      
      const response = await fetch(`/api/resumes/${resume._id}/duplicate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user.id,
          newTitle: `${resume.title} (Copy)`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to duplicate resume');
      }

      const data = await response.json();
      
      // Update local state
      setResumes(prev => [data, ...prev]);
      
      toast({
        title: "Success",
        description: "Resume duplicated successfully.",
      });
    } catch (error) {
      console.error('Error duplicating resume:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleRefresh = () => {
    fetchResumes(true);
  };

  // Calculate average ATS score
  const averageAtsScore = resumes.length > 0
    ? Math.round(resumes.reduce((acc, resume) => acc + (resume.atsScore || 85), 0) / resumes.length)
    : 0;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  Resume Rocket
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome back, {user?.firstName}!
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Resume Dashboard
              </h1>
              <p className="text-gray-600">
                Create, edit, and manage your professional resumes with
                ATS-compatible templates.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex justify-between items-center">
              {error}
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Plus className="h-5 w-5 mr-2 text-blue-600" />
                Create New Resume
              </CardTitle>
              <CardDescription>
                Start with a professional template
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/builder">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Total Resumes
              </CardTitle>
              <CardDescription>Resumes in your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {loading ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  resumes.length
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Download className="h-5 w-5 mr-2 text-purple-600" />
                ATS Score
              </CardTitle>
              <CardDescription>Average compatibility score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {loading ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  `${averageAtsScore}%`
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumes Grid */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Resumes
            </h2>
            <Link href="/builder">
              <Button variant="outline" className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                New Resume
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-8 bg-gray-200 rounded flex-1"></div>
                        <div className="h-8 bg-gray-200 rounded flex-1"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No resumes yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Create your first professional resume to get started.
                </p>
                <Link href="/builder">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Create Your First Resume
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card
                  key={resume._id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1 truncate">
                          {resume.title}
                        </CardTitle>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(resume.updatedAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            disabled={actionLoading === resume._id}
                          >
                            {actionLoading === resume._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <MoreVertical className="h-4 w-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleDuplicateResume(resume)}
                            disabled={actionLoading === resume._id}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteResume(resume._id)}
                            className="text-red-600"
                            disabled={actionLoading === resume._id}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="capitalize">
                          {resume.templateId}
                        </Badge>
                        <div className="flex gap-2">
                          <Badge variant="outline">
                            V{resume.version}
                          </Badge>
                          {resume.atsScore && (
                            <Badge
                              variant={
                                resume.atsScore >= 80
                                  ? "default"
                                  : resume.atsScore >= 60
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              ATS: {resume.atsScore}%
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">
                        <div>Created: {new Date(resume.createdAt).toLocaleDateString()}</div>
                        <div>Exports: {resume.exportCount}</div>
                      </div>

                      <div className="flex space-x-2">
                        <Link
                          href={`/builder?resume=${resume._id}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <Link
                          href={`/preview?resume=${resume._id}`}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 Pro Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-800">
              <li>• Use action verbs and quantify your achievements</li>
              <li>• Keep your resume to 1-2 pages for optimal ATS scanning</li>
              <li>• Tailor your resume for each job application</li>
              <li>• Use our ATS checker to ensure compatibility</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}