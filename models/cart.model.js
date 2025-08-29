import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    // Define your schema fields here, for example:
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    // products: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }]
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;