'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';
import { BilingualText } from './BilingualText';

interface MenuItem {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

interface DropdownMenuProps {
  label: {
    zh: string;
    en: string;
  };
  items: MenuItem[];
  icon?: React.ReactNode;
  position?: 'left' | 'right';
  showShadow?: boolean;
}

export default function DropdownMenu({ label, items, icon, position = 'right', showShadow = true }: DropdownMenuProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={`flex items-center gap-2 p-2 rounded-lg 
          bg-white/80 dark:bg-gray-800/80
          text-gray-700 dark:text-gray-200 
          hover:bg-white dark:hover:bg-gray-800
          ${showShadow ? 'shadow-lg backdrop-blur' : ''}`}
        >
          {icon}
          <BilingualText
            zh={label.zh}
            en={label.en}
            className="text-sm"
          />
          <FaChevronDown
            className="w-3 h-3 transition-transform ui-open:rotate-180"
          />
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
        <Menu.Items className={`absolute ${position}-0 mt-2 w-40 origin-top-${position} rounded-lg 
          bg-white dark:bg-gray-800 
          shadow-lg ring-1 ring-black ring-opacity-5 
          focus:outline-none
          divide-y divide-gray-100 dark:divide-gray-700`}
        >
          {items.map((item) => (
            <Menu.Item key={item.id}>
              {({ active }) => (
                <button
                  onClick={item.onClick}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } group flex w-full items-center px-6 py-2 text-sm
                    text-gray-700 dark:text-gray-200 rounded-lg`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    {item.icon}
                    <BilingualText
                      zh={item.title.zh}
                      en={item.title.en}
                    />
                  </div>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}