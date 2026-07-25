import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingCart, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const Quotation = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error("Please add items to your quotation cart first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const quotationData = {
        ...formData,
        items: items.map((item) => ({
          name: item.name,
          category: item.category,
          quantity: item.quantity,
        })),
      };

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          ...formData,
          message: `QUOTATION REQUEST\n\nItems:\n${items
            .map((item) => `- ${item.name} (${item.category}) x ${item.quantity}`)
            .join("\n")}\n\nAdditional Notes:\n${formData.message}`,
        },
      });

      if (error) throw error;

      toast.success("Quotation request sent! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      clearCart();
    } catch (error: any) {
      console.error("Error sending quotation:", error);
      toast.error("Failed to send quotation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Request Quote
            </span>
            <h1 className="font-display text-5xl md:text-6xl text-foreground mt-4">
              QUOTATION CART
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Review your selected items and submit a quote request
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-display text-3xl text-foreground mb-4">
                YOUR CART IS EMPTY
              </h2>
              <p className="text-muted-foreground mb-8">
                Add products to your cart to request a quotation
              </p>
              <Link to="/products">
                <Button variant="hero" size="lg">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl text-foreground">
                    SELECTED ITEMS ({items.length})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-destructive hover:text-destructive"
                  >
                    Clear All
                  </Button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-foreground/10" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-primary font-medium uppercase">
                        {item.category}
                      </span>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-10 text-center font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Quote form */}
              <div className="lg:col-span-1">
                <form
                  onSubmit={handleSubmit}
                  className="p-6 rounded-xl bg-card border border-border sticky top-32"
                >
                  <h2 className="font-display text-2xl text-foreground mb-6">
                    REQUEST QUOTE
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full h-11 px-4 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full h-11 px-4 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full h-11 px-4 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full h-11 px-4 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary resize-none"
                        placeholder="Specify quantities, sizes, or special requirements..."
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {isSubmitting ? "Sending..." : "Submit Quote Request"}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Quotation;
