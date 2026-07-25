import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import categoryBelts from "@/assets/category-belts.jpg";
import categorySheets from "@/assets/category-sheets.jpg";
import categoryBearings from "@/assets/category-bearings.jpg";
import categoryTools from "@/assets/category-tools.jpg";

const categories = [
  {
    id: 1,
    name: "Belts & Drive Systems",
    description: "V-Belts, Timing Belts, Conveyor Belts, Steel Belt Lacing",
    image: categoryBelts,
    count: "250+ Products",
  },
  {
    id: 2,
    name: "Industrial Sheets",
    description: "Rubber, Silicon, PVC, Teflon, Cork, Nylon Sheets",
    image: categorySheets,
    count: "180+ Products",
  },
  {
    id: 3,
    name: "Bearings & Parts",
    description: "Ball Bearings, Roller Bearings, Nylon Shafts",
    image: categoryBearings,
    count: "320+ Products",
  },
  {
    id: 4,
    name: "Tools & Supplies",
    description: "Hardware Tools, WD-40, Lubricants, Accessories",
    image: categoryTools,
    count: "450+ Products",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Browse Categories
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-foreground mt-4">
            EXPLORE OUR PRODUCT RANGE
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Discover thousands of industrial hardware products across multiple categories, 
            all sourced from trusted manufacturers worldwide.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to="/products"
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-glow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                  {category.count}
                </span>
                <h3 className="font-display text-2xl text-foreground mt-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-primary font-medium">
                  <span>View Products</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
