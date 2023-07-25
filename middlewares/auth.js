const jwt = require('jsonwebtoken');
const BadAuth = require('../errors/BadAuth');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new BadAuth('Требуется авторизация'));
  }

  req.user = payload;

  return next();
};
