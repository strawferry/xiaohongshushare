import Link from 'next/link';
import { BilingualText } from '@/components/BilingualText';
import { FaLanguage, FaSignature, FaBook } from 'react-icons/fa';

interface Tool {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  icon: React.ReactNode;
  href: string;
}

const tools: Tool[] = [
  {
    id: 'translator',
    title: {
      zh: '中英互译',
      en: 'Translator',
    },
    description: {
      zh: '智能中英文互译工具，支持长文本翻译',
      en: 'Smart Chinese-English translation tool, supports long text translation',
    },
    icon: <FaLanguage className="w-6 h-6" />,
    href: '/translator',
  },
  {
    id: 'name-generator',
    title: {
      zh: '起名生成器',
      en: 'Name Gen',
    },
    description: {
      zh: '智能中文起名工具，根据个性特征生成合适的名字',
      en: 'Smart Chinese name generator based on personal characteristics',
    },
    icon: <FaSignature className="w-6 h-6" />,
    href: '/name-generator',
  },
  {
    id: 'blog',
    title: {
      zh: '教程博客',
      en: 'Tutorials',
    },
    description: {
      zh: '分享小红书运营和使用技巧的教程文章',
      en: 'Tutorial articles sharing Xiaohongshu operation and usage tips',
    },
    icon: <FaBook className="w-6 h-6" />,
    href: '/blog',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">
            <BilingualText
              zh="AI 智能工具集"
              en="AI Tools Collection"
            />
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-10">
            <BilingualText
              zh="为中英文用户打造的智能工具集"
              en="Smart tools designed for Chinese and English users"
            />
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm 
                  hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-primary-500 dark:text-primary-400 
                    group-hover:text-primary-600 dark:group-hover:text-primary-300 
                    transition-colors"
                  >
                    <div className="w-12 h-12 flex items-center justify-center">
                      {tool.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      <BilingualText
                        zh={tool.title.zh}
                        en={tool.title.en}
                      />
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                      <BilingualText
                        zh={tool.description.zh}
                        en={tool.description.en}
                      />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 