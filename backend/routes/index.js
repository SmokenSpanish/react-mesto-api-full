const router = require('express').Router();
const {
  createUser, login, logout, cookiesCheck,
} = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../utils/celebrate-validators');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NotFoundError } = require('../errors/404_not-found-error');

router.get('/check', cookiesCheck);
router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);
router.use(auth);
router.post('/logout', logout);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не существует');
});

module.exports = router;
