import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import heroManifest from "@/assets/hero/responsive-manifest.json";

type HeroEntry = {
  original: string;
  webp: Record<string, string>;
  avif: Record<string, string>;
  widths: number[];
};
const manifest = heroManifest as Record<string, HeroEntry>;

const heroSlides: { base: string; alt: string }[] = [
  { base: "hero-industrial", alt: "Abbari Enterprise industrial hardware showcase" },
  { base: "hero-calipers", alt: "Precision measurement with digital calipers on industrial hardware" },
  { base: "hero-tablet", alt: "Engineering CAD schematics on a tablet in the workshop" },
  { base: "hero-crate", alt: "Secured industrial shipping crate ready for dispatch" },
];

const sizesAttr = "(max-width: 1024px) 100vw, 50vw";

const toSrcSet = (map: Record<string, string>) =>
  Object.entries(map).map(([w, url]) => `${url} ${w}w`).join(", ");

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Preload the next slide's AVIF at a mid width so transitions feel instant.
  useEffect(() => {
    const next = heroSlides[(current + 1) % heroSlides.length];
    const entry = manifest[next.base];
    if (!entry) return;
    const url = entry.avif[1024] || entry.webp[1024] || entry.original;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [current]);

  const goTo = (i: number) => setCurrent((i + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Premium Industrial Solutions</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-none group cursor-default">
              <span className="text-gradient group-hover:text-foreground transition-all duration-300">YOUR ONE-STOP</span>
              <br />
              <span className="text-foreground group-hover:text-gradient transition-all duration-300">INDUSTRIAL</span>
              <br />
              <span className="text-gradient group-hover:text-foreground transition-all duration-300">HARDWARE STORE</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              From V-Belts to Bearings, Conveyor Systems to Insulation Materials — 
              we supply premium industrial hardware for every application.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="hero" size="xl">
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl">
                  Request Quote
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:flex md:justify-center gap-6 md:gap-12 pt-8 border-t border-border">
              {[
                { value: "50+", label: "Years Experience" },
                { value: "500+", label: "Products" },
                { value: "50+", label: "Partner Brands" },
                { value: "5,000+", label: "Happy Clients" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl md:text-4xl text-primary">{stat.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="relative scale-[1.05] origin-center">
            <div className="relative h-[520px] rounded-3xl overflow-hidden shadow-card border border-border group">
              {heroSlides.map((slide, i) => {
                const entry = manifest[slide.base];
                const isLCP = i === 0;
                const isActive = i === current;
                const commonImg = {
                  alt: slide.alt,
                  className: `absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`,
                  loading: isLCP ? ("eager" as const) : ("lazy" as const),
                  decoding: "async" as const,
                  fetchPriority: isLCP ? ("high" as const) : ("low" as const),
                };
                if (!entry) {
                  return <img key={slide.base} src={`/assets/hero/${slide.base}.jpg`} {...commonImg} />;
                }
                return (
                  <picture key={slide.base}>
                    <source type="image/avif" srcSet={toSrcSet(entry.avif)} sizes={sizesAttr} />
                    <source type="image/webp" srcSet={toSrcSet(entry.webp)} sizes={sizesAttr} />
                    <img src={entry.original} {...commonImg} />
                  </picture>
                );
              })}
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />

              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => goTo(current - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 hover:bg-background text-foreground flex items-center justify-center backdrop-blur border border-border transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => goTo(current + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 hover:bg-background text-foreground flex items-center justify-center backdrop-blur border border-border transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === current ? "w-6 bg-primary" : "w-2 bg-background/60 hover:bg-background"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="hidden lg:block absolute -left-4 top-1/4 bg-card p-4 rounded-xl shadow-card border border-border animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Quality Assured</p>
                  <p className="text-xs text-muted-foreground">Rigorous Standards</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute -right-4 bottom-1/4 bg-card p-4 rounded-xl shadow-card border border-border animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Fast Delivery</p>
                  <p className="text-xs text-muted-foreground">Nationwide Shipping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
