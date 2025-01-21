'use client';

import TranslatorContainer from '@/components/TranslatorContainer';
import { BilingualText } from '@/components/BilingualText';
import { TEXT } from '@/constants/text';

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