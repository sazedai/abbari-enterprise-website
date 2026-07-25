import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Abbari Enterprise" },
      { name: "description", content: "Get in touch with Abbari Enterprise. Contact our team for strategy, operations, technology, and risk advisory services." },
      { property: "og:title", content: "Contact — Abbari Enterprise" },
      { property: "og:description", content: "Get in touch with Abbari Enterprise. Contact our team for strategy, operations, technology, and risk advisory services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-bronze">
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-medium text-foreground sm:text-5xl">
              Let's build something lasting.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Tell us about your challenge. We'll respond within two business
              days to schedule a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  placeholder="jane.doe@company.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-foreground">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Acme Inc."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-foreground">
                  Service of interest
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a service</option>
                  <option value="strategy">Strategy</option>
                  <option value="operations">Operations</option>
                  <option value="technology">Technology</option>
                  <option value="risk">Risk & Compliance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Tell us about your challenge and what you'd like to achieve."
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
              >
                Send message
              </button>
            </form>

            <div className="space-y-8 lg:pl-12">
              <div>
                <h2 className="text-2xl font-medium text-foreground">Get in touch</h2>
                <p className="mt-3 text-muted-foreground">
                  Our team is ready to learn about your priorities and discuss
                  how Abbari can help.
                </p>
              </div>

              <div className="space-y-6">
                <ContactItem
                  icon={Mail}
                  label="Email"
                  value="hello@abbari.com"
                  href="mailto:hello@abbari.com"
                />
                <ContactItem
                  icon={Phone}
                  label="Phone"
                  value="+1 (212) 555-0147"
                  href="tel:+12125550147"
                />
                <ContactItem
                  icon={MapPin}
                  label="Headquarters"
                  value="350 Fifth Avenue, Suite 7600, New York, NY 10118"
                />
                <ContactItem
                  icon={Clock}
                  label="Office hours"
                  value="Monday — Friday, 9:00 AM — 6:00 PM EST"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="inline-flex rounded-lg bg-muted p-2 text-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 text-base text-foreground">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition-colors hover:opacity-80">
        {content}
      </a>
    );
  }

  return content;
}
