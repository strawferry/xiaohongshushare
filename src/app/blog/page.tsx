import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog';
import { BilingualText } from '@/components/BilingualText';
import BlogListClient from '@/components/BlogListClient';

export default async function BlogList() {
  const [posts, categories, tags] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllTags(),
  ]);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <BilingualText 
        zh="博客文章"
        en="Blog Posts"
        className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8"
      />
      
      <BlogListClient 
        initialPosts={posts}
        categories={categories}
        tags={tags}
      />
    </div>
  );
} 