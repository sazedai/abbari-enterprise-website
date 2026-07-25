import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp,
  Zap,
  Globe,
  Shield,
  BarChart3,
  Layers,
  Cpu,
  Landmark,
} from "lucide-react";
import servicesNetwork from "../assets/services-network.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Abbari Enterprise" },
      { name: "description", content: "Explore Abbari Enterprise's services in strategy, operations, technology, risk, and compliance." },
      { property: "og:title", content: "Services — Abbari Enterprise" },
      { property: "og:description", content: "Explore Abbari Enterprise's services in strategy, operations, technology, risk, and compliance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: TrendingUp,
    title: "Strategy",
    description:
      "Define winning market positions, build growth roadmaps, and align leadership around a clear direction.",
    capabilities: [
      "Corporate strategy",
      "Market entry",
      "M&A advisory",
      "Portfolio optimization",
    ],
  },
  {
    icon: Zap,
    title: "Operations",
    description:
      "Redesign operating models, streamline processes, and unlock capacity across the value chain.",
    capabilities: [
      "Operating model design",
      "Process excellence",
      "Supply chain transformation",
      "Cost optimization",
    ],
  },
  {
    icon: Globe,
    title: "Technology",
    description:
      "Modernize technology platforms, integrate data, and accelerate digital initiatives with confidence.",
    capabilities: [
      "Digital transformation",
      "Enterprise architecture",
      "Data & analytics",
      "Cloud adoption",
    ],
  },
  {
    icon: Shield,
    title: "Risk & Compliance",
    description:
      "Strengthen governance, manage enterprise risk, and navigate an evolving regulatory landscape.",
    capabilities: [
      "Risk management",
      "Regulatory compliance",
      "Internal controls",
      "ESG advisory",
    ],
  },
  {
    icon: BarChart3,
    title: "Performance Improvement",
    description:
      "Identify and capture value quickly through rigorous diagnostics, targeted initiatives, and disciplined execution.",
    capabilities: [
      "Value creation",
      "KPI design",
      "Margin improvement",
      "Turnaround support",
    ],
  },
  {
    icon: Layers,
    title: "Organization & Change",
    description:
      "Build leadership, culture, and capabilities that sustain change and drive engagement.",
    capabilities: [
      "Organization design",
      "Change management",
      "Talent strategy",
      "Leadership development",
    ],
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    description:
      "Apply AI and intelligent automation to reimagine workflows, decisions, and customer experiences.",
    capabilities: [
      "AI strategy",
      "Intelligent automation",
      "Machine learning operations",
      "AI governance",
    ],
  },
  {
    icon: Landmark,
    title: "Industry Solutions",
    description:
      "Leverage deep sector expertise in financial services, healthcare, industrials, and energy.",
    capabilities: [
      "Financial services",
      "Healthcare & life sciences",
      "Industrials",
      "Energy & resources",
    ],
  },
];

function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={servicesNetwork}
            alt="Global digital network representing connected enterprise systems"
            className="h-full w-full object-cover"
            width={1600}
            height={1072}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-navy/85" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-bronze">
              Services
            </p>
            <h1 className="mt-4 text-4xl font-medium text-navy-foreground sm:text-5xl lg:text-6xl">
              Enterprise capabilities for every stage of growth.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-foreground/80">
              From strategy to execution, we bring the expertise, methods, and
              senior commitment needed to deliver measurable impact.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-bronze">
              How we work
            </p>
            <h2 className="mt-3 text-3xl font-medium text-foreground sm:text-4xl">
              A proven approach. A tailored journey.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <ProcessStep
              number="01"
              title="Diagnose"
              description="We start with a rigorous, fact-based understanding of your business, market, and constraints."
            />
            <ProcessStep
              number="02"
              title="Design"
              description="We co-create practical solutions that fit your culture and are built for execution."
            />
            <ProcessStep
              number="03"
              title="Deliver"
              description="We support implementation, measure outcomes, and ensure change sticks."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  capabilities,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  capabilities: string[];
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-soft">
      <div className="inline-flex w-fit rounded-lg bg-muted p-3 text-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <ul className="mt-6 space-y-2 border-t border-border pt-4">
        {capabilities.map((capability) => (
          <li
            key={capability}
            className="text-sm text-muted-foreground"
          >
            • {capability}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-xl border border-border bg-background p-6">
      <span className="text-3xl font-semibold text-bronze">{number}</span>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
