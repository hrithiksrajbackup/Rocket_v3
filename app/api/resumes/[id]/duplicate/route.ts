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

    const { title } = await request.json();
    
    const duplicatedResume = await ResumeService.duplicateResume(
      params.id,
      userId,
      title
    );
    
    return NextResponse.json(duplicatedResume, { status: 201 });
  } catch (error) {
    console.error('Error duplicating resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}