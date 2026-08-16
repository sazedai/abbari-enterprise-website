import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ProductQuestionForm from "@/components/ProductQuestionForm";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, ShoppingCart, Package, Shield, Truck, CheckCircle, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// Import all product images
import vBeltAsset from "@/assets/products/v-belt.png.asset.json";
const vBeltImg = vBeltAsset.url;
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
import pneumaticComponentSolutionAsset from "@/assets/products/pneumatic-component-solution.png.asset.json";
const pneumaticComponentSolutionImg = pneumaticComponentSolutionAsset.url;
import pneumaticSparePartsSolutionAsset from "@/assets/products/pneumatic-spare-parts-solution.png.asset.json";
const pneumaticSparePartsSolutionImg = pneumaticSparePartsSolutionAsset.url;
import gtTimingBeltAsset from "@/assets/products/gt-timing-belt.png.asset.json";
const gtTimingBeltImg = gtTimingBeltAsset.url;
import asbestosPackingAsset from "@/assets/products/asbestos-packing-solution.png.asset.json";
const asbestosPackingImg = asbestosPackingAsset.url;
import harvesterVBeltAsset from "@/assets/products/harvester-v-belt.png.asset.json";
const harvesterVBeltImg = harvesterVBeltAsset.url;
import differentFlangeAsset from "@/assets/products/different-flange-solution.png.asset.json";
const differentFlangeImg = differentFlangeAsset.url;
import linexBeltingAsset from "@/assets/products/linex-belting-solution.png.asset.json";
const linexBeltingImg = linexBeltingAsset.url;
import industrialSprayPaintAsset from "@/assets/products/industrial-spray-paint-solution.png.asset.json";
const industrialSprayPaintImg = industrialSprayPaintAsset.url;








import productBelts from "@/assets/product-belts.jpg";

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
  44: pneumaticComponentSolutionImg,
  45: pneumaticSparePartsSolutionImg,
  46: gtTimingBeltImg,
  47: asbestosPackingImg,
  48: harvesterVBeltImg,
  49: differentFlangeImg,
  50: linexBeltingImg,
  51: industrialSprayPaintImg,
};

const productGallery: Record<number, string[]> = {
  51: [
    industrialSprayPaintImg,
    "/assets/products/industrial-spray-paint-detail-nozzle.png",
    "/assets/products/industrial-spray-paint-detail-cans.png",
    "/assets/products/industrial-spray-paint-detail-range.png",
  ],
};

const legacyFeaturedProductIds: Record<number, number> = {
  101: 15,
  102: 16,
  103: 17,
  104: 19,
  105: 20,
  106: 21,
};











interface Product {
  id: number;
  name: string;
  category: string;
  rating: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
}

const allProducts: Product[] = [
  { 
    id: 1, 
    name: "V-Belt", 
    category: "Belts", 
    rating: 4.8, 
    description: "High-performance industrial V-belt designed for heavy-duty power transmission applications. Engineered for maximum durability and efficiency in industrial environments.",
    features: ["High tensile strength", "Oil and heat resistant", "Minimal stretch", "Long service life"],
    specifications: { "Material": "Rubber compound", "Temperature Range": "-30°C to +70°C", "Sizes Available": "A, B, C, D sections" }
  },
  { 
    id: 2, 
    name: "Timing Belt HTD 5M", 
    category: "Belts", 
    rating: 4.6, 
    description: "Precision timing belt for synchronous power transmission systems. Ideal for applications requiring accurate positioning and zero slippage.",
    features: ["Zero slippage", "High precision", "Quiet operation", "Maintenance free"],
    specifications: { "Pitch": "5mm HTD", "Width Options": "9mm, 15mm, 25mm", "Material": "Neoprene with fiberglass cord" }
  },
  { 
    id: 3, 
    name: "Rubber Canvas Belt", 
    category: "Belts", 
    rating: 4.7, 
    description: "Durable rubber canvas belt reinforced for conveyor systems. Excellent resistance to abrasion and impact damage.",
    features: ["Abrasion resistant", "High tensile strength", "Flexible at low temperatures", "Impact resistant"],
    specifications: { "Ply": "2-8 ply options", "Width": "Up to 2000mm", "Cover Grade": "M, N, H grades" }
  },
  { 
    id: 4, 
    name: "Conveyor Belt 1000mm", 
    category: "Belts", 
    rating: 4.9, 
    description: "Wide conveyor belt ideal for bulk material handling in mining, quarrying, and industrial applications.",
    features: ["Heavy load capacity", "Low elongation", "Excellent tracking", "Fire resistant options"],
    specifications: { "Width": "1000mm", "Tensile Strength": "Up to 3150 N/mm", "Temperature": "-40°C to +80°C" }
  },
  { 
    id: 5, 
    name: "Steel Belt Lacing", 
    category: "Belts", 
    rating: 4.5, 
    description: "Strong steel lacing system for belt splicing and field repairs. Quick installation with minimal tools.",
    features: ["Quick installation", "Reusable", "High strength", "Corrosion resistant"],
    specifications: { "Material": "Galvanized steel", "Belt Thickness": "5-20mm", "Fastener Type": "Rivet or bolt" }
  },
  { 
    id: 6, 
    name: "PVC Clear Sheet 3mm", 
    category: "Sheets", 
    rating: 4.6, 
    description: "Transparent PVC sheet for protective barriers, machine guards, and display applications.",
    features: ["Excellent clarity", "Chemical resistant", "Easy to fabricate", "Self-extinguishing"],
    specifications: { "Thickness": "3mm", "Size": "1220 x 2440mm", "Transparency": ">85%" }
  },
  { 
    id: 7, 
    name: "PVC Curtain Strip", 
    category: "Sheets", 
    rating: 4.4, 
    description: "Flexible strip curtain for doorways, cold storage, and industrial partitions. Reduces energy costs.",
    features: ["Energy efficient", "Easy installation", "See-through", "Noise reduction"],
    specifications: { "Width": "200mm, 300mm", "Thickness": "2mm, 3mm", "Temperature": "-20°C to +50°C" }
  },
  { 
    id: 8, 
    name: "Rubber Sheet 5mm", 
    category: "Sheets", 
    rating: 4.8, 
    description: "Versatile rubber sheet for gaskets, flooring, and vibration dampening applications.",
    features: ["Excellent sealing", "Shock absorption", "Weather resistant", "Multiple hardness options"],
    specifications: { "Thickness": "5mm", "Hardness": "60-80 Shore A", "Width": "1000mm, 1200mm" }
  },
  { 
    id: 9, 
    name: "Silicon Sheet Clear", 
    category: "Sheets", 
    rating: 4.7, 
    description: "Heat-resistant silicone sheet for high-temperature sealing applications and food-grade uses.",
    features: ["FDA compliant", "Temperature resistant", "Non-toxic", "Flexible"],
    specifications: { "Temperature": "-60°C to +200°C", "Hardness": "50-70 Shore A", "Colors": "Clear, Red, White" }
  },
  { 
    id: 10, 
    name: "Teflon Sheet PTFE", 
    category: "Sheets", 
    rating: 4.9, 
    description: "Non-stick PTFE sheet with excellent chemical resistance and low friction properties.",
    features: ["Non-stick surface", "Chemical inert", "Low friction", "Wide temp range"],
    specifications: { "Material": "Virgin PTFE", "Temperature": "-200°C to +260°C", "Thickness": "0.5-50mm" }
  },
  { 
    id: 11, 
    name: "Cork Sheet 6mm", 
    category: "Sheets", 
    rating: 4.5, 
    description: "Natural cork sheet for insulation, gaskets, and vibration isolation applications.",
    features: ["Natural material", "Compressible", "Thermal insulator", "Acoustic dampening"],
    specifications: { "Thickness": "6mm", "Density": "200-250 kg/m³", "Size": "915 x 610mm" }
  },
  { 
    id: 12, 
    name: "SKF Ball Bearing 6205", 
    category: "Bearings", 
    rating: 4.9, 
    description: "Premium SKF deep groove ball bearing for reliable rotary motion in motors and machinery.",
    features: ["Long service life", "Low friction", "High speed capable", "Sealed options"],
    specifications: { "Bore": "25mm", "OD": "52mm", "Width": "15mm", "Speed Limit": "13000 rpm" }
  },
  { 
    id: 13, 
    name: "Tapered Roller Bearing", 
    category: "Bearings", 
    rating: 4.8, 
    description: "Heavy-duty tapered roller bearing designed for combined radial and axial loads.",
    features: ["High load capacity", "Separable design", "Easy installation", "Long life"],
    specifications: { "Type": "Single row", "Load Rating": "High radial + thrust", "Material": "Chrome steel" }
  },
  { 
    id: 14, 
    name: "Thrust Bearing", 
    category: "Bearings", 
    rating: 4.6, 
    description: "Precision thrust bearing designed specifically for axial force handling in rotating machinery.",
    features: ["Axial load support", "Low friction", "Self-aligning", "Cage guided"],
    specifications: { "Type": "Ball/Roller", "Load Direction": "Axial only", "Speed": "Medium-High" }
  },
  { 
    id: 15, 
    name: "WD-40 Multi-Use 400ml", 
    category: "Tools", 
    rating: 4.9, 
    description: "Multi-purpose lubricant, rust preventive, and penetrating oil in convenient spray format.",
    features: ["5-in-1 formula", "Drives out moisture", "Loosens rust", "Protects metal"],
    specifications: { "Volume": "400ml", "Application": "Spray", "Protection": "Up to 1 year" }
  },
  { 
    id: 16, 
    name: "Rock Wool Insulation", 
    category: "Insulation", 
    rating: 4.7, 
    description: "Fire-resistant mineral wool insulation for thermal and acoustic protection in industrial settings.",
    features: ["A1 fire rated", "Acoustic insulation", "Moisture resistant", "Non-combustible"],
    specifications: { "Density": "60-150 kg/m³", "Temperature": "Up to 750°C", "Thickness": "25-100mm" }
  },
  { 
    id: 17, 
    name: "Glass Wool Roll", 
    category: "Insulation", 
    rating: 4.6, 
    description: "Lightweight glass wool for acoustic and thermal insulation in HVAC and building applications.",
    features: ["Lightweight", "Easy to install", "Thermal efficient", "Sound absorbing"],
    specifications: { "Density": "10-48 kg/m³", "Thermal": "0.032-0.044 W/mK", "Width": "1200mm" }
  },
  { 
    id: 18, 
    name: "Nylon Shaft 50mm", 
    category: "Engineering", 
    rating: 4.5, 
    description: "Durable nylon shaft for mechanical components, bushings, and wear-resistant applications.",
    features: ["Self-lubricating", "Wear resistant", "Low friction", "Easy to machine"],
    specifications: { "Diameter": "50mm", "Material": "Nylon 6/66", "Length": "1000mm standard" }
  },
  { 
    id: 19, 
    name: "Teflon Cloth Roll", 
    category: "Sheets", 
    rating: 4.8, 
    description: "High-temperature resistant PTFE-coated fiberglass cloth for heat sealing and conveyor applications.",
    features: ["Non-stick", "Heat resistant", "Chemical inert", "Easy release"],
    specifications: { "Temperature": "Up to 260°C", "Width": "1000mm", "Thickness": "0.08-0.25mm" }
  },
  { 
    id: 20, 
    name: "Stainless Steel Net", 
    category: "Engineering", 
    rating: 4.7, 
    description: "Durable stainless steel wire mesh for filtration, screening, and protective applications.",
    features: ["Corrosion resistant", "High strength", "Easy to clean", "Various mesh sizes"],
    specifications: { "Material": "SS304/SS316", "Mesh": "10-200 mesh", "Width": "1000-1500mm" }
  },
  { 
    id: 21, 
    name: "Bitumen Membrane", 
    category: "Insulation", 
    rating: 4.8, 
    description: "Self-adhesive waterproof membrane for roofing, foundation, and underground structure protection.",
    features: ["Self-adhesive", "UV resistant", "Root resistant", "Flexible"],
    specifications: { "Thickness": "3-5mm", "Width": "1000mm", "Length": "10m/roll" }
  },
  { 
    id: 22, 
    name: "Nylon Sheet 10mm", 
    category: "Sheets", 
    rating: 4.6, 
    description: "Strong nylon sheet for wear-resistant components, guides, and structural applications.",
    features: ["Excellent wear", "Impact resistant", "Low friction", "Machinable"],
    specifications: { "Thickness": "10mm", "Material": "Cast Nylon", "Size": "1000 x 2000mm" }
  },
  {
    id: 23,
    name: "Geotextile Premium Filter Fabric",
    category: "Insulation",
    rating: 4.9,
    description: "Non-woven polypropylene geotextile (300gsm) engineered for separation, filtration and drainage in civil engineering, road construction and landscaping projects. Provides long-term performance under demanding load and environmental conditions.",
    features: ["High tensile strength", "Excellent water permeability", "UV & rot resistant", "Superior filtration"],
    specifications: { "Material": "Non-woven Polypropylene", "Weight": "300 gsm", "Roll Width": "2m / 4m / 6m", "Application": "Civil / Road / Landscaping" },
  },
  {
    id: 24,
    name: "Geotextile Erosion Control Bag",
    category: "Insulation",
    rating: 4.8,
    description: "Eco-friendly non-woven geotextile bags for flood control, coastal protection and soil stabilization. Engineered with high tensile strength and excellent water permeability to safeguard embankments and shorelines.",
    features: ["Flood & erosion control", "High tensile strength", "UV stabilized", "Eco-friendly"],
    specifications: { "Material": "Non-woven Polypropylene", "Fill Capacity": "0.5 – 1.5 m³", "Weight": "200–400 gsm", "Application": "Coastal / Embankment / Flood" },
  },
  {
    id: 25,
    name: "Geotextile Planter/Grow Bag",
    category: "Insulation",
    rating: 4.7,
    description: "Breathable non-woven geotextile fabric bag for horticulture and root aeration. Promotes healthy plant growth through superior drainage, air pruning and long-lasting durability across multiple growing seasons.",
    features: ["Breathable fabric", "Air-pruning roots", "Reusable & durable", "Superior drainage"],
    specifications: { "Material": "Non-woven Polypropylene", "Sizes": "1 / 5 / 10 / 25 / 100 Gallon", "Weight": "200–260 gsm", "Application": "Horticulture / Nursery" },
  },
  {
    id: 26,
    name: "Geotextile Fabric Roll",
    category: "Insulation",
    rating: 4.8,
    description: "Performance-engineered geotextile roll with high fiber density, tensile strength, water permeability and UV resistance. Suitable for infrastructure, landscaping, drainage and ground stabilization applications.",
    features: ["High fiber density", "UV resistant", "Excellent permeability", "Ground stabilization"],
    specifications: { "Material": "Non-woven Polypropylene", "Weight": "150–400 gsm", "Roll Length": "50m / 100m", "Roll Width": "2m / 4m / 6m" },
  },
  {
    id: 27,
    name: "Rubber Cow Mat Solution",
    category: "Sheets",
    rating: 4.9,
    description: "Heavy-duty multi-layer rubber cow mat engineered for dairy sheds, stables and livestock housing. Features an anti-slip hexagonal grip top, diamond traction surface, fabric reinforcement scrim, high-resilience core and mini-dot grip backing for superior comfort, easy drainage and long-lasting durability. Available in hexagonal grip, large-cell drainage, premium bollard & ribbed and wide-ribbed comfort profiles.",
    features: [
      "Anti-slip hexagonal & diamond grip top",
      "High-resilience multi-layer core",
      "Easy drainage & quick cleaning",
      "Fabric reinforcement scrim for strength",
      "Mini-dot grip backing prevents shifting",
      "Superior cow comfort & hoof protection",
    ],
    specifications: {
      "Material": "Vulcanized Natural / EPDM Rubber",
      "Thickness": "12mm / 17mm / 22mm",
      "Standard Size": "1800 x 1200mm",
      "Surface": "Hexagonal / Diamond / Bollard / Ribbed",
      "Backing": "Mini-dot anti-skid",
      "Hardness": "55–65 Shore A",
      "Application": "Dairy sheds, stables, livestock housing",
    },
  },
  {
    id: 28,
    name: "Rubber Roller Covering Solution",
    category: "Engineering",
    rating: 4.9,
    description: "Advanced synthetic rubber roller covering engineered for demanding industrial rollers used in printing, paper, textile, steel, food processing and packaging lines. Multi-layer construction combines a wear-resistant cover rubber, carcass reinforcement, adhesive ply and a reinforced base bonded to the roller core and journal. Available in fine texture, blue grip and dimple grip finishes with high abrasion resistance, chemical & oil resistance, static conductivity, tear resistance and superior shock absorption.",
    features: [
      "Multi-layer bonded construction (cover, carcass, adhesive, reinforced base)",
      "Fine texture, blue grip and dimple grip finishes",
      "High abrasion, chemical & oil resistance",
      "Static-conductive & anti-static options",
      "Tear resistant with excellent shock absorption",
      "Custom hardness, diameter and length on request",
    ],
    specifications: {
      "Material": "Synthetic Rubber (NBR / EPDM / Polyurethane)",
      "Hardness": "40–90 Shore A",
      "Cover Thickness": "5–30 mm",
      "Roller Diameter": "50–1200 mm (custom)",
      "Surface Finish": "Fine Texture / Blue Grip / Dimple Grip",
      "Reinforcement": "Fabric carcass with adhesive ply",
      "Application": "Printing, paper, textile, steel, food & packaging rollers",
    },
  },
  {
    id: 29,
    name: "PU V-Belt Solution",
    category: "Belts",
    rating: 4.9,
    description: "Advanced polyurethane (PU) V-belt range engineered for high-performance power transmission across conveying, packaging, textile, ceramic and food processing lines. Available in solid core (gray PU), simple PU (green), Kevlar-reinforced, custom red profile and heavy-duty flat-top variants. Multi-layer construction features a cogged polyurethane top cover, Kevlar tensile cord and precision-molded teeth bonded to a red polyurethane base layer — delivering high abrasion resistance, tear resistance and flexible on-site joining with the included welding kit.",
    features: [
      "Solid core, simple, reinforced, custom & heavy-duty profiles",
      "Kevlar tensile cord for maximum load capacity",
      "Cogged PU top cover with precision-molded teeth",
      "High abrasion, oil and chemical resistance",
      "Flexible on-site welding / joining to custom length",
      "Wide color range: blue, red, orange, teal, natural & green",
    ],
    specifications: {
      "Material": "Thermoplastic Polyurethane (TPU)",
      "Reinforcement": "Kevlar / Aramid Tensile Cord",
      "Hardness": "80–95 Shore A",
      "Profiles": "Round, Square, V (Z/A/B/C/SPZ/SPA/SPB), Flat, Double-V",
      "Temperature Range": "-30°C to +80°C",
      "Length": "Custom — endless or on-site weldable",
      "Application": "Conveyors, packaging, textile, ceramic, food & printing",
    },
  },
  {
    id: 30,
    name: "PU Flat Belt Solution",
    category: "Belts",
    rating: 4.9,
    description: "Next-generation polyurethane flat belting engineered for high-speed conveying, folder-gluers, printing, packaging, tobacco, textile, wood and paper processing lines. Multi-layer construction combines a robust glossy polyurethane top cover, high-strength polyester or Kevlar reinforcement fabric, an inner PU adhesion layer for a secure bond, and a specified-texture polyurethane bottom cover. Available in forest-green, red, black, white and transparent variants with smooth, grip or fabric-backed surfaces for slip-free, low-noise and hygienic operation.",
    features: [
      "Multi-layer construction: PU top / fabric / PU adhesion / PU bottom",
      "High-strength polyester or Kevlar reinforcement fabric",
      "Robust glossy polyurethane cover with excellent abrasion resistance",
      "Smooth, grip-top or fabric-backed bottom for slip-free tracking",
      "Food-grade and FDA-compliant grades available",
      "Endless welded or mechanically joined to custom length",
    ],
    specifications: {
      "Material": "Thermoplastic Polyurethane (TPU)",
      "Reinforcement": "High-Strength Polyester / Kevlar Fabric",
      "Thickness": "1.0 – 6.0 mm",
      "Width": "20 – 2000 mm (custom cut-to-size)",
      "Hardness": "80 – 92 Shore A",
      "Temperature Range": "-20°C to +80°C",
      "Colors": "Forest Green, Red, Black, White, Transparent",
      "Surface Options": "Smooth Glossy / Grip / Fabric-Backed",
      "Application": "Conveying, packaging, printing, textile, wood, tobacco, food",
    },
  },
  {
    id: 31,
    name: "Advanced PU Belting Solution",
    category: "Belts",
    rating: 4.9,
    description: "Advanced polyurethane cord belting engineered for high-elasticity power transmission, quiet operation and easy on-site joining. The range covers solid-core PU round cords and reinforced tensile-cord PU jacketed belts constructed from a polyurethane material core, steel or aramid reinforcement tensile cords, an inner bonding layer and an outer abrasion-resistant PU jacket. Ideal for conveying, textile, glass, ceramic, packaging, wood and light-duty industrial drives — supplied in a full color range (green, red, black, orange, transparent, teal) and joined on-site with heat-weld or mechanical fasteners.",
    features: [
      "High elasticity and shock-absorbing power transmission",
      "Solid-core PU round cord and reinforced cord-jacket constructions",
      "Steel or aramid tensile-cord reinforcement for zero elongation",
      "Inner bonding layer with outer abrasion-resistant PU jacket",
      "Easy on-site joining — heat-weld or mechanical fastener",
      "Excellent oil, ozone, UV and chemical resistance",
      "Full color range: green, red, black, orange, transparent, teal",
    ],
    specifications: {
      "Material": "Thermoplastic Polyurethane (TPU)",
      "Construction": "Solid Core / Reinforced Tensile Cord with PU Jacket",
      "Reinforcement": "Galvanized Steel or Aramid (Kevlar) Cord",
      "Diameter": "2 – 20 mm (round cord)",
      "Hardness": "80 – 92 Shore A",
      "Tensile Strength": "Up to 1,200 N (reinforced grades)",
      "Temperature Range": "-30°C to +80°C",
      "Colors": "Green, Red, Black, Orange, Transparent, Teal",
      "Joining": "Heat-weld or mechanical fastener (on-site)",
      "Application": "Conveying, textile, glass, ceramic, packaging, wood, light industrial",
    },
  },
  {
    id: 32,
    name: "Adjustable Link V-Belt Solution",
    category: "Belts",
    rating: 4.9,
    description: "Adjustable-length link V-belt system supplied on a 20-metre spool that can be assembled and installed on-site in seconds — no tools, no downtime and no need to dismantle pulleys, motors or drive guards. Simply hand-connect the individual links to build any belt length in classical A, B, C, D or SPZ/SPA/SPB profiles. Available in three variants: Nu-T Link (orange, fabric-reinforced polyurethane) for general industrial drives, Studded (blue, steel-stud reinforced) for heavy-duty high-torque applications, and Multi-Rib (red) for ribbed pulleys — all engineered to industry-standard power ratings, reduced vibration, longer belt life and simple emergency replacement in HVAC, pumps, compressors, fans, machine tools and agricultural equipment.",
    features: [
      "Adjustable to any length on-site — no tools required",
      "20-metre spool cuts installation and downtime to minutes",
      "No need to dismantle pulleys, motors or drive guards",
      "Three variants: Nu-T Link (Orange), Studded (Blue), Multi-Rib (Red)",
      "Industry-standard power ratings equal or exceeding solid V-belts",
      "Reduced vibration and quieter operation vs. rubber V-belts",
      "Excellent oil, heat, ozone and chemical resistance",
      "Ideal for emergency replacement and hard-to-reach drives",
    ],
    specifications: {
      "Material": "Fabric-Reinforced Polyurethane / Polyester",
      "Reinforcement": "High-Tensile Polyester Fabric or Steel Studs",
      "Variants": "Nu-T Link (Orange), Studded (Blue), Multi-Rib (Red)",
      "Profiles": "A, B, C, D, SPZ, SPA, SPB (Classical & Wedge)",
      "Spool Length": "20 metres (custom length on request)",
      "Operating Temperature": "-30°C to +110°C",
      "Tensile Strength": "Equal to or greater than solid rubber V-belts",
      "Installation": "Hand-linked — no tools, no drive disassembly",
      "Application": "HVAC, pumps, compressors, fans, machine tools, agriculture, emergency replacement",
    },
  },
  {
    id: 33,
    name: "Cutting Disk Solution",
    category: "Tools",
    rating: 4.9,
    description: "A complete, professional range of high-performance cutting and grinding discs engineered for angle grinders and cut-off machines. The line-up covers Nova (red) abrasive discs for metal, iron and stainless steel cutting; Makita INOX (silver) precision discs for clean stainless steel cuts with minimal burr; segmented diamond blades for granite, ceramic and Dekton; universal glass and concrete diamond discs; and dedicated wood & plastic cutting blades. Each disc is built with high-quality abrasive grit, multiple fibreglass reinforcement layers, precision hub & arbour and clear safety and performance markings — delivering fast, clean, chatter-free cuts with excellent disc life and operator safety across construction, fabrication, metalwork, stone and general industrial applications.",
    features: [
      "Full range: Nova (Red), Makita INOX (Silver), Diamond Segmented, Wood/Plastic and Glass cutting blades",
      "High-quality abrasive grit for fast, aggressive cutting",
      "Multi-layer fibreglass reinforcement for burst resistance and long life",
      "Precision hub & arbour for balanced, vibration-free rotation",
      "Clear safety and performance markings (MPa, RPM, expiry)",
      "Diamond segmented rim for granite, ceramic, Dekton and stone",
      "INOX-safe formulation — no iron contamination on stainless steel",
      "Compatible with standard 100mm / 115mm / 125mm angle grinders",
    ],
    specifications: {
      "Variants": "Nova (Red), Makita INOX (Silver), Diamond Segmented, Wood & Plastic, Glass Cutting",
      "Disc Diameter": "100mm, 115mm, 125mm, 180mm, 230mm (standard)",
      "Bore / Arbour": "16mm / 22.23mm (standard)",
      "Thickness": "1.0mm – 3.0mm (cutting), 6.0mm (grinding)",
      "Reinforcement": "Double fibreglass mesh (Type 41 / Type 42)",
      "Max Operating Speed": "Up to 13,300 RPM (depending on diameter)",
      "Applications": "Metal, Stainless Steel (INOX), Stone, Granite, Ceramic, Wood, Plastic, Glass",
      "Compliance": "EN 12413 / oSa safety standard",
    },
  },
  {
    id: 34,
    name: "Stainless Steel Pipe and Rod Solution",
    category: "Tools",
    rating: 4.9,
    description: "A complete stainless steel and mild steel pipe, tube, rod and welding-consumable programme engineered for fabrication, construction, plumbing, structural and industrial welding projects. The range includes exploded/lap pipe fittings, mild steel structural pipes (round, capped in blue/red for identification), SS tubing with multi-layer wall construction, precision SS round rods and square/rectangular hollow sections, plus matching Gemini 308L TIG filler rods and 316L stainless stick electrodes. Every item is supplied with high corrosion resistance, high structural strength and consistent metallurgy — with diameter and length variety to suit both light fabrication and heavy structural work.",
    features: [
      "Full material range: SS 304, SS 316L, Mild Steel (MS) — pipe, tube, rod & hollow sections",
      "High corrosion resistance (SS) and high structural strength (MS)",
      "Wide diameter variety — SS rods from 2mm to 15mm, pipe & tube in multiple bores",
      "Length variety — 125mm to 500mm standard cuts, custom lengths on request",
      "Square, rectangular and round hollow sections for structural fabrication",
      "Exploded / lap pipe fittings for quick joining and repair work",
      "Matching welding consumables — Gemini 308L TIG rods & 316L stick electrodes",
      "Colour-capped ends for on-site grade & size identification",
    ],
    specifications: {
      "Materials": "Stainless Steel 304 / 316L, Mild Steel (MS)",
      "Product Types": "Round Pipe, Square Tube, Rectangular Tube, Round Rod, Exploded/Lap Fittings",
      "SS Rod Diameter": "2mm – 15mm (standard)",
      "SS Rod Length": "125mm – 500mm (custom on request)",
      "Pipe / Tube Sizes": "Round & square hollow sections, multiple wall thicknesses",
      "Welding Consumables": "Gemini 308L TIG filler rod, 316L stainless stick electrode",
      "Finish": "Bright polished / mill finish (SS), painted or primed (MS)",
      "Applications": "Fabrication, construction, plumbing, structural frames, food & chemical plants, welding",
      "Compliance": "ASTM A312 (SS pipe), ASTM A554 (SS tube), AWS A5.9 (308L), AWS A5.4 (316L)",
    },
  },
  {
    id: 35,
    name: "Fencing and Barb Wire Solution",
    category: "Tools",
    rating: 4.9,
    description: "A complete perimeter security programme covering fencing systems and barb wire solutions for residential, commercial, agricultural and industrial sites. The fencing range includes galvanized chain-link mesh, green PVC-coated chain-link, welded wire mesh panels and expanded metal mesh — supplied with matching posts, top-rail connections and mesh dimension options. The barb wire line-up covers heavy-zinc galvanized barb wire, PVC-coated (blue) barb wire with detailed texture protection, high-tensile galvanized-core twisted wire, aggressive sharp-barb variants and copper-time sharp-barb wire. Every product is engineered for corrosion resistance, high security, diverse mesh sizes, eco-friendly materials and full custom customization.",
    features: [
      "Galvanized chain-link and green PVC-coated chain-link fencing",
      "Welded wire mesh panels and expanded metal mesh in multiple opening sizes",
      "Matching posts, top-rail connections and hardware for quick installation",
      "Heavy zinc-coated barb wire for long-term corrosion resistance",
      "PVC-coated (blue) barb wire — anti-rust with high UV stability",
      "High-tensile galvanized-core twisted wire for extra pull strength",
      "Aggressive sharp-barb and copper-time sharp-barb configurations",
      "Custom heights, mesh sizes, wire gauges and roll lengths on request",
    ],
    specifications: {
      "Fencing Types": "Galvanized Chain-Link, Green PVC-Coated Chain-Link, Welded Wire Mesh, Expanded Metal Mesh",
      "Barb Wire Types": "Heavy Zinc Coated, PVC-Coated (Blue), High-Tensile Galvanized Core, Copper-Time Sharp Barb",
      "Wire Gauge": "10 SWG – 14 SWG (2.0mm – 3.5mm)",
      "Coating": "Hot-dip Galvanized (Class A/B), PVC (Green/Blue), Zinc-Aluminium",
      "Mesh Opening": "25mm × 25mm, 50mm × 50mm, 60mm × 60mm, 75mm × 75mm (custom on request)",
      "Roll Length": "Barb wire: 250m / 500m per coil — Chain-link: 15m / 25m / custom",
      "Fence Height": "1.2m, 1.5m, 1.8m, 2.1m, 2.4m (custom heights available)",
      "Applications": "Perimeter security, boundary walls, agricultural fencing, industrial sites, warehouses, farms, government facilities",
      "Compliance": "ASTM A121 (barb wire), ASTM A392 (galvanized chain-link), BS 4102 / IS 278",
    },
  },
  {
    id: 36,
    name: "Gasket Sealing Sheet Solution",
    category: "Tools",
    rating: 4.9,
    description: "A comprehensive modern sealing programme covering both asbestos and non-asbestos gasket sheets for flanges, pumps, valves, heat exchangers, compressors and pressure vessels. The range includes Klingerit 1000 rolls and cut sheets (asbestos-fibre reinforced with a high-performance elastomer binder), Klinger Universal and Klinger-Oilit branded jointing sheets, wiremesh-reinforced composite sheets (galvanized steel wire mesh core bonded with asbestos or non-asbestos compound) and green / red compressed-fibre jointing sheets ready for on-site gasket cutting. Every sheet is engineered for thermal resistance, chemical compatibility and sustainability, with certified performance across steam, oil, fuel, acid, alkali and general industrial media.",
    features: [
      "Klingerit 1000 asbestos-fibre reinforced sheets with elastomer binder",
      "Klinger Universal and Klinger-Oilit non-asbestos jointing sheets",
      "Wiremesh-reinforced composite sheets — galvanized steel mesh + compound core",
      "Green (CAF) and red (compressed fibre) jointing sheets for general service",
      "Excellent thermal resistance up to +400°C (peak) with pressure ratings to 100 bar",
      "Chemical compatibility with steam, oil, fuel, mild acids and alkalis",
      "Available as full rolls and pre-cut sheets — easy on-site gasket cutting",
      "Eco-friendly non-asbestos formulations for sustainability compliance",
    ],
    specifications: {
      "Types": "Klingerit 1000, Klinger Universal, Klinger-Oilit, Wiremesh-Reinforced, Green CAF, Red Compressed Fibre",
      "Composition": "Asbestos / Non-Asbestos fibre + NBR / SBR / EPDM elastomer binder",
      "Reinforcement": "Optional galvanized steel wire mesh core (wiremesh grade)",
      "Sheet Size": "1500mm × 1500mm, 2000mm × 1500mm (custom on request)",
      "Thickness": "0.5mm, 0.8mm, 1.0mm, 1.5mm, 2.0mm, 3.0mm",
      "Roll Format": "Klingerit 1000 supplied in rolls up to 10m length",
      "Temperature Rating": "-50°C to +400°C (peak, grade dependent)",
      "Pressure Rating": "Up to 100 bar (grade & thickness dependent)",
      "Media Compatibility": "Steam, water, oil, fuel, refrigerants, mild acids & alkalis, gases",
      "Applications": "Flanges, pumps, valves, heat exchangers, compressors, pressure vessels, pipelines",
      "Compliance": "DIN 3754, BS 7531, ASTM F104",
    },
  },
  {
    id: 37,
    name: "Silicon Sponge Rubber Sheets Solution",
    category: "Tools",
    rating: 4.9,
    description: "Premium silicone sponge rubber sheet range engineered for high-performance sealing, gasketing, cushioning, thermal insulation and vibration damping across industrial, automotive, HVAC, electrical and food-processing applications. The product architecture combines a heat- and chemical-resistant silicone polymer matrix with a choice of closed-cell or open-cell structures, a uniform pore distribution, optional reinforcement fabric ply and a pressure-sensitive adhesive backing with 3M release liner. Designed to operate from -50°C to +200°C, the sheets deliver excellent sealing, resilience, UV/ozone resistance, compression-set recovery and easy die-cutting or on-site fabrication.",
    features: [
      "Silicone polymer matrix — heat and chemical resistant",
      "Closed-cell and open-cell structure options with uniform pore distribution",
      "Optional reinforcement fabric ply for added strength and dimensional stability",
      "Pressure-sensitive adhesive (PSA) backing with 3M release liner for easy mounting",
      "Wide temperature range: -50°C to +200°C",
      "Excellent sealing, cushioning, thermal insulation and vibration damping",
      "UV, ozone and weathering resistant with good compression-set recovery",
      "Easy to cut, punch, die-cut and install on-site",
    ],
    specifications: {
      "Material": "Silicone Sponge Rubber (VMQ)",
      "Cell Structure": "Closed-Cell / Open-Cell",
      "Temperature Range": "-50°C to +200°C",
      "Density": "Custom densities available (light, medium, firm)",
      "Thickness": "1mm – 25mm (custom thicknesses on request)",
      "Width": "Standard rolls up to 1200mm; sheets cut-to-size",
      "Color": "White, grey, black, red (custom colors available)",
      "Reinforcement": "Optional fabric ply (polyester/fiberglass)",
      "Adhesive": "Pressure-sensitive acrylic adhesive with 3M release liner",
      "Hardness": "10–50 Shore A (grade dependent)",
      "Applications": "Sealing, gasketing, insulation, cushioning, vibration damping, HVAC, automotive, electrical enclosures",
      "Compliance": "FDA grades available for food-contact applications",
    },
  },
  {
    id: 38,
    name: "Nylon Shaft Solution",
    category: "Tools",
    rating: 4.9,
    description: "Complete precision-engineered nylon shaft solution covering extruded and cast Nylon 6 (PA6) and Nylon 6/66 (PA66) rods in a wide range of diameters, lengths and colours. The range includes natural white rods in standard 160mm, 200mm and 300mm diameters, high-stiffness pigmented blue Nylon 6 shafts, and fully customizable green, black, red and yellow Nylon 6/66 shafts for colour-coded identification and OEM branding. With excellent wear resistance, low coefficient of friction, good fatigue resistance and outstanding machinability, these shafts are ideal for bushings, bearings, wear pads, rollers, gears, sprockets, pulleys and general mechanical components across industrial, automotive, agricultural and food-processing equipment.",
    features: [
      "Nylon 6 (PA6) and Nylon 6/66 (PA66) material options for balanced strength and machinability",
      "Natural white rods in standard diameters: 100mm, 160mm, 200mm and 300mm",
      "Pigmented blue Nylon 6 shaft variant for high stiffness and wear resistance",
      "Custom colour options: green, black, red, yellow and other OEM colours on request",
      "Excellent wear resistance and low friction for bearing and bushing applications",
      "High stiffness, good fatigue life and superior dimensional stability",
      "Easy to machine, turn, mill, drill and tap to custom shapes",
      "Suitable for gears, rollers, sprockets, pulleys, wear pads and structural spacers",
    ],
    specifications: {
      "Material": "Nylon 6 (PA6) / Nylon 6/66 (PA66)",
      "Standard Diameters": "100mm, 160mm, 200mm, 300mm (custom sizes available)",
      "Standard Lengths": "1000mm; custom cut-to-length on request",
      "Color Options": "Natural white, blue (Nylon 6), green, black, red, yellow (customizable)",
      "Density": "1.13 – 1.15 g/cm³",
      "Hardness": "80 – 85 Shore D",
      "Tensile Strength": "Up to 80 MPa (grade dependent)",
      "Temperature Range": "-40°C to +100°C (short term +120°C)",
      "Machinability": "Excellent — easy to turn, mill, drill and tap",
      "Surface Finish": "Smooth extruded / cast surface; ground finish available",
      "Applications": "Bushings, bearings, wear pads, rollers, gears, sprockets, pulleys, spacers, mechanical components",
      "Compliance": "RoHS compliant; FDA-approved grades available for food-contact applications",
    },
  },
  {
    id: 39,
    name: "Glane Packing Solution",
    category: "Tools",
    rating: 4.9,
    description: "Advanced gland packing solution for industrial valves, pumps, mixers, agitators and rotating-shaft equipment. The range covers four high-performance constructions: high-temperature PTFE, expanded graphite, ceramic fibre and acrylic composite. Each style is engineered to deliver reliable, low-emission sealing across steam, chemicals, hydrocarbons, abrasive media and high-temperature applications while minimizing shaft wear and extending maintenance intervals.",
    features: [
      "High-Temp PTFE packing with virgin PTFE fibres, high-temp lubricant and reinforcing core",
      "Graphite Superior packing with expanded flexible graphite, Inconel wire reinforcement and corrosion inhibitor",
      "Ceramic Fibre packing with ceramic fibres, glass filament/wire insert and low burn-off binder",
      "Acrylic Composite packing with high-grade acrylic yarn, PTFE impregnation and inner elastic core",
      "Excellent chemical resistance, thermal stability and mechanical strength",
      "Low-friction, low-shaft-wear construction for longer equipment life",
      "Suitable for valves, pumps, mixers, agitators and rotating shaft seals",
      "Wide temperature and pressure range across product variants",
    ],
    specifications: {
      "Material": "PTFE / Graphite / Ceramic Fibre / Acrylic Composite",
      "PTFE Temperature": "Up to 260°C",
      "Graphite Temperature": "Up to 450°C (steam), higher in non-oxidizing atmospheres",
      "Ceramic Temperature": "Up to 1000°C",
      "Acrylic Temperature": "Up to 150°C",
      "Pressure Range": "Up to 250 bar (variant dependent)",
      "pH Range": "0–14 (PTFE and graphite grades)",
      "Applications": "Valves, pumps, mixers, agitators, reactors, compressors, steam systems",
      "Reinforcement": "Inconel wire, glass filament, wire insert or elastic core",
      "Lubrication": "High-temp lubricant / PTFE impregnation / corrosion inhibitor",
      "Compliance": "Industry-standard sealing performance; custom grades available",
    },
  },
  {
    id: 40,
    name: "Aluminium Tape Solution",
    category: "Tools",
    rating: 4.9,
    description: "Complete aluminium foil tape range engineered for HVAC sealing, insulation facing, ductwork, refrigeration and high-temperature industrial applications. The range includes plain dead-soft aluminium foil tape with high-temperature acrylic adhesive, reinforced FSK (foil-scrim-kraft) tape for extra tensile strength, glass-fibre-cloth aluminium tape for extreme heat deflection, and lacquered black aluminium tape for camouflage and UV-stable duct finishing. Each variant provides excellent moisture, vapour and chemical barrier performance with strong adhesion and clean, liner-backed application.",
    features: [
      "Plain dead-soft aluminium foil tape: 0.03mm foil face, high-temperature acrylic adhesive, release liner paper",
      "Bagla Premium dead-soft aluminium: 0.05mm foil, service range -30°C to +120°C",
      "Reinforced FSK tape: aluminium foil/scrim/kraft lamination for high tensile strength",
      "Glass-fibre-cloth aluminium tape with glass-cloth weave for extreme heat deflection",
      "Lacquered black aluminium tape with black surface finish for camouflage in ducting",
      "Excellent moisture and vapour barrier for insulation and HVAC sealing",
      "High-temperature acrylic adhesive system for long-term bonding",
      "Easy liner-backed roll format for fast, clean installation",
    ],
    specifications: {
      "Material": "Aluminium Foil / FSK / Glass-Fibre Cloth / Lacquered Black Aluminium",
      "Foil Thickness": "0.03mm – 0.05mm (plain/premium grades)",
      "Service Temperature": "-30°C to +120°C (standard), higher for cloth grades",
      "Adhesive": "High-temperature acrylic with release liner",
      "Reinforcement": "Plain foil, scrim-kraft, glass-fibre cloth or lacquered coating",
      "Tensile Strength": "High (reinforced FSK grade)",
      "Width": "Standard rolls 48mm / 50mm; custom widths available",
      "Length": "Standard 25m / 45m / 50m rolls",
      "Applications": "HVAC, duct sealing, insulation facing, refrigeration, vapour barriers, heat shielding",
      "Finish": "Bright silver, matte black, FSK pattern, glass cloth weave",
      "Compliance": "Industry HVAC and insulation standards; custom grades available",
    },
  },
  {
    id: 41,
    name: "Pneumatics Component Solution",
    category: "Tools",
    rating: 4.9,
    description: "Complete pneumatic automation component range for industrial compressed-air systems. The solution includes ISO-standard double-acting air cylinders and compact pneumatic actuators for reliable linear motion; modular FRL (filter-regulator-lubricator) units with pressure gauges for clean, dry, pressure-stabilised air; 5/2 and 3/2 solenoid valve manifolds for precise directional control; a full range of push-to-connect and brass threaded fittings for leak-free distribution; and high-flexibility polyurethane, nylon and polyethylene tubing in multiple colors. Engineered for packaging, automation, automotive, textile and general machinery applications requiring fast actuation, low maintenance and long service life.",
    features: [
      "Double-acting and single-acting pneumatic cylinders in ISO and compact profiles",
      "Modular FRL units: air filter, regulator and lubricator with pressure gauges and drain valves",
      "Solenoid valve manifolds (5/2, 3/2) for directional control of actuators",
      "Push-to-connect (PU) fittings, elbow/tee connectors and brass threaded adapters",
      "High-flexibility PU, nylon and PE pneumatic tubing in blue, orange, clear and black",
      "Corrosion-resistant aluminium cylinders and brass/steel fittings for long service life",
      "Leak-free connections and quick assembly for reduced downtime",
      "Suitable for automation, packaging, conveyor, textile and machine-tool applications",
    ],
    specifications: {
      "Cylinder Bore": "16mm – 250mm (ISO and compact options)",
      "Cylinder Material": "Anodised aluminium barrel, chrome-plated steel piston rod",
      "Operating Pressure": "0.5 – 10 bar (FRL regulated)",
      "FRL Filter Rating": "5µm / 40µm element options",
      "Valve Types": "5/2-way, 3/2-way solenoid/pilot-operated manifolds",
      "Fitting Types": "PU push-fit, brass threaded, elbow, tee, reducer, silencers",
      "Tubing Sizes": "4mm, 6mm, 8mm, 10mm, 12mm OD; PU / Nylon / PE materials",
      "Temperature Range": "-10°C to +60°C (air system dependent)",
      "Applications": "Automation, packaging, material handling, conveyor systems, machine tools",
      "Compliance": "ISO 6432 / ISO 15552 cylinder standards; industry-standard pneumatic interfaces",
    },
  },
  {
    id: 42,
    name: "Pneumatic Pipe Solution",
    category: "Tools",
    rating: 4.9,
    description: "Precision-engineered pneumatic pipe and tubing solution for industrial compressed-air distribution. Manufactured from high-grade polyurethane with a high-grade polyurethane outer cover, braided reinforcement layer and polyurethane inner liner. Available in a full range of diameters from 4x2.5mm up to 16x12mm, with clearly defined outer diameter, inner diameter, pressure rating and bend radius specifications. Supplied on colour-coded spools (blue, red, clear/white, black, orange) for easy circuit identification, the range includes matching push-to-connect straight, elbow and tee fittings for rapid, leak-free assembly.",
    features: [
      "High-grade polyurethane construction with braided reinforcement layer",
      "Precision hose specifications: OD, ID, pressure rating and bend radius per size",
      "Sizes from 4x2.5mm to 16x12mm for light-duty through heavy-duty circuits",
      "Colour-coded spools for easy pneumatic circuit identification",
      "Compatible PU push-to-connect straight, elbow and tee fittings",
      "Excellent flexibility, abrasion resistance and kink resistance",
      "Suitable for compressed air, automation, packaging, CNC and robotics",
      "Long service life with reliable pressure and temperature performance",
    ],
    specifications: {
      "Material": "High-grade Polyurethane (PU) with braided reinforcement",
      "Construction": "PU outer cover + braided reinforcement layer + PU inner liner",
      "Size Range": "4x2.5mm to 16x12mm (ID x OD combinations)",
      "4x2.5 Spec": "OD 4mm, ID 2.5mm, Pressure 2.5 Bar, Bend Radius 2.5mm",
      "6x4 Spec": "OD 6mm, ID 4mm, Pressure 4 Bar, Bend Radius 4mm",
      "8x5 Spec": "OD 8mm, ID 5mm, Pressure 6 Bar, Bend Radius 5mm",
      "10x6.5 Spec": "OD 10mm, ID 6.5mm, Pressure 6.5 Bar, Bend Radius 6.5mm",
      "12x8 Spec": "OD 12mm, ID 8mm, Pressure 10 Bar, Bend Radius 8mm",
      "14x10 Spec": "OD 14mm, ID 10mm, Pressure 10 Bar, Bend Radius 10mm",
      "16x12 Spec": "OD 16mm, ID 12mm, Pressure 12 Bar, Bend Radius 12mm",
      "Operating Pressure": "Up to 12 bar (size dependent)",
      "Temperature Range": "-10°C to +60°C",
      "Colours": "Blue, red, clear/white, black, orange (spool colour-coded)",
      "Fittings": "PU push-to-connect straight, elbow, tee and reducer connectors",
      "Applications": "Automation, packaging, CNC, robotics, machine tools, general pneumatics",
      "Compliance": "Industry-standard pneumatic tubing and fitting interfaces",
    },
  },
  {
    id: 43,
    name: "Pneumatic Hoses and Tubing",
    category: "Tools",
    rating: 4.9,
    description: "Comprehensive pneumatic hoses and tubing solution for industrial, agricultural and automation air-power systems. The range includes high-flexibility polyurethane (PU) hoses, lightweight polyethylene (PE) tubes, durable PVC hoses and high-performance Nylon / PTFE options — available in straight, coiled and braided-reinforced configurations with matching brass, steel and quick-connect fittings. Engineered for compressed air, pneumatic tools, spray systems, packaging lines and mobile machinery, with colour-coded circuits and clearly labelled diameter ratings for fast, leak-free installation.",
    features: [
      "Multi-material hose range: Polyurethane (PU), Polyethylene (PE), PVC, Nylon and PTFE",
      "Straight, coiled and braided-reinforced constructions for every application",
      "Colour-coded spools and transparent lines for easy circuit identification",
      "Agricultural spray hoses with OD fittings and pressure gauges",
      "Industrial air hoses with male/female threaded connectors",
      "High-pressure performance with spring reinforcement options",
      "Quick-connect push-fit, brass, steel and elbow/tee fittings included",
      "Flexible at low temperatures and abrasion resistant for harsh environments",
    ],
    specifications: {
      "Materials": "Polyurethane (PU), Polyethylene (PE), PVC, Nylon, PTFE",
      "Hose Types": "Straight, coiled, braided reinforced, twin-line, multi-tube",
      "Fitting Types": "OD fittings, push-to-connect, brass threaded, quick couplers",
      "Diameters": "4mm OD to 16mm OD",
      "Working Pressure": "Up to 12 bar (reinforced variants)",
      "Temperature Range": "-20°C to +80°C (material dependent)",
      "Coil Lengths": "5m / 10m / 15m / 30m",
      "Colors": "Blue, red, yellow, green, black, clear",
      "Applications": "Compressed air, pneumatics, spray systems, automation, agriculture",
      "Compliance": "Industry-standard pneumatic tubing and fitting interfaces",
    },
  },
  {
    id: 44,
    name: "Pneumatic Component Solution",
    category: "Tools",
    rating: 4.9,
    description: "Complete pneumatic component solution for industrial automation and compressed-air systems. Includes solenoid valve manifolds, modular FRL (filter-regulator-lubricator) units, ISO-standard double-acting and compact air cylinders, plus a full push-to-connect fittings grid. Engineered for reliable directional control, clean dry air preparation, precise linear motion and leak-free distribution across packaging, automotive, textile, CNC and general machinery applications.",
    features: [
      "Solenoid valve manifolds for 5/2-way and 3/2-way directional control",
      "Modular FRL units with filter, regulator and lubricator functions",
      "ISO-standard double-acting and compact pneumatic cylinders",
      "Comprehensive push-to-connect fittings grid (straight, elbow, tee, reducer)",
      "Brass and nickel-plated threaded connectors for rugged installations",
      "Quick-release and swivel options for flexible routing",
      "Reliable seals and coils for long service life",
      "Suitable for automation, packaging, material handling and machine tools",
    ],
    specifications: {
      "Valve Functions": "5/2-way, 3/2-way solenoid / pilot-operated",
      "Valve Voltage": "12V DC, 24V DC, 110V AC, 220V AC",
      "Cylinder Bore": "16mm – 200mm (ISO and compact options)",
      "Cylinder Material": "Anodised aluminium barrel, chrome-plated steel piston rod",
      "FRL Filter Rating": "5µm / 40µm element options",
      "FRL Pressure Range": "0.5 – 10 bar",
      "Fitting Types": "PU push-fit, brass threaded, quick couplers, elbow/tee/reducer",
      "Fitting Sizes": "4mm, 6mm, 8mm, 10mm, 12mm OD",
      "Operating Pressure": "Up to 10 bar",
      "Temperature Range": "-10°C to +60°C",
      "Applications": "Automation, packaging, textile, automotive, CNC, general machinery",
      "Compliance": "ISO 6432 / ISO 15552 cylinder standards; industry-standard pneumatic interfaces",
    },
  },
  {
    id: 45,
    name: "Pneumatic Spare Parts Solution",
    category: "Tools",
    rating: 4.9,
    description: "Complete pneumatic spare parts solution for maintaining, repairing and extending the life of industrial compressed-air systems and automation equipment. Includes replacement cylinders, piston seals, FRL service kits, solenoid valve coils and manifolds, filter elements, pressure regulators, lubricators, brass and nickel-plated threaded fittings, quick couplers and push-to-connect connectors. Engineered for fast turnaround, reliable interchangeability and leak-free performance across packaging, automotive, textile, CNC, material handling and general machinery applications.",
    features: [
      "Replacement air cylinders and repair kits for ISO and compact actuators",
      "Piston seals, rod seals, O-rings and wear bands in NBR, Viton and polyurethane",
      "Solenoid valve coils and replacement manifolds for 5/2-way and 3/2-way valves",
      "FRL service kits: filter elements, diaphragms, regulator springs and lubricator bowls",
      "Brass and nickel-plated threaded fittings, couplers, elbows, tees and reducers",
      "Push-to-connect and quick-release fittings for flexible, tool-free maintenance",
      "Pre-packaged maintenance kits for common pneumatic sub-systems",
      "Compatible with major industrial pneumatic brands and standards",
    ],
    specifications: {
      "Cylinder Bore Range": "16mm – 200mm",
      "Cylinder Materials": "Anodised aluminium barrel, chrome-plated steel piston rod",
      "Seal Materials": "NBR, Viton, Polyurethane, PTFE",
      "Valve Functions": "5/2-way, 3/2-way solenoid / pilot-operated",
      "Valve Voltages": "12V DC, 24V DC, 110V AC, 220V AC",
      "FRL Filter Ratings": "5µm / 40µm replacement elements",
      "FRL Pressure Range": "0.5 – 10 bar",
      "Fitting Sizes": "4mm, 6mm, 8mm, 10mm, 12mm OD",
      "Operating Pressure": "Up to 10 bar",
      "Temperature Range": "-10°C to +60°C",
      "Applications": "Maintenance, repair, automation, packaging, automotive, textile, CNC",
      "Compliance": "ISO 6432 / ISO 15552 cylinder standards; industry-standard pneumatic interfaces",
    },
  },
  {
    id: 46,
    name: "GT Series Timing Belt Solution",
    category: "Tools",
    rating: 4.9,
    description: "Precision GT-series timing belt solution engineered for high-torque, high-precision robotronic and industrial drive systems. Range includes GATES POWERGRIP GT2 (black neoprene, classic performance profile), GATES RACING T251RB (blue reinforced, reduced-stretch high-load variant), red double-sided belts with aesthetic double-tooth profile, 3GTM olive-tan neoprene belts with flexible double-sided teeth, and the full 2GT / 3GT / 5GT curvilinear tooth profile family. Each belt features a high-tensile aramid or glass reinforcement cord, durable neoprene body, wear-resistant nylon tooth cover and protective fabric backing — delivering precise positioning, zero slippage and quiet operation for CNC machines, 3D printers, robotics, packaging lines, automation and precision motion control applications.",
    features: [
      "GT curvilinear tooth profile for high torque and precision",
      "GATES POWERGRIP GT2 classic-performance black neoprene belt",
      "GATES RACING T251RB blue reinforced belt — reduced stretch, high load",
      "Red double-sided belt with aesthetic double-tooth profile",
      "3GTM olive-tan neoprene belt with flexible double-sided teeth",
      "Full 2GT / 3GT / 5GT profile range for varied pitch requirements",
      "High-tensile aramid / glass reinforcement cord for minimal stretch",
      "Wear-resistant nylon tooth cover and protective fabric backing",
      "Zero slippage, quiet operation and maintenance-free service",
    ],
    specifications: {
      "Profile Range": "2GT, 3GT, 5GT curvilinear tooth profiles",
      "Featured Types": "GATES POWERGRIP GT2, GATES RACING T251RB, 3GTM, Red Double-Sided",
      "Body Material": "Durable neoprene / rubber compound",
      "Reinforcement Cord": "High-tensile aramid / glass fibre",
      "Tooth Cover": "Wear-resistant nylon fabric",
      "Backing": "Protective fabric backing (single or double-sided)",
      "Colors Available": "Black, Blue, Red, Olive-Tan",
      "Width Options": "6mm and custom widths on request",
      "Temperature Range": "-30°C to +100°C",
      "Applications": "CNC, 3D printers, robotics, packaging, automation, precision motion control",
      "Compliance": "GATES POWERGRIP GT2 / industry-standard GT pitch specifications",
    },
  },
  {
    id: 47,
    name: "Asbestos Packing Solution",
    category: "Tools",
    rating: 4.9,
    description: "Complete Glane asbestos-family gland packing solution engineered for high-temperature, high-pressure and chemically aggressive sealing of valves, pumps, agitators and rotating-shaft equipment. The range covers carbon & flexible graphite braided packing with excellent thermal conductivity and a high-temperature resistant matrix, chemical-resistant fiberglass packing with reinforced woven braid and colour marker yarns, custom die-formed packing ring sets in tailored configurations, and matching set installation tools. Suitable for refineries, power plants, chemical processing, water treatment, marine and general industrial sealing where thermal stability, chemical compatibility and long service life are critical.",
    features: [
      "Carbon & flexible graphite braided packing with excellent thermal conductivity",
      "High-temperature resistant matrix for demanding sealing duty",
      "Chemical-resistant fiberglass packing with reinforced woven braid",
      "Colour marker yarns for easy on-site grade identification",
      "Custom die-formed packing ring sets in tailored configurations",
      "Matching set installation tools for clean, damage-free fitting",
      "Compatible with rotating shafts, reciprocating rods and valve stems",
      "Low leakage, low friction and long service life",
    ],
    specifications: {
      "Materials": "Carbon fibre, Flexible graphite, Fiberglass, Asbestos-family composites",
      "Construction": "Interlock braid / square braid with reinforced woven jacket",
      "Cross-Section Sizes": "3mm, 4mm, 5mm, 6mm, 8mm, 10mm, 12mm, 16mm, 20mm, 25mm",
      "Temperature Range": "Up to 650°C (graphite) / 550°C (fiberglass)",
      "Pressure Rating": "Up to 200 bar (static) / 40 bar (rotating)",
      "Shaft Speed": "Up to 20 m/s",
      "pH Range": "0 – 14 (chemical-resistant grades)",
      "Forms": "Continuous coils, pre-formed die-cut ring sets, custom sizes",
      "Applications": "Pumps, valves, agitators, refineries, power plants, chemical processing, marine",
      "Includes": "Installation extractor tools, cutting guides and sizing kits",
    },
  },
  {
    id: 48,
    name: "Harvester V-Belt Solution",
    category: "Belts",
    rating: 4.9,
    description: "Heavy-duty agricultural Harvester V-belt solution engineered for combine harvesters, balers, forage machines, threshers and variable-speed drives. The range covers 3-band combo belts with high-tensile aramid cords, polychloroprene base rubber and double-woven fabric wrap; raw-edge cogged custom sets with precision cogging; laminated flat-belt cores with woven polyester cord layer and oil-resistant rubber covers; and traceable branded belts (PIX Harvester XV, Bando Total Gold, Turboflex Premium, PEK Harvester) with clear part-number and batch marking. Delivers high load resistance, dust & dirt resistance and shock-load protection across a -40°C to +110°C operating range for reliable harvest-season performance.",
    features: [
      "3-band combo construction with high-tensile aramid cords",
      "Polychloroprene base rubber for heat and abrasion resistance",
      "Double-woven fabric wrap for enhanced durability",
      "Raw-edge cogged design with precision cogging for flexibility",
      "Laminated flat-belt core with woven polyester cord layer",
      "Oil-resistant rubber covers for agricultural fluid exposure",
      "Wide temperature range -40°C to +110°C",
      "High load resistance, dust & dirt resistance and shock-load protection",
      "Traceable part-number and batch branding (PIX / Bando / Turboflex / PEK)",
    ],
    specifications: {
      "Construction Types": "3-Band Combo, Raw-Edge Cogged, Laminated Flat Belt, Variable-Speed",
      "Reinforcement": "High-tensile aramid cord / woven polyester cord",
      "Base Rubber": "Polychloroprene (CR)",
      "Cover": "Double-woven fabric wrap / oil-resistant rubber",
      "Temperature Range": "-40°C to +110°C",
      "Traceability": "Part number, batch code and brand marking on belt back",
      "Featured Brands": "PIX Harvester XV, Bando Total Gold, Turboflex Premium, PEK Harvester, HM-2505, SB-54",
      "Applications": "Combine harvesters, balers, forage machines, threshers, variable-speed drives",
      "Key Benefits": "High load resistance, dust & dirt resistance, shock-load protection",
      "Compliance": "Industry-standard agricultural V-belt cross sections and lengths",
    },
  },
  {
    id: 49,
    name: "Different Flange Solution",
    category: "Tools",
    rating: 4.9,
    description: "Complete industrial flange solution covering the full ANSI/ASME range for piping, process and pressure systems. Includes Weld Neck (WN) flanges for high-pressure and high-temperature butt-weld connections, Slip-On (SO) flanges for low-cost and easy installation, Blind (BL) flanges for closing pipe ends, Orifice flanges with integral pressure taps for flow measurement, Lap Joint flanges with matching stub ends for corrosion-resistant piping, Threaded (THD) flanges for no-weld NPT installations, and Reducing flanges for joining different pipe diameters. Manufactured in carbon steel, stainless steel and alloy grades to ANSI/ASME B16.5 and B16.47 standards across pressure classes 150 to 2500, suitable for refineries, petrochemical, power generation, water treatment, marine and general process industries.",
    features: [
      "Weld Neck (WN) flanges for high-pressure / high-temperature butt-weld service",
      "Slip-On (SO) flanges for low-cost, easy-install piping",
      "Blind (BL) flanges for pressure-tight closure of pipe ends",
      "Orifice flanges with pressure taps for flow measurement",
      "Lap Joint flanges with stub ends for corrosion-resistant piping",
      "Threaded (THD) flanges for no-weld NPT installations",
      "Reducing flanges for connecting different pipe diameters",
      "Full ANSI/ASME B16.5 and B16.47 compliance",
      "Available in carbon steel, stainless steel and special alloy grades",
    ],
    specifications: {
      "Types": "Weld Neck, Slip-On, Blind, Orifice, Lap Joint, Threaded, Reducing",
      "Standards": "ANSI/ASME B16.5, B16.47, DIN, EN 1092-1, JIS B2220",
      "Pressure Classes": "150#, 300#, 600#, 900#, 1500#, 2500#",
      "Size Range": "1/2\" to 60\" (DN15 – DN1500)",
      "Materials": "Carbon Steel (A105), Stainless Steel (SS304 / SS316 / SS316L), Alloy Steel (F11, F22, F91), Duplex",
      "Facing Types": "Raised Face (RF), Flat Face (FF), Ring-Type Joint (RTJ), Tongue & Groove",
      "Temperature Range": "-46°C to +540°C (material dependent)",
      "Surface Finish": "Serrated / smooth / stock finish per ASME B16.5",
      "Applications": "Refineries, petrochemical, power plants, water treatment, marine, oil & gas, general process piping",
      "Testing": "Hydrostatic, PMI, UT, MPI and dimensional inspection with MTC EN 10204 3.1",
    },
  },
  {
    id: 50,
    name: "Linex Belting Solution",
    category: "Belts",
    rating: 4.9,
    description: "Linex Belting Solution delivers precision, durability and custom performance for demanding industrial drives and conveyors. Engineered with advanced metallic splice technology for ultra-strong flexible joints and minimal downtime, a high-tensile polymer core that provides extreme stretch resistance and efficient power transmission, and a specialized surface grip texture that optimizes traction and prevents belt slippage. Multi-layer construction combines a durable PU top cover, high-strength reinforcement fabric and textured grip base, available in custom widths, lengths and profiles for conveying, packaging, printing, textile, food processing, robotics and general industrial applications.",
    features: [
      "Advanced metallic splice technology for high-strength, flexible joints",
      "High-tensile polymer core for extreme stretch resistance",
      "Specialized grip texture prevents belt slippage",
      "Multi-layer reinforced construction for long service life",
      "Custom widths, lengths and profiles made to order",
      "Minimal downtime with on-site quick-splice installation",
      "Suitable for conveying, packaging, printing, textile and food lines",
      "Oil, abrasion and wear resistant surface",
    ],
    specifications: {
      "Construction": "PU top cover + reinforcement fabric + textured grip base",
      "Splice Type": "High-strength flexible metallic splice",
      "Core": "High-tensile polymer with polyester / aramid reinforcement",
      "Surface Finish": "Specialized anti-slip grip texture",
      "Standard Sizes": "51½\" x 6'-11\" and custom lengths",
      "Widths": "10mm – 2000mm (custom)",
      "Thickness Range": "1.5mm – 8mm",
      "Temperature Range": "-30°C to +90°C",
      "Applications": "Conveying, packaging, printing, textile, food processing, robotics",
      "Color Options": "White, black, green, custom",
      "Compliance": "Industry-standard flat belt profiles and food-grade options",
    },
  },
  {
    id: 51,
    name: "Industrial Spray Paint Solution",
    category: "Tools",
    rating: 4.9,
    description: "Advanced Industrial Spray Paint Solution engineered for precision, durability and diverse industrial finishing needs. The range combines stainless-steel ball agitators for superior mixing, precision nozzle valves for controlled application, ergonomic actuator buttons for reduced operator fatigue, pressure-rated aerosol cans for safe storage and durable polymer coatings for can protection. Complete finish portfolio includes Acrylic Lacquer for high-gloss commercial machinery and rail components, Metal-Effect chrome and KT gold for architectural accents, Hi-Temp for engines, exhausts and cookware, Fluorescent for high-visibility marking and safety signage, and All-Purpose fast-drying industrial coating for maintenance, repairs and general fabrication.",
    features: [
      "Stainless-steel ball agitators for superior pigment mixing",
      "Precision nozzle valve for controlled, even fan spray",
      "Ergonomic actuator button reduces operator fatigue on long jobs",
      "Pressure-rated aerosol can construction for safe transport & storage",
      "Durable polymer external coating protects the can from corrosion",
      "Acrylic Lacquer variant — durable high-gloss finish for machinery & rail components",
      "Metal-Effect chrome & KT gold for architectural and decorative accents",
      "Hi-Temp variant withstands high heat for engines, exhausts and cookware",
      "Fluorescent variant for high-visibility marking, safety and signage",
      "All-Purpose fast-drying coating for maintenance, touch-ups and repairs",
    ],
    specifications: {
      "Variants": "Acrylic Lacquer, Metal-Effect (Chrome / KT Gold), Hi-Temp, Fluorescent, All-Purpose Industrial",
      "Can Volume": "150ml, 300ml, 400ml, 450ml (variant dependent)",
      "Propellant": "Non-CFC hydrocarbon (LPG blend)",
      "Nozzle": "Precision fan-spray nozzle, ergonomic actuator button",
      "Agitator": "Dual stainless-steel mixing balls",
      "Drying Time": "Touch-dry 5–10 min, fully cured in 24 hrs",
      "Coverage": "Approx. 1.5–2.0 m² per 400ml can (single coat)",
      "Temperature Resistance": "Standard up to 90°C; Hi-Temp up to 650°C",
      "Finish Options": "High-gloss, matte, satin, metallic chrome, KT gold, fluorescent",
      "Substrates": "Metal, wood, plastic, ceramic, glass, masonry (primer recommended)",
      "Compliance": "REACH, RoHS, EN 71-3 (variant dependent); pressure-rated per ADR/IMDG",
      "Applications": "Machinery, automotive, marine, HVAC, signage, architectural accents, maintenance & repair",
    },
  },
];







const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const routeProductId = parseInt(id || "0");
  const productId = legacyFeaturedProductIds[routeProductId] || routeProductId;
  const product = allProducts.find((p) => p.id === productId);

  const productImage = product ? (productImages[product.id] || productBelts) : productBelts;
  const gallery = product ? (productGallery[product.id] ?? [productImage]) : [productImage];
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<{ x: number; y: number } | null>(null);

  const openLightbox = () => { setZoom(1); setPan({ x: 0, y: 0 }); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const zoomIn = () => setZoom((z) => Math.min(5, +(z + 0.5).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(2)));
  const resetZoom = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.max(1, Math.min(5, +(z + (e.deltaY < 0 ? 0.25 : -0.25)).toFixed(2))));
  };

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-40 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/products">
              <Button variant="hero">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }


  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      image: productImage,
    });
    toast.success(`${product.name} added to quotation cart`);
  };

  const productDescription = (product as { description?: string }).description ?? `Industrial-grade ${product.name} available for quotation from A BBARI Enterprise.`;
  const seoTitle = `${product.name} | ${product.category} — A BBARI Enterprise Bangladesh`.slice(0, 65);
  const seoDescription = `Buy ${product.name} (${product.category}) at A BBARI Enterprise. ${productDescription}`.replace(/\s+/g, " ").slice(0, 158);
  const nameTokens = product.name
    .replace(/[^a-zA-Z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);
  const seoKeywords = Array.from(
    new Set([
      product.name,
      product.category,
      `${product.category} Bangladesh`,
      `industrial ${product.category.toLowerCase()}`,
      `${product.name} supplier`,
      `${product.name} price Bangladesh`,
      "A BBARI Enterprise",
      "industrial hardware Bangladesh",
      ...nameTokens,
    ]),
  );

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/products/${product.id}`}
        type="product"
        keywords={seoKeywords}
        image={productImage}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: productImage,
            description: productDescription,
            category: product.category,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: 25,
            },
            brand: { "@type": "Brand", name: "A BBARI Enterprise" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://abbarient.lovable.app/" },
              { "@type": "ListItem", position: 2, name: "Products", item: "https://abbarient.lovable.app/products" },
              { "@type": "ListItem", position: 3, name: product.category, item: `https://abbarient.lovable.app/products?category=${product.category}` },
              { "@type": "ListItem", position: 4, name: product.name, item: `https://abbarient.lovable.app/products/${product.id}` },
            ],
          },
        ]}
      />
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-foreground transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <button
                type="button"
                onClick={openLightbox}
                aria-label="Open image lightbox"
                className="group aspect-square w-full rounded-2xl overflow-hidden bg-card border border-border relative block"
              >
                <img
                  src={gallery[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-foreground/5" />
                <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-foreground" />
                </div>
              </button>
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </div>
              {gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {gallery.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === i ? "border-primary shadow-glow" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img src={src} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" draggable={false} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {lightboxOpen && (
              <div
                className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center"
                onClick={closeLightbox}
              >
                <div className="absolute top-4 right-4 flex items-center gap-2 z-10" onClick={(e) => e.stopPropagation()}>
                  <Button variant="outline" size="icon" onClick={zoomOut} aria-label="Zoom out"><ZoomOut className="w-4 h-4" /></Button>
                  <span className="text-sm text-foreground w-14 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
                  <Button variant="outline" size="icon" onClick={zoomIn} aria-label="Zoom in"><ZoomIn className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" onClick={resetZoom} aria-label="Reset zoom"><RotateCcw className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" onClick={closeLightbox} aria-label="Close"><X className="w-4 h-4" /></Button>
                </div>
                <div
                  className="max-w-[90vw] max-h-[85vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                  onWheel={onWheel}
                  onMouseDown={(e) => setDragging({ x: e.clientX - pan.x, y: e.clientY - pan.y })}
                  onMouseMove={(e) => dragging && setPan({ x: e.clientX - dragging.x, y: e.clientY - dragging.y })}
                  onMouseUp={() => setDragging(null)}
                  onMouseLeave={() => setDragging(null)}
                  style={{ cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in" }}
                >
                  <img
                    src={gallery[activeImage]}
                    alt={product.name}
                    draggable={false}
                    className="max-w-[90vw] max-h-[85vh] object-contain select-none transition-transform duration-100"
                    style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
                  />
                </div>
                {gallery.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {gallery.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => { setActiveImage(i); resetZoom(); }}
                        className={`w-14 h-14 rounded-md overflow-hidden border-2 ${activeImage === i ? "border-primary" : "border-border/60"}`}
                        aria-label={`Lightbox image ${i + 1}`}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" draggable={false} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}


            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-4xl md:text-5xl text-foreground mb-3">{product.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">{product.rating} rating</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-display text-lg text-foreground">KEY FEATURES</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="space-y-3">
                <h3 className="font-display text-lg text-foreground">SPECIFICATIONS</h3>
                <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="text-foreground font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="hero" size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Quotation Cart
                </Button>
                <Link to="/contact" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    Request Custom Quote
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex flex-col items-center text-center">
                  <Package className="w-8 h-8 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Quality Assured</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-8 h-8 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-8 h-8 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ask a question */}
          <ProductQuestionForm productName={product.name} productId={product.id} />

          {/* Back button */}
          <div className="mt-12">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProductDetail;
