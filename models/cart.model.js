import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    // Define your schema fields here, for example:
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    size : { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    
    
    
    // products: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }]
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;