import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="px-2 mt-4 mb-1">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-x-1 text-sm text-gray-600 dark:text-gray-400">
          <span>Built with</span>
          <Link 
            href="https://nextjs.org" 
            target="_blank"
            className="hover:text-primary-500 dark:hover:text-primary-400"
          >
            Next.js
          </Link>
          <span>+</span>
          <Link 
            href="https://deepseek.com" 
            target="_blank"
            className="hover:text-primary-500 dark:hover:text-primary-400"
          >
            DeepSeek-V3
          </Link>
          <span>on</span>
          <Link 
            href="https://cursor.sh" 
            target="_blank"
            className="hover:text-primary-500 dark:hover:text-primary-400"
          >
            Cursor
          </Link>
          <span>by</span>
          <Link 
            href="https://github.com/strawferry" 
            target="_blank"
            className="flex items-center hover:text-primary-500 dark:hover:text-primary-400"
          >
            <FaGithub className="mr-1" />
            ferryvip
          </Link>
          <span>·</span>
          <Link 
            href="https://blog.ferryvip.com/" 
            target="_blank"
            className="hover:text-primary-500 dark:hover:text-primary-400"
          >
            Author Blog
          </Link>
        </div>
      </div>
    </footer>
  );
} 