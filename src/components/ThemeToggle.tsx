'use client';

import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-lg shadow-lg backdrop-blur">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md ${
          theme === 'light'
            ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900'
            : 'text-gray-500 hover:text-yellow-500'
        }`}
      >
        <FaSun size={20} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md ${
          theme === 'dark'
            ? 'text-blue-500 bg-blue-100 dark:bg-blue-900'
            : 'text-gray-500 hover:text-blue-500'
        }`}
      >
        <FaMoon size={20} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md ${
          theme === 'system'
            ? 'text-green-500 bg-green-100 dark:bg-green-900'
            : 'text-gray-500 hover:text-green-500'
        }`}
      >
        <FaDesktop size={20} />
      </button>
    </div>
  );
} 