'use client';

import { useState } from 'react';
import { PostMeta } from '@/lib/blog';
import BlogSearch from './BlogSearch';
import BlogFilters from './BlogFilters';
import BlogSort, { SortOption } from './BlogSort';

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
      if (option === 'default') {
        if (a.order !== b.order) {
          return a.order - b.order;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      // ... 其他排序逻辑保持不变
    });
    setFilteredPosts(sorted);
  };

  return (
    <div>
      <BlogSearch onSearch={handleSearch} />
      <BlogFilters 
        categories={categories}
        tags={tags}
        onFilterChange={handleFilter}
        onSort={handleSort}
      />
      {/* 显示过滤后的文章列表 */}
    </div>
  );
} 