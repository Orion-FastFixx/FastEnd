import { Op } from 'sequelize';
import cron from 'node-cron';
import Order from '../models/order.model';
import { ORDER_CANCELED_STATUS_ID, ORDER_PENDING_STATUS_ID } from './order.status';


export async function checkOrderTimeouts(): Promise<void> {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    try {
        const expiredOrders: any = await Order.findAll({
            where: {
                order_status_id: ORDER_PENDING_STATUS_ID,
                createdAt: {
                    [Op.lte]: fiveMinutesAgo
                }
            }
        });

        for (const order of expiredOrders) {
            order.order_status_id = ORDER_CANCELED_STATUS_ID;
            await order.save();
        }
    } catch (error: any) {
        console.error('Error updating order statuses:', error);
    }
}

// Schedule the cron job
cron.schedule('* * * * *', checkOrderTimeouts);