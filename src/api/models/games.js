const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  storyline: { type: String },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }], // Referencia a los personajes
  coverImageUrl: { type: String }
}, 
{
  timestamps: true,
  collection: "games"
});

const Game = mongoose.model("Game", gameSchema, "Game");

module.exports = Game;
