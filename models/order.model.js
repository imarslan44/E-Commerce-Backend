import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   user : {
      type : mongoose.Schema.ObjectId, 
      ref: 'User', required: true
           },  
   items: [  
      {
         productId: { 
         type: mongoose.Schema.Types.ObjectId, ref: 'Product', 
         required: true 
      },
      quantity: { 
         type: Number, 
         required: true, 
         min: 1 
      }
   }],
   
},{timestamps: true})

const OderModel = mongoose.model("Oder", orderSchema);

export default OderModel;