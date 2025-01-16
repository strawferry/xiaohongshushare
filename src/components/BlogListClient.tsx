'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PostMeta } from '@/lib/blog';
import BlogSearch from './BlogSearch';
import BlogFilters from './BlogFilters';
import BlogSort, { SortOption } from './BlogSort';
import { BilingualText } from './BilingualText';

interface BlogListClientProps {
  initialPosts: PostMeta[];
  categories: string[];
  tags: string[];
}

export default function BlogListClient({ initialPosts, categories, tags }: BlogListClientProps) {
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredPosts(initialPosts);
      return;
    }
    const searchTerms = query.toLowerCase().split(' ');
    const results = initialPosts.filter(post => {
      const searchText = `
        ${post.title} 
        ${post.excerpt} 
        ${post.category} 
        ${post.tags.join(' ')}
      `.toLowerCase();
      return searchTerms.every(term => searchText.includes(term));
    });
    setFilteredPosts(results);
  };

  const handleFilter = (category: string | null, selectedTags: string[]) => {
    let filtered = [...initialPosts];
    
    if (category) {
      filtered = filtered.filter(post => post.category === category);
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        selectedTags.every(tag => post.tags.includes(tag))
      );
    }
    
    setFilteredPosts(filtered);
  };

  const handleSort = (option: SortOption) => {
    setSortOption(option);
    const sorted = [...filteredPosts].sort((a, b) => {
      switch (option) {
        case 'default':
          if (a.order !== b.order) {
            return a.order - b.order;
          }
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        
        case 'title-asc':
          return a.title.localeCompare(b.title);
        
        case 'title-desc':
          return b.title.localeCompare(a.title);
        
        default:
          return 0;
      }
    });
    setFilteredPosts(sorted);
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto mb-6">
        <BlogSearch onSearch={handleSearch} />
        <BlogFilters 
          categories={categories}
          tags={tags}
          onFilterChange={handleFilter}
          onSort={handleSort}
        />
      </div>

      <div className="max-w-4xl mx-auto space-y-2 sm:space-y-4">
        {filteredPosts.map((post) => (
          <Link 
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md 
              hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                {post.category}
              </span>
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {post.excerpt}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              {new Date(post.date).toLocaleDateString('zh-CN')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 