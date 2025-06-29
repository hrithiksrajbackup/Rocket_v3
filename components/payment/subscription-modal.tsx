"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Crown, 
  Check, 
  Sparkles, 
  FileText, 
  Download, 
  Palette, 
  Loader2,
  CreditCard,
  Shield
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubscriptionSuccess?: () => void;
}

export function SubscriptionModal({ open, onOpenChange, onSubscriptionSuccess }: SubscriptionModalProps) {
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

  const features = [
    {
      icon: <FileText className="h-4 w-4" />,
      title: "Unlimited Resumes",
    },
    {
      icon: <Sparkles className="h-4 w-4" />,
      title: "AI-Powered Suggestions",
    },
    {
      icon: <Palette className="h-4 w-4" />,
      title: "Premium Templates",
    },
    {
      icon: <Download className="h-4 w-4" />,
      title: "All Export Formats",
    }
  ];

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 100 }), // $1 = 100 paise
      });

      const data = await response.json();

      if (data.success && data.paymentUrl) {
        // Redirect to PhonePe payment page
        window.location.href = data.paymentUrl;
      } else {
        throw new Error(data.error || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full w-fit">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <DialogTitle className="text-lg font-bold">
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className="text-sm">
            Unlock all features with our lifetime subscription
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Pricing */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-2 py-1 rounded-full">
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-1 py-0">
                Limited Time
              </Badge>
              <span className="text-xs font-medium">One-time payment</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold">$1</span>
                <span className="text-base text-muted-foreground line-through">$29</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Lifetime access • No recurring charges
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <h3 className="font-semibold text-center text-sm">What you'll get:</h3>
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  <div className="p-1 bg-blue-100 rounded text-blue-600">
                    {feature.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-xs leading-tight">{feature.title}</h4>
                  </div>
                  <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <Shield className="h-3 w-3 text-green-600 flex-shrink-0" />
            <span className="text-xs text-green-700">
              Secure payment powered by PhonePe
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Subscribe Now - $1
                </>
              )}
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="w-full text-sm h-8"
              disabled={isProcessing}
            >
              Maybe Later
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">
              Join 50,000+ professionals who trust Resume Rocket
            </p>
            <div className="flex justify-center items-center gap-2 text-xs text-muted-foreground">
              <span>✓ 30-day money back</span>
              <span>✓ Instant activation</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}