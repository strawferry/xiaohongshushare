import { writeFileSync } from 'fs';
import { getAllPosts } from './blog';

async function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  // 静态页面
  const staticPages = [
    '',
    '/translator',
    '/name-generator',
    '/blog',
  ];

  // 博客文章页面
  const posts = await getAllPosts();
  const blogPages = posts.map(post => `/blog/${post.slug}`);

  const pages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `).join('')}
    </urlset>
  `;

  writeFileSync('public/sitemap.xml', sitemap);
} 