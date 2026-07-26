import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Search, Grid, List, Star, ShoppingCart, Eye } from "lucide-react";
import ProductQuickView from "@/components/ProductQuickView";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// Category fallback images
import productBelts from "@/assets/product-belts.jpg";
import productSheets from "@/assets/product-sheets.jpg";
import productBearings from "@/assets/product-bearings.jpg";
import productTools from "@/assets/product-tools.jpg";
import productInsulation from "@/assets/product-insulation.jpg";
import productEngineering from "@/assets/product-engineering.jpg";

// Individual product images
import vBeltImg from "@/assets/products/v-belt.png";
import timingBeltAsset from "@/assets/products/timing-belt.png.asset.json";
const timingBeltImg = timingBeltAsset.url;
import conveyorBeltAsset from "@/assets/products/conveyor-belt.png.asset.json";
const conveyorBeltImg = conveyorBeltAsset.url;
import rubberCanvasBeltAsset from "@/assets/products/rubber-canvas-belt.png.asset.json";
const rubberCanvasBeltImg = rubberCanvasBeltAsset.url;
import beltLacingAsset from "@/assets/products/belt-lacing.png.asset.json";
const beltLacingImg = beltLacingAsset.url;
import rubberSheetAsset from "@/assets/products/rubber-sheet.png.asset.json";
const rubberSheetImg = rubberSheetAsset.url;
import siliconeSheetAsset from "@/assets/products/silicone-sheet.png.asset.json";
const siliconeSheetImg = siliconeSheetAsset.url;
import clearPvcSheetAsset from "@/assets/products/clear-pvc-sheet.png.asset.json";
const clearPvcSheetImg = clearPvcSheetAsset.url;
import teflonSheetAsset from "@/assets/products/teflon-sheet.png.asset.json";
const teflonSheetImg = teflonSheetAsset.url;
import corkSheetAsset from "@/assets/products/cork-sheet.png.asset.json";
const corkSheetImg = corkSheetAsset.url;
import bearingBmcAsset from "@/assets/products/thrust-bearing.png.asset.json";
const bearingBmcImg = bearingBmcAsset.url;
import skfBearingAsset from "@/assets/products/skf-bearing.png.asset.json";
const skfBearingImg = skfBearingAsset.url;
import taperedRollerBearingAsset from "@/assets/products/tapered-roller-bearing.png.asset.json";
const bearingNachiImg = taperedRollerBearingAsset.url;
import nylonShaftImg from "@/assets/products/nylon-shaft.png";
import pvcCurtainAsset from "@/assets/products/pvc-curtain.png.asset.json";
const pvcCurtainImg = pvcCurtainAsset.url;
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
import nylonSheetImg from "@/assets/products/nylon-sheet.png";
import geotextileSolutionsAsset from "@/assets/products/geotextile-solutions.png.asset.json";
import geotextileFabricAsset from "@/assets/products/geotextile-fabric.png.asset.json";
import geotextileBagAsset from "@/assets/products/geotextile-bag.png.asset.json";
import geotextilePlanterBagAsset from "@/assets/products/geotextile-planter-bag.png.asset.json";
const geotextileSolutionsImg = geotextileSolutionsAsset.url;
const geotextileFabricImg = geotextileFabricAsset.url;
const geotextileBagImg = geotextileBagAsset.url;
const geotextilePlanterBagImg = geotextilePlanterBagAsset.url;
import rubberCowMatAsset from "@/assets/products/rubber-cow-mat.png.asset.json";
const rubberCowMatImg = rubberCowMatAsset.url;
import rubberRollerCoveringAsset from "@/assets/products/rubber-roller-covering.png.asset.json";
const rubberRollerCoveringImg = rubberRollerCoveringAsset.url;
import puVBeltAsset from "@/assets/products/pu-v-belt.png.asset.json";
const puVBeltImg = puVBeltAsset.url;
import puFlatBeltAsset from "@/assets/products/pu-flat-belt.png.asset.json";
const puFlatBeltImg = puFlatBeltAsset.url;
import puCordBeltAsset from "@/assets/products/pu-cord-belt.png.asset.json";
const puCordBeltImg = puCordBeltAsset.url;
import adjustableLinkVBeltAsset from "@/assets/products/adjustable-link-v-belt.png.asset.json";
const adjustableLinkVBeltImg = adjustableLinkVBeltAsset.url;
import cuttingDiskAsset from "@/assets/products/cutting-disk.png.asset.json";
const cuttingDiskImg = cuttingDiskAsset.url;
import ssPipeRodAsset from "@/assets/products/stainless-steel-pipe-rod.png.asset.json";
const ssPipeRodImg = ssPipeRodAsset.url;
import fencingBarbwireAsset from "@/assets/products/fencing-barbwire.png.asset.json";
const fencingBarbwireImg = fencingBarbwireAsset.url;
import gasketSealingSheetAsset from "@/assets/products/gasket-sealing-sheet.png.asset.json";
const gasketSealingSheetImg = gasketSealingSheetAsset.url;
import siliconSpongeRubberSheetAsset from "@/assets/products/silicon-sponge-rubber-sheet.png.asset.json";
const siliconSpongeRubberSheetImg = siliconSpongeRubberSheetAsset.url;
import nylonShaftSolutionAsset from "@/assets/products/nylon-shaft-solution.png.asset.json";
const nylonShaftSolutionImg = nylonShaftSolutionAsset.url;
import glanePackingSolutionAsset from "@/assets/products/glane-packing-solution.png.asset.json";
const glanePackingSolutionImg = glanePackingSolutionAsset.url;
import aluminiumTapeSolutionAsset from "@/assets/products/aluminium-tape-solution.png.asset.json";
const aluminiumTapeSolutionImg = aluminiumTapeSolutionAsset.url;
import pneumaticsComponentSolutionAsset from "@/assets/products/pneumatics-component-solution.png.asset.json";
const pneumaticsComponentSolutionImg = pneumaticsComponentSolutionAsset.url;
import pneumaticPipeSolutionAsset from "@/assets/products/pneumatic-pipe-solution.png.asset.json";
const pneumaticPipeSolutionImg = pneumaticPipeSolutionAsset.url;
import pneumaticHosesTubingSolutionAsset from "@/assets/products/pneumatic-hoses-and-tubing.png.asset.json";
const pneumaticHosesTubingSolutionImg = pneumaticHosesTubingSolutionAsset.url;








const categoryImages: Record<string, string> = {
  Belts: productBelts,
  Sheets: productSheets,
  Bearings: productBearings,
  Tools: productTools,
  Insulation: productInsulation,
  Engineering: productEngineering,
};

// Map product IDs to their specific images
const productImages: Record<number, string> = {
  1: vBeltImg,
  2: timingBeltImg,
  3: rubberCanvasBeltImg,
  4: conveyorBeltImg,
  5: beltLacingImg,
  6: clearPvcSheetImg,
  7: pvcCurtainImg,
  8: rubberSheetImg,
  9: siliconeSheetImg,
  10: teflonSheetImg,
  11: corkSheetImg,
  12: skfBearingImg,
  13: bearingNachiImg,
  14: bearingBmcImg,
  15: wd40Img,
  16: rockWoolImg,
  17: glassWoolImg,
  18: nylonShaftImg,
  19: teflonClothImg,
  20: stainlessSteelNetImg,
  21: bitumenMembraneImg,
  22: nylonSheetImg,
  23: geotextileFabricImg,
  24: geotextileBagImg,
  25: geotextilePlanterBagImg,
  26: geotextileSolutionsImg,
  27: rubberCowMatImg,
  28: rubberRollerCoveringImg,
  29: puVBeltImg,
  30: puFlatBeltImg,
  31: puCordBeltImg,
  32: adjustableLinkVBeltImg,
  33: cuttingDiskImg,
  34: ssPipeRodImg,
  35: fencingBarbwireImg,
  36: gasketSealingSheetImg,
  37: siliconSpongeRubberSheetImg,
  38: nylonShaftSolutionImg,
  39: glanePackingSolutionImg,
  40: aluminiumTapeSolutionImg,
  41: pneumaticsComponentSolutionImg,
  42: pneumaticPipeSolutionImg,
  43: pneumaticHosesTubingSolutionImg,
};






interface Product {
  id: number;
  name: string;
  category: string;
  rating: number;
  description: string;
}

const allProducts: Product[] = [
  { id: 1, name: "V-Belt", category: "Belts", rating: 4.8, description: "High-performance industrial V-belt for heavy-duty applications." },
  { id: 2, name: "Timing Belt HTD 5M", category: "Belts", rating: 4.6, description: "Precision timing belt for synchronous power transmission." },
  { id: 3, name: "Rubber Canvas Belt", category: "Belts", rating: 4.7, description: "Durable rubber canvas belt for conveyor systems." },
  { id: 4, name: "Conveyor Belt 1000mm", category: "Belts", rating: 4.9, description: "Wide conveyor belt ideal for bulk material handling." },
  { id: 5, name: "Steel Belt Lacing", category: "Belts", rating: 4.5, description: "Strong steel lacing for belt splicing and repairs." },
  { id: 6, name: "PVC Clear Sheet 3mm", category: "Sheets", rating: 4.6, description: "Transparent PVC sheet for protective barriers." },
  { id: 7, name: "PVC Curtain Strip", category: "Sheets", rating: 4.4, description: "Flexible strip curtain for doorways and partitions." },
  { id: 8, name: "Rubber Sheet 5mm", category: "Sheets", rating: 4.8, description: "Versatile rubber sheet for gaskets and flooring." },
  { id: 9, name: "Silicon Sheet Clear", category: "Sheets", rating: 4.7, description: "Heat-resistant silicone sheet for sealing applications." },
  { id: 10, name: "Teflon Sheet PTFE", category: "Sheets", rating: 4.9, description: "Non-stick PTFE sheet for chemical resistance." },
  { id: 11, name: "Cork Sheet 6mm", category: "Sheets", rating: 4.5, description: "Natural cork sheet for insulation and gaskets." },
  { id: 12, name: "SKF Ball Bearing 6205", category: "Bearings", rating: 4.9, description: "Premium SKF bearing for reliable rotary motion." },
  { id: 13, name: "Tapered Roller Bearing", category: "Bearings", rating: 4.8, description: "Heavy-duty tapered bearing for axial loads." },
  { id: 14, name: "Thrust Bearing", category: "Bearings", rating: 4.6, description: "Precision thrust bearing for axial force handling." },
  { id: 15, name: "WD-40 Multi-Use 400ml", category: "Tools", rating: 4.9, description: "Multi-purpose lubricant and rust preventive spray." },
  { id: 16, name: "Rock Wool Insulation", category: "Insulation", rating: 4.7, description: "Fire-resistant insulation for thermal protection." },
  { id: 17, name: "Glass Wool Roll", category: "Insulation", rating: 4.6, description: "Lightweight glass wool for acoustic and thermal use." },
  { id: 18, name: "Nylon Shaft 50mm", category: "Engineering", rating: 4.5, description: "Durable nylon shaft for mechanical components." },
  { id: 19, name: "Teflon Cloth Roll", category: "Sheets", rating: 4.8, description: "High-temperature resistant teflon cloth for industrial use." },
  { id: 20, name: "Stainless Steel Net", category: "Engineering", rating: 4.7, description: "Durable stainless steel mesh for filtration and screening." },
  { id: 21, name: "Bitumen Membrane", category: "Insulation", rating: 4.8, description: "Waterproof membrane for roofing and foundation protection." },
  { id: 22, name: "Nylon Sheet 10mm", category: "Sheets", rating: 4.6, description: "Strong nylon sheet for wear-resistant applications." },
  { id: 23, name: "Geotextile Premium Filter Fabric", category: "Insulation", rating: 4.9, description: "Non-woven polypropylene geotextile (300gsm) for separation, filtration and drainage in civil engineering, road construction and landscaping projects." },
  { id: 24, name: "Geotextile Erosion Control Bag", category: "Insulation", rating: 4.8, description: "Eco-friendly non-woven geotextile bags for flood control, coastal protection and soil stabilization. High tensile strength with excellent water permeability." },
  { id: 25, name: "Geotextile Planter/Grow Bag", category: "Insulation", rating: 4.7, description: "Breathable non-woven geotextile fabric bag for horticulture and root aeration. Promotes healthy plant growth with superior drainage and durability." },
  { id: 26, name: "Geotextile Fabric Roll", category: "Insulation", rating: 4.8, description: "Performance-engineered geotextile roll with high fiber density, tensile strength, water permeability and UV resistance for infrastructure and landscaping." },
  { id: 27, name: "Rubber Cow Mat Solution", category: "Sheets", rating: 4.9, description: "Heavy-duty multi-layer rubber cow mat with anti-slip hexagonal grip top, high-resilience core and mini-dot grip backing. Delivers superior comfort, drainage and durability for dairy sheds, stables and livestock housing." },
  { id: 28, name: "Rubber Roller Covering Solution", category: "Engineering", rating: 4.9, description: "Advanced synthetic rubber roller covering with reinforced multi-layer construction — cover rubber, carcass reinforcement, adhesive ply and reinforced base. Available in fine texture, blue grip and dimple grip finishes for high abrasion resistance, chemical & oil resistance, static conductivity and superior shock absorption." },
  { id: 29, name: "PU V-Belt Solution", category: "Belts", rating: 4.9, description: "Advanced polyurethane V-belt available in solid core, simple PU, Kevlar-reinforced, custom profile and heavy-duty flat-top variants. Multi-color range with cogged PU top cover, Kevlar tensile cord and precision-molded teeth over a red polyurethane base — engineered for high abrasion resistance and flexible on-site joining." },
  { id: 30, name: "PU Flat Belt Solution", category: "Belts", rating: 4.9, description: "Next-generation polyurethane flat belting with multi-layer construction — glossy PU top cover, high-strength polyester/Kevlar reinforcement fabric, inner PU adhesion layer and specified-texture PU bottom cover. Available in forest-green, red, black, white and transparent for conveying, packaging, printing, textile and food processing lines." },
  { id: 31, name: "Advanced PU Belting Solution", category: "Belts", rating: 4.9, description: "Advanced polyurethane cord belting engineered for high-elasticity power transmission and easy on-site joining. Available as solid-core PU round cords and reinforced tensile-cord PU jacketed belts with steel or aramid cord reinforcement, inner bonding layer and outer abrasion-resistant PU jacket. Full color range (green, red, black, orange, transparent, teal) for conveying, textile, glass, ceramic and packaging drives." },
  { id: 32, name: "Adjustable Link V-Belt Solution", category: "Belts", rating: 4.9, description: "Adjustable-length link V-belt system supplied on a 20-metre spool — cut-to-length on-site with no tools, no downtime and no need to dismantle drive components. Available in Nu-T Link (orange fabric-reinforced), Studded (blue steel-stud reinforced) and Multi-Rib (red) variants for reduced vibration, industry-standard power ratings and longer belt life across HVAC, pumps, compressors, fans, machine tools and general industrial drives." },
  { id: 33, name: "Cutting Disk Solution", category: "Tools", rating: 4.9, description: "Complete range of professional cutting and grinding discs — Nova (red) for metal/iron/stainless steel, Makita INOX (silver) for precision stainless steel cuts, segmented diamond blades for granite, ceramic and Dekton, plus wood, plastic and glass cutting blades. Fibreglass-reinforced with high-quality abrasive grit and precision hubs for safe, efficient high-speed cutting." },
  { id: 34, name: "Stainless Steel Pipe and Rod Solution", category: "Tools", rating: 4.9, description: "Comprehensive stainless steel & mild steel pipe, tube and rod range — SS round rods, square/rectangular tubing, MS structural pipes, exploded pipe fittings and matching TIG (Gemini 308L) & stick (316L) welding electrodes. High corrosion resistance, structural strength, wide diameter (2–15mm rods) and length variety (125–500mm) for fabrication, construction, plumbing and welding projects." },
  { id: 35, name: "Fencing and Barb Wire Solution", category: "Tools", rating: 4.9, description: "Advanced fencing and barb wire systems — galvanized and green PVC-coated chain-link mesh, welded wire mesh panels, post & top-rail connections, plus a full barb wire range: heavy-zinc coated, PVC-coated (blue), high-tensile galvanized core and copper-time sharp-barb variants. Engineered for corrosion resistance, high security, diverse mesh sizes and custom perimeter, agricultural and industrial protection." },
  { id: 36, name: "Gasket Sealing Sheet Solution", category: "Tools", rating: 4.9, description: "Modern gasket sealing sheet range in asbestos and non-asbestos compositions — Klingerit 1000 rolls & sheets, Klinger Universal, Klinger-Oilit, wiremesh-reinforced sheets (galvanized steel mesh + asbestos/non-asbestos compound) and green/red compressed fibre jointing sheets. Engineered with high-performance elastomer binders for thermal resistance, chemical compatibility and sustainability across flanges, pumps, valves, heat exchangers and pressure vessels." },
  { id: 37, name: "Silicon Sponge Rubber Sheets Solution", category: "Tools", rating: 4.9, description: "Premium silicone sponge rubber sheet range engineered for high-performance sealing, gasketing, insulation and cushioning across industrial, automotive, HVAC and food-processing applications. Available in closed-cell and open-cell structures with uniform pore distribution, optional reinforcement fabric ply and pressure-sensitive adhesive backing. Offers excellent temperature stability from -50°C to +200°C, UV/ozone resistance, compression set recovery and easy die-cutting or on-site fabrication." },
  { id: 38, name: "Nylon Shaft Solution", category: "Tools", rating: 4.9, description: "Complete nylon shaft solution offering precision-engineered extruded and cast Nylon 6 / Nylon 6/66 rods in a wide range of diameters, lengths and colors. Ideal for bushings, bearings, wear pads, rollers, gears, sprockets and general mechanical components where low friction, high wear resistance and excellent machinability are required. Available in natural white, pigmented blue (Nylon 6 high stiffness), and customizable colors including green, black, red and yellow for on-site identification and OEM branding." },
  { id: 39, name: "Glane Packing Solution", category: "Tools", rating: 4.9, description: "High-performance gland packing solution for valves, pumps and rotating equipment. Available in PTFE, graphite, ceramic fibre and acrylic composite constructions for high-temperature, high-pressure and chemically aggressive sealing applications." },
  { id: 40, name: "Aluminium Tape Solution", category: "Tools", rating: 4.9, description: "Complete aluminium foil tape range for HVAC, insulation, sealing and ducting. Includes plain dead-soft aluminium foil, reinforced FSK (foil-scrim-kraft), glass-fibre-cloth aluminium and lacquered black aluminium tape options." },
  { id: 41, name: "Pneumatics Component Solution", category: "Tools", rating: 4.9, description: "Complete pneumatic automation component range for industrial air systems: double-acting air cylinders, compact pneumatic cylinders, FRL (filter-regulator-lubricator) units, solenoid valve manifolds, push-to-connect fittings, brass threaded connectors and high-flexibility polyurethane/nylon tubing. Engineered for reliable linear motion, precise directional control, clean dry air preparation and leak-free distribution across packaging, automation, automotive, textile and general machinery applications." },
  { id: 42, name: "Pneumatic Pipe Solution", category: "Tools", rating: 4.9, description: "Precision-engineered pneumatic pipe and tubing solution for industrial compressed-air distribution. Features high-grade polyurethane construction with braided reinforcement, a wide range of diameters from 4x2.5mm to 16x12mm, and colour-coded spools for easy circuit identification. Ideal for automation, packaging, CNC, robotics and general pneumatic systems requiring flexibility, pressure resistance and long service life." },
  { id: 43, name: "Pneumatic Hoses and Tubing", category: "Tools", rating: 4.9, description: "Comprehensive pneumatic hoses and tubing solution for industrial, agricultural and automation air-power systems. The range includes high-flexibility polyurethane (PU) hoses, lightweight polyethylene (PE) tubes, durable PVC hoses and high-performance Nylon / PTFE options — available in straight, coiled and braided-reinforced configurations with matching brass, steel and quick-connect fittings. Engineered for compressed air, pneumatic tools, spray systems, packaging lines and mobile machinery, with colour-coded circuits and clearly labelled diameter ratings for fast, leak-free installation." },
];






const getProductImage = (product: Product): string => {
  return productImages[product.id] || categoryImages[product.category] || productBelts;
};

const categories = ["All", "Belts", "Sheets", "Bearings", "Tools", "Insulation", "Engineering"];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addItem } = useCart();

  // Handle category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      image: getProductImage(product),
    });
    toast.success(`${product.name} added to quotation cart`);
  };

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Industrial Products Catalog — V-Belts, Bearings & Hardware | A BBARI"
        description="Browse the full catalog of industrial V-belts, bearings, conveyor systems, rubber sheets and power-transmission parts from A BBARI Enterprise."
        path="/products"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Industrial Products Catalog",
          url: "https://abbarient.lovable.app/products",
        }}
      />
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display text-5xl md:text-6xl text-foreground">ALL PRODUCTS</h1>
            <p className="text-muted-foreground mt-4">Browse our complete catalog of industrial hardware</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "secondary"}
                  size="sm"
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
              >
                <Grid className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                aria-pressed={viewMode === "list"}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Results count */}
          <p className="text-muted-foreground mb-6">{filteredProducts.length} products found</p>

          {/* Products grid */}
          <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-4"}>
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className={`group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer block ${
                  viewMode === "list" ? "flex items-center" : ""
                }`}
              >
                <div
                  className={`${
                    viewMode === "list" ? "w-32 h-32 aspect-square" : "aspect-[3/4]"
                  } overflow-hidden bg-secondary relative`}
                >
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105 shadow-md object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-foreground/10" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-background/90 backdrop-blur-sm rounded-full p-3">
                        <Eye className="w-5 h-5 text-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <span className="text-xs text-primary font-medium uppercase">{product.category}</span>
                  <h3 className="font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm text-muted-foreground">{product.rating}</span>
                  </div>
                  <div className="mt-3">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart for Quotation
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProductQuickView
        product={selectedProduct}
        productImage={selectedProduct ? getProductImage(selectedProduct) : ""}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />

      <Footer />
    </main>
  );
};

export default Products;
