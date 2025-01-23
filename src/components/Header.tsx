'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BilingualText } from './BilingualText';
import { FaTools, FaLanguage, FaSignature, FaBook, FaImage } from 'react-icons/fa';
import DropdownMenu from './DropdownMenu';
import { useRouter } from 'next/navigation';

const tools = [
  {
    id: 'translator',
    title: {
      zh: '中英互译',
      en: 'Translator'
    },
    icon: <FaLanguage size={16} />,
    href: '/translator'
  },
  {
    id: 'name-generator',
    title: {
      zh: '起名工具',
      en: 'Name Gen'
    },
    icon: <FaSignature size={16} />,
    href: '/name-generator'
  },
  {
    id: 'image-analyzer',
    title: {
      zh: '图片分析',
      en: 'Image Analysis'
    },
    icon: <FaImage size={16} />,
    href: '/image-analyzer'
  },
  {
    id: 'blog',
    title: {
      zh: '教程',
      en: 'Tutorials'
    },
    icon: <FaBook size={16} />,
    href: '/blog'
  }
];

export default function Header() {
  const router = useRouter();
  
  const menuItems = tools.map(tool => ({
    ...tool,
    onClick: () => router.push(tool.href)
  }));

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-gray-900 dark:text-gray-100">
            <BilingualText
              zh="首页"
              en="Home"
              className="text-sm"
            />
          </Link>
          <Link href="/" >
            <BilingualText
              zh={'小红书分享'}
              en={'Xiaohongshu Share'}
              className="text-xl font-bold text-center mr-[-20px]"
            />
          </Link>
          <div className="mr-[-20px]">
            <DropdownMenu
              label={{ zh: "工具", en: "Tools" }}
              items={menuItems}
              position="right"
              showShadow={false}
            />
          </div>
        </div>
      </nav>
    </header>
  );
} 