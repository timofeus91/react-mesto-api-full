const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError.js');

const { NODE_ENV, JWT_SECRET } = process.env;


const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  console.log(req);
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Неправильные почта или пароль');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-key'}`);
  } catch (err) {
    throw new AuthorizationError('Неправильные почта или пароль');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
