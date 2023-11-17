"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const user_models_1 = __importDefault(require("../models/user.models"));
const admin_models_1 = __importDefault(require("../models/admin.models"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_1 = require("sequelize");
exports.AuthenticationController = {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, role_id } = req.body;
                const hashedPassword = bcryptjs_1.default.hashSync(password, 8);
                const userExists = yield user_models_1.default.findOne({
                    where: {
                        [sequelize_1.Op.or]: [
                            { username: username },
                            { email: email }
                        ]
                    }
                });
                if (userExists) {
                    res.status(409).json({
                        message: "User already exists"
                    });
                }
                else {
                    const user = yield user_models_1.default.create({
                        username,
                        email,
                        password: hashedPassword,
                        role_id
                    });
                    // create admin
                    if (role_id == 1) {
                        yield admin_models_1.default.create({
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
            }
            catch (error) {
                res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
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
};
//# sourceMappingURL=authentication.controller.js.map