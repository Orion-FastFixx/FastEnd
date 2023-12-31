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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const admin_bengkel_model_1 = __importDefault(require("../models/admin.bengkel.model"));
const admin_models_1 = __importDefault(require("../models/admin.models"));
const montir_models_1 = __importDefault(require("../models/montir.models"));
const pengendara_models_1 = __importDefault(require("../models/pengendara.models"));
const user_models_1 = __importDefault(require("../models/user.models"));
const db_1 = require("../../db");
const refresh_token_model_1 = __importDefault(require("../models/refresh.token.model"));
exports.AuthenticationController = {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const { username, foto, email, password, role_id } = req.body;
                const hashedPassword = bcryptjs_1.default.hashSync(password, 8);
                const placeHolderImgPath = `${req.protocol}://${req.get("host")}/placeholder/user_placeholder.png`;
                const fotoUrl = foto ? foto : placeHolderImgPath;
                const userExists = yield user_models_1.default.findOne({
                    where: {
                        [sequelize_1.Op.or]: [
                            { username: username },
                            { email: email }
                        ]
                    }
                });
                if (userExists) {
                    yield transaction.rollback();
                    return res.status(409).json({
                        message: "User already exists"
                    });
                }
                else {
                    const user = yield user_models_1.default.create({
                        username,
                        email,
                        password: hashedPassword,
                        role_id,
                        transaction
                    });
                    // create admin
                    if (role_id == 1) {
                        yield admin_models_1.default.create({
                            nama: user.username,
                            phone: user.phone,
                            user_id: user.id,
                            transaction
                        });
                    }
                    else if (role_id == 2) {
                        yield pengendara_models_1.default.create({
                            nama: user.username,
                            phone: user.phone,
                            foto: fotoUrl,
                            user_id: user.id,
                            transaction
                        });
                    }
                    else if (role_id == 3) {
                        yield admin_bengkel_model_1.default.create({
                            nama: user.username,
                            phone: user.phone,
                            user_id: user.id,
                            transaction
                        });
                    }
                    else if (role_id == 4) {
                        yield montir_models_1.default.create({
                            nama: user.username,
                            phone: user.phone,
                            user_id: user.id,
                            transaction
                        });
                    }
                    yield transaction.commit();
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
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.session.user) {
                    return res.status(200).json({
                        message: "User already logged in",
                        user: req.session.user,
                    });
                }
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
                    return res.status(401).json({ auth: false, token: null, message: 'Invalid credentials' });
                }
                const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.config.jwtKey, {
                    // exp in 1 hour
                    expiresIn: 3600
                });
                const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.config.jwtRefresh, {});
                yield refresh_token_model_1.default.create({
                    token: refreshToken,
                    user_id: user.id,
                });
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role_id: user.role_id,
                    token: accessToken,
                    refreshToken: refreshToken,
                };
                return res.status(200).json({
                    message: "User found",
                    user: req.session.user,
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    generateAccessToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const { refreshToken } = req.body;
                if (!refreshToken) {
                    yield transaction.rollback();
                    return res.status(400).json({ message: "Refresh token is required" });
                }
                const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.config.jwtRefresh);
                const existingToken = yield refresh_token_model_1.default.findOne({
                    where: {
                        token: refreshToken,
                        user_id: decoded.id
                    }
                });
                if (!existingToken) {
                    yield transaction.rollback();
                    return res.status(401).json({ message: "Invalid refresh token" });
                }
                // generate new access token
                const accessToken = jsonwebtoken_1.default.sign({ id: decoded.id }, config_1.config.jwtKey, {
                    // exp in 12 hours
                    expiresIn: 3600
                });
                yield transaction.commit();
                return res.status(200).json({
                    message: "Token refreshed",
                    token: accessToken
                });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    signOut(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!token) {
                    return res.status(400).json({ message: "Token is required" });
                }
                let decode;
                try {
                    decode = jsonwebtoken_1.default.verify(token, config_1.config.jwtKey);
                }
                catch (error) {
                    return res.status(401).json({ message: "Invalid token" });
                }
                const userId = decode.id;
                req.session.destroy((err) => {
                    if (err) {
                        return res.status(500).json({ message: err.message || "Internal Server Error" });
                    }
                });
                res.clearCookie('connect.sid');
                yield refresh_token_model_1.default.destroy({
                    where: {
                        user_id: userId
                    }
                });
                return res.status(200).json({
                    auth: false,
                    token: null,
                    message: "User logged out"
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    updatePassword(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const userId = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
                if (!userId) {
                    yield transaction.rollback();
                    return res.status(401).json({
                        message: "Unauthorized"
                    });
                }
                const user = yield user_models_1.default.findByPk(userId);
                if (!user) {
                    yield transaction.rollback();
                    return res.status(404).json({
                        message: "User not found"
                    });
                }
                const { password, newPassword } = req.body;
                const passwordIsValid = bcryptjs_1.default.compareSync(password, user.password);
                if (!passwordIsValid) {
                    yield transaction.rollback();
                    return res.status(401).json({ message: 'Current password is incorrect' });
                }
                const hashedPassword = bcryptjs_1.default.hashSync(newPassword, 8);
                yield user.update({
                    password: hashedPassword
                }, { transaction });
                yield transaction.commit();
                return res.status(200).json({
                    message: "Password updated"
                });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
    deleteAccount(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield db_1.sequelize.transaction();
            try {
                const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!token) {
                    yield transaction.rollback();
                    return res.status(400).json({ message: "Token is required" });
                }
                let decode;
                try {
                    decode = jsonwebtoken_1.default.verify(token, config_1.config.jwtKey);
                }
                catch (error) {
                    yield transaction.rollback();
                    return res.status(401).json({ message: "Invalid token" });
                }
                const userId = decode.id;
                if (!userId) {
                    yield transaction.rollback();
                    return res.status(401).json({
                        message: "Unauthorized"
                    });
                }
                const user = yield user_models_1.default.findByPk(userId);
                // get user name
                const username = user === null || user === void 0 ? void 0 : user.username;
                if (!user) {
                    yield transaction.rollback();
                    return res.status(404).json({
                        message: "User not found"
                    });
                }
                yield refresh_token_model_1.default.destroy({
                    where: {
                        user_id: userId
                    }
                });
                yield user.destroy({ transaction });
                req.session.destroy((err) => {
                    if (err) {
                        return res.status(500).json({ message: err.message || "Internal Server Error" });
                    }
                });
                res.clearCookie('connect.sid');
                yield transaction.commit();
                return res.status(200).json({
                    message: `User ${username} deleted`
                });
            }
            catch (error) {
                yield transaction.rollback();
                return res.status(500).json({ message: error.message || "Internal Server Error" });
            }
        });
    },
};
//# sourceMappingURL=authentication.controller.js.map