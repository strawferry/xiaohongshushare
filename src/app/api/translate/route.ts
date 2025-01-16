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
    
    // 保存翻译历史
    // try {
    //   await saveTranslation({
    //     origin: result.origin,
    //     translate: result.translate,
    //     captionTranslate: result.captionTranslate,
    //     timestamp: new Date()
    //   });
    // } catch (dbError) {
    //   console.error('Failed to save translation history:', dbError);
    //   // 即使保存失败也继续返回翻译结果
    // }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    );
  }
} 