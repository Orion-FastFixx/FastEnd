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
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_1 = require("sequelize");
const montir_models_1 = __importDefault(require("../models/montir.models"));
const pengendara_models_1 = __importDefault(require("../models/pengendara.models"));
const admin_bengkel_model_1 = __importDefault(require("../models/admin.bengkel.model"));
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
                    else if (role_id == 2) {
                        yield pengendara_models_1.default.create({
                            nama: user.username,
                            phone: user.phone,
                            user_id: user.id
                        });
                    }
                    else if (role_id == 3) {
                        yield admin_bengkel_model_1.default.create({
                            nama: user.username,
                            phone: user.phone,
                            user_id: user.id
                        });
                    }
                    else if (role_id == 4) {
                        yield montir_models_1.default.create({
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
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { identifier, password } = req.body;
                const user = yield user_models_1.default.findOne({
                    where: {
                        [sequelize_1.Op.or]: [
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
                const passwordIsValid = bcryptjs_1.default.compareSync(password, user.password);
                if (!passwordIsValid) {
                    return res.status(401).json({ auth: false, token: null, message: 'Invalid password' });
                }
                var token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.config.jwtKey, {
                    // exp in 12 hours
                    expiresIn: 43200
                });
                res.status(200).json({
                    message: "User found",
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role_id: user.role_id
                    },
                    token: token
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    }
};
//# sourceMappingURL=authentication.controller.js.map