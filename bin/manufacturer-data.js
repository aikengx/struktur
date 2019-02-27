require('dotenv').config();
//
const mongoose = require('mongoose');
const Manufacturer = require('../models/manufacturer');
//
const dbName = process.env.MONGODB_DB;
const dbUser = process.env.MONGODB_USER;
const dbPass = process.env.MONGODB_PASS;
const dbUrl = process.env.MONGODB_URL;
//
//mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbUrl}/${dbName}?retryWrites=true`, { useNewUrlParser: true });
//
Manufacturer.collection.drop();
//
const manufacturers = [
  {
    name: "Belden",
    website: "https://www.belden.com",
    imgPath: "http://res.cloudinary.com/aikengx/image/upload/v1551111295/Struktur/belden.jpg.jpg",
    imgName: "belden.jpg",
    created_by: "Guillermo Aiken"
  },
  {
    name: "Siemon",
    website: "https://www.siemon.com",
    imgPath: "http://res.cloudinary.com/aikengx/image/upload/v1551048536/Struktur/siemon.png.png",
    imgName: "siemon.png",
    created_by: "Guillermo Aiken",
  },
  {
    name: "Panduit",
    website: "https://www.panduit.com",
    imgPath: "http://res.cloudinary.com/aikengx/image/upload/v1551048089/Struktur/panduit.svg.svg",
    imgName: "panduit.svg",
    created_by: "Struktur Administrator"
  }
];
//
Manufacturer.create(manufacturers, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Created ${manufacturers.length} manufacturers`)
  mongoose.connection.close();
});