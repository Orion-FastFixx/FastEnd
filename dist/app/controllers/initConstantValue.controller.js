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
exports.initializeContantValue = void 0;
const role_models_1 = __importDefault(require("../models/role.models"));
const db_1 = require("../../db");
const order_status_model_1 = __importDefault(require("../models/order.status.model"));
const payment_status_model_1 = __importDefault(require("../models/payment.status.model"));
const payment_method_model_1 = __importDefault(require("../models/payment.method.model"));
const defaultRoles = ["Admin", "Pengendara", "Admin Bengkel", "Montir"];
const orderStatus = ["Pending", "Paid", "Accepted", "Completed", "Canceled"];
const paymentStatus = ["Pending", "Paid", "Canceled"];
const paymentMethod = ["Cash", "Transfer"];
exports.initializeContantValue = {
    initRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield db_1.sequelize.transaction();
                let results = [];
                for (const roleName of defaultRoles) {
                    const [role, created] = yield role_models_1.default.findOrCreate({
                        where: { name: roleName },
                        defaults: { name: roleName },
                        transaction,
                    });
                    results.push({
                        roleName: roleName,
                        status: created ? 'created' : 'already exists',
                        roleDetails: role
                    });
                }
                yield transaction.commit();
                return res.status(200).json({
                    message: "Success initialize roles",
                    data: results
                });
            }
            catch (error) {
                console.error("Error initializing roles:", error);
                return res.status(500).json({ message: error.message });
            }
        });
    },
    initOrderStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield db_1.sequelize.transaction();
                let results = [];
                for (const statusName of orderStatus) {
                    const [status, created] = yield order_status_model_1.default.findOrCreate({
                        where: { status: statusName },
                        defaults: { status: statusName },
                        transaction,
                    });
                    results.push({
                        statusName: statusName,
                        status: created ? 'created' : 'already exists',
                        statusDetails: status
                    });
                }
                yield transaction.commit();
                return res.status(200).json({
                    message: "Success initialize order status",
                    data: results
                });
            }
            catch (error) {
                console.error("Error initializing order status:", error);
                return res.status(500).json({ message: error.message });
            }
        });
    },
    initPaymentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield db_1.sequelize.transaction();
                let results = [];
                for (const statusName of paymentStatus) {
                    const [status, created] = yield payment_status_model_1.default.findOrCreate({
                        where: { status: statusName },
                        defaults: { status: statusName },
                        transaction,
                    });
                    results.push({
                        statusName: statusName,
                        status: created ? 'created' : 'already exists',
                        statusDetails: status
                    });
                }
                yield transaction.commit();
                return res.status(200).json({
                    message: "Success initialize payment status",
                    data: results
                });
            }
            catch (error) {
                console.error("Error initializing payment status:", error);
                return res.status(500).json({ message: error.message });
            }
        });
    },
    initPaymentMethod(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield db_1.sequelize.transaction();
                let results = [];
                for (const methodName of paymentMethod) {
                    const [method, created] = yield payment_method_model_1.default.findOrCreate({
                        where: { method: methodName },
                        defaults: { method: methodName },
                        transaction,
                    });
                    results.push({
                        methodName: methodName,
                        status: created ? 'created' : 'already exists',
                        methodDetails: method
                    });
                }
                yield transaction.commit();
                return res.status(200).json({
                    message: "Success initialize payment method",
                    data: results
                });
            }
            catch (error) {
                console.error("Error initializing payment method:", error);
                return res.status(500).json({ message: error.message });
            }
        });
    },
};
//# sourceMappingURL=initConstantValue.controller.js.map