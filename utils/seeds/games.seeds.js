const mongoose = require("mongoose");
const Game = require("../../src/api/models/games");
const gamesData = require("../../src/data/games");

mongoose.connect("mongodb+srv://root:root@cluster0.p3tgb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to the database");

    // Verifica si ya existen juegos y, de ser así, elimina la colección
    const allGames = await Game.find();
    if (allGames.length) {
      await Game.collection.drop();
      console.log("Existing games collection dropped");
    }

    // Inserta los juegos en la base de datos
    await Game.insertMany(gamesData);
    console.log("Games successfully seeded");
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => {
    mongoose.disconnect();
    console.log("Disconnected from the database");
  });
