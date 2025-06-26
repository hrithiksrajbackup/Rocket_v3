import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs';
import { UserService } from '@/lib/database/users';

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    
    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get client IP and user agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Check if user exists in our database
    let existingUser = await UserService.getUserById(userId);
    
    if (!existingUser) {
      // Create new user
      existingUser = await UserService.createUser({
        _id: userId,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        profileImageUrl: user.imageUrl,
        preferences: {
          theme: 'system',
          emailNotifications: true,
          autoSave: true
        }
      });
    } else {
      // Record login for existing user
      await UserService.recordLogin(userId, ipAddress, userAgent);
    }

    return NextResponse.json({ success: true, user: existingUser });
  } catch (error) {
    console.error('Error handling login:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}