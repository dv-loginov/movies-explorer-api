const router = require('express')
  .Router();

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

const {
  createMovieValidator,
  deleteMovieValidator,
} = require('../middlewares/validators');

router.get('/', getMovies);

router.post('/', createMovieValidator, createMovie);

router.delete('/:id', deleteMovieValidator, deleteMovie);

module.exports = router;
