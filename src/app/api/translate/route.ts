import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    // 调用 DeepSeek API 获取两种翻译
    const [completeResponse, parallelResponse] = await Promise.all([
      axios.post('https://api.deepseek.com/v1/translate', {
        text,
        source_lang: 'zh',
        target_lang: 'en',
        mode: 'complete'
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }),
      axios.post('https://api.deepseek.com/v1/translate', {
        text,
        source_lang: 'zh',
        target_lang: 'en',
        mode: 'parallel'
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      })
    ]);

    return NextResponse.json({
      completeTranslation: completeResponse.data.translation,
      parallelTranslation: parallelResponse.data.translation,
    });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
} 