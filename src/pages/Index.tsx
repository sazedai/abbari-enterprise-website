import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="A BBARI Enterprise — Industrial Hardware & V-Belts Supplier"
        description="B2B supplier of V-belts, bearings, conveyor systems and industrial hardware. Premium brands, quotation-based pricing, fast turnaround."
        path="/"
      />
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
