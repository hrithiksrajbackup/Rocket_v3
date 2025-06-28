// export interface PhonePeConfig {
//   clientId: string;
//   clientSecret: string;
//   environment: 'TEST' | 'PRODUCTION';
//   baseUrl: string;
//   clientVersion:any;
// }

// export interface PaymentRequest {
//   merchantTransactionId: string;
//   merchantUserId: string;
//   amount: number;
//   redirectUrl: string;
//   redirectMode: string;
//   callbackUrl: string;
//   mobileNumber?: string;
//   paymentInstrument: {
//     type: string;
//     targetApp?: string;
//   };
// }

// export interface PaymentResponse {
//   success: boolean;
//   code: string;
//   message: string;
//   data?: {
//     merchantTransactionId: string;
//     transactionId: string;
//     instrumentResponse: {
//       type: string;
//       redirectInfo: {
//         url: string;
//         method: string;
//       };
//     };
//   };
// }

// export class PhonePeService {
//   private config: PhonePeConfig;

//   constructor() {
//     this.config = {
//       clientId: process.env.PHONEPE_CLIENT_ID || 'TEST-M23YZEOC34CHG_25062',
//       clientSecret: process.env.PHONEPE_CLIENT_SECRET || 'Y2YxMWUxMGItYmNhNS00YmY2LTkwNTItMTkwOGJkNGEzNGU0',
//       environment: 'TEST',
//       clientVersion:"1",
//       baseUrl: 'https://api-preprod.phonepe.com/apis/pg-sandbox'
//     };
//   }

//   generateTransactionId(): string {
//     return `M23YZEOC34CHG`;
//   }

//   async initiatePayment(userId: string, amount: number = 100): Promise<PaymentResponse> {
//     const merchantTransactionId = this.generateTransactionId();
    
//     const paymentRequest: PaymentRequest = {
//       merchantTransactionId,
//       merchantUserId: userId,
//       amount: amount, // Amount in paise (100 paise = 1 INR)
//       redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
//       redirectMode: 'POST',
//       callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
//       paymentInstrument: {
//         type: 'PAY_PAGE'
//       }
//     };

//     try {
//       const base64Payload = Buffer.from(JSON.stringify(paymentRequest)).toString('base64');
//       const checksum = this.generateChecksum(base64Payload);

//       const response = await fetch(`${this.config.baseUrl}/pg/v1/pay`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-VERIFY': checksum,
//           'X-MERCHANT-ID': this.config.clientId
//         },
//         body: JSON.stringify({
//           request: base64Payload
//         })
//       });

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error('PhonePe payment initiation error:', error);
//       throw new Error('Failed to initiate payment');
//     }
//   }

//   async verifyPayment(merchantTransactionId: string): Promise<any> {
//     try {
//       const checksum = this.generateChecksum(`/pg/v1/status/${this.config.clientId}/${merchantTransactionId}`);

//       const response = await fetch(
//         `${this.config.baseUrl}/pg/v1/status/${this.config.clientId}/${merchantTransactionId}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-VERIFY': checksum,
//             'X-MERCHANT-ID': this.config.clientId
//           }
//         }
//       );

//       return await response.json();
//     } catch (error) {
//       console.error('PhonePe payment verification error:', error);
//       throw new Error('Failed to verify payment');
//     }
//   }

//   private generateChecksum(payload: string): string {
//     const crypto = require('crypto');
//     const string = payload + '/pg/v1/pay' + this.config.clientSecret;
//     return crypto.createHash('sha256').update(string).digest('hex') + '###1';
//   }
// }

export interface PhonePeConfig {
  clientId: string;
  clientSecret: string;
  environment: 'TEST' | 'PRODUCTION';
  baseUrl: string;
  clientVersion: any;
  saltKey: string;
  saltIndex: string;
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
      // Updated to use correct PhonePe sandbox credentials
      clientId: process.env.PHONEPE_CLIENT_ID || 'TEST-M23YZEOC34CHG_25062',
      clientSecret: process.env.PHONEPE_CLIENT_SECRET || 'Y2YxMWUxMGItYmNhNS00YmY2LTkwNTItMTkwOGJkNGEzNGU0',
      saltKey: process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399',
      saltIndex: process.env.PHONEPE_SALT_INDEX || '1',
      environment: 'TEST',
      clientVersion: "1",
      baseUrl: 'https://api-preprod.phonepe.com/apis/hermes'
    };
  }

  // Generate unique transaction ID instead of static one
  generateTransactionId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100000);
    return `TXN_${this.config.clientId}_${timestamp}_${random}`;
  }

  async initiatePayment(userId: string, amount: number = 100): Promise<PaymentResponse> {
    const merchantTransactionId = this.generateTransactionId();
    
    // Ensure amount is in paise (smallest unit)
    const amountInPaise = Math.round(amount * 100);

    const paymentRequest: PaymentRequest = {
      merchantTransactionId,
      merchantUserId: userId,
      amount: amountInPaise,
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
      redirectMode: 'POST',
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    try {
      const base64Payload = Buffer.from(JSON.stringify(paymentRequest)).toString('base64');
      const checksum = this.generateChecksum(base64Payload, '/pg/v1/pay');

      console.log('Payment Request:', {
        merchantId: this.config.clientId,
        transactionId: merchantTransactionId,
        amount: amountInPaise,
        checksum: checksum
      });

      const response = await fetch(`${this.config.baseUrl}/pg/v1/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': this.config.clientId,
          'accept': 'application/json'
        },
        body: JSON.stringify({
          request: base64Payload
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('PhonePe API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('PhonePe Response:', result);
      
      return result;
    } catch (error) {
      console.error('PhonePe payment initiation error:', error);
      throw new Error(`Failed to initiate payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async verifyPayment(merchantTransactionId: string): Promise<any> {
    try {
      const endpoint = `/pg/v1/status/${this.config.clientId}/${merchantTransactionId}`;
      const checksum = this.generateChecksum('', endpoint);

      console.log('Verifying payment:', {
        merchantId: this.config.clientId,
        transactionId: merchantTransactionId,
        endpoint: endpoint
      });

      const response = await fetch(
        `${this.config.baseUrl}${endpoint}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': this.config.clientId,
            'accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('PhonePe Verification Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('Verification Response:', result);
      
      return result;
    } catch (error) {
      console.error('PhonePe payment verification error:', error);
      throw new Error(`Failed to verify payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Fixed checksum generation according to PhonePe specification
  private generateChecksum(payload: string, endpoint?: string): string {
    const crypto = require('crypto');
    
    let stringToHash: string;
    
    if (payload && endpoint) {
      // For payment initiation: base64Payload + endpoint + saltKey
      stringToHash = payload + endpoint + this.config.saltKey;
    } else if (endpoint) {
      // For status check: endpoint + saltKey
      stringToHash = endpoint + this.config.saltKey;
    } else {
      // Fallback for old format (should not be used)
      stringToHash = payload + '/pg/v1/pay' + this.config.saltKey;
    }
    
    const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
    return `${hash}###${this.config.saltIndex}`;
  }

  // Helper method to validate configuration
  private validateConfig(): boolean {
    const requiredFields = ['clientId', 'saltKey', 'saltIndex'];
    const missingFields = requiredFields.filter(field => !this.config[field as keyof PhonePeConfig]);
    
    if (missingFields.length > 0) {
      console.error('Missing PhonePe configuration:', missingFields);
      return false;
    }
    
    return true;
  }

  // Method to test if configuration is working
  async testConfiguration(): Promise<{ success: boolean; message: string }> {
    if (!this.validateConfig()) {
      return { success: false, message: 'Invalid configuration' };
    }

    try {
      // Test with a minimal payment request
      const result = await this.initiatePayment('M23YZEOC34CHG' + Date.now(), 1);
      
      if (result.code === 'KEY_NOT_CONFIGURED') {
        return { 
          success: false, 
          message: 'Merchant key not configured. Please check your credentials.' 
        };
      }
      
      return { 
        success: true, 
        message: 'Configuration is valid' 
      };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Configuration test failed' 
      };
    }
  }
}
