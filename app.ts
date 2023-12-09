import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import { routes } from './app/routes/index.routes';
import path from 'path';
import session from 'express-session';

import { relations } from './app/models/relations.models';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));
console.log('__dirname is: ', __dirname);

app.use(session({
  secret: 'house of el',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

app.use('/api/v1', routes);


// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return the error in JSON format
  return res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});

relations();

module.exports = app;
