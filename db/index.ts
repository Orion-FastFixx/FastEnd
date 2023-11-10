import mongoose from 'mongoose';
import {config} from '../app/config';
import { initializeRoles } from '../app/controllers/initRole.controller';


mongoose.connect(config.urlDb)
  .then(() => {
    console.log('MongoDB connected...')
    initializeRoles();
  })
  .catch((err) => console.log("Connection error: ", err));

export const db = mongoose.connection;