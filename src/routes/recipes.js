const router = require('express').Router();
const validateTWD = require('../api/auth/validateJWT');
const validation = require('../middlewares/recipes');
const controlRecipes = require('../controller/recipes');

router.post('/', validateTWD, validation.recipeCreateValidation, controlRecipes.controlCreate);
router.get('/', validateTWD, controlRecipes.controlGetAll);
// router.get('/:id', controller.controllerGetById);
// router.put('/:id', productValidation, controller.controllerUpdate);
// router.delete('/:id', controller.controllerDelete);

module.exports = router;