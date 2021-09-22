const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find({}).toArray();

  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));

  return recipe;
};

const addURecipes = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne(
    { name, ingredients, preparation, userId },
  );
  return {
    recipe:
      { name, ingredients, preparation, userId, _id: recipe.insertedId },
  };
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  addURecipes,

};