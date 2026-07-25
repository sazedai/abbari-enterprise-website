import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Award, Users, Target, History } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";

const About = () => {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "10,000+", label: "Products" },
    { value: "500+", label: "Partner Brands" },
    { value: "2,000+", label: "Happy Clients" },
  ];

  const values = [
    { icon: Award, title: "Quality First", description: "Every product meets strict quality standards and comes with certification." },
    { icon: Users, title: "Customer Focus", description: "We prioritize customer satisfaction with expert support and fast response times." },
    { icon: Target, title: "Industry Expertise", description: "Our team brings decades of experience in industrial hardware solutions." },
    { icon: History, title: "Reliable Supply", description: "Consistent inventory and reliable delivery to keep your operations running." },
  ];

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="About A BBARI Enterprise — Industrial Hardware Supplier"
        description="A BBARI Enterprise has 15+ years of experience supplying industrial V-belts, bearings and hardware to 2,000+ business clients."
        path="/about"
      />
      <Navbar />
      
      {/* Hero */}
      <section className="pt-40 pb-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h1 className="font-display text-5xl md:text-6xl text-foreground mt-4">
                YOUR TRUSTED PARTNER IN INDUSTRIAL HARDWARE
              </h1>
              <p className="text-muted-foreground mt-6 text-lg">
                Since 2010, Industrial Hub has been the go-to supplier for businesses seeking 
                premium quality industrial hardware. From small workshops to large manufacturing 
                plants, we serve clients across all industries with dedication and expertise.
              </p>
              <Button variant="hero" size="lg" className="mt-8">
                Contact Us
              </Button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img src={heroImage} alt="Industrial hardware collection" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-5xl text-primary">{stat.value}</p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="font-display text-5xl text-foreground mt-4">WHAT DRIVES US</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{value.title.toUpperCase()}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
