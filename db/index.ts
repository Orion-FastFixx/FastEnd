import {config} from '../app/config';
import { Sequelize } from "sequelize";




// Initialize a new Sequelize instance
const sequelize = new Sequelize(config.mysqlDatabase, config.mysqlUser, config.mysqlPassword, {
  host: config.mysqlHost,
  dialect: 'mysql',
  port: config.mysqlPort,
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
  } catch (error: any) {
    console.error('Unable to connect to the database:', error);
    
  }
}

connectDb();

export { sequelize, connectDb };

