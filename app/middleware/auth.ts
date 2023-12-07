import jwt from 'jsonwebtoken';
import { config } from "../config";
// import { User } from "../models/user.models";
import { NextFunction, Response } from 'express';
import User from "../models/user.models";
import { Request as CustomRequest } from "../utils/types";

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
            return res.status(500).send({ message: error.message });
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
            return res.status(500).send({ message: error.message });
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
            return res.status(500).send({ message: error.message });
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
            return res.status(500).send({ message: error.message });
        }
    }
}