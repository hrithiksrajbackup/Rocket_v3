import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold">ResumeAI</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Building better resumes with AI technology to help you land your dream job.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#templates" className="text-muted-foreground hover:text-foreground transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Legal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium">Subscribe</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Get the latest news and updates from our team.
            </p>
            <form className="mt-4">
              <div className="flex gap-2">
                <Input placeholder="Your email address" className="max-w-64" />
                <Button type="submit" variant="outline">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}