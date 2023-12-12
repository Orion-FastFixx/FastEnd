import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { config } from "../config";
import AdminBengkel from "../models/admin.bengkel.model";
import Admin from "../models/admin.models";
import Montir from "../models/montir.models";
import Pengendara from "../models/pengendara.models";
import User from "../models/user.models";
import { sequelize } from "../../db";

export const AuthenticationController = {
    async signUp(req: Request, res: Response) {
        const transaction = await sequelize.transaction();

        try {
            const { username, foto, email, password, role_id } = req.body;
            const hashedPassword = bcryptjs.hashSync(password, 8);

            const placeHolderImgPath = `${req.protocol}://${req.get("host")}/placeholder/user_placeholder.png`
            const fotoUrl = foto ? foto : placeHolderImgPath;

            const userExists = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: username },
                        { email: email }
                    ]
                }
            });


            if (userExists) {
                await transaction.rollback();
                return res.status(409).json({
                    message: "User already exists"
                });
            } else {
                const user: any = await User.create({
                    username,
                    email,
                    password: hashedPassword,
                    role_id,
                    transaction
                });

                // create admin
                if (role_id == 1) {
                    await Admin.create({
                        nama: user.username,
                        phone: user.phone,
                        user_id: user.id,
                        transaction
                    });
                } else if (role_id == 2) {
                    await Pengendara.create({
                        nama: user.username,
                        phone: user.phone,
                        foto: fotoUrl,
                        user_id: user.id,
                        transaction
                    });
                } else if (role_id == 3) {
                    await AdminBengkel.create({
                        nama: user.username,
                        phone: user.phone,
                        user_id: user.id,
                        transaction
                    });
                }
                else if (role_id == 4) {
                    await Montir.create({
                        nama: user.username,
                        phone: user.phone,
                        user_id: user.id,
                        transaction
                    });
                }

                await transaction.commit();
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
            await transaction.rollback();
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

    async deleteAccount(req: Request, res: Response) {
        const transaction = await sequelize.transaction();

        try {
            const userId = req.session?.user?.id;
            if (!userId) {
                await transaction.rollback();
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }

            const user: any = await User.findByPk(userId);

            // get user name
            const username = user?.username;

            if (!user) {
                await transaction.rollback();
                return res.status(404).json({
                    message: "User not found"
                });
            }

            await user.destroy({ transaction });

            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: err.message || "Internal Server Error" });
                }
            });

            res.clearCookie('connect.sid');

            await transaction.commit();

            return res.status(200).json({
                message: `User ${username} deleted`
            });

        } catch (error: any) {
            await transaction.rollback();
            return res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },
}

