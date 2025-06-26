import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { ResumeService } from '@/lib/database/resumes';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resume = await ResumeService.getResumeById(params.id, userId);
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = await request.json();
    const { changeDescription, ...resumeUpdates } = updates;
    
    const updatedResume = await ResumeService.updateResume(
      params.id,
      userId,
      resumeUpdates,
      changeDescription
    );
    
    if (!updatedResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const deleted = await ResumeService.deleteResume(params.id, userId);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}