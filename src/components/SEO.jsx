import { Helmet } from 'react-helmet-async';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'OmagleChat';
const APP_URL = import.meta.env.VITE_APP_URL || 'https://omaglechat.com';

const SEO = ({ 
  title, 
  description, 
  url, 
  image = '/og-image.png',
  type = 'website',
  noIndex = false
}) => {
  const canonicalUrl = url ? `${APP_URL}${url}` : APP_URL;
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  const fullImage = image.startsWith('http') ? image : `${APP_URL}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:locale" content="en_US" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      <meta name="author" content={APP_NAME} />
      <meta name="theme-color" content="#3b82f6" />
    </Helmet>
  );
};

export const generateJsonLd = (data) => ({
  __html: JSON.stringify(data)
});

export default SEO;
