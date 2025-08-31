import express from 'express';  
import { addToCart, getCartItems, removeFromCart, updateCartItem } from '../controllers/cart.controller.js';
import userAuth from '../middleware/userAuth.js';
import e from 'express';

const cartRouter = express.Router();

// Route to add item to cart
cartRouter.post('/add', userAuth, addToCart);
cartRouter.get('/items', userAuth, getCartItems);
cartRouter.patch('/update/:itemId', userAuth, updateCartItem);
cartRouter.delete('/remove/:id', userAuth, removeFromCart);


export default cartRouter;