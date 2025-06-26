import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { ResumeService } from '@/lib/database/resumes';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Increment export count
    await ResumeService.incrementExportCount(params.id, userId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error recording export:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}