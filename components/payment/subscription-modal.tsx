// "use client";

// import { useState } from 'react';
// import { useUser } from '@clerk/nextjs';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Loader2, Check, Crown, Sparkles } from 'lucide-react';
// import { toast } from '@/components/ui/use-toast';

// interface SubscriptionModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export function SubscriptionModal({ open, onOpenChange }: SubscriptionModalProps) {
//   const { user } = useUser();
//   const [isProcessing, setIsProcessing] = useState(false);

//   const features = [
//     'Unlimited resume creation',
//     'AI-powered content suggestions',
//     'Premium templates',
//     'Export to all formats (PDF, DOCX, PNG)',
//     'ATS compatibility checker',
//     'Job search integration',
//     'Priority customer support',
//     'Advanced analytics'
//   ];

//   const handleSubscribe = async () => {
//     if (!user) {
//       toast({
//         title: "Authentication Required",
//         description: "Please sign in to subscribe.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       const response = await fetch('/api/payments/initiate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: 100 }), // $1 = 100 paise
//       });

//       const data = await response.json();

//       if (data.success && data.paymentUrl) {
//         // Redirect to PhonePe payment page
//         window.location.href = data.paymentUrl;
//       } else {
//         throw new Error(data.error || 'Failed to initiate payment');
//       }
//     } catch (error) {
//       console.error('Payment error:', error);
//       toast({
//         title: "Payment Failed",
//         description: error instanceof Error ? error.message : "Failed to process payment. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2 text-2xl">
//             <Crown className="h-6 w-6 text-yellow-500" />
//             Upgrade to Premium
//           </DialogTitle>
//           <DialogDescription>
//             Unlock all features with our lifetime subscription
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-6">
//           {/* Pricing */}
//           <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
//             <div className="flex items-center justify-center gap-2 mb-2">
//               <span className="text-4xl font-bold">$1</span>
//               <Badge variant="secondary" className="bg-green-100 text-green-700">
//                 Lifetime
//               </Badge>
//             </div>
//             <p className="text-sm text-muted-foreground">
//               One-time payment • No recurring charges
//             </p>
//           </div>

//           {/* Features */}
//           <div className="space-y-3">
//             <h3 className="font-semibold flex items-center gap-2">
//               <Sparkles className="h-4 w-4 text-blue-500" />
//               What's included:
//             </h3>
//             <div className="grid grid-cols-1 gap-2">
//               {features.map((feature, index) => (
//                 <div key={index} className="flex items-center gap-2 text-sm">
//                   <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
//                   <span>{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Payment Button */}
//           <Button
//             onClick={handleSubscribe}
//             disabled={isProcessing}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
//             size="lg"
//           >
//             {isProcessing ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Processing...
//               </>
//             ) : (
//               <>
//                 <Crown className="mr-2 h-4 w-4" />
//                 Subscribe Now - $1
//               </>
//             )}
//           </Button>

//           <p className="text-xs text-center text-muted-foreground">
//             Secure payment powered by PhonePe. Your payment information is encrypted and secure.
//           </p>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      icon: <FileText className="h-5 w-5" />,
      title: "Unlimited Resumes",
      description: "Create as many resumes as you need"
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "AI-Powered Suggestions",
      description: "Get intelligent content recommendations"
    },
    {
      icon: <Palette className="h-5 w-5" />,
      title: "Premium Templates",
      description: "Access to all professional templates"
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: "All Export Formats",
      description: "PDF, DOCX, and more export options"
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full w-fit">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className="text-base">
            Unlock all features with our lifetime subscription
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Pricing */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full mb-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Limited Time
              </Badge>
              <span className="text-sm font-medium">One-time payment</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold">$1</span>
                <span className="text-lg text-muted-foreground line-through">$29</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Lifetime access • No recurring charges
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-semibold text-center mb-4">What you'll get:</h3>
            <div className="grid gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="p-1 bg-blue-100 rounded-md text-blue-600">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                  <Check className="h-4 w-4 text-green-600 mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-xs text-green-700">
              Secure payment powered by PhonePe
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
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
              className="w-full"
              disabled={isProcessing}
            >
              Maybe Later
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Join 50,000+ professionals who trust Resume Rocket
            </p>
            <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground">
              <span>✓ 30-day money back</span>
              <span>✓ Instant activation</span>
              <span>✓ No hidden fees</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}