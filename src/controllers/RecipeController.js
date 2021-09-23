const rescue = require('express-rescue');
const RecipeService = require('../services/RecipeService');

const create = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const recipe = await RecipeService.create(name, ingredients, preparation);

  return res.status(201).json({ recipe });
});

const getAll = rescue(async (req, res) => {
  const recipes = await RecipeService.getAll();

  return res.status(200).json(recipes);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeService.getById(id);

  return res.status(200).json(recipe);
});

module.exports = {
  create,
  getAll,
  getById,
};