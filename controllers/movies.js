const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound');
const BadForbidden = require('../errors/BadForbidden');

const getMovies = (req, res, next) => Movie.find({})
  .then((cards) => res.send(cards))
  .catch(next);

const createMovie = (req, res, next) => {
  const newMovieData = req.body;
  newMovieData.owner = req.user._id;

  return Movie.create(newMovieData)
    .then((newCard) => res.status(201)
      .send(newCard))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .orFail(new NotFound('Карточка не найдена'))
    .then((card) => {
      if (req.user._id === String(card.owner)) {
        return Movie.deleteOne({ _id: id })
          .then(() => res.status(200)
            .send({ message: `Карточка ${id} удалена` }))
          .catch(next);
      }
      return next(new BadForbidden('Доступ запрещен'));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
