import TranslatorContainer from '@/components/TranslatorContainer';
import { BilingualText } from '@/components/BilingualText';
import { TEXT } from '@/constants/text';

export default function Home() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <TranslatorContainer />
    </div>
  );
} 