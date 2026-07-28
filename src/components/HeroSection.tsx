import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import heroIndustrial from "@/assets/hero-industrial.jpg";
import heroCalipers from "@/assets/hero/hero-calipers.jpg.asset.json";
import heroTablet from "@/assets/hero/hero-tablet.jpg.asset.json";
import heroCrate from "@/assets/hero/hero-crate.jpg.asset.json";

const heroSlides = [
  { src: heroIndustrial, alt: "Abbari Enterprise industrial hardware showcase" },
  { src: heroCalipers.url, alt: "Precision measurement with digital calipers on industrial hardware" },
  { src: heroTablet.url, alt: "Engineering CAD schematics on a tablet in the workshop" },
  { src: heroCrate.url, alt: "Secured industrial shipping crate ready for dispatch" },
];


const HeroSection = () => {
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
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[520px]">
              <div className="relative row-span-2 rounded-3xl overflow-hidden shadow-card border border-border group cursor-pointer">
                <img
                  src={heroCalipers.url}
                  alt="Precision measurement with digital calipers on industrial hardware"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-card border border-border group cursor-pointer">
                <img
                  src={heroTablet.url}
                  alt="Engineering CAD schematics on a tablet in the workshop"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-card border border-border group cursor-pointer">
                <img
                  src={heroCrate.url}
                  alt="Secured industrial shipping crate ready for dispatch"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
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
                  <p className="text-xs text-muted-foreground">ISO 9001 Certified</p>
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
