// models/manufacturer.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  manufacturer: String,
  system: String,
  url: String,
  imgUrl: String,
  part_number: String,
  description: String,
  created_by: String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;