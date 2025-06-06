'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Templates } from '@/components/landing/templates';
import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">ResumeAI</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#templates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Templates
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/builder">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Hero />
        <Features />
        <Templates />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
}