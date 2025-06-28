import { getDatabase } from '../mongodb';
import { ObjectId } from 'mongodb';

export interface PaymentRecord {
  _id?: ObjectId;
  userId: string;
  merchantTransactionId: string;
  transactionId?: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
  webhookData?: any;
  retryCount: number;
}

export interface UserSubscription {
  _id?: ObjectId;
  userId: string;
  subscriptionType: 'LIFETIME' | 'MONTHLY' | 'YEARLY';
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
  paymentId: ObjectId;
  activatedAt: Date;
  expiresAt?: Date;
  features: string[];
}

export class PaymentService {
  private static async getPaymentsCollection() {
    const db = await getDatabase();
    return db.collection<PaymentRecord>('payments');
  }

  private static async getSubscriptionsCollection() {
    const db = await getDatabase();
    return db.collection<UserSubscription>('subscriptions');
  }

  static async createPaymentRecord(
    userId: string,
    merchantTransactionId: string,
    amount: number
  ): Promise<PaymentRecord> {
    try {
      const collection = await this.getPaymentsCollection();
      
      const payment: PaymentRecord = {
        userId,
        merchantTransactionId,
        amount,
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        retryCount: 0
      };

      const result = await collection.insertOne(payment);
      return { ...payment, _id: result.insertedId };
    } catch (error) {
      console.error('Error creating payment record:', error);
      throw new Error('Failed to create payment record');
    }
  }

  static async updatePaymentStatus(
    merchantTransactionId: string,
    status: PaymentRecord['status'],
    transactionId?: string,
    webhookData?: any
  ): Promise<PaymentRecord | null> {
    try {
      const collection = await this.getPaymentsCollection();
      
      const result = await collection.findOneAndUpdate(
        { merchantTransactionId },
        {
          $set: {
            status,
            transactionId,
            webhookData,
            updatedAt: new Date()
          }
        },
        { returnDocument: 'after' }
      );

      return result;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw new Error('Failed to update payment status');
    }
  }

  static async activateSubscription(
    userId: string,
    paymentId: ObjectId
  ): Promise<UserSubscription> {
    try {
      const collection = await this.getSubscriptionsCollection();
      
      // Deactivate any existing subscriptions
      await collection.updateMany(
        { userId },
        { $set: { status: 'INACTIVE' } }
      );

      const subscription: UserSubscription = {
        userId,
        subscriptionType: 'LIFETIME',
        status: 'ACTIVE',
        paymentId,
        activatedAt: new Date(),
        features: ['unlimited_resumes', 'ai_suggestions', 'premium_templates', 'export_all_formats']
      };

      const result = await collection.insertOne(subscription);
      return { ...subscription, _id: result.insertedId };
    } catch (error) {
      console.error('Error activating subscription:', error);
      throw new Error('Failed to activate subscription');
    }
  }

  static async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    try {
      const collection = await this.getSubscriptionsCollection();
      return await collection.findOne({ userId, status: 'ACTIVE' });
    } catch (error) {
      console.error('Error fetching user subscription:', error);
      return null;
    }
  }

  static async getPaymentHistory(userId: string): Promise<PaymentRecord[]> {
    try {
      const collection = await this.getPaymentsCollection();
      return await collection
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray();
    } catch (error) {
      console.error('Error fetching payment history:', error);
      return [];
    }
  }
}