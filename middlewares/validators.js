const {
  celebrate,
  Joi,
} = require('celebrate');

const patternUrl = /https?:\/\/([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}/;

const signinValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(8),
    }),
});

const signupValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(8),
    }),
});

const updateUserValidator = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      email: Joi.string()
        .required()
        .email(),
    }),
});

const createMovieValidator = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string()
        .required(),
      director: Joi.string()
        .required(),
      duration: Joi.number()
        .required(),
      year: Joi.number()
        .integer()
        .required(),
      description: Joi.string()
        .required(),
      image: Joi.string()
        .required(),
      trailerLink: Joi.string()
        .required()
        .pattern(patternUrl),
      thumbnail: Joi.string()
        .required()
        .pattern(patternUrl),
      movieId: Joi.number()
        .required(),
      nameRU: Joi.string()
        .required(),
      nameEN: Joi.string()
        .required(),
    }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object()
    .keys({
      id: Joi.number()
        .required(),
    }),
});

module.exports = {
  signinValidator,
  signupValidator,
  updateUserValidator,
  createMovieValidator,
  deleteMovieValidator,
};
