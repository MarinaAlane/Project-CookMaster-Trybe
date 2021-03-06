const jwt = require('jsonwebtoken');
const userModel = require('../Model/userModel');

const SECRET = 'C3t$x7k4!YocfE$e';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const invalidEntries = { status: 400, message: 'Invalid entries. Try again.' };
const emailExists = { status: 409, message: 'Email already registered' };
const incorrectData = { status: 401, message: 'Incorrect username or password' };
const emptyField = { status: 401, message: 'All fields must be filled' };
const onlyAdm = { status: 403, message: 'Only admins can register new admins' };

const createUser = async (name, email, password, role) => {
  const createdUser = await userModel.create(name, email, password, role);
  if (createdUser.statusCode === 409) return emailExists;
  return { status: 201, user: createdUser };
};

const create = (name, email, password, role) => {
  if (!name || !email || !password) return invalidEntries;
  if (!emailPattern.test(email)) return invalidEntries;
  return createUser(name, email, password, role);
};

const login = async (email, password) => {
  if (!email || !password) return emptyField;
  const signIn = await userModel.login(email, password);
  const { ...userPayload } = signIn;
  // console.log(userPayload);
  // id, name, email, role = userPayload
  if (signIn.err) return incorrectData;
  const token = jwt.sign(userPayload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '10d',
  });

  return ({ status: 200, token });
};

const createUserAdm = async (name, email, password, role) => {
  console.log(role);
  if (role !== 'admin') return onlyAdm;
  const createdUser = await userModel.createAdm(name, email, password, role);
  return { status: 201, user: createdUser };
};

module.exports = {
  create,
  login,
  createUserAdm,
};

// Ref requisito 2 - https://github.com/tryber/sd-010-a-cookmaster/pull/25/files