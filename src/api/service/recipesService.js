const recipesModel = require('../models/recipesModel');

module.exports = {
  async create(name, ingredients, preparation, user) {
    const newRecipe = await recipesModel.create(name, ingredients, preparation, user);

    return newRecipe;
  },

  async findAll() {
    const recipes = await recipesModel.findAll();

    return recipes;
  },

  async findOne(id) {
    const recipe = await recipesModel.findById(id);

    return recipe;
  },

  async update(id, name, ingredients, preparation) {
    const editedRecipe = await recipesModel.edit(id, name, ingredients, preparation);

    return editedRecipe;
  },
};