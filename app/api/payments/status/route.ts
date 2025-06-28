import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PaymentService } from '@/lib/database/payments';

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const merchantTransactionId = searchParams.get('merchantTransactionId');

    if (merchantTransactionId) {
      // Get specific payment status
      const payments = await PaymentService.getPaymentHistory(userId);
      const payment = payments.find(p => p.merchantTransactionId === merchantTransactionId);
      
      if (!payment) {
        return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
      }

      return NextResponse.json(payment);
    } else {
      // Get user subscription status
      const subscription = await PaymentService.getUserSubscription(userId);
      const paymentHistory = await PaymentService.getPaymentHistory(userId);

      return NextResponse.json({
        subscription,
        paymentHistory
      });
    }
  } catch (error) {
    console.error('Error fetching payment status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}