import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { FaTag, FaFolder } from 'react-icons/fa';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center space-x-2 text-sm mb-4 text-gray-600 dark:text-gray-400">
          <Link 
            href="/blog"
            className="hover:text-primary-500 dark:hover:text-primary-400"
          >
            博客
          </Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
          {/* 文章标题和元信息 */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {/* 发布日期 */}
              <time className="text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString('zh-CN')}
              </time>

              {/* 分类 */}
              <Link 
                href={`/blog?category=${encodeURIComponent(post.category)}`}
                className="flex items-center gap-1 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
              >
                <FaFolder size={14} />
                <span>{post.category}</span>
              </Link>

              {/* 标签列表 */}
              <div className="flex flex-wrap items-center gap-2">
                <FaTag size={14} className="text-gray-400" />
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-2 py-0.5 text-xs rounded-full 
                      bg-gray-100 dark:bg-gray-700 
                      text-gray-700 dark:text-gray-300
                      hover:bg-primary-100 dark:hover:bg-primary-900
                      hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 文章内容 */}
          <div className="prose dark:prose-invert prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="mt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 rounded-lg
              bg-primary-500 hover:bg-primary-600 
              dark:bg-primary-600 dark:hover:bg-primary-700
              text-white transition-colors"
          >
            返回文章列表
          </Link>
        </div>
      </div>
    </article>
  );
} 