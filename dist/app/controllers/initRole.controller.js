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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoles = void 0;
const role_models_1 = require("../models/role.models");
const defaultRoles = ["admin", "pengendara", "adminBengkel", "montir"];
const initializeRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Promise.all(defaultRoles.map((roleName) => __awaiter(void 0, void 0, void 0, function* () {
            const roleExists = yield role_models_1.Role.findOne({ name: roleName });
            if (!roleExists) {
                const newRole = new role_models_1.Role({ name: roleName });
                yield newRole.save();
                console.log(`Role ${roleName} created successfully.`);
            }
            else {
                console.log(`Role ${roleName} already exists.`);
            }
        })));
        console.log('Roles initialization completed.');
    }
    catch (error) {
        console.error('Error initializing roles:', error);
        process.exit(1);
    }
});
exports.initializeRoles = initializeRoles;
//# sourceMappingURL=initRole.controller.js.map