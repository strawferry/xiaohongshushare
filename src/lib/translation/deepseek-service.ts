import { TranslationService, TranslationResult } from './types';
import { openai } from './config';

export class DeepSeekTranslationService implements TranslationService {
  async translate(text: string): Promise<TranslationResult> {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: `你是一个翻译助手。请将输入的文本翻译成另一种语言：
            - 如果输入是中文，翻译成英文
            - 如果输入是英文，翻译成中文
            
            请按照以下 JSON 格式返回结果：
            {
              "origin": "原文",
              "translate": "翻译后的文本",
              "captionTranslate": "原文\\n译文"
            }`
          },
          {
            role: "user",
            content: text
          }
        ],
        model: "deepseek-chat",
        temperature: 0.3,
        max_tokens: 2000
      });

      const content = completion.choices[0].message.content || '';
      console.log("Translation API response:", content);

      try {
        const result = JSON.parse(content) as TranslationResult;
        // 验证返回的数据格式是否正确
        if (!result.origin || !result.translate || !result.captionTranslate) {
          throw new Error('Invalid translation format');
        }
        return result;
      } catch (parseError) {
        console.error('Failed to parse translation result:', parseError, content);
        // 如果解析失败，返回一个基本的格式
        const translatedText = content.replace(/[{}"\\]/g, '').trim();
        return {
          origin: text,
          translate: translatedText,
          captionTranslate: `${text}\n${translatedText}`
        };
      }
    } catch (error) {
      console.error('DeepSeek translation error:', error);
      throw new Error('Translation failed');
    }
  }
} 