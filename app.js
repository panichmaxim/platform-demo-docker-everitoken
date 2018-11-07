const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const boom = require('express-boom');
const cors = require('cors');
const morgan = require('morgan');
const errorMiddleware = require('./src/middleware/error');
const routes = require('./src/routes');

const app = express();

app.disable('etag');
app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(cors({
  origin: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(boom());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.use(errorMiddleware);

app.get('*', (req, res) => res.boom.notFound());

module.exports = app;
