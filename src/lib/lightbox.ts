export type LightboxDetail = {
  images: string[];
  alt?: string;
  index?: number;
};

export const LIGHTBOX_EVENT = "lightbox:open";

export const openLightbox = (detail: LightboxDetail) => {
  window.dispatchEvent(new CustomEvent<LightboxDetail>(LIGHTBOX_EVENT, { detail }));
};

/** Extra gallery images per product id (first image is the product's main image). */
export const productGalleryExtras: Record<number, string[]> = {
  51: [
    "/assets/products/industrial-spray-paint-detail-nozzle.png",
    "/assets/products/industrial-spray-paint-detail-cans.png",
    "/assets/products/industrial-spray-paint-detail-range.png",
  ],
};
