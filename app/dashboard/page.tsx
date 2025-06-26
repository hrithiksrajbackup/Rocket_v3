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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Resume {
  id: string;
  title: string;
  template: string;
  lastModified: string;
  created: string;
  atsScore?: number;
}

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const [resumes, setResumes] = useState<Resume[]>([]);

  // useEffect(() => {
  //   // Load user's resumes from localStorage (in production, this would be from a database)
  //   const savedResumes = localStorage.getItem(`resumes_${user?.id}`);
  //   if (savedResumes) {
  //     setResumes(JSON.parse(savedResumes));
  //   } else {
  //     // Create a sample resume for new users
  //     const sampleResume: Resume = {
  //       id: "sample-1",
  //       title: "My Professional Resume",
  //       template: "professional",
  //       lastModified: new Date().toISOString(),
  //       created: new Date().toISOString(),
  //       atsScore: 85
  //     };
  //     setResumes([sampleResume]);
  //     localStorage.setItem(`resumes_${user?.id}`, JSON.stringify([sampleResume]));
  //   }
  // }, [user?.id]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch("/api/resumes");
        const data = await res.json();
        setResumes(data);
      } catch (error) {
        console.error("Failed to load resumes", error);
      }
    };
    fetchResumes();
  }, []);

  const handleDeleteResume = (resumeId: string) => {
    const updatedResumes = resumes.filter((resume) => resume.id !== resumeId);
    setResumes(updatedResumes);
    localStorage.setItem(`resumes_${user?.id}`, JSON.stringify(updatedResumes));
  };

  const handleDuplicateResume = (resume: Resume) => {
    const duplicatedResume: Resume = {
      ...resume,
      id: `${resume.id}-copy-${Date.now()}`,
      title: `${resume.title} (Copy)`,
      lastModified: new Date().toISOString(),
      created: new Date().toISOString(),
    };
    const updatedResumes = [...resumes, duplicatedResume];
    setResumes(updatedResumes);
    localStorage.setItem(`resumes_${user?.id}`, JSON.stringify(updatedResumes));
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Resume Dashboard
          </h1>
          <p className="text-gray-600">
            Create, edit, and manage your professional resumes with
            ATS-compatible templates.
          </p>
        </div>

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
                {resumes.length}
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
                {resumes.length > 0
                  ? Math.round(
                      resumes.reduce(
                        (acc, resume) => acc + (resume.atsScore || 0),
                        0
                      ) / resumes.length
                    )
                  : 0}
                %
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

          {resumes.length === 0 ? (
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
                  key={resume.id}
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
                          {new Date(resume.lastModified).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleDuplicateResume(resume)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteResume(resume.id)}
                            className="text-red-600"
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
                          {resume.template}
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

                      <div className="flex space-x-2">
                        <Link
                          href={`/builder?resume=${resume.id}`}
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
                          href={`/preview?resume=${resume.id}`}
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
