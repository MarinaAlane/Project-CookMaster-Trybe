const jwt = require('jsonwebtoken');
const model = require('../../models/usersModel');

const secret = 'secrettoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await model.findUser(decoded.data.username);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
