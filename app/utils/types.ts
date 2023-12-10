import { Request as ExpressRequest } from 'express';
import "express-session";

export interface Request extends ExpressRequest {
    userId?: number; // Assuming userId is a number, change the type if needed

    files?: any; // Assuming file is any, change the type if needed

}

declare module "express-session" {
    export interface SessionData {
        user: { [key: string]: any } | null; // Adjust the type to match your user object structure
    }
}