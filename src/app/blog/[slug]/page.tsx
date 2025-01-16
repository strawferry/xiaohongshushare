import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';

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
        <div className="prose dark:prose-invert prose-lg mx-auto">
          <h1>{post.title}</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            {new Date(post.date).toLocaleDateString('zh-CN')}
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </article>
  );
} 