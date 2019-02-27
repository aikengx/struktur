// models/manufacturer.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const systemSchema = new Schema({
  name: String,
  description: String,
  manufacturer: String,
  created_by: String,
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const System = mongoose.model("System", systemSchema);

module.exports = System;