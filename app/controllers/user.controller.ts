import {User} from "../models/user.models"
import {Role} from "../models/role.models"
import { Request, Response } from "express"
import bcryptjs from "bcryptjs"

export const UserController = {
    // create new user
    async createUser(req: Request, res: Response) {
        try {User
            const { username, email, password, roles } = req.body;
            const foundRoles = await Role.findOne({ name: roles });
            const user = new User({
                username,
                email,
                roles: foundRoles ? foundRoles._id : null,
                password: bcryptjs.hashSync(password, 8)
            });

            const savedUser = await user.save();

            const userWithRoles = await User.findById(savedUser._id).populate('roles', '-__v');

            if (userWithRoles) {

                const rolesName = (userWithRoles.roles as any).name;

                res.json({
                    message: "User was registered successfully!",
                    user: {
                        id: userWithRoles._id,
                        username: userWithRoles.username,
                        email: userWithRoles.email,
                        roles: rolesName
                    }
                });
            } else {
                res.status(404).json({ message: "User not found after save operation." });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}