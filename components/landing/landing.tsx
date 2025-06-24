"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Hero } from "@/components/landing/hero";
import Features from "@/components/landing/features";
import { Templates } from "@/components/landing/templates";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { StackedFooter as Footer } from "@/components/landing/footer";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

export function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:shadow-lg transition-all duration-200">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Resume Rocket
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-200" />
              </Link>
              <Link
                href="#templates"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                Templates
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-200" />
              </Link>
              <Link
                href="#faq"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-200" />
              </Link>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <ModeToggle />
              {isSignedIn ? (
                <>
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Log in
                    </Button>
                  </SignInButton>
                  <Link href="/sign-up">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <ModeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t bg-background/95 backdrop-blur-xl">
              <nav className="flex flex-col gap-4">
                <Link
                  href="#features"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#templates"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Templates
                </Link>
                <Link
                  href="#faq"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <div className="flex flex-col gap-3 pt-4 border-t">
                  {isSignedIn ? (
                    <>
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <div className="px-4">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </>
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Log in
                        </Button>
                      </SignInButton>
                      <Link
                        href="/sign-up"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          size="sm"
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        <Hero />
        <Features />
        {/* <Templates /> */}
        {/* <Testimonials /> */}
        {/* <FAQ /> */}
      </main>

      <Footer />
    </div>
  );
}