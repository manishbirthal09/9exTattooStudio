import fs from 'fs';

const siteUrl = 'https://9extattoo.com';

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/achievements', priority: '0.5', changefreq: 'monthly' },
  { path: '/testimonials', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/destiny-consultation', priority: '0.8', changefreq: 'monthly' },
  { path: '/locations/thane-mumbai', priority: '0.9', changefreq: 'monthly' },
  { path: '/locations/powai-mumbai', priority: '0.6', changefreq: 'monthly' },
  { path: '/locations/vashi-mumbai', priority: '0.6', changefreq: 'monthly' },
  { path: '/locations/bangalore', priority: '0.5', changefreq: 'monthly' },
];

const urls = staticRoutes
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log('sitemap.xml generated with', staticRoutes.length, 'URLs');