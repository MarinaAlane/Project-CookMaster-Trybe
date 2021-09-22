const Joi = require('joi');
const usersModels = require('../models/users');

const validateBodyCreateUsers = (body) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }).validate(body);
  if (error) return { verb: 'post', item: 'createUsers', error, isJoy: true };
  return false;
};

const validateSingleUserEmail = async (email) => {
  const getUserByEmail = await usersModels.getUserByEmail(email);
  if (getUserByEmail.length) return { verb: 'post', item: 'createUsers', error: true };
  return false;
};

const validateBodyLoginUsers = async (body) => {
  let error;
   error = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
  }).validate(body);
  if (error.error) return { verb: 'post', item: 'loginUsers', error, isJoy: true, filled: false };
  error = Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
  }).validate(body);

  const existsThisUser = await usersModels.getUserByEmail(body.email);

  if (error.error || !existsThisUser.length) {
 return { 
    verb: 'post', item: 'loginUsers', error, isJoy: true, filled: true, 
  }; 
}
  return false;
};

const validateBodyCreateRecipes = (body) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(body);
  if (error) return { verb: 'post', item: 'createRecipes', error, isJoy: true };
  return false;
};

module.exports = {
  validateBodyCreateUsers,
  validateSingleUserEmail,
  validateBodyLoginUsers,
  validateBodyCreateRecipes,
};