import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { JobSearchService, JobSearchParams } from '@/lib/job-search';

// Cache for job search results (6 hours)
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
const jobCache = new Map<string, { data: any; timestamp: number }>();

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams: JobSearchParams = await request.json();

    // Validate required fields
    if (!searchParams.role || !searchParams.location || !searchParams.skills?.length) {
      return NextResponse.json(
        { error: 'Missing required fields: role, location, and skills are required' },
        { status: 400 }
      );
    }

    // Generate cache key
    const cacheKey = JSON.stringify(searchParams);
    const cached = jobCache.get(cacheKey);

    // Return cached results if available and not expired
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return NextResponse.json(cached.data);
    }

    // Search for jobs
    const jobSearchService = new JobSearchService();
    const results = await jobSearchService.searchJobs(searchParams);

    // Cache the results
    jobCache.set(cacheKey, {
      data: results,
      timestamp: Date.now()
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Job search error:', error);
    return NextResponse.json(
      { error: 'Failed to search jobs' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return popular job categories and locations for suggestions
    const suggestions = {
      popularRoles: [
        'Software Engineer',
        'Data Scientist',
        'Product Manager',
        'UX Designer',
        'Marketing Manager',
        'Sales Representative',
        'Business Analyst',
        'DevOps Engineer'
      ],
      popularLocations: [
        'San Francisco, CA',
        'New York, NY',
        'Seattle, WA',
        'Austin, TX',
        'Boston, MA',
        'Remote',
        'London, UK',
        'Toronto, Canada'
      ],
      popularSkills: [
        'JavaScript',
        'Python',
        'React',
        'Node.js',
        'AWS',
        'SQL',
        'Machine Learning',
        'Project Management',
        'Figma',
        'Salesforce'
      ]
    };

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Error fetching job suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}