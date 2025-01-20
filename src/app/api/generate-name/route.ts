import { NextResponse } from 'next/server';
import { openai } from '@/lib/translation/config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `你是一个专业的中文起名专家。请根据用户提供的信息，生成3个合适的中文名字。
每个名字都应该：
1. 符合中国传统文化
2. 音律优美
3. 寓意深远
4. 适合实际使用

请以JSON格式返回结果，格式如下：
{
  "names": [
    {
      "name": "中文名",
      "pinyin": "拼音",
      "description": "名字解释,格式为中文解释与英文解释按段对应分割，中间换行显示,英文解释中名字的字用中文,不需要变为拼音"
    }
  ]
}`
        },
        {
          role: "user",
          content: `请根据以下信息生成名字：
性别：${body.gender === 'male' ? '男' : '女'}
年龄范围：${body.age}
偏好风格：${body.style}
性格特征：${body.personality.join(', ')}
兴趣爱好：${body.interests.join(', ')}
补充信息：${body.additionalInfo}`
        }
      ],
      model: "deepseek-chat",
      temperature: 1,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;
    const parsedContent = JSON.parse(content || '{"names": []}');
    console.log("🚀 ~ POST ~ parsedContent:", parsedContent)
    const names = parsedContent.names || [];

    return NextResponse.json(names);
  } catch (error) {
    console.error('Name generation error:', error);
    return NextResponse.json([]);
  }
} 