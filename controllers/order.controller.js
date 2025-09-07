import OderModel from "../models/order.model.js";

// Create a new order
export const createOrder = async (req, res) => {

    try{
   
        const { items, totalAmount, shippingAddress } = req.body;
        const user = req.user; // Assuming user info is available in req.user after authentication

        if(!items || items.length === 0) return res.status(400).json({ success: false, message: "No items provided for the order" });
        
        if(!totalAmount || totalAmount <= 0) return res.status(400).json({ success: false, message: "Invalid total amount" });
        
        if(!shippingAddress) return res.status(400).json({ success: false, message: "Shipping address is required" });
        // Create order object
        const orderData = {
            user: user._id,
            items: items.map(item => ({ 
                productId: item.productId, 
                quantity: item.quantity, 
                size: item.size
            })),
            address: shippingAddress,
            totalAmount,
            status: 'placed', // Initial status
            date: Date.now()
        }
        
        const newOrder = await OderModel.create(orderData);
        await newOrder.save();
        res.json({ success: true, message: "Order created successfully", order: newOrder });
    } catch(error){
        console.log(error)

      return  res.status(500).json({ success: false, message: error.message });

    }
}

//create order with Stripe
export const createOrderWithStripe = async (req, res) => {

    try{
        const { items, totalAmount, shippingAddress, paymentMethodId } = req.body;
        const user = req.user; 

    } catch(error){
      
    }
}
//create  order with razorpay
export const createOrderWithRazorpay = async (req, res) => {
    try{
        const { items, totalAmount, shippingAddress, paymentMethodId } = req.body;
        const user = req.user;
    }catch(error){

    }
}

// Get orders for a user
export const getUserOrders = async (req, res) => {
    try{
        const user = req.user; // Assuming user info is available in req.user after authentication      
        const orders = await OderModel.find({ user: user._id }).populate('items.productId').sort({ date: -1 });
        res.json({ success: true, orders });
    } catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error.message });
    }
}

// Update order status (Admin functionality)
export const updateOrderStatus = async (req, res) => {
    try{
        const { orderId, status } = req.body;
        const validStatuses = ['pending', 'placed', 'shipped', 'delivered'];
        if(!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }   
        const order = await OderModel.findById(orderId);
        if(!order) return res.status(404).json({ success: false, message: "Order not found" });
        order.status = status;
        await order.save();
        res.json({ success: true, message: "Order status updated successfully", order });
    } catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllOrders = async (req, res) => {
   
    try{
        const orders = await OderModel.find().populate('user').populate('items.productId').sort({ date: -1 });
        res.json({ success: true, orders });

    } catch(error){
        console.log(error)
        return res.status(500).json({ success: false, message: error.message });
    }
}

//cancel the order
export const cancelOrder = async (req, res) => {
  const {id} = req.params;
    try {
        const order = await OderModel.findById(id);
        if(!order) return res.status(404).json({ success: false, message: "Order not found" });
        if(order.status === 'cancelled') return res.status(400).json({ success: false, message: "Order is already cancelled" });
        order.status = 'cancelled';
        await order.save();
        res.json({ success: true, message: "Order cancelled successfully", order });
    }catch(error){

    }
}