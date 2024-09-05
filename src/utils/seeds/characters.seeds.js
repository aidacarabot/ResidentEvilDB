const mongoose = require("mongoose");
const Character = require("../../src/api/models/characters");
const charactersData = require("../../src/data/characters");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to the database");

    // Verifica si ya existen personajes y, de ser así, elimina la colección
    const allCharacters = await Character.find();
    if (allCharacters.length) {
      await Character.collection.drop();
      console.log("Existing characters collection dropped");
    }

    // Inserta los personajes en la base de datos
    await Character.insertMany(charactersData);
    console.log("Characters successfully seeded");
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => {
    mongoose.disconnect();
    console.log("Disconnected from the database");
  });
