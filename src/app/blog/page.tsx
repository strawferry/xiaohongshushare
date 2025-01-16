'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getAllCategories, getAllTags, searchPosts, PostMeta } from '@/lib/blog';
import { BilingualText } from '@/components/BilingualText';
import BlogSearch from '@/components/BlogSearch';
import BlogFilters from '@/components/BlogFilters';

export default function BlogList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [allPosts, allCategories, allTags] = await Promise.all([
        getAllPosts(),
        getAllCategories(),
        getAllTags(),
      ]);
      setPosts(allPosts);
      setCategories(allCategories);
      setTags(allTags);

      // 处理 URL 参数
      const category = searchParams.get('category');
      const tag = searchParams.get('tag');
      let filtered = [...allPosts];
      
      if (category) {
        filtered = filtered.filter(post => post.category === category);
      }
      
      if (tag) {
        filtered = filtered.filter(post => post.tags.includes(tag));
      }
      
      setFilteredPosts(filtered);
    };
    fetchData();
  }, [searchParams]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredPosts(posts);
      return;
    }
    const results = await searchPosts(query);
    setFilteredPosts(results);
  };

  const handleFilter = (category: string | null, selectedTags: string[]) => {
    let filtered = [...posts];
    
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

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <BilingualText 
        zh="博客文章"
        en="Blog Posts"
        className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8"
      />
      
      <BlogSearch onSearch={handleSearch} />
      <BlogFilters 
        categories={categories}
        tags={tags}
        onFilterChange={handleFilter}
      />

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