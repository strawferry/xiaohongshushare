import TranslatorContainer from '@/components/TranslatorContainer';
import { BilingualText } from '@/components/BilingualText';
import { TEXT } from '@/constants/text';
import { Metadata } from 'next';

export default function TranslatorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">
          <BilingualText
            zh={TEXT.title.zh}
            en={TEXT.title.en}
          />
        </h1>
        <TranslatorContainer />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: '小红书中英文互译工具',
  description: '小红书智能中英文互译工具，支持长文本翻译，提供准确的翻译结果',
  keywords: ['中英互译', '翻译工具', '在线翻译', 'AI翻译', '小红书翻译'],
}; 