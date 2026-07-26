import { useEffect, useRef, useState, useCallback, WheelEvent, PointerEvent } from "react";

const MIN_SIZE = 60; // ignore tiny icons/logos

const HoverZoomProvider = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState<string>("");
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const draggingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);

  const close = useCallback(() => {
    setSrc(null);
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
      setSrc(img.currentSrc || img.src);
      setAlt(img.alt || "");
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [src, close]);

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
    e.preventDefault();
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

  if (!src) return null;

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
          onClick={() => { setScale(1); setTx(0); setTy(0); }}
          aria-label="Reset zoom"
          className="h-9 px-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-sm text-foreground"
        >Reset</button>
      </div>

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
    </div>
  );
};

export default HoverZoomProvider;
