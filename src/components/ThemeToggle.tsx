'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaSun, FaMoon, FaDesktop, FaChevronDown } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';
import { BilingualText } from './BilingualText';
import { TEXT } from '@/constants/text';

const themes = [
  { id: 'light', icon: FaSun, text: TEXT.themes.light },
  { id: 'dark', icon: FaMoon, text: TEXT.themes.dark },
  { id: 'system', icon: FaDesktop, text: TEXT.themes.system },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // 获取当前主题的图标
  const getCurrentIcon = () => {
    const currentTheme = themes.find(t => t.id === theme);
    const Icon = currentTheme?.icon || FaSun;
    return <Icon size={20} />;
  };

  return (
    <Menu as="div" className="fixed z-50 top-[70px] sm:top-[15px] right-1 inline-block text-left">
      <div>
        <Menu.Button className="flex items-center space-x-2 p-2 rounded-lg 
          bg-white/80 dark:bg-gray-800/80 sm:dark:bg-gray-900/80
          text-gray-700 dark:text-gray-200 
          hover:bg-white dark:hover:bg-gray-800
          shadow-lg backdrop-blur">
          {getCurrentIcon()}
          <FaChevronDown size={12} className="ml-2" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg 
          bg-white dark:bg-gray-800 
          shadow-lg ring-1 ring-black ring-opacity-5 
          focus:outline-none
          divide-y divide-gray-100 dark:divide-gray-700">
          {themes.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setTheme(item.id)}
                      className={`${
                        active
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : ''
                      } ${
                        theme === item.id
                          ? 'text-primary-500 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-200'
                      } group flex w-full items-center rounded-md px-2 py-2`}
                    >
                      <Icon className="mr-2" size={18} />
                      <BilingualText
                        zh={item.text.zh}
                        en={item.text.en}
                        className="text-left"
                      />
                    </button>
                  )}
                </Menu.Item>
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 