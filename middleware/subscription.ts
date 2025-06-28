import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PaymentService } from '@/lib/database/payments';

export async function checkSubscription(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscription = await PaymentService.getUserSubscription(userId);
    
    if (!subscription || subscription.status !== 'ACTIVE') {
      return NextResponse.json(
        { 
          error: 'Premium subscription required',
          subscriptionRequired: true 
        }, 
        { status: 403 }
      );
    }

    return null; // Continue with the request
  } catch (error) {
    console.error('Subscription check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export function withSubscription(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    const subscriptionCheck = await checkSubscription(request);
    if (subscriptionCheck) {
      return subscriptionCheck;
    }
    
    return handler(request, ...args);
  };
}