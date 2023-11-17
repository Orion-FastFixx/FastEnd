import User from "../models/user.models";
import Admin from "../models/admin.models";
import { config } from "../config";
import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs"
import { Op } from 'sequelize';


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
                res.status(409).json({
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
                }

                res.status(201).json({
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
            res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    },

    // async signIn(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { email, username, password } = req.body;

    //         // can login with username or email
    //         User.findOne({
    //             $or: [
    //                 { username: username },
    //                 { email: email }
    //             ]
    //         }).then((user: any) => {
    //             if (user) {
    //                 const checkPassword = bcryptjs.compareSync(password, user.password);
    //                 if (checkPassword) {
    //                     const token = jwt.sign({
    //                         user: {
    //                             id: user._id,
    //                             username: user.username,
    //                             email: user.email,
    //                             roles: "admin"
    //                         }
    //                     }, config.jwtKey, { expiresIn: '12h' });

    //                     console.log(token);

    //                     res.status(200).json({
    //                         message: "Login success",
    //                         data: { token }
    //                     });
    //                 } else {
    //                     res.status(401).json({
    //                         message: "Invalid password"
    //                     });
    //                 }
    //             } else {
    //                 res.status(404).json({
    //                     message: "User not found"
    //                 });
    //             }
    //         }
    //         );

    //     } catch (error: any) {
    //         res.status(500).json({ message: error.message || "Internal Server Error" });
    //         next();
    //     }
    // }
}

