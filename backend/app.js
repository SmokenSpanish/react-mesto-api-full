require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const { celebrateErrorHandler } = require('./middlewares/celebrate-errors-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

// app.use(cors({
//   origin: [
//     'http://spanish.students.nomoredomains.monster',
//     'https://spanish.students.nomoredomains.monster',
//     'http://api.spanish.students.nomoredomains.monster',
//     'https://api.spanish.students.nomoredomains.monster',
//     'http://localhost:3000',
//     'http://localhost:3001',
//   ],
//   credentials: true,
// }));

// const ALLOWED_CORS = [
//   'https://spanish.students.nomoredomains.monster',
//   'http://spanish.students.nomoredomains.monster',
//   // 'http://api.spanish.students.nomoredomains.monster',
//   // 'https://api.spanish.students.nomoredomains.monster',
//   'http://localhost:3000',
//   'http://localhost:3001',
// ];

// const cors = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];

//   if (ALLOWED_CORS.includes(origin)) {
//     // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', true);
//   }

//   // Если это предварительный запрос, добавляем нужные заголовки
//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.status(200).send();
//     return;
//   }

//   next();
// };

app.use((req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  const ALLOWED_CORS = [
    'https://spanish.students.nomoredomains.monster',
    'http://spanish.students.nomoredomains.monster',
    'http://api.spanish.students.nomoredomains.monster',
    'https://api.spanish.students.nomoredomains.monster',
    'http://localhost:3000',
    'http://localhost:3001',
  ];

  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    return res.status(200).send();
  }
  return next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);

app.use(celebrateErrorHandler);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {});
