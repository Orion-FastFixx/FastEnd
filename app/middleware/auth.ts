import { config } from "../config";
import jwt from 'jsonwebtoken';
// import { User } from "../models/user.models";
import { Request, Response, NextFunction } from 'express';
import { Request as CustomRequest } from "../types/types";
import User from "../models/user.models";

export const AuthMiddleware = {
    async verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
        const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

        console.log(token);

        if (!token) {
            return res.status(403).json({
                message: "No token provided!"
            });
        }

        jwt.verify(token, config.jwtKey, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized!"
                });
            }
            req.userId = decoded.id;
            next();
        });
    },

    async isAdmin(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const user: any = await User.findByPk(req.userId);

            if (user && user.role_id == 1) {
                next();
                return;
            }
            res.status(403).json({
                message: "Require Admin Role!"
            });
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    },

    async isPengendara(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const user: any = await User.findByPk(req.userId);

            if (user && user.role_id == 2) {
                next();
                return;
            }
            res.status(403).json({
                message: "Require Pengendara Role!"
            });
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    },

    async isAdminBengkel(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const user: any = await User.findByPk(req.userId);


            if (user && user.role_id == 3) {
                next();
                return;
            }
            res.status(403).json({
                message: "Require Admin Bengkel Role!"
            });
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    },

    async isMontir(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const user: any = await User.findByPk(req.userId);

            if (user && user.role_id == 4) {
                next();
                return;
            }
            res.status(403).json({
                message: "Require Montir Role!"
            });
        } catch (error: any) {
            res.status(500).send({ message: error.message });
        }
    }
}