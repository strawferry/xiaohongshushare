'use client';

import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function GithubCorner() {
  return (
    <Link
      href="https://github.com/strawferry/xiaohongshushare"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 p-3 bg-white/80 dark:bg-gray-800/80 
        rounded-full shadow-lg backdrop-blur hover:scale-110 transition-transform
        text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
      aria-label="View source on GitHub"
    >
      <FaGithub size={24} />
    </Link>
  );
} 