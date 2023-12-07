import User from "../models/user.models";
import Admin from "../models/admin.models";
import { config } from "../config";
import { Request, Response } from "express"
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs"
import { Op } from 'sequelize';
import Montir from "../models/montir.models";
import Pengendara from "../models/pengendara.models";
import AdminBengkel from "../models/admin.bengkel.model";
import session from "express-session";



export const AuthenticationController = {
    async signUp(req: Request, res: Response) {
        try {
            const { username, email, password, role_id } = req.body;
            const hashedPassword = bcryptjs.hashSync(password, 8);

            const userExists = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: username },
                        { email: email }
                    ]
                }
            });


            if (userExists) {
                return res.status(409).json({
                    message: "User already exists"
                });
            } else {
                const user: any = await User.create({
                    username,
                    email,
                    password: hashedPassword,
                    role_id
                });

                // create admin
                if (role_id == 1) {
                    await Admin.create({
                        nama: user.username,
                        phone: user.phone,
                        user_id: user.id
                    });
                } else if (role_id == 2) {
                    await Pengendara.create({
                        nama: user.username,
                        phone: user.phone,
                        user_id: user.id
                    });
                } else if (role_id == 3) {
                    await AdminBengkel.create({
                        nama: user.username,
                        phone: user.phone,
                        user_id: user.id
                    });
                }
                else if (role_id == 4) {
                    await Montir.create({
                        nama: user.username,
                        phone: user.phone,
                        user_id: user.id
                    });
                }

                return res.status(201).json({
                    message: "User created",
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role_id: user.role_id
                    }
                });
            }
        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async signIn(req: Request, res: Response) {
        try {
            if (req.session.user) {
                return res.status(200).json({
                    message: "User already logged in",
                    user: req.session.user,
                });
            }

            const { identifier, password } = req.body;

            const user: any = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: identifier },
                        { email: identifier }
                    ]
                }
            });

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const passwordIsValid = bcryptjs.compareSync(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).json({ auth: false, token: null, message: 'Invalid password' });
            }

            var token = jwt.sign({ id: user.id }, config.jwtKey, {
                // exp in 12 hours
                expiresIn: 43200
            });

            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                role_id: user.role_id,
                token: token
            };

            return res.status(200).json({
                message: "User found",
                user: req.session.user,
            });

        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    async signOut(req: Request, res: Response) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: err.message || "Internal Server Error" });
                }
            });

            res.clearCookie('connect.sid');

            return res.status(200).json({
                auth: false,
                token: null,
                message: "User logged out"
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },
}

