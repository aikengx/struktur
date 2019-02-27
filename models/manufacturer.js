// models/manufacturer.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const manufacturerSchema = new Schema({
  name: String,
  website: String,
  imgPath: String,
  imgName: String,
  created_by: String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);

module.exports = Manufacturer;