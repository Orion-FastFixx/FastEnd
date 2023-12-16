import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import { routes } from './app/routes/index.routes';
import path from 'path';
import session from 'express-session';
import cors from "cors";

import { relations } from './app/models/relations.models';
import { checkOrderTimeouts } from './app/utils/scheduler';


var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));

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

// Start the cron job
checkOrderTimeouts();

module.exports = app;
