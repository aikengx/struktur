require('dotenv').config()
//
const mongoose = require('mongoose');
const System = require('../models/system');
//
const dbName = process.env.MONGODB_DB;
const dbUser = process.env.MONGODB_USER;
const dbPass = process.env.MONGODB_PASS;
const dbUrl = process.env.MONGODB_URL;
//
//mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbUrl}/${dbName}?retryWrites=true`, { useNewUrlParser: true });
//
System.collection.drop();
//
const systems = [
  {
    name: "4800",
    description: "Highest Level System Cable",
    manufacturer: "Belden",
    created_by: "Struktur Administrator",
  },
  {
    name: "3600",
    description: "Mid-Level System Cable",
    manufacturer: "Belden",
    created_by: "Struktur Administrator",
  },
  {
    name: "2400",
    description: "Standards Compliant Plus System Cable",
    manufacturer: "Belden",
    created_by: "Struktur Administrator",
  },
  {
    name: "1200",
    description: "Minimum Compliant",
    manufacturer: "Belden",
    created_by: "Struktur Administrator",
  },
  {
    name: "10GX",
    description: "Standards Compliant Plus System Cable",
    manufacturer: "Belden",
    created_by: "Struktur Administrator",
  },
  {
    name: "10GXS",
    description: "Highest Level System Cable",
    manufacturer: "Belden",
    created_by: "Struktur Administrator",
  },
  {
    name: "Solution 6",
    description: "Meets Category 6 standards",
    manufacturer: "Siemon",
    created_by: "Struktur Administrator",
  },
  {
    name: "System 6",
    description: "Margin on all Category 6 parameters",
    manufacturer: "Siemon",
    created_by: "Struktur Administrator",
  },
  {
    name: "Premium 6",
    description: "High margins on all Category 6 parameters",
    manufacturer: "Siemon",
    created_by: "Struktur Administrator",
  },
  {
    name: "Premium 6 Z-MAX",
    description: "Highest margins on all Category 6 parameters",
    manufacturer: "Siemon",
    created_by: "Struktur Administrator",
  },
  {
    name: "Z-MAX 6A",
    description: "Z-MAX Category 6A System features the highest performance margins across all critical transmission parameters",
    manufacturer: "Siemon",
    created_by: "Struktur Administrator",
  },
  {
    name: "TX6A",
    description: "Utilizes patented MaTriX Technology in the cable and patch cords and advanced connector compensation techniques to achieve channel bandwidth performance well above industry standard requirements",
    manufacturer: "Panduit",
    created_by: "Struktur Administrator",
  },
  {
    name: " TX6000",
    description: "Exceeds the ANSI/TIA-568-C.2 and ISO 11801 standards",
    manufacturer: "Panduit",
    created_by: "Struktur Administrator",
  },
  {
    name: "Mini-Com",
    description: "Designed to provide the most innovative features and the lowest cost of ownership over the life of your network",
    manufacturer: "Panduit",
    created_by: "Struktur Administrator",
  },
  {
    name: "NetKey",
    description: "Industry-compatible footprint for use with any keystone opening",
    manufacturer: "Panduit",
    created_by: "Struktur Administrator",
  },
  {
    name: "Generic",
    description: "General Purpose",
    manufacturer: "Belden",
    created_by: "Struktur Administrator",
  },
  {
    name: "Generic",
    description: "General Purpose",
    manufacturer: "Panduit",
    created_by: "Struktur Administrator",
  },
  {
    name: "Generic",
    description: "General Purpose",
    manufacturer: "Siemon",
    created_by: "Struktur Administrator",
  },
];
//
System.create(systems, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Created ${systems.length} systems`)
  mongoose.connection.close();
});
