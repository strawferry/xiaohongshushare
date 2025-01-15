import { NextResponse } from 'next/server';
import { getTranslationHistory } from '@/lib/db';

export async function GET() {
  try {
    const history = await getTranslationHistory();
    return NextResponse.json(history);
  } catch (error) {
    console.error('Failed to get translation history:', error);
    return NextResponse.json(
      { error: 'Failed to get translation history' },
      { status: 500 }
    );
  }
} 