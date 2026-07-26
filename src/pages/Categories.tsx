import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Category images
import categoryBelts from "@/assets/category-belts.jpg";
import categorySheets from "@/assets/category-sheets.jpg";
import categoryBearings from "@/assets/category-bearings.jpg";
import categoryTools from "@/assets/category-tools.jpg";

// Product specific images for categories
import vBeltImg from "@/assets/products/v-belt.png";
import timingBeltAsset from "@/assets/products/timing-belt.png.asset.json";
const timingBeltImg = timingBeltAsset.url;
import conveyorBeltAsset from "@/assets/products/conveyor-belt.png.asset.json";
const conveyorBeltImg = conveyorBeltAsset.url;
import rubberCanvasBeltAsset from "@/assets/products/rubber-canvas-belt.png.asset.json";
const rubberCanvasBeltImg = rubberCanvasBeltAsset.url;
import beltLacingAsset from "@/assets/products/belt-lacing.png.asset.json";
const beltLacingImg = beltLacingAsset.url;
import clearPvcSheetAsset from "@/assets/products/clear-pvc-sheet.png.asset.json";
const clearPvcSheetImg = clearPvcSheetAsset.url;
import pvcCurtainAsset from "@/assets/products/pvc-curtain.png.asset.json";
const pvcCurtainImg = pvcCurtainAsset.url;
import rubberSheetAsset from "@/assets/products/rubber-sheet.png.asset.json";
const rubberSheetImg = rubberSheetAsset.url;
import siliconeSheetAsset from "@/assets/products/silicone-sheet.png.asset.json";
const siliconeSheetImg = siliconeSheetAsset.url;
import teflonSheetAsset from "@/assets/products/teflon-sheet.png.asset.json";
const teflonSheetImg = teflonSheetAsset.url;
import teflonClothAsset from "@/assets/products/teflon-cloth.png.asset.json";
const teflonClothImg = teflonClothAsset.url;
import corkSheetAsset from "@/assets/products/cork-sheet.png.asset.json";
const corkSheetImg = corkSheetAsset.url;
import nylonSheetImg from "@/assets/products/nylon-sheet.png";
import bearingBmcAsset from "@/assets/products/thrust-bearing.png.asset.json";
const bearingBmcImg = bearingBmcAsset.url;
import skfBearingAsset from "@/assets/products/skf-bearing.png.asset.json";
const skfBearingImg = skfBearingAsset.url;
import taperedRollerBearingAsset from "@/assets/products/tapered-roller-bearing.png.asset.json";
const bearingNachiImg = taperedRollerBearingAsset.url;
import nylonShaftImg from "@/assets/products/nylon-shaft.png";
import wd40Asset from "@/assets/products/wd40.png.asset.json";
const wd40Img = wd40Asset.url;
import rockWoolAsset from "@/assets/products/rock-wool.png.asset.json";
const rockWoolImg = rockWoolAsset.url;
import glassWoolAsset from "@/assets/products/glass-wool.png.asset.json";
const glassWoolImg = glassWoolAsset.url;
import stainlessSteelNetAsset from "@/assets/products/stainless-steel-net.png.asset.json";
const stainlessSteelNetImg = stainlessSteelNetAsset.url;
import bitumenMembraneAsset from "@/assets/products/bitumen-membrane.png.asset.json";
const bitumenMembraneImg = bitumenMembraneAsset.url;
import geotextileFabricAsset from "@/assets/products/geotextile-fabric.png.asset.json";
import geotextileBagAsset from "@/assets/products/geotextile-bag.png.asset.json";
import geotextilePlanterBagAsset from "@/assets/products/geotextile-planter-bag.png.asset.json";
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











interface Category {
  name: string;
  count: number;
  image: string;
  filterCategory: string;
}

const allCategories: Category[] = [
  { name: "V-Belts", count: 85, image: vBeltImg, filterCategory: "Belts" },
  { name: "Timing Belts", count: 62, image: timingBeltImg, filterCategory: "Belts" },
  { name: "Rubber Canvas Belts", count: 34, image: rubberCanvasBeltImg, filterCategory: "Belts" },
  { name: "Conveyor Belts", count: 45, image: conveyorBeltImg, filterCategory: "Belts" },
  { name: "Steel Belt Lacing", count: 28, image: beltLacingImg, filterCategory: "Belts" },
  { name: "PU V-Belts", count: 40, image: puVBeltImg, filterCategory: "Belts" },
  { name: "PU Flat Belts", count: 32, image: puFlatBeltImg, filterCategory: "Belts" },
  { name: "PU Cord Belts", count: 28, image: puCordBeltImg, filterCategory: "Belts" },
  { name: "Adjustable Link V-Belts", count: 24, image: adjustableLinkVBeltImg, filterCategory: "Belts" },
  { name: "PVC Clear Sheets", count: 42, image: clearPvcSheetImg, filterCategory: "Sheets" },
  { name: "PVC Curtains", count: 35, image: pvcCurtainImg, filterCategory: "Sheets" },
  { name: "Rubber Sheets", count: 56, image: rubberSheetImg, filterCategory: "Sheets" },
  { name: "Silicon Sheets", count: 38, image: siliconeSheetImg, filterCategory: "Sheets" },
  { name: "Teflon Sheets", count: 24, image: teflonSheetImg, filterCategory: "Sheets" },
  { name: "Teflon Cloth", count: 18, image: teflonClothImg, filterCategory: "Sheets" },
  { name: "Cork Sheets", count: 22, image: corkSheetImg, filterCategory: "Sheets" },
  { name: "Silicon Foam Sheets", count: 15, image: siliconeSheetImg, filterCategory: "Sheets" },
  { name: "Nylon Sheets", count: 28, image: nylonSheetImg, filterCategory: "Sheets" },
  { name: "Rubber Cow Mats", count: 16, image: rubberCowMatImg, filterCategory: "Sheets" },
  { name: "Ball Bearings", count: 120, image: skfBearingImg, filterCategory: "Bearings" },
  { name: "Roller Bearings", count: 85, image: bearingNachiImg, filterCategory: "Bearings" },
  { name: "Thrust Bearings", count: 42, image: bearingBmcImg, filterCategory: "Bearings" },
  { name: "Nylon Shafts", count: 35, image: nylonShaftImg, filterCategory: "Engineering" },
  { name: "Rubber Roller Coverings", count: 24, image: rubberRollerCoveringImg, filterCategory: "Engineering" },
  { name: "Hardware Tools", count: 156, image: categoryTools, filterCategory: "Tools" },
  { name: "WD-40 Products", count: 18, image: wd40Img, filterCategory: "Tools" },
  { name: "Cutting Disks", count: 20, image: cuttingDiskImg, filterCategory: "Tools" },
  { name: "Stainless Steel Pipes & Rods", count: 30, image: ssPipeRodImg, filterCategory: "Tools" },
  { name: "Fencing & Barb Wire", count: 28, image: fencingBarbwireImg, filterCategory: "Tools" },
  { name: "Gasket Sealing Sheets", count: 22, image: gasketSealingSheetImg, filterCategory: "Tools" },
  { name: "Silicon Sponge Rubber Sheets", count: 18, image: siliconSpongeRubberSheetImg, filterCategory: "Tools" },
  { name: "Nylon Shaft Solutions", count: 20, image: nylonShaftSolutionImg, filterCategory: "Tools" },
  { name: "Glane Packing", count: 18, image: glanePackingSolutionImg, filterCategory: "Tools" },
  { name: "Aluminium Tape", count: 18, image: aluminiumTapeSolutionImg, filterCategory: "Tools" },
  { name: "Pneumatics Components", count: 22, image: pneumaticsComponentSolutionImg, filterCategory: "Tools" },
  { name: "Pneumatic Pipe", count: 20, image: pneumaticPipeSolutionImg, filterCategory: "Tools" },


  { name: "Rock Wool", count: 24, image: rockWoolImg, filterCategory: "Insulation" },


  { name: "Glass Wool", count: 22, image: glassWoolImg, filterCategory: "Insulation" },
  { name: "Stainless Steel Nets", count: 32, image: stainlessSteelNetImg, filterCategory: "Engineering" },
  { name: "Bitumen Membrane", count: 28, image: bitumenMembraneImg, filterCategory: "Insulation" },
  { name: "Geotextile Fabric", count: 18, image: geotextileFabricImg, filterCategory: "Insulation" },
  { name: "Geotextile Erosion Bags", count: 12, image: geotextileBagImg, filterCategory: "Insulation" },
  { name: "Geotextile Planter Bags", count: 15, image: geotextilePlanterBagImg, filterCategory: "Insulation" },
];

const Categories = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Product Categories — Industrial Hardware | A BBARI Enterprise"
        description="Explore industrial hardware categories: belts, sheets, bearings, tools and insulation materials. Quotation-based B2B sourcing."
        path="/categories"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Product Categories",
          url: "https://abbarient.lovable.app/categories",
        }}
      />
      <Navbar />

      <section className="pt-40 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-6xl text-foreground">
              PRODUCT CATEGORIES
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Explore our extensive range of industrial hardware organized by category
            </p>
          </div>

          {/* Categories grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allCategories.map((category, index) => (
              <Link
                key={category.name}
                to={`/products?category=${category.filterCategory}`}
                className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 select-none pointer-events-none"
                    draggable={false}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-foreground/10" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
                    {category.name.toUpperCase()}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">
                      {category.count} products
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Categories;
