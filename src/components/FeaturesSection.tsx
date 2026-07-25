import { Truck, Shield, Headphones, RefreshCw, Award, Clock } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Nationwide delivery within 2-5 business days",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "All products are ISO certified and quality tested",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Technical assistance from industry professionals",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy",
  },
  {
    icon: Award,
    title: "Trusted Brands",
    description: "Authorized dealer for 500+ premium brands",
  },
  {
    icon: Clock,
    title: "Quick Quotes",
    description: "Get custom pricing within 24 hours",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-foreground mt-4">
            BUILT FOR INDUSTRY LEADERS
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We're committed to providing the best industrial hardware solutions with 
            unmatched service and reliability.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-3">
                {feature.title.toUpperCase()}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
