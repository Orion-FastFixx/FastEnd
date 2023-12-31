import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
    serviceName : process.env.SERVICE_NAME as string,
    jwtKey: process.env.SECRET as string,
    jwtRefresh: process.env.REFRESH_SECRET as string,
    sessionKey: process.env.SESSION_SECRET as string,
    mysqlHost: process.env.DB_HOST as string,
    mysqlUser: process.env.DB_USERNAME as string,
    mysqlPassword: process.env.DB_PASSWORD as string,
    mysqlDatabase: process.env.DB_DATABASE as string,
    mysqlPort: process.env.DB_PORT as any,
    mysqlTimezone: process.env.DB_TIMEZONE as string,
    rootPath : path.resolve(__dirname, '..'),
    uploadsFolder: path.resolve(__dirname, '..', 'public', 'images') 
}