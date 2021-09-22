const { Router } = require('express');
const userController = require('../controllers/userController');
const checkUser = require('../middlewares/user');

const router = Router();
router.post('/', checkUser, userController.createNewUser);

module.exports = router;