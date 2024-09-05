const Character = require('../models/characters')

//! READ
const getCharacters = async (req, res, next) => {
  try {
    const allCharacters = await Character.find()
    return res.status(200).json(allCharacters)
  } catch (error) {
    return res.status(400).json('Error with petition 👎')
  }
}

//! CREATE
const createCharacter = async (req, res, next) => {
  try {
    const newCharacter = new Character(req.body)
    const characterSaved = await newCharacter.save()
    return res.status(201).json(characterSaved)
  } catch (error) {
    return res.status(400).json('Error with petition 👎')
  }
}

//! UPDATE
const updateCharacter = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedCharacter = await Character.findByIdAndUpdate(id, req.body, {
      new: true
    })
    return res.status(200).json(updatedCharacter)
  } catch (error) {
    return res.status(400).json('Error with petition 👎')
  }
}

//! DELETE
const deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params
    const characterDeleted = await Character.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Character deleted successfully',
      element: characterDeleted
    })
  } catch (error) {
    return res.status(400).json('Error with petition 👎')
  }
}

module.exports = {
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter
}
