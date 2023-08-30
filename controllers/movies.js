const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound');
const BadForbidden = require('../errors/BadForbidden');
const { ERROR_MESSAGE } = require('../utils/const');

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

// const deleteMovie = (req, res, next) => {
//   const { id } = req.params;
//   Movie.findOne({ movieId: id, owner: req.user._id })
//     .orFail(new NotFound(ERROR_MESSAGE.ERROR_FILM_NOT_FOUND))
//     .then((movie) => {
//       if (req.user._id === String(movie.owner)) {
//         return Movie.deleteOne({ movieId: id })
//           .then(() => res.status(200)
//             .send({ message: `Фильм ${id} удален` }))
//           .catch(next);
//       }
//       return next(new BadForbidden(ERROR_MESSAGE.ERROR_ACCESS_IS_DENIED));
//     })
//     .catch(next);
// };

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  return Movie.deleteOne({ movieId: id, owner: req.user._id })
    .then(() => res.status(200)
      .send({ message: `Фильм ${id} удален` }))
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
