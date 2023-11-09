import mongoose from 'mongoose';
import {config} from '../app/config';

mongoose.connect(config.urlDb)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log("Connection error: ", err));

export const db = mongoose.connection;