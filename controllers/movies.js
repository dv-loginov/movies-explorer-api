const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound');
const BadForbidden = require('../errors/BadForbidden');

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.send(movies))
  .catch(next);

const createMovie = (req, res, next) => {
  const newMovieData = req.body;
  newMovieData.owner = req.user._id;

  return Movie.create(newMovieData)
    .then((newMovie) => res.status(201)
      .send(newMovie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .orFail(new NotFound('Фильм не найден'))
    .then((movie) => {
      if (req.user._id === String(movie.owner)) {
        return Movie.deleteOne({ _id: id })
          .then(() => res.status(200)
            .send({ message: `Фильм ${id} удален` }))
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
