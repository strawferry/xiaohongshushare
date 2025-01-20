import { NextResponse } from 'next/server';
import { createNameGeneratorService } from '@/lib/name-generator/factory';

const nameGenerator = createNameGeneratorService();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const names = await nameGenerator.generate(body);

    return NextResponse.json(names);
  } catch (error) {
    console.error('Name generation error:', error);
    return NextResponse.json([]);
  }
} 