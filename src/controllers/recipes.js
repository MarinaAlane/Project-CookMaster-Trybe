const rescue = require('express-rescue');

const RecipesServices = require('../services/recipes');

const create = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const newRecipe = {
    name,
    ingredients,
    preparation,
    userId: req.userId,
  };

  const recipe = await RecipesServices.create(newRecipe);
  if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });
  res.status(201).json(recipe);
});

const getAll = rescue(async (req, res) => {
  const recipes = await RecipesServices.getAll();
  res.status(200).json(recipes);
});

module.exports = {
  create,
  getAll,
};
