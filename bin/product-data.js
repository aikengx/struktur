const mongoose = require('mongoose');
const Product = require('../models/product');
//
const dbName = 'struktur';
mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});
//
Product.collection.drop()
//
const products = [
  {
    name: "BeldenCAT6 E Horizontal, 4pr, UTP, PVC Jkt, CMR",
    manufacturer: "Belden",
    system: "4800",
    url: "https://www.belden.com/products/enterprise/copper/cable/cat-6",
    imgUrl: "https://www.belden.com/hubfs/products/copper/cable-cat-6.jpg",
    part_number: "4812",
    description: "CAT6 Enhanced (600MHz), 4-Pair, U/UTP-unshielded, Riser-CMR, Premise Horizontal cable, 23 AWG solid bare copper conductors, polyolefin insulation, X-spline, ripcord, PVC jacket",
    created_by: "Struktur Administrator",
  },
  {
    name: "CAT6+ KEYCONNECT JACKS - CAT6+ Modular Jack, RJ45, KeyConnect Style",
    manufacturer: "Belden",
    system: "4800",
    url: "https://catalog.belden.com/index.cfm?event=pd&p=PF_CAT6KEYCONNECTJACKS",
    imgUrl: "https://catalog.belden.com/prodimgs/LargeProductImage-approved/EN/50/41/135041.jpg",
    part_number: "AX104193",
    description: "IBDN System 2400, 3600 and 4800, TIA Category 6+, ISO Class E, 1000 BASE-T (Blue)",
    created_by: "Struktur Administrator",
  },
  {
    name: "CAT6+ REVConnect Patch Panel 24, Port",
    manufacturer: "Belden",
    system: "4800",
    url: "https://catalog.belden.com/index.cfm?event=pd&p=PF_CAT6REVConnectPanel24P",
    imgUrl: "https://catalog.belden.com/prodimgs/LargeProductImage-approved/EN/54/10/175410.jpg",
    part_number: "CAT6+ REVConnect Panel 24P",
    description: "CAT6+ REVConnect Patch Panel, Flat, 24-Port, 1U (Preloaded)",
    created_by: "Struktur Administrator",
  },
  {
    name: "CAT6+ REVConnect Patch Panel, 48 Port",
    manufacturer: "Belden",
    system: "4800",
    url: "https://catalog.belden.com/index.cfm?event=pd&p=PF_CAT6REVConnectPanel48P",
    imgUrl: "https://catalog.belden.com/prodimgs/LargeProductImage-approved/EN/54/08/175408.jpg",
    part_number: "CAT6+ REVConnect Panel 48P",
    description: "CAT6+ REVConnect Patch Panel, Flat, 48-Port, 2U (Preloaded)",
    created_by: "Struktur Administrator",
  },
  {
    name: "CAT6+ F/UTP CMR PATCH CORD",
    manufacturer: "Belden",
    system: "4800",
    url: "https://catalog.belden.com/index.cfm?event=pd&p=PF_CAT6FUTPCMRPATCHCORDS",
    imgUrl: "https://catalog.belden.com/prodimgs/LargeProductImage-approved/EN/15/84/181584.jpg",
    part_number: "C6F1106005",
    description: "IBDN Shielded System 2400, TIA Category 6, ISO Class E, 1000BASE-T (Blue, 5ft)",
    created_by: "Struktur Administrator",
  },
  {
    name: "Two Post Distribution Rack",
    manufacturer: "Belden",
    system: "Generic",
    url: "https://catalog.belden.com/index.cfm?event=pd&p=PF_BHRR194",
    imgUrl: "https://catalog.belden.com/prodimgs/LargeProductImage-approved/EN/r1/94/BHRR194.jpg",
    part_number: "BHRR194",
    description: "Two Post Aluminim Distribution Rack, 84H, 19W Mounting, EIA-310-D Compliant, #12-24 Tapped, 3inch Vertical Upright Channel w/Angle Base",
    created_by: "Struktur Administrator",
  },
  {
    name: "Horizontal Cable Manager",
    manufacturer: "Belden",
    system: "Generic",
    url: "https://catalog.belden.com/index.cfm?event=pd&p=PF_95121902FR",
    imgUrl: "https://catalog.belden.com/prodimgs/LargeProductImage-approved/EN/07/76/JPG_190776.jpg",
    part_number: "9512-1902-FR",
    description: "Horizontal Manager with Finger Stock and Cover, Front & Rear",
    created_by: "Struktur Administrator",
  },
  {
    name: "High Density Vertical Cable Managers",
    manufacturer: "Belden",
    system: "Generic",
    url: "https://catalog.belden.com/index.cfm?event=pd&p=PF_BHVHHXX",
    imgUrl: "https://catalog.belden.com/prodimgs/LargeProductImage-approved/EN/hh/10/BHVHH10.jpg",
    part_number: "BHVHHXX",
    description: "Double-Sided High Density Vertical Managers w/doors",
    created_by: "Struktur Administrator",
  }    
];
//
Product.create(products, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Created ${products.length} products`)
  mongoose.connection.close();
});