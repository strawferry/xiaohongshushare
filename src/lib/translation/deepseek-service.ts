import { TranslationService, TranslationResult } from './types';
import { openai } from './config';

export class DeepSeekTranslationService implements TranslationService {
  async translate(text: string): Promise<TranslationResult> {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { 
            role: "system", 
            content: `请基于以下规则生成翻译：
1. 首先判断输入内容是中文还是英文，若是中文则翻译成英文，英文则翻译成中文。
2. 进行沉浸式翻译，依据内容的语境和文本长度合理分段拼接展示。例如，对于较长的文本，按照语义逻辑分成小段，每段原始内容与翻译内容对应显示，中间用换行符分隔。
3. 内容里面有些如:[旺柴],的是 emoji 表情，请保留这些表情不去翻译。
4. 内容中标点符号在翻译的时候请保留,译文也保持通顺的标点符号显示。
5. 最终以JSON格式输出，结构如下：
{
"origin":"输入的原始内容",
"translate":"完整的翻译结果",
"captionTranslate":"沉浸式翻译的详细内容，格式为原始内容与翻译内容按段对应，每行一对，中间换行"
}
确保翻译准确且符合语言习惯，沉浸式翻译的分段合理清晰，能准确传达原文意思。`
          },
          {
            role: "user",
            content: text
          }
        ],
        model: "deepseek-chat",
        temperature: 1.3,
        max_tokens: 8192
      });

      const content = completion.choices[0].message.content || '';
      
      try {
        // console.log("🚀 ~ DeepSeekTranslationService ~ translate ~ content:", content)
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