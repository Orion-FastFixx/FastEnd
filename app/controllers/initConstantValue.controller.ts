import Role from "../models/role.models";
import { sequelize } from "../../db";
import { Request, Response } from "express"
import OrderStatus from "../models/order.status.model";
import PaymentStatus from "../models/payment.status.model";
import PaymentMethod from "../models/payment.method.model";

const defaultRoles = ["Admin", "Pengendara", "Admin Bengkel", "Montir"];
const orderStatus = ["Pending", "Paid", "Accepted", "Completed", "Canceled"];
const paymentStatus = ["Pending", "Paid", "Canceled"];
const paymentMethod = ["Cash", "Transfer"];

export const initializeContantValue = {
    async initRole(req: Request, res: Response) {
        try {
            const transaction = await sequelize.transaction();
            let results = [];

            for (const roleName of defaultRoles) {
                const [role, created] = await Role.findOrCreate({
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
            await transaction.commit();

            return res.status(200).json({
                message: "Success initialize roles",
                data: results
            });

        } catch (error: any) {
            console.error("Error initializing roles:", error);
            return res.status(500).json({ message: error.message });
        }
    },

    async initOrderStatus(req: Request, res: Response) {
        try {
            const transaction = await sequelize.transaction();
            let results = [];

            for (const statusName of orderStatus) {
                const [status, created] = await OrderStatus.findOrCreate({
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
            await transaction.commit();

            return res.status(200).json({
                message: "Success initialize order status",
                data: results
            });

        } catch (error: any) {
            console.error("Error initializing order status:", error);
            return res.status(500).json({ message: error.message });
        }
    },

    async initPaymentStatus(req: Request, res: Response) {
        try {
            const transaction = await sequelize.transaction();
            let results = [];

            for (const statusName of paymentStatus) {
                const [status, created] = await PaymentStatus.findOrCreate({
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
            await transaction.commit();

            return res.status(200).json({
                message: "Success initialize payment status",
                data: results
            });

        } catch (error: any) {
            console.error("Error initializing payment status:", error);
            return res.status(500).json({ message: error.message });
        }
    },

    async initPaymentMethod(req: Request, res: Response) {
        try {
            const transaction = await sequelize.transaction();
            let results = [];

            for (const methodName of paymentMethod) {
                const [method, created] = await PaymentMethod.findOrCreate({
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
            await transaction.commit();

            return res.status(200).json({
                message: "Success initialize payment method",
                data: results
            });

        } catch (error: any) {
            console.error("Error initializing payment method:", error);
            return res.status(500).json({ message: error.message });
        }
    },
};