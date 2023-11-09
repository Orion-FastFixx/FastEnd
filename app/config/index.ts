import dotenv from 'dotenv';

dotenv.config();

export const config = {
    serviceName : process.env.SERVICE_NAME as string,
    urlDb : process.env.MONGO_URL as string,

}
