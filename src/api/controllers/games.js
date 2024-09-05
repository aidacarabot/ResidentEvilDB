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
    const { id } = req.params
    const updatedGame = await Game.findByIdAndUpdate(id, req.body, {
      new: true
    })
    return res.status(200).json(updatedGame)
  } catch (error) {
    return res.status(400).json('Error with petition 👎')
  }
}

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
