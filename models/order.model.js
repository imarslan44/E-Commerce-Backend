import e from "express";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   user : {
      type : mongoose.Schema.ObjectId, 
      ref: 'user', required: true
           },  
   items: [  
      {
         productId: { 
         type: mongoose.Schema.Types.ObjectId, ref: 'product', 
         required: true 
      },
      quantity: { 
         type: Number, 
         required: true, 
         min: 1 
      },
      size: {type: String, required: true, enum: ['S', 'M', 'L', 'XL', 'XXL']},
   }],
   address: { 
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state : { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true }
    },
   date: { type: Date, default: Date.now },
   status: { type: String, enum: ['pending',"placed", 'shipped', 'delivered', "cancelled"], default: 'pending' },
   totalAmount: { type: Number, required: true }
   
},{timestamps: true})

const OderModel = mongoose.model("Oder", orderSchema);

export default OderModel;