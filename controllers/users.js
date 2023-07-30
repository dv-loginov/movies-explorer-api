const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictRequest = require('../errors/ConflictRequest');
const BadAuth = require('../errors/BadAuth');
const BadRequest = require('../errors/BadRequest');

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const getUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => res.status(200)
    .send(user))
  .catch(next);

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.status(200)
      .send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictRequest());
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest());
      }
      return next(err);
    });
};

const signup = (req, res, next) => {
  const newUserData = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      newUserData.password = hash;
      User.create(newUserData)
        .then((newUser) => {
          const user = newUser.toObject();
          delete user.password;
          res.status(201)
            .send(user);
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictRequest());
          }
          return next(err);
        });
    })
    .catch(next);
};

const signin = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(new BadAuth('Неверный логин или пароль'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw new BadAuth('Неверный логин или пароль');

          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' },);

          const loginUser = user.toObject();
          delete loginUser.password;

          return res.status(200)
            .cookie('jwt', token, {
              maxAge: 3600000,
              httpOnly: true,
              sameSite: true,
            })
            .send(loginUser);
        })
        .catch(next);
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('jwt')
    .send({ message: 'Выход осуществлен' });
};

module.exports = {
  getUser,
  updateUser,
  signin,
  signup,
  signout,
};
