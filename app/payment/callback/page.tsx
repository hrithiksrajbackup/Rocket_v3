"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const merchantTransactionId = searchParams.get('merchantTransactionId');
      const transactionId = searchParams.get('transactionId');
      const code = searchParams.get('code');

      if (!merchantTransactionId) {
        setStatus('failed');
        setMessage('Invalid payment callback');
        return;
      }

      try {
        // Wait a bit for webhook to process
        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await fetch(`/api/payments/status?merchantTransactionId=${merchantTransactionId}`);
        const data = await response.json();

        if (data.status === 'SUCCESS') {
          setStatus('success');
          setMessage('Payment successful! Your subscription has been activated.');
        } else if (data.status === 'FAILED') {
          setStatus('failed');
          setMessage('Payment failed. Please try again.');
        } else if (data.status === 'CANCELLED') {
          setStatus('failed');
          setMessage('Payment was cancelled.');
        } else {
          setStatus('failed');
          setMessage('Payment status unknown. Please contact support.');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('failed');
        setMessage('Error verifying payment. Please contact support.');
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === 'loading' && (
              <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
            )}
            {status === 'success' && (
              <CheckCircle className="h-16 w-16 text-green-600" />
            )}
            {status === 'failed' && (
              <XCircle className="h-16 w-16 text-red-600" />
            )}
          </div>
          
          <CardTitle className="text-xl">
            {status === 'loading' && 'Processing Payment...'}
            {status === 'success' && 'Payment Successful!'}
            {status === 'failed' && 'Payment Failed'}
          </CardTitle>
          
          <CardDescription>
            {message}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {status === 'success' && (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">
                  Welcome to Premium!
                </h3>
                <p className="text-sm text-green-700">
                  You now have access to all premium features including unlimited resumes, 
                  AI suggestions, and premium templates.
                </p>
              </div>
              
              <Link href="/dashboard">
                <Button className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          )}

          {status === 'failed' && (
            <div className="space-y-4">
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              
              <Button 
                className="w-full"
                onClick={() => router.push('/dashboard')}
              >
                Try Again
              </Button>
            </div>
          )}

          {status === 'loading' && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Please wait while we verify your payment...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}