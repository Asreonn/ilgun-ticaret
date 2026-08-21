import { Helmet } from "react-helmet-async";
import { imageUrl, site } from "../lib/site";

export function PageMeta({ title, description, canonical, image }: { title: string; description: string; canonical: string; image?: string }) {
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const canonicalUrl = `${site.url}${canonical === "/" ? "/" : canonical}`;
  const ogImage = image ? (image.startsWith("http") ? image : `${location.origin}${imageUrl(image)}`) : `${site.url}/images/products/yesido-ec27/main.webp`;
  return <Helmet>
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:image" content={ogImage} />
  </Helmet>;
}
