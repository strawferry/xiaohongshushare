import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// 确保博客目录存在
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  order: number;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  order: number;
}

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      content: contentHtml,
      category: data.category || '未分类',
      tags: data.tags || [],
      order: data.order || 0,
    };
  } catch (error) {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const query = searchParams.get('query');

  try {
    // 确保目录存在
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json({ posts: [], categories: [], tags: [] });
    }

    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post) {
        return NextResponse.json(null, { status: 404 });
      }
      return NextResponse.json(post);
    }

    const fileNames = fs.readdirSync(postsDirectory);
    // 如果目录为空，返回空数组
    if (fileNames.length === 0) {
      return NextResponse.json({ posts: [], categories: [], tags: [] });
    }

    const allPosts = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async fileName => {
          const slug = fileName.replace(/\.md$/, '');
          const post = await getPostBySlug(slug);
          if (!post) return null;
          const { content, ...meta } = post;
          return meta;
        })
    );

    const posts = allPosts
      .filter((post): post is PostMeta => post !== null)
      .sort((a, b) => {
        // 首先按 order 排序
        if (a.order !== b.order) {
          return a.order - b.order;
        }
        // order 相同时，按日期排序
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      const filteredPosts = posts.filter(post => {
        const searchText = `
          ${post.title} 
          ${post.excerpt} 
          ${post.category} 
          ${post.tags.join(' ')}
        `.toLowerCase();
        return searchTerms.every(term => searchText.includes(term));
      });
      return NextResponse.json(filteredPosts);
    }

    const categories = Array.from(new Set(posts.map(post => post.category)));
    const tags = Array.from(new Set(posts.flatMap(post => post.tags)));

    return NextResponse.json({ posts, categories, tags });
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog data' }, { status: 500 });
  }
} 