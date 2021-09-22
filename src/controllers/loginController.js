const loginService = require('../services/loginService');

async function login(req, res) {
  const { email, password } = req.body;
  const { code, message, token } = await loginService.login({ email, password });
  if (message) {
    return res.status(code).json({ message });
  }
  res.status(code).json({ token });
}

module.exports = {
  login,
};