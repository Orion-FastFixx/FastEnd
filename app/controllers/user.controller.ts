import {User} from "../models/user.models"
import {Role} from "../models/role.models"
import {Request, Response} from "express"
import bcryptjs from "bcryptjs"

export const UserController = {
    // create new user
    async createUser(req: Request, res: Response) {
        try {
            const { username, email, password, roles } = req.body;
            const foundRoles = await Role.findOne({ name: roles });
            const user = new User({
                username,
                email,
                roles: foundRoles ? foundRoles._id : null,
                password: bcryptjs.hashSync(password, 8)
            });

            const savedUser = await user.save();

            
            res.json({
                message: "User was registered successfully!",
                user: {
                    id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email,
                    roles: savedUser.roles
                }
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}