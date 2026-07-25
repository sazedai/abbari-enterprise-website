import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const VBeltGuide = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Industrial V-Belt Selection and Maintenance Guide",
      description:
        "A complete technical guide to industrial V-belt types, sizing, installation, tensioning, and wear identification.",
      author: { "@type": "Organization", name: "A BBARI Enterprise" },
      publisher: { "@type": "Organization", name: "A BBARI Enterprise" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://abbarient.lovable.app/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: "https://abbarient.lovable.app/guides/v-belt-selection-and-maintenance",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Industrial V-Belt Selection & Maintenance Guide | A BBARI"
        description="Technical guide to industrial V-belt selection, sizing, installation and maintenance. Covers belt types, wear identification and tensioning best practices."
        path="/guides/v-belt-selection-and-maintenance"
        type="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">V-Belt Selection &amp; Maintenance Guide</span>
          </nav>

          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Industrial V-Belt Selection and Maintenance Guide
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            A practical reference for maintenance engineers and procurement teams sourcing
            industrial V-belts. Covers belt types, sizing, installation, tensioning and
            wear identification.
          </p>

          <section className="prose prose-invert max-w-none space-y-6">
            <h2 className="font-display text-2xl text-foreground">1. Industrial V-Belt Types</h2>
            <p className="text-muted-foreground">
              V-belts transmit power between pulleys via wedge action in a V-shaped groove.
              The major industrial classes are:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Classical (A, B, C, D, E):</strong> general-purpose drives, FHP to high-power.</li>
              <li><strong>Narrow (3V, 5V, 8V):</strong> higher power density in the same drive footprint.</li>
              <li><strong>Wedge (SPZ, SPA, SPB, SPC):</strong> metric narrow profile common in Asia and Europe.</li>
              <li><strong>Cogged / Raw-edge (AX, BX, CX):</strong> notched underside for tight bends and better heat dissipation.</li>
              <li><strong>Banded (Power Band):</strong> multiple V-belts joined for pulsating loads to prevent whipping.</li>
            </ul>

            <h2 className="font-display text-2xl text-foreground">2. Sizing a V-Belt</h2>
            <p className="text-muted-foreground">
              Correct sizing requires four inputs: design horsepower, driver RPM, driven
              RPM, and center distance. Use these steps:
            </p>
            <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
              <li>Multiply motor HP by the service factor for the application (e.g. 1.2 for light, 1.6 for shock loads).</li>
              <li>Pick the cross-section from the manufacturer's power-rating chart for design HP and small-pulley RPM.</li>
              <li>Calculate belt length: <em>L ≈ 2C + 1.57(D + d) + (D − d)² / 4C</em>, where C is center distance, D and d the pulley diameters.</li>
              <li>Round up to the nearest standard belt length code.</li>
            </ol>

            <h2 className="font-display text-2xl text-foreground">3. Installation &amp; Tensioning</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Shorten center distance before installing — never pry a belt over the pulley.</li>
              <li>Align sheaves with a straight-edge or laser; misalignment is the #1 cause of premature failure.</li>
              <li>Tension to the manufacturer's deflection force (typically 1/64" deflection per inch of span).</li>
              <li>Re-tension after the first 24–48 hours of operation, then on the scheduled PM cycle.</li>
            </ul>

            <h2 className="font-display text-2xl text-foreground">4. Wear Identification</h2>
            <p className="text-muted-foreground">Inspect belts quarterly and replace at the first sign of:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Glazed sidewalls</strong> — slipping, under-tensioned, or worn sheave grooves.</li>
              <li><strong>Cracked undercord</strong> — heat exposure or back-bend over small pulleys.</li>
              <li><strong>Frayed cover</strong> — misalignment or contact with a guard.</li>
              <li><strong>Stretched belt</strong> — at end of fatigue life; replace as a matched set on multi-belt drives.</li>
            </ul>

            <h2 className="font-display text-2xl text-foreground">5. V-Belt Maintenance Checklist</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Keep drives free of oil, grease, and abrasive dust.</li>
              <li>Replace worn sheaves before fitting new belts — a worn groove destroys a new belt in hours.</li>
              <li>Stock matched sets for critical drives to minimise downtime.</li>
              <li>Record belt code, install date, and run-hours in your CMMS.</li>
            </ul>
          </section>

          <div className="mt-12 p-6 border border-border rounded-xl bg-card">
            <h2 className="font-display text-2xl text-foreground mb-3">Need V-belts for your drive?</h2>
            <p className="text-muted-foreground mb-5">
              A BBARI Enterprise stocks classical, narrow, wedge and cogged V-belts for
              industrial drives. Send your specs and we'll quote within one business day.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products"><Button variant="hero">Browse V-Belts</Button></Link>
              <Link to="/contact"><Button variant="outline">Request a Quotation</Button></Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default VBeltGuide;
