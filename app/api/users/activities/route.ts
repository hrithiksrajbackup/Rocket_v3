import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { UserService } from '@/lib/database/users';

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const activities = await UserService.getUserActivities(userId, limit);
    
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching user activities:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}