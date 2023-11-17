import dotenv from 'dotenv';

dotenv.config();

export const config = {
    serviceName : process.env.SERVICE_NAME as string,
    jwtKey: process.env.SECRET as string,
    mysqlHost: process.env.DB_HOST as string,
    mysqlUser: process.env.DB_USERNAME as string,
    mysqlPassword: process.env.DB_PASSWORD as string,
    mysqlDatabase: process.env.DB_DATABASE as string,
    mysqlPort: process.env.DB_PORT as any,

}