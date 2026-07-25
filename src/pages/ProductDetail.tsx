import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, ShoppingCart, Package, Shield, Truck, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// Import all product images
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
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = allProducts.find((p) => p.id === parseInt(id || "0"));

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

  const productImage = productImages[product.id] || productBelts;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      image: productImage,
    });
    toast.success(`${product.name} added to quotation cart`);
  };

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title={`${product.name} — A BBARI Enterprise`}
        description={`${product.name}: ${(product as { description?: string }).description ?? "Industrial-grade hardware available for quotation from A BBARI Enterprise."}`.slice(0, 160)}
        path={`/products/${product.id}`}
        type="product"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: productImage,
            description: (product as { description?: string }).description ?? product.name,
            brand: { "@type": "Brand", name: "A BBARI Enterprise" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://abbarient.lovable.app/" },
              { "@type": "ListItem", position: 2, name: "Products", item: "https://abbarient.lovable.app/products" },
              { "@type": "ListItem", position: 3, name: product.name, item: `https://abbarient.lovable.app/products/${product.id}` },
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
              <div className="aspect-square rounded-2xl overflow-hidden bg-card border border-border">
                <img
                  src={productImage}
                  alt={product.name}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-foreground/5" />
              </div>
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </div>
            </div>

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
