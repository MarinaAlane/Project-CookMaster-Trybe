const { Router } = require('express');

const route = Router();

const recipesController = require('../controllers/recipesController'); 
const authMiddleware = require('../middlewares/authMiddleware');
const validateNewRecipe = require('../middlewares/validateNewRecipe');

route.post('/', validateNewRecipe, authMiddleware, recipesController.createRecipe);
route.get('/', recipesController.getRecipes);
route.get('/:id', recipesController.getById);

module.exports = route;