import TranslatorContainer from '@/components/TranslatorContainer';
import { BilingualText } from '@/components/BilingualText';
import { TEXT } from '@/constants/text';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BilingualText 
        zh={TEXT.title.zh}
        en={TEXT.title.en}
        className="text-3xl font-bold text-center mb-8"
      />
      <TranslatorContainer />
    </div>
  );
} 