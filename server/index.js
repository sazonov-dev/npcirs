const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dbCheckConnect = require('./db/dbCheckConnect');
const indexRouter = require('./src/routes/indexRouter');

const PORT = 3001;
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin || origin === 'null') {
      return callback(null, true);
    }
    return callback(new Error('Запрещено настройками CORS'));
  },
  optionsSuccessStatus: 200,
};

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use(indexRouter);

app.listen(PORT, () => {
  dbCheckConnect(); // Проверяем подключение к базе данных
  console.log(`Сервер запущен на порте ${PORT}! `);
});
