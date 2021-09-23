const usersServices = require('../services/usersServices');

const HTTP_200 = 200;
const HTTP_201 = 201;
const HTTP_400 = 400;
const HTTP_422 = 422;

const create = async (req, res) => {
  console.log(req.body);
  const { name, email, password, role } = req.body;
  const { err, user } = await usersServices.create(name, email, password, role);
  if (err) return res.status(HTTP_400).json({ err });
  return res.status(HTTP_201).json(user);
};

module.exports = {
  create,
  // getAll,
  // getById,
  // editById,
  // deleteById,
};