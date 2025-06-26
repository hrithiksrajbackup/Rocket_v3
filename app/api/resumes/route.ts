import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { ResumeService } from '@/lib/database/resumes';
import { ResumeData } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const query = searchParams.get('q');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);

    let resumes;
    if (query || tags) {
      resumes = await ResumeService.searchResumes(userId, query || '', tags, limit);
    } else {
      resumes = await ResumeService.getUserResumes(userId, limit);
    }
    
    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { resumeData, title } = await request.json();
    
    if (!resumeData) {
      return NextResponse.json(
        { error: 'Resume data is required' },
        { status: 400 }
      );
    }

    const resume = await ResumeService.createResume(userId, resumeData, title);
    
    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error('Error creating resume:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}