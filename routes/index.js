const router = require('express')
  .Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const NotFound = require('../errors/NotFound');
const { ERROR_MESSAGE } = require('../utils/const');

const {
  signinValidator,
  signupValidator,
} = require('../middlewares/validators');

const {
  signin,
  signup,
  signout,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', signinValidator, signin);

router.post('/signup', signupValidator, signup);

router.get('/', (req, res) => {
  res.send('Server is run');
});

router.use(auth);

router.post('/signout', signout);

router.use('/users', userRoutes);

router.use('/movies', movieRoutes);

router.use((req, res, next) => {
  next(new NotFound(ERROR_MESSAGE.ERROR_404));
});

module.exports = router;
