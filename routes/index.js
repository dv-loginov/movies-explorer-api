const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const NotFound = require('../errors/NotFound');

const {
  signinValidator,
  signupValidator,
} = require('../middlewares/validators');

const {
  signin,
  signup,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', signinValidator, signin); // login

router.post('/signup', signupValidator, signup); // create user

router.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход осуществлен' });
});

router.get('/', (req, res) => {
  res.send('Server is run');
});

router.use(auth);

router.use('/users', userRoutes);

router.use('/movies', movieRoutes);

router.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
