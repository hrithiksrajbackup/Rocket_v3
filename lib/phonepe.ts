export interface PhonePeConfig {
  clientId: string;
  clientSecret: string;
  environment: 'TEST' | 'PRODUCTION';
  baseUrl: string;
}

export interface PaymentRequest {
  merchantTransactionId: string;
  merchantUserId: string;
  amount: number;
  redirectUrl: string;
  redirectMode: string;
  callbackUrl: string;
  mobileNumber?: string;
  paymentInstrument: {
    type: string;
    targetApp?: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  code: string;
  message: string;
  data?: {
    merchantTransactionId: string;
    transactionId: string;
    instrumentResponse: {
      type: string;
      redirectInfo: {
        url: string;
        method: string;
      };
    };
  };
}

export class PhonePeService {
  private config: PhonePeConfig;

  constructor() {
    this.config = {
      clientId: process.env.PHONEPE_CLIENT_ID || 'TEST-M23YZEOC34CHG_25062',
      clientSecret: process.env.PHONEPE_CLIENT_SECRET || 'Y2YxMWUxMGItYmNhNS00YmY2LTkwNTItMTkwOGJkNGEzNGU0',
      environment: 'TEST',
      baseUrl: 'https://api-preprod.phonepe.com/apis/pg-sandbox'
    };
  }

  generateTransactionId(): string {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async initiatePayment(userId: string, amount: number = 100): Promise<PaymentResponse> {
    const merchantTransactionId = this.generateTransactionId();
    
    const paymentRequest: PaymentRequest = {
      merchantTransactionId,
      merchantUserId: userId,
      amount: amount, // Amount in paise (100 paise = 1 INR)
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
      redirectMode: 'POST',
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    try {
      const base64Payload = Buffer.from(JSON.stringify(paymentRequest)).toString('base64');
      const checksum = this.generateChecksum(base64Payload);

      const response = await fetch(`${this.config.baseUrl}/pg/v1/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': this.config.clientId
        },
        body: JSON.stringify({
          request: base64Payload
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('PhonePe payment initiation error:', error);
      throw new Error('Failed to initiate payment');
    }
  }

  async verifyPayment(merchantTransactionId: string): Promise<any> {
    try {
      const checksum = this.generateChecksum(`/pg/v1/status/${this.config.clientId}/${merchantTransactionId}`);

      const response = await fetch(
        `${this.config.baseUrl}/pg/v1/status/${this.config.clientId}/${merchantTransactionId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': this.config.clientId
          }
        }
      );

      return await response.json();
    } catch (error) {
      console.error('PhonePe payment verification error:', error);
      throw new Error('Failed to verify payment');
    }
  }

  private generateChecksum(payload: string): string {
    const crypto = require('crypto');
    const string = payload + '/pg/v1/pay' + this.config.clientSecret;
    return crypto.createHash('sha256').update(string).digest('hex') + '###1';
  }
}