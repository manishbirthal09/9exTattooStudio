import { siteUrl, business, defaultOgImage } from './seoConfig.js';

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TattooParlor', 'LocalBusiness'],
    '@id': `${siteUrl}/#business`,
    name: business.legalName,
    description: business.description,
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    image: defaultOgImage,
    logo: `${siteUrl}/gallery/logo.webp`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '11:00',
        closes: '21:00',
      },
    ],
    sameAs: Object.values(business.social).filter(Boolean),
    founder: {
      '@type': 'Person',
      name: 'Shashikant Shelar',
      jobTitle: 'Founder, CEO & Lead Tattoo Artist',
    },
  };
}


export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path === '/' ? '' : item.path}`,
    })),
  };
}


export function buildFounderPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shashikant Shelar',
    jobTitle: 'Founder, CEO & Lead Tattoo Artist',
    worksFor: { '@type': 'Organization', name: business.legalName },
    image: `${siteUrl}/gallery/founder.webp`,
  };
}