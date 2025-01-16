const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

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
  const res = await fetch(`${BASE_URL}/api/blog?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) return null;
  return res.json();
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const res = await fetch(`${BASE_URL}/api/blog`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.posts;
}

export async function getAllCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/api/blog`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.categories;
}

export async function getAllTags(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/api/blog`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.tags;
}

export async function searchPosts(query: string): Promise<PostMeta[]> {
  const res = await fetch(`${BASE_URL}/api/blog?query=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  return res.json();
} 