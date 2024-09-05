const { getGames, createGame, updateGame, deleteGame } = require("../controllers/games");

const gameRoutes = require("express").Router();

gameRoutes.get("/", getGames);
gameRoutes.post("/", createGame);
gameRoutes.put("/:id", updateGame);
gameRoutes.delete("/:id", deleteGame);

module.exports = gameRoutes;