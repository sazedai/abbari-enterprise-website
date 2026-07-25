import { createFileRoute } from "@tanstack/react-router";
import { Target, Users, Lightbulb, Award } from "lucide-react";
import aboutTeam from "../assets/about-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Abbari Enterprise" },
      { name: "description", content: "Learn about Abbari Enterprise's mission, values, and the experienced team helping organizations build lasting advantage." },
      { property: "og:title", content: "About — Abbari Enterprise" },
      { property: "og:description", content: "Learn about Abbari Enterprise's mission, values, and the experienced team helping organizations build lasting advantage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutTeam}
            alt="Abbari Enterprise leadership team collaborating"
            className="h-full w-full object-cover"
            width={1600}
            height={1072}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/70 to-navy/40" />
        </div>

        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl items-end px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-bronze">
              About Abbari
            </p>
            <h1 className="mt-4 text-4xl font-medium text-navy-foreground sm:text-5xl lg:text-6xl">
              Built on conviction. Guided by results.
            </h1>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-medium text-foreground sm:text-4xl">
                Our mission
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We believe the best organizations are built where clear strategy,
                disciplined operations, and modern technology meet. Our mission is
                to help enterprises make that intersection their competitive edge.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Since our founding, we have advised leaders across industries and
                continents, helping them navigate complexity, accelerate growth,
                and build resilience into every layer of their business.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <ValueCard
                icon={Target}
                title="Purpose-driven"
                description="Every recommendation is tied to a clear business outcome."
              />
              <ValueCard
                icon={Users}
                title="Collaborative"
                description="We work alongside your teams, transferring capability as we go."
              />
              <ValueCard
                icon={Lightbulb}
                title="Innovative"
                description="We bring fresh thinking and proven methods to hard problems."
              />
              <ValueCard
                icon={Award}
                title="Accountable"
                description="We measure our work by the value it creates for you."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-muted py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-bronze">
              Leadership
            </p>
            <h2 className="mt-3 text-3xl font-medium text-foreground sm:text-4xl">
              Experienced partners. Trusted advisors.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <LeaderCard
              name="Samira Abbari"
              role="Founder & Managing Partner"
              bio="Former strategy director with 25 years of experience advising Fortune 500 and growth-stage companies."
            />
            <LeaderCard
              name="James Okonkwo"
              role="Partner, Operations"
              bio="Operations transformation specialist with a track record of delivering cost and speed improvements."
            />
            <LeaderCard
              name="Lin Wei"
              role="Partner, Technology"
              bio="Technology architect who helps enterprises modernize platforms and unlock data-driven growth."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="inline-flex rounded-lg bg-bronze/10 p-3 text-bronze">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function LeaderCard({
  name,
  role,
  bio,
}: {
  name: string;
  role: string;
  bio: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-soft">
      <div className="h-12 w-12 rounded-full bg-muted" />
      <h3 className="mt-4 text-lg font-semibold text-foreground">{name}</h3>
      <p className="text-sm font-medium text-bronze">{role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{bio}</p>
    </div>
  );
}
