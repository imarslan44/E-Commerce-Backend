import express from 'express';
import { createOrder, updateOrderStatus, cancelOrder, getAllOrders, getUserOrders } from '../controllers/order.controller.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAuth.js';


const OrderRouter = express.Router();


OrderRouter.post('/create', userAuth, createOrder);
OrderRouter.get('/', userAuth, getUserOrders);
OrderRouter.get('/all', adminAuth, getAllOrders);
OrderRouter.patch('/:orderId', adminAuth, updateOrderStatus);
OrderRouter.patch('/:orderId', adminAuth, cancelOrder);


export default OrderRouter;

