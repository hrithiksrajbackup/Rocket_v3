"use client";

import { useUser } from "@clerk/nextjs";
import { ResumeBuilder } from '@/components/builder/resume-builder';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BuilderPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return <ResumeBuilder />;
}