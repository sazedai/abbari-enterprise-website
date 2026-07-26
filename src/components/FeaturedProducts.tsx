import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// Import product images
import glassWoolAsset from "@/assets/products/glass-wool.png.asset.json";
const glassWoolImg = glassWoolAsset.url;
import rockWoolAsset from "@/assets/products/rock-wool.png.asset.json";
const rockWoolImg = rockWoolAsset.url;
import wd40Asset from "@/assets/products/wd40.png.asset.json";
const wd40Img = wd40Asset.url;
import teflonClothAsset from "@/assets/products/teflon-cloth.png.asset.json";
const teflonClothImg = teflonClothAsset.url;
import stainlessSteelNetAsset from "@/assets/products/stainless-steel-net.png.asset.json";
const stainlessSteelNetImg = stainlessSteelNetAsset.url;
import bitumenMembraneAsset from "@/assets/products/bitumen-membrane.png.asset.json";
const bitumenMembraneImg = bitumenMembraneAsset.url;

const products = [
  {
    id: 15,
    name: "WD-40 Multi-Use 400ml",
    category: "Tools",
    rating: 4.9,
    reviews: 256,
    image: wd40Img,
    badge: "Popular",
  },
  {
    id: 16,
    name: "Rock Wool Insulation",
    category: "Insulation",
    rating: 4.7,
    reviews: 89,
    image: rockWoolImg,
    badge: "Best Seller",
  },
  {
    id: 17,
    name: "Glass Wool Roll",
    category: "Insulation",
    rating: 4.6,
    reviews: 67,
    image: glassWoolImg,
    badge: null,
  },
  {
    id: 19,
    name: "Teflon Cloth Roll",
    category: "Sheets",
    rating: 4.8,
    reviews: 45,
    image: teflonClothImg,
    badge: "New",
  },
  {
    id: 20,
    name: "Stainless Steel Net",
    category: "Engineering",
    rating: 4.7,
    reviews: 34,
    image: stainlessSteelNetImg,
    badge: null,
  },
  {
    id: 21,
    name: "Bitumen Membrane",
    category: "Insulation",
    rating: 4.8,
    reviews: 52,
    image: bitumenMembraneImg,
    badge: "Sale",
  },
];

const FeaturedProducts = () => {
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
    });
    toast.success(`${product.name} added to quotation cart`);
  };

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Featured Products
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-foreground mt-4">
              TOP SELLING ITEMS
            </h2>
          </div>
          <Link to="/products">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-card"
            >
              {/* Image */}
              <Link to={`/products/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
                  draggable={false}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-foreground/10" />
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      product.badge === "Sale"
                        ? "bg-destructive text-destructive-foreground"
                        : product.badge === "New"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
              </Link>

              {/* Content */}
              <div className="p-6">
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg text-foreground mt-2 group-hover:text-primary transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium text-foreground">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Add to Cart button */}
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart for Quotation
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
