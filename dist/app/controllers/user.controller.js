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
exports.UserController = void 0;
const user_models_1 = require("../models/user.models");
const role_models_1 = require("../models/role.models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.UserController = {
    // create new user
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, roles } = req.body;
                const foundRoles = yield role_models_1.Role.findOne({ name: roles });
                const user = new user_models_1.User({
                    username,
                    email,
                    roles: foundRoles ? foundRoles._id : null,
                    password: bcryptjs_1.default.hashSync(password, 8)
                });
                const savedUser = yield user.save();
                res.json({
                    message: "User was registered successfully!",
                    user: {
                        id: savedUser._id,
                        username: savedUser.username,
                        email: savedUser.email,
                        roles: savedUser.roles
                    }
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
};
//# sourceMappingURL=user.controller.js.map