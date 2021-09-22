const recipesService = require('../services/recipesService');

const ERROR_RECIPE_ID = { error: { status: 404, message: 'recipe not found' } };

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.payload;
  const userID = _id;
  const { error, recipe } = await recipesService
    .createRecipe(name, ingredients, preparation, userID);
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(201).json({ recipe });
};

const getAllRecipes = async (req, res) => {
  const allRecipes = await recipesService.getAllRecipes();
  return res.status(200).json(allRecipes);
};

const getRecipeByID = async (req, res) => {
  const { id } = req.params;
  const { error } = ERROR_RECIPE_ID;
  const recipeById = await recipesService.getRecipeByID(id);
  if (!recipeById) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(200).json(recipeById);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeByID,
};