import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { PhonePeService } from '@/lib/phonepe';
import { PaymentService } from '@/lib/database/payments';

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount = 100 } = await request.json(); // Default $1 = 100 paise

    // Check if user already has active subscription
    const existingSubscription = await PaymentService.getUserSubscription(userId);
    if (existingSubscription) {
      return NextResponse.json(
        { error: 'User already has an active subscription' },
        { status: 400 }
      );
    }

    const phonePeService = new PhonePeService();
    const paymentResponse = await phonePeService.initiatePayment(userId, amount);

    if (paymentResponse.success && paymentResponse.data) {
      // Create payment record in database
      await PaymentService.createPaymentRecord(
        userId,
        paymentResponse.data.merchantTransactionId,
        amount
      );

      return NextResponse.json({
        success: true,
        paymentUrl: paymentResponse.data.instrumentResponse.redirectInfo.url,
        merchantTransactionId: paymentResponse.data.merchantTransactionId
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to initiate payment', details: paymentResponse.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}