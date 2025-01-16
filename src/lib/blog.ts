import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

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

export async function getPostBySlug(slug: string): Promise<Post | null> {
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

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
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

    return allPosts
      .filter((post): post is PostMeta => post !== null)
      .sort((a, b) => {
        if (a.order !== b.order) {
          return a.order - b.order;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.map(post => post.category)));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  return Array.from(new Set(posts.flatMap(post => post.tags)));
}

export async function searchPosts(query: string): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  const searchTerms = query.toLowerCase().split(' ');
  
  return posts.filter(post => {
    const searchText = `
      ${post.title} 
      ${post.excerpt} 
      ${post.category} 
      ${post.tags.join(' ')}
    `.toLowerCase();
    return searchTerms.every(term => searchText.includes(term));
  });
} 