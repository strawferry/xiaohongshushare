import Link from 'next/link';
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog';
import { BilingualText } from '@/components/BilingualText';

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

      <div className="max-w-4xl mx-auto space-y-2 sm:space-y-4">
        {posts.map((post) => (
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