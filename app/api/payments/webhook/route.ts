import { NextRequest, NextResponse } from 'next/server';
import { PhonePeService } from '@/lib/phonepe';
import { PaymentService } from '@/lib/database/payments';
import { UserService } from '@/lib/database/users';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { response } = body;

    if (!response) {
      return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
    }

    // Decode the base64 response
    const decodedResponse = JSON.parse(Buffer.from(response, 'base64').toString());
    const { merchantTransactionId, transactionId, state, amount } = decodedResponse;

    console.log('PhonePe webhook received:', decodedResponse);

    // Verify payment status with PhonePe
    const phonePeService = new PhonePeService();
    const verificationResult = await phonePeService.verifyPayment(merchantTransactionId);

    let paymentStatus: 'SUCCESS' | 'FAILED' | 'CANCELLED' = 'FAILED';
    
    if (verificationResult.success && verificationResult.data?.state === 'COMPLETED') {
      paymentStatus = 'SUCCESS';
    } else if (state === 'FAILED') {
      paymentStatus = 'FAILED';
    } else if (state === 'CANCELLED') {
      paymentStatus = 'CANCELLED';
    }

    // Update payment record
    const updatedPayment = await PaymentService.updatePaymentStatus(
      merchantTransactionId,
      paymentStatus,
      transactionId,
      decodedResponse
    );

    if (paymentStatus === 'SUCCESS' && updatedPayment) {
      // Activate subscription
      await PaymentService.activateSubscription(
        updatedPayment.userId,
        updatedPayment._id!
      );

      // Log activity
      await UserService.logActivity(
        updatedPayment.userId,
        'subscription_activated',
        {
          paymentId: updatedPayment._id,
          amount: updatedPayment.amount,
          transactionId
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}