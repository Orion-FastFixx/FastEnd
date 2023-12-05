import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
    userId?: number; // Assuming userId is a number, change the type if needed
}