require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const gameRoutes = require("./src/api/routes/games");
const characterRoutes = require("./src/api/routes/characters");
const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/games", gameRoutes);
app.use("/api/v1/characters", characterRoutes);

const saludo = (req, res, next) => {
  return res.status(200).json("Hola, soy un saludo");
};
app.use("/saludar", saludo);

app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found");
});

app.listen(3000, () => {
  console.log("Servidor establecido en http://localhost:3000 😎");
});
