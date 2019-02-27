const mongoose = require('mongoose');
const Manufacturer = require('../models/manufacturer');
//
const dbName = 'struktur';
mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});
//
Manufacturer.collection.drop();
//
const manufacturers = [
  {
    name: "Belden",
    website: "https://www.belden.com",
    imgPath: "http://res.cloudinary.com/aikengx/image/upload/v1551111295/Struktur/belden.jpg.jpg",
    imgName: "belden.jpg",
    created_by: "Struktur Administrator"
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