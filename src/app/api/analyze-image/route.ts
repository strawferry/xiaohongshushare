import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('Missing Gemini API key');
}

// 定义返回结果的结构
const ImageAnalysis = z.object({
  description: z.string(), // 中英文分段描述
  tags: z.array(z.string()), // 中英文标签，用 / 分隔
  isNSFW: z.boolean()
});

// 初始化 OpenAI 客户端，但使用 Gemini API
const openai = new OpenAI({
  apiKey: GEMINI_API_KEY,
  baseURL: "https://api-proxy.me/gemini/v1beta/openai"
});

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    // 从 base64 URL 中提取实际的 base64 字符串和 MIME 类型
    const [header, base64Image] = imageUrl.split(',');
    const mimeType = header.match(/data:(.*?);/)?.[1] || 'image/jpeg';

    const completion = await openai.beta.chat.completions.parse({
      model: "gemini-1.5-flash",
      messages: [
        {
          role: "system",
          content: "你是一个图片分析助手。请提供中英文双语分析结果。描述部分用中英文分段，标签用'/'分隔中英文。"
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `分析这张图片，并按以下格式返回：
{
  "description": "这是一张美丽的风景照片，展现了壮丽的山川和蓝天。 \\n This is a beautiful landscape photo showing majestic mountains and blue sky. \\n 其他描述 \\n other description",
  "tags": ["风景/landscape", "自然/nature", "山川/mountains"],
  "isNSFW": false
}

注意：
1. description 中先写中文描述，空一行后写英文描述
2. tags 中每个标签都是"中文/英文"的格式
3. 标签数量控制在 5-10 个之间`
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      response_format: zodResponseFormat(ImageAnalysis, "analysis"),
    });

    const result = completion.choices[0].message.parsed;
    console.log("🚀 ~ POST ~ result:", result);
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('Image analysis error:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json(
      { error: `图片分析失败: ${errorMessage}` },
      { status: 500 }
    );
  }
} 