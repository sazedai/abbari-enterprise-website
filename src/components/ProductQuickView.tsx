import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  category: string;
  rating: number;
  description: string;
}

interface ProductQuickViewProps {
  product: Product | null;
  productImage: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductQuickView = ({ product, productImage, open, onOpenChange }: ProductQuickViewProps) => {
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      image: productImage,
    });
    toast.success(`${product.name} added to quotation cart`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="aspect-square bg-secondary overflow-hidden relative">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-foreground/10" />
          </div>

          <div className="p-6 flex flex-col">
            <DialogHeader className="text-left">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                {product.category}
              </span>
              <DialogTitle className="text-2xl font-display text-foreground mt-2">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.rating} rating)
              </span>
            </div>

            <p className="text-muted-foreground mt-4 flex-1">{product.description}</p>

            <div className="mt-6 space-y-4">
              <Button className="w-full" size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart for Quotation
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Contact us for pricing and availability
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
