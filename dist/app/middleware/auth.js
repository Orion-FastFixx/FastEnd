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
exports.AuthMiddleware = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = __importDefault(require("../models/user.models"));
exports.AuthMiddleware = {
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
            console.log(token);
            if (!token) {
                return res.status(403).json({
                    message: "No token provided!"
                });
            }
            jsonwebtoken_1.default.verify(token, config_1.config.jwtKey, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: "Unauthorized!"
                    });
                }
                req.userId = decoded.id;
                next();
            });
        });
    },
    isAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_models_1.default.findByPk(req.userId);
                if (user && user.role_id == 1) {
                    next();
                    return;
                }
                res.status(403).json({
                    message: "Require Admin Role!"
                });
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    },
    isAdminBengkel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_models_1.default.findByPk(req.userId);
                if (user && user.role_id == 3) {
                    next();
                    return;
                }
                res.status(403).json({
                    message: "Require Admin Bengkel Role!"
                });
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    },
    isMontir(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_models_1.default.findByPk(req.userId);
                if (user && user.role_id == 4) {
                    next();
                    return;
                }
                res.status(403).json({
                    message: "Require Montir Role!"
                });
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    }
};
//# sourceMappingURL=auth.js.map