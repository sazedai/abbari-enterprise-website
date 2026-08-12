import { useEffect, useRef, useState, useCallback, WheelEvent, PointerEvent } from "react";
import { LIGHTBOX_EVENT, type LightboxDetail } from "@/lib/lightbox";

const MIN_SIZE = 60; // ignore tiny icons/logos

const HoverZoomProvider = () => {
  const [images, setImages] = useState<string[] | null>(null);
  const [index, setIndex] = useState(0);
  const [alt, setAlt] = useState<string>("");
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const draggingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);

  const src = images ? images[index] : null;

  const resetView = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  const close = useCallback(() => {
    setImages(null);
    setIndex(0);
    resetView();
  }, [resetView]);

  const goTo = useCallback((i: number) => {
    setIndex(i);
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  useEffect(() => {
    const isEligible = (el: Element | null): el is HTMLImageElement => {
      if (!el || el.tagName !== "IMG") return false;
      const img = el as HTMLImageElement;
      if (img.closest("[data-no-zoom]")) return false;
      if (img.closest("nav, header, footer")) return false;
      const rect = img.getBoundingClientRect();
      if (rect.width < MIN_SIZE || rect.height < MIN_SIZE) return false;
      return true;
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!isEligible(target)) return;
      // Don't hijack clicks inside links/buttons meant to navigate
      if ((target as HTMLElement).closest("a, button")) return;
      e.preventDefault();
      e.stopPropagation();
      const img = target as HTMLImageElement;
      setImages([img.currentSrc || img.src]);
      setIndex(0);
      setAlt(img.alt || "");
    };

    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<LightboxDetail>).detail;
      if (!detail?.images?.length) return;
      setImages(detail.images);
      setIndex(detail.index ?? 0);
      setAlt(detail.alt ?? "");
      setScale(1);
      setTx(0);
      setTy(0);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener(LIGHTBOX_EVENT, onOpen as EventListener);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(LIGHTBOX_EVENT, onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setIndex((i) => (images ? (i + 1) % images.length : i));
      if (e.key === "ArrowLeft") setIndex((i) => (images ? (i - 1 + images.length) % images.length : i));
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [src, images, close]);

  const zoomBy = (delta: number) => {
    setScale((s) => {
      const next = Math.min(6, Math.max(1, +(s + delta).toFixed(2)));
      if (next === 1) {
        setTx(0);
        setTy(0);
      }
      return next;
    });
  };

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    zoomBy(e.deltaY > 0 ? -0.2 : 0.2);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (scale <= 1) return;
    draggingRef.current = true;
    lastPtRef.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !lastPtRef.current) return;
    const dx = e.clientX - lastPtRef.current.x;
    const dy = e.clientY - lastPtRef.current.y;
    lastPtRef.current = { x: e.clientX, y: e.clientY };
    setTx((v) => v + dx);
    setTy((v) => v + dy);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    lastPtRef.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  if (!src || !images) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md animate-fade-in flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onWheel={onWheel}
    >
      {/* Close */}
      <button
        onClick={close}
        aria-label="Close fullscreen"
        className="absolute top-5 right-5 h-11 w-11 rounded-full bg-card/90 border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center shadow-lg z-10"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>

      {/* Zoom controls */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-card/90 border border-border rounded-full px-2 py-1 shadow-lg z-10">
        <button
          onClick={() => zoomBy(-0.25)}
          aria-label="Zoom out"
          className="h-9 w-9 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center text-foreground"
        >−</button>
        <span className="text-sm text-muted-foreground w-14 text-center tabular-nums">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => zoomBy(0.25)}
          aria-label="Zoom in"
          className="h-9 w-9 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center text-foreground"
        >+</button>
        <button
          onClick={resetView}
          aria-label="Reset zoom"
          className="h-9 px-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-sm text-foreground"
        >Reset</button>
      </div>

      {/* Prev / next */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo((index - 1 + images.length) % images.length)}
            aria-label="Previous image"
            className="absolute left-5 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center shadow-lg z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            onClick={() => goTo((index + 1) % images.length)}
            aria-label="Next image"
            className="absolute right-5 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-card/90 border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center shadow-lg z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </>
      )}

      <div
        className="w-full h-full flex items-center justify-center overflow-hidden select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ cursor: scale > 1 ? (draggingRef.current ? "grabbing" : "grab") : "default", touchAction: "none" }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          data-no-zoom
          className="max-w-[92vw] max-h-[88vh] object-contain animate-scale-in"
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            transition: draggingRef.current ? "none" : "transform 0.15s ease-out",
          }}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-card/90 border border-border rounded-2xl p-2 shadow-lg z-10">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              className={`h-14 w-14 rounded-lg overflow-hidden border-2 transition-colors ${
                i === index ? "border-primary" : "border-transparent hover:border-primary/50"
              }`}
            >
              <img src={img} alt="" data-no-zoom className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HoverZoomProvider;
