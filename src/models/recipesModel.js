const connection = require('./connection');

const findByName = async (name) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne({ name }));

  if (!recipe) return null;

  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

    const { _id } = await findByName(name);

    return { name: {
      name,
      ingredients,
      preparation,
      userId,
      _id,
      },
    };
};

module.exports = {
  create,
};
