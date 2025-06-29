import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/user-service';
import { auth } from '@clerk/nextjs';

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await UserService.getUserByClerkId(userId);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const usageStats = UserService.getUsageStats(user);

    return NextResponse.json({ 
      subscription: user.subscription,
      usage: usageStats,
      isPremium: UserService.isPremiumUser(user)
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { plan, status, stripeCustomerId, stripeSubscriptionId } = body;

    const user = await UserService.getUserByClerkId(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const subscriptionUpdate: any = {};
    
    if (plan) subscriptionUpdate.plan = plan;
    if (status) subscriptionUpdate.status = status;
    if (stripeCustomerId) subscriptionUpdate.stripeCustomerId = stripeCustomerId;
    if (stripeSubscriptionId) subscriptionUpdate.stripeSubscriptionId = stripeSubscriptionId;

    // Set end date for paid plans
    if (plan && plan !== 'free') {
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      subscriptionUpdate.endDate = endDate.toISOString();
    }

    const updatedUser = await UserService.updateUserSubscription(user._id, subscriptionUpdate);

    return NextResponse.json({ 
      subscription: updatedUser?.subscription,
      isPremium: updatedUser ? UserService.isPremiumUser(updatedUser) : false
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}