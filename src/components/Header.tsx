import Link from 'next/link';
import { BilingualText } from './BilingualText';
import { TEXT } from '@/constants/text';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-gray-900 dark:text-gray-100 sm:ml-10">
            <BilingualText
              zh="首页"
              en="Home"
              className="text-sm"
            />
          </Link>
          <BilingualText 
        zh={TEXT.title.zh}
        en={TEXT.title.en}
        className="text-xl font-bold text-center"
      />
          <Link 
            href="/blog" 
            className="text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 sm:mr-10"
          >
            <BilingualText
              zh="博客"
              en="Blog"
              className="text-sm"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
} 