import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Tool from '@/models/Tool';
import { currentUser } from '@clerk/nextjs/server';

// GET - קבלת כלים עם סינון
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const difficulty = searchParams.get('difficulty');
    const context = searchParams.get('context');
    const hebrewOnly = searchParams.get('hebrewOnly') === 'true';
    const freeOnly = searchParams.get('freeOnly') === 'true';
    
    // בניית query
    const query: any = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (difficulty) {
      query.difficultyLevel = difficulty;
    }
    
    if (context) {
      query.pedagogicalContext = { $in: [context] };
    }
    
    if (hebrewOnly) {
      query.hebrewSupport = true;
    }
    
    if (freeOnly) {
      query.isFree = true;
    }
    
    const tools = await Tool.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);
    
    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}

// POST - יצירת כלי חדש
export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectToDatabase();
    
    const body = await request.json();
    
    const tool = new Tool({
      ...body,
      createdBy: user.id
    });
    
    await tool.save();
    
    return NextResponse.json(tool, { status: 201 });
  } catch (error) {
    console.error('Error creating tool:', error);
    return NextResponse.json(
      { error: 'Failed to create tool' },
      { status: 500 }
    );
  }
} 