const Game = require('../models/games')

//! READ
const getGames = async (req, res, next) => {
  try {
    // Usamos populate para reemplazar los ObjectId de los personajes con sus nombres
    const allGames = await Game.find().populate({
      path: 'characters', // Campo que queremos "traducir"
      select: 'name -_id' // Seleccionamos solo el campo 'name' y excluimos el '_id'
    })
    return res.status(200).json(allGames)
  } catch (error) {
    return res.status(400).json('Error with petition 👎')
  }
}

//! CREATE
const createGame = async (req, res, next) => {
  try {
    const newGame = new Game(req.body)
    const gameSaved = await newGame.save()
    return res.status(201).json(gameSaved)
  } catch (error) {
    return res.status(400).json('Error with petition 👎')
  }
}

//! UPDATE
const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { characters, ...updateData } = req.body; // Extrae el campo characters de req.body y lo almacena en una variable llamada characters.  El operador de propagación (...) se usa aquí para capturar todos los otros campos que quedan en req.body (excepto characters). Estos campos se agrupan en un nuevo objeto llamado updateData.

    // Actualiza el juego con los datos que no son del array de personajes
    const updatedGame = await Game.findByIdAndUpdate(id, updateData, {
      new: true
    });

    // Si hay personajes para agregar, utiliza $addToSet para evitar duplicados
    if (characters && characters.length > 0) {
      await Game.findByIdAndUpdate(id, {
        $addToSet: { characters: { $each: characters } } // Añadir sin duplicar
      }, { new: true });
    }

    return res.status(200).json(updatedGame);
  } catch (error) {
    return res.status(400).json('Error with petition 👎');
  }
};

//! DELETE
const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params
    const gameDeleted = await Game.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Game deleted successfully',
      element: gameDeleted
    })
  } catch (error) {
    return res.status(400).json('Error with petition 👎')
  }
}

module.exports = { getGames, createGame, updateGame, deleteGame }
