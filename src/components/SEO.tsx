import { Helmet } from "react-helmet-async";

const SITE_URL = "https://abbarient.lovable.app";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "product";
  keywords?: string[];
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({ title, description, path, type = "website", keywords, image, jsonLd }: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const keywordsStr = keywords && keywords.length ? keywords.join(", ") : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsStr && <meta name="keywords" content={keywordsStr} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta name="twitter:card" content="summary_large_image" />}
      {image && <meta name="twitter:image" content={image} />}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
