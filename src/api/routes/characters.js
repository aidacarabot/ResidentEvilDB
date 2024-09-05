const { getCharacters, createCharacter, updateCharacter, deleteCharacter } = require("../controllers/characters");


const characterRoutes = require("express").Router();

characterRoutes.get("/", getCharacters);
characterRoutes.post("/", createCharacter);
characterRoutes.put("/:id", updateCharacter);
characterRoutes.delete("/:id", deleteCharacter);

module.exports = characterRoutes;