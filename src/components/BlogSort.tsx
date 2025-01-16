'use client';

import { useState } from 'react';
import { FaSort } from 'react-icons/fa';

export type SortOption = 'default' | 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

interface BlogSortProps {
  onSort: (option: SortOption) => void;
}

export default function BlogSort({ onSort }: BlogSortProps) {
  const [currentSort, setCurrentSort] = useState<SortOption>('date-desc');

  const sortOptions = [
    { value: 'default', label: '默认排序' },
    { value: 'date-desc', label: '最新发布' },
    { value: 'date-asc', label: '最早发布' },
    { value: 'title-asc', label: '标题 A-Z' },
    { value: 'title-desc', label: '标题 Z-A' },
  ] as const;

  const handleSort = (option: SortOption) => {
    setCurrentSort(option);
    onSort(option);
  };

  return (
    <div className="flex">
      <div className="relative inline-block">
        <select
          value={currentSort}
          onChange={(e) => handleSort(e.target.value as SortOption)}
          className="appearance-none pl-3 pr-8 py-1.5 rounded-lg
            bg-white dark:bg-gray-800 
            text-gray-700 dark:text-gray-300
            border border-gray-300 dark:border-gray-600
            focus:ring-2 focus:ring-primary-500 focus:border-transparent
            text-sm"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FaSort className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}