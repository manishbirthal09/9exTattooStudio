import { Helmet } from 'react-helmet-async';
import { siteUrl, defaultOgImage, business } from '../data/seoConfig.js';

export default function SEO({
  title,
  description = business.description,
  path = '/',
  image = defaultOgImage,
  noindex = false,
  jsonLd = null, 
}) {
  const canonical = `${siteUrl}${path === '/' ? '' : path}`;
  const fullTitle = title ? `${title} | 9Ex Tattoo Studio` : '9Ex Tattoo Studio';
  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="9Ex Tattoo Studio" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}