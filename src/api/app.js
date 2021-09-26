const express = require('express');
const bodyParser = require('body-parser');
const {
  userRouter,
  loginRouter,
  recipesRouter,
} = require('./routes');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

// Manipulação de usuários
app.use('/users', userRouter);
app.use('/login', loginRouter);

// Manipulação de receitas
app.use('/recipes', recipesRouter);

module.exports = app;
