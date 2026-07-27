import responsiveManifest from "@/assets/products/responsive-manifest.json";

type ManifestEntry = {
  original: string;
  webp: Record<string, string>;
  avif: Record<string, string>;
  widths: number[];
};

const manifest = responsiveManifest as Record<string, ManifestEntry>;

interface ResponsiveProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
}

/**
 * <picture>-based product image with AVIF/WebP variants and responsive srcset.
 * Falls back to the original <img src> when no manifest entry exists.
 */
const ResponsiveProductImage = ({
  src,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  loading = "lazy",
  decoding = "async",
  ...rest
}: ResponsiveProductImageProps) => {
  const base = src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  const entry = manifest[base];

  if (!entry) {
    return <img src={src} alt={alt} loading={loading} decoding={decoding} {...rest} />;
  }

  const toSrcSet = (map: Record<string, string>) =>
    Object.entries(map)
      .map(([w, url]) => `${url} ${w}w`)
      .join(", ");

  return (
    <picture>
      <source type="image/avif" srcSet={toSrcSet(entry.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={toSrcSet(entry.webp)} sizes={sizes} />
      <img src={src} alt={alt} loading={loading} decoding={decoding} {...rest} />
    </picture>
  );
};

export default ResponsiveProductImage;
