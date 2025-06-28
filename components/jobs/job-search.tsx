"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Loader2,
  Filter,
  Download
} from 'lucide-react';
import { JobListing, JobSearchParams } from '@/lib/job-search';

export function JobSearch() {
  const { user } = useUser();
  const [searchParams, setSearchParams] = useState<JobSearchParams>({
    role: '',
    experienceLevel: 0,
    location: '',
    skills: [],
    jobType: 'full-time'
  });
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch('/api/jobs/search');
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchParams.role || !searchParams.location || !searchParams.skills.length) {
      toast({
        title: "Missing Information",
        description: "Please fill in role, location, and at least one skill.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSearchProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const response = await fetch('/api/jobs/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        throw new Error('Failed to search jobs');
      }

      const data = await response.json();
      setJobs(data.jobs || []);
      setSearchProgress(100);

      toast({
        title: "Search Complete",
        description: `Found ${data.jobs?.length || 0} job opportunities.`,
      });
    } catch (error) {
      console.error('Job search error:', error);
      toast({
        title: "Search Failed",
        description: "Failed to search jobs. Please try again.",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
      setTimeout(() => setSearchProgress(0), 2000);
    }
  };

  const handleSkillsChange = (skillsString: string) => {
    const skills = skillsString.split(',').map(s => s.trim()).filter(s => s);
    setSearchParams(prev => ({ ...prev, skills }));
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
        toast({
          title: "Job Removed",
          description: "Job removed from saved list.",
        });
      } else {
        newSaved.add(jobId);
        toast({
          title: "Job Saved",
          description: "Job added to your saved list.",
        });
      }
      return newSaved;
    });
  };

  const exportJobs = () => {
    if (jobs.length === 0) {
      toast({
        title: "No Jobs to Export",
        description: "Please search for jobs first.",
        variant: "destructive",
      });
      return;
    }

    // Create CSV content
    const headers = ['Title', 'Company', 'Location', 'Salary', 'Job Type', 'Posted Date', 'Application URL'];
    const csvContent = [
      headers.join(','),
      ...jobs.map(job => [
        `"${job.title}"`,
        `"${job.company.name}"`,
        `"${job.location}"`,
        job.salary ? `"${job.salary.min}-${job.salary.max} ${job.salary.currency}"` : '""',
        `"${job.jobType}"`,
        `"${job.postedDate.toLocaleDateString()}"`,
        `"${job.applicationUrl}"`
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job_search_results_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Job search results exported to CSV.",
    });
  };

  const formatSalary = (salary: JobListing['salary']) => {
    if (!salary) return 'Salary not specified';
    const { min, max, currency, period } = salary;
    const range = min && max ? `${min.toLocaleString()}-${max.toLocaleString()}` : 'Competitive';
    return `${range} ${currency}/${period}`;
  };

  const getRelativeTime = (date: Date,job) => {
    console.log("job",job)
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Job Search
          </CardTitle>
          <CardDescription>
            Find your next opportunity with AI-powered job matching
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Job Role *</Label>
              <Input
                id="role"
                placeholder="e.g., Software Engineer"
                value={searchParams.role}
                onChange={(e) => setSearchParams(prev => ({ ...prev, role: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA"
                value={searchParams.location}
                onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level (years)</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="e.g., 3"
                value={searchParams.experienceLevel || ''}
                onChange={(e) => setSearchParams(prev => ({ ...prev, experienceLevel: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select
                value={searchParams.jobType}
                onValueChange={(value: any) => setSearchParams(prev => ({ ...prev, jobType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated) *</Label>
            <Input
              id="skills"
              placeholder="e.g., JavaScript, React, Node.js"
              value={searchParams.skills.join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
            />
          </div>

          {searchProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Searching jobs...</span>
                <span>{searchProgress}%</span>
              </div>
              <Progress value={searchProgress} className="h-2" />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search Jobs
                </>
              )}
            </Button>
            
            {jobs.length > 0 && (
              <Button
                variant="outline"
                onClick={exportJobs}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Job Results */}
      {jobs.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Found {jobs.length} job{jobs.length !== 1 ? 's' : ''}
            </h2>
            <Badge variant="secondary">
              {savedJobs.size} saved
            </Badge>
          </div>

          <div className="grid gap-4">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {job.company.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {getRelativeTime(job.postedDate,job)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveJob(job.id)}
                        className="p-2"
                      >
                        {savedJobs.has(job.id) ? (
                          <BookmarkCheck className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{job.jobType}</Badge>
                    <Badge variant="outline">{job.experienceRequired}</Badge>
                    {job.remote && <Badge variant="outline">Remote</Badge>}
                    {job.salary && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {formatSalary(job.salary)}
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>

                  {expandedJob === job.id && (
                    <div className="space-y-3 pt-3 border-t">
                      <div>
                        <h4 className="font-medium mb-2">Full Description</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {job.description}
                        </p>
                      </div>

                      {job.requirements.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Requirements</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {job.requirements.map((req, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {job.benefits && job.benefits.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Benefits</h4>
                          <div className="flex flex-wrap gap-1">
                            {job.benefits.map((benefit, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 5).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 5} more
                      </Badge>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    >
                      {expandedJob === job.id ? 'Show Less' : 'Show More'}
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.share?.({
                            title: job.title,
                            text: `Check out this job: ${job.title} at ${job.company.name}`,
                            url: job.applicationUrl
                          }).catch(() => {
                            navigator.clipboard.writeText(job.applicationUrl);
                            toast({
                              title: "Link Copied",
                              description: "Job link copied to clipboard.",
                            });
                          });
                        }}
                      >
                        Share
                      </Button>
                      
                      <Button
                        size="sm"
                        onClick={() => window.open(job.applicationUrl, '_blank')}
                        className="flex items-center gap-1"
                      >
                        Apply Now
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions && jobs.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Popular Searches</CardTitle>
            <CardDescription>
              Get started with these popular job categories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Popular Roles</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.popularRoles.map((role: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSearchParams(prev => ({ ...prev, role }))}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Popular Locations</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.popularLocations.map((location: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setSearchParams(prev => ({ ...prev, location }))}
                  >
                    {location}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Popular Skills</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.popularSkills.map((skill: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      const currentSkills = searchParams.skills;
                      if (!currentSkills.includes(skill)) {
                        setSearchParams(prev => ({ 
                          ...prev, 
                          skills: [...currentSkills, skill] 
                        }));
                      }
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}