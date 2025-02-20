'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BilingualText } from './BilingualText';

interface BlogSearchProps {
  onSearch: (query: string) => void;
}

export default function BlogSearch({ onSearch }: BlogSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章..."
            className="w-full px-4 py-2 pl-10 rounded-lg border
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-100
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg
            bg-primary-500 hover:bg-primary-600 
            dark:bg-primary-600 dark:hover:bg-primary-700
            text-white transition-colors"
        >
          搜索
        </button>
      </div>
    </form>
  );
} 