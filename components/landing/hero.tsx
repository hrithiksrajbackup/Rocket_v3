import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="px-4 py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
            Create ATS-Compatible Resumes with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              AI-Powered Insights
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Build professional resumes that stand out to both humans and applicant tracking systems.
            Powered by Google Gemini AI to optimize your content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/builder">
              <Button size="lg" className="w-full sm:w-auto group">
                Build Your Resume
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#templates">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 relative rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-[16/9] bg-gradient-to-br from-muted/80 to-card/80 p-6 md:p-10">
            <div className="h-full w-full rounded-lg bg-card shadow-lg overflow-hidden">
              <div className="h-8 bg-muted border-b flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                </div>
                <div className="mx-auto text-xs text-muted-foreground">Resume Builder</div>
              </div>
              <div className="grid grid-cols-3 h-[calc(100%-2rem)]">
                <div className="col-span-1 border-r p-4 bg-background/50">
                  <div className="w-24 h-6 bg-muted rounded-md mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-primary/20"></div>
                        <div className="w-24 h-4 bg-muted rounded-md"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 p-6 bg-background flex flex-col gap-4">
                  <div className="w-40 h-8 bg-muted rounded-md"></div>
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6 h-28 bg-muted/50 rounded-md border"></div>
                    <div className="col-span-3 h-24 bg-muted/50 rounded-md border"></div>
                    <div className="col-span-3 h-24 bg-muted/50 rounded-md border"></div>
                    <div className="col-span-2 h-16 bg-muted/50 rounded-md border"></div>
                    <div className="col-span-4 h-16 bg-muted/50 rounded-md border"></div>
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