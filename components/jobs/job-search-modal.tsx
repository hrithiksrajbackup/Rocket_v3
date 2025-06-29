"use client";

import { useState } from 'react';
import { JobSearch } from './job-search';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Clock, ExternalLink, X } from 'lucide-react';

interface JobSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeData?: any;
}

export function JobSearchModal({ open, onOpenChange, resumeData }: JobSearchModalProps) {
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const handleJobSelect = (job: any) => {
    setSelectedJob(job);
  };

  const handleApply = (job: any) => {
    // Open job application URL in new tab
    window.open(job.applicationUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Job Search
          </DialogTitle>
          <DialogDescription>
            Find opportunities that match your resume and skills
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          {selectedJob ? (
            <div className="h-full flex flex-col">
              {/* Job Details Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{selectedJob.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {selectedJob.company?.name || 'Company'}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {selectedJob.location || 'Location'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedJob.postedDate ? new Date(selectedJob.postedDate).toLocaleDateString() : 'Recently posted'}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{selectedJob.jobType || 'Full-time'}</Badge>
                      <Badge variant="outline">{selectedJob.experienceRequired || 'Entry level'}</Badge>
                      {selectedJob.remote && <Badge variant="outline">Remote</Badge>}
                      {selectedJob.salary && (
                        <Badge variant="outline">
                          ${selectedJob.salary.min?.toLocaleString()} - ${selectedJob.salary.max?.toLocaleString()}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedJob(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Job Details Content */}
              <div className="flex-1 overflow-auto p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Job Description</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedJob.description || 'No description available.'}
                    </p>
                  </div>

                  {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((req: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Benefits</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.benefits.map((benefit: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedJob.skills && selectedJob.skills.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skills.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Job Details Footer */}
              <div className="p-6 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Posted by {selectedJob.company?.name || 'Company'}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedJob(null)}
                    >
                      Back to Search
                    </Button>
                    <Button
                      onClick={() => handleApply(selectedJob)}
                      className="flex items-center gap-2"
                    >
                      Apply Now
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-auto">
              <JobSearchComponent onJobSelect={handleJobSelect} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Temporary JobSearch component wrapper to avoid import issues
function JobSearchComponent({ onJobSelect }: { onJobSelect?: (job: any) => void }) {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Job Search Coming Soon
        </h3>
        <p className="text-gray-600 mb-6">
          We're working on integrating job search functionality. This feature will be available soon!
        </p>
        <Button variant="outline" onClick={() => window.close()}>
          Close
        </Button>
      </div>
    </div>
  );
}