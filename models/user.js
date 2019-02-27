// models/user.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  lname: String,
  email: String,
  phone: String,
  company: String,
  role: {
    type: String,
    enum : ['USER', 'ADMIN'],
    default : 'USER'
  },
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;