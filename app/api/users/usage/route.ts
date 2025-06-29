import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/lib/services/user-service';
import { auth } from '@clerk/nextjs';

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type } = body;

    if (!['resume', 'export', 'aiAnalysis', 'atsCheck'].includes(type)) {
      return NextResponse.json({ error: 'Invalid usage type' }, { status: 400 });
    }

    const user = await UserService.getUserByClerkId(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user can perform this action
    const canPerform = await UserService.checkUsageLimit(user._id, type);
    if (!canPerform) {
      return NextResponse.json({ 
        error: 'Usage limit exceeded',
        message: `You have reached your ${type} limit for this month. Please upgrade your plan.`
      }, { status: 403 });
    }

    // Increment usage
    await UserService.incrementUsage(user._id, type);

    // Get updated usage stats
    const updatedUser = await UserService.getUserById(user._id);
    const usageStats = updatedUser ? UserService.getUsageStats(updatedUser) : null;

    return NextResponse.json({ 
      success: true,
      usage: usageStats
    });
  } catch (error) {
    console.error('Error updating usage:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const user = await UserService.getUserByClerkId(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (type && ['resume', 'export', 'aiAnalysis', 'atsCheck'].includes(type)) {
      const canPerform = await UserService.checkUsageLimit(user._id, type as any);
      return NextResponse.json({ canPerform });
    }

    const usageStats = UserService.getUsageStats(user);
    return NextResponse.json({ usage: usageStats });
  } catch (error) {
    console.error('Error checking usage:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}