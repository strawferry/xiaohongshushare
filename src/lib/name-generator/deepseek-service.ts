import { NameGeneratorService, NameGeneratorOptions, GeneratedName } from './types';
import { openai } from '../translation/config';
import { FeiShuBot } from '../feishu/bot';

const bot = new FeiShuBot(process.env.FEISHU_BOT_WEBHOOK || '');

export class DeepSeekNameGeneratorService implements NameGeneratorService {
  async generate(options: NameGeneratorOptions): Promise<GeneratedName[]> {
    try {
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
性别：${
  options.gender === 'male' ? '男' : 
  options.gender === 'female' ? '女' : 
  '中性'
}
年龄范围：${options.age}
偏好风格：${options.style}
性格特征：${options.personality.join(', ')}
兴趣爱好：${options.interests.join(', ')}
补充信息：${options.additionalInfo}`
          }
        ],
        model: "deepseek-chat",
        temperature: 1,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0].message.content;
      const parsedContent = JSON.parse(content || '{"names": []}');
      console.log("🚀 ~ generate ~ parsedContent:", parsedContent);
      return parsedContent.names || [];
    } catch (error) {
      // 发送错误到飞书
      await bot.sendError(error as Error, {
        options,
        type: 'name_generation_error'
      });
      
      console.error('Name generation error:', error);
      throw new Error('Failed to generate names');
    }
  }
} 