import { generateSitemap } from '../src/lib/sitemap';

generateSitemap()
  .then(() => {
    console.log('Sitemap generation completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Sitemap generation failed:', error);
    process.exit(1);
  }); 