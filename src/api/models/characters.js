const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  bio: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
}, 
{
  timestamps: true,
  collection: "characters"
});

const Character = mongoose.model("Character", characterSchema, "Character");

module.exports = Character;
