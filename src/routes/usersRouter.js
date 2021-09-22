const { Router } = require('express');
const { createUserController, loginController } = require('../controllers/users/userController');
const connection = require('../models/connection');

const usersRouter = Router();

usersRouter.post('/users', createUserController);
usersRouter.post('/login', loginController);

// não faz parte do desafio mas criei para facilitar 
usersRouter.delete('/deleteall', async (req, res) => {
    const db = await connection();
    await db.collection('users').remove({});
    res.send('Banco deletado com sucesso.');
});

usersRouter.get('/getall', async (req, res) => {
    const db = await connection();
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
});

module.exports = usersRouter;