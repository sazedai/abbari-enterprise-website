import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().nonempty({ message: "Name cannot be empty" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().max(30, { message: "Phone must be less than 30 characters" }).optional().or(z.literal("")),
  message: z.string().trim().nonempty({ message: "Question cannot be empty" }).max(1000, { message: "Question must be less than 1000 characters" }),
});

interface ProductQuestionFormProps {
  productName?: string;
  productId?: number | string;
}

const ProductQuestionForm = ({ productName, productId }: ProductQuestionFormProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const subjectLine = productName
        ? `Product question — ${productName}${productId ? ` (ID ${productId})` : ""}`
        : "Product question";
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || "",
          company: subjectLine,
          message: `${subjectLine}\n\n${parsed.data.message}`,
        },
      });
      if (error) throw error;
      toast.success("Question sent! Our team will reply within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send your question. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-12 px-4 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary";

  return (
    <section className="mt-16" id="ask-a-question">
      <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircleQuestion className="w-6 h-6 text-primary" />
          <h2 className="font-display text-2xl md:text-3xl text-foreground">ASK ABOUT THIS PRODUCT</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          {productName
            ? `Have a question about ${productName}? Send it over and our technical team will get back to you.`
            : "Send us your question and our technical team will get back to you."}
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="pq-name" className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
              <input
                id="pq-name"
                type="text"
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="pq-email" className="block text-sm font-medium text-foreground mb-2">Email *</label>
              <input
                id="pq-email"
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="pq-phone" className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <input
                id="pq-phone"
                type="tel"
                maxLength={30}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
              />
              {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="pq-message" className="block text-sm font-medium text-foreground mb-2">Your Question *</label>
            <textarea
              id="pq-message"
              rows={4}
              maxLength={1000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary resize-none"
            />
            {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
          </div>
          <Button type="submit" variant="hero" size="lg" className="mt-6" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
            {isSubmitting ? "Sending..." : "Send Question"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ProductQuestionForm;
