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
exports.checkOrderTimeouts = void 0;
const sequelize_1 = require("sequelize");
const node_cron_1 = __importDefault(require("node-cron"));
const order_model_1 = __importDefault(require("../models/order.model"));
const order_status_1 = require("./order.status");
function checkOrderTimeouts() {
    return __awaiter(this, void 0, void 0, function* () {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        try {
            const expiredOrders = yield order_model_1.default.findAll({
                where: {
                    order_status_id: order_status_1.ORDER_PENDING_STATUS_ID,
                    createdAt: {
                        [sequelize_1.Op.lte]: fiveMinutesAgo
                    }
                }
            });
            for (const order of expiredOrders) {
                order.order_status_id = order_status_1.ORDER_CANCELED_STATUS_ID;
                yield order.save();
            }
        }
        catch (error) {
            console.error('Error updating order statuses:', error);
        }
    });
}
exports.checkOrderTimeouts = checkOrderTimeouts;
// Schedule the cron job
node_cron_1.default.schedule('* * * * *', checkOrderTimeouts);
//# sourceMappingURL=scheduler.js.map