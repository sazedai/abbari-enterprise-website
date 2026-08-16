import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
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
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast.success("Message sent! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, title: "Phone", value: "+880 1711 596721", subtext: "+880 1611 596721" },
    { icon: Mail, title: "Email", value: "info@abbarienterprise.com", subtext: "24/7 Support" },
    { icon: MapPin, title: "Address", value: "78/8, Nawabpur Road", subtext: "Dhaka Market, Dhaka 1100, Bangladesh" },
    { icon: Clock, title: "Business Hours", value: "Sat - Thu: 9am - 8pm", subtext: "Fri: Closed" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Contact A BBARI Enterprise — Request Industrial Hardware Quotes"
        description="Contact A BBARI Enterprise for V-belt, bearing and industrial hardware quotations. Phone, email and address for business enquiries."
        path="/contact"
      />
      <Navbar />
      
      <section className="pt-40 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
            <h1 className="font-display text-5xl md:text-6xl text-foreground mt-4">CONTACT US</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Have questions? Need a quote? Our team is ready to help you find the right industrial solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{info.title}</h3>
                    <p className="text-foreground mt-1">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border">
                <h2 className="font-display text-3xl text-foreground mb-6">SEND US A MESSAGE</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary resize-none"
                    required
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="mt-6" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
