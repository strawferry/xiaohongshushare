import { NextResponse } from 'next/server';
import { createTranslationService } from '@/lib/translation/factory';
import { saveTranslation } from '@/lib/db';

const translationService = createTranslationService();

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input text' },
        { status: 400 }
      );
    }

    const result = await translationService.translate(text);
    console.log("Translation result:", result);

    // 直接在翻译成功后保存历史记录
    try {
      await saveTranslation({
        origin: result.origin,
        translate: result.translate,
        captionTranslate: result.captionTranslate,
        timestamp: new Date()
      });
    } catch (dbError) {
      console.error('Failed to save translation history:', dbError);
      // 继续返回翻译结果，即使保存历史失败
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    );
  }
} 