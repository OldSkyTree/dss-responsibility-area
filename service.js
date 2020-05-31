'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const initRoute = require('./init-route');
const handleError = require('./middleware/handle-error');

const app = express();
const router = new express.Router({
    caseSensitive: true,
    strict: false
});

const { env } = process;
const PORT = env.PORT || 3000;

// Почти все middlewares и роуты ожидают `req.body`
app.use(bodyParser.json({ limit: env.HTTP_BODY_JSON_LIMIT }));
// Настраиваем логирование: стандартный Apache combined вывод
app.use(morgan('combined'));
// Настраиваем роутер
app.use(initRoute(router));

app.use(handleError);

app.listen(PORT, () => console.info(`listening on ${PORT}`));
