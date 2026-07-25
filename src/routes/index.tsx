import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp, Shield, Zap, Globe } from "lucide-react";
import heroBuilding from "../assets/hero-building.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abbari Enterprise — Strategy, Operations & Technology" },
      { name: "description", content: "Abbari Enterprise partners with ambitious organizations to build strategy, operations, and technology for lasting advantage." },
      { property: "og:title", content: "Abbari Enterprise — Strategy, Operations & Technology" },
      { property: "og:description", content: "Abbari Enterprise partners with ambitious organizations to build strategy, operations, and technology for lasting advantage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBuilding}
            alt="Modern Abbari Enterprise headquarters at golden hour"
            className="h-full w-full object-cover"
            width={1920}
            height={1088}
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 lg:py-44">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-bronze">
              Enterprise advisory & technology
            </p>
            <h1 className="mt-4 text-4xl font-medium leading-tight text-navy-foreground sm:text-5xl lg:text-6xl">
              Build the advantage that lasts.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-foreground/80">
              Abbari Enterprise partners with leaders to turn ambition into
              outcomes — from strategy through execution, operations, and
              digital transformation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full bg-bronze px-6 py-3 text-sm font-medium text-bronze-foreground transition-colors hover:bg-bronze/90"
              >
                Explore services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/30 px-6 py-3 text-sm font-medium text-navy-foreground transition-colors hover:bg-navy-foreground/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <Stat value="20+" label="Years of experience" />
            <Stat value="350+" label="Client engagements" />
            <Stat value="45" label="Countries served" />
            <Stat value="98%" label="Client retention" />
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-bronze">
              What we do
            </p>
            <h2 className="mt-3 text-3xl font-medium text-foreground sm:text-4xl">
              Capabilities designed for enterprise impact.
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceCard
              icon={TrendingUp}
              title="Strategy"
              description="Clarify direction, define competitive position, and build plans that stakeholders can act on."
            />
            <ServiceCard
              icon={Zap}
              title="Operations"
              description="Streamline processes, reduce complexity, and unlock capacity across the enterprise."
            />
            <ServiceCard
              icon={Globe}
              title="Technology"
              description="Modernize platforms, integrate systems, and enable data-driven decision making."
            />
            <ServiceCard
              icon={Shield}
              title="Risk & Compliance"
              description="Strengthen governance, manage risk, and navigate regulatory requirements with confidence."
            />
          </div>

          <div className="mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-bronze"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Abbari */}
      <section className="bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-bronze">
                Why Abbari
              </p>
              <h2 className="mt-3 text-3xl font-medium text-foreground sm:text-4xl">
                Counsel built on deep experience, delivered with precision.
              </h2>
              <p className="mt-6 text-muted-foreground">
                We combine senior judgment with rigorous methods. Every engagement
                is tailored to your context, culture, and constraints — and
                designed to produce measurable outcomes, not just reports.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-bronze" />
                  <span className="text-foreground">
                    Senior-led teams with sector-specific expertise
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-bronze" />
                  <span className="text-foreground">
                    Collaborative, transparent working model
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-bronze" />
                  <span className="text-foreground">
                    Outcome-based pricing and clear accountability
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl bg-background p-8 shadow-soft">
              <blockquote className="text-xl font-medium leading-relaxed text-foreground">
                "Abbari helped us restructure our operating model and delivered a
                30% improvement in decision velocity within the first year."
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold text-foreground">Elena Mora</p>
                <p className="text-sm text-muted-foreground">
                  Chief Operating Officer, Northgate Industries
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-navy py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-medium text-navy-foreground sm:text-4xl">
            Ready to transform your enterprise?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-foreground/80">
            Let's discuss how Abbari can help you move faster, operate better,
            and compete smarter.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-bronze px-6 py-3 text-sm font-medium text-bronze-foreground transition-colors hover:bg-bronze/90"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-semibold text-foreground sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-soft">
      <div className="inline-flex rounded-lg bg-muted p-3 text-foreground transition-colors group-hover:bg-bronze group-hover:text-bronze-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
