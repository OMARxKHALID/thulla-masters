export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login', '/api/'],
    },
    sitemap: 'https://thulla-masters.vercel.app/sitemap.xml',
  }
}
