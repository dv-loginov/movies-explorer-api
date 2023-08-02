const { ERROR_MESSAGE } = require('../utils/const');

const errorsApi = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode)
      .send({ message: err.message });
  } else {
    res.status(500)
      .send({ message: ERROR_MESSAGE.ERROR_SERVER });
  }
  next();
};

module.exports = errorsApi;
