'use client';

import { useState } from 'react';
import BlogSort, { SortOption } from './BlogSort';

interface BlogFiltersProps {
  categories: string[];
  tags: string[];
  onFilterChange: (category: string | null, selectedTags: string[]) => void;
  onSort: (option: SortOption) => void;
}

export default function BlogFilters({ categories, tags, onFilterChange, onSort }: BlogFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    onFilterChange(category, selectedTags);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFilterChange(selectedCategory, newTags);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 mb-6">
      <div className="flex justify-between w-full">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange(null)}
          className={`px-3 py-1 rounded-full text-sm
            ${!selectedCategory 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
        >
          全部
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-3 py-1 rounded-full text-sm
              ${selectedCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
          >
            {category}
          </button>
        ))}
        </div>
        <BlogSort onSort={onSort} />
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagToggle(tag)}
            className={`px-3 py-1 rounded-full text-sm
              ${selectedTags.includes(tag)
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
} 