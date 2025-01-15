import TranslatorContainer from '@/components/TranslatorContainer';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-700 dark:text-gray-200">小红书中英文翻译</h1>
      <TranslatorContainer />
    </div>
  );
} 