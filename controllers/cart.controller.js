import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (req, res) =>{
    const item = req.body;
    const user = req.user;

    if(!item) return res.status(400).json({message: "No item provided"});
 try{
  //if item already exists in cart, then increase the quantity
  const existingCartItem = await Cart.findOne({ user: user._id,
  productId: item._id,
  size: item.size});

 console.log(existingCartItem)

  if(existingCartItem){
    existingCartItem.quantity += item.quantity;
    await existingCartItem.save(); 
    return res.json({
        message: "Item quantity updated successfully",
        cartItem: existingCartItem,
    })
  }
       const cartItem =  await Cart.create({
        user: user._id, 
        productId: item._id,  
        quantity: item.quantity, 
        size: item.size}
       );
    

       

       if(!cartItem) return console.log("Failed to add item");

       return res.json({
        message: "Item Added successfully",
        cartItem,
       })

    }catch(err){
        console.log(err)
    }
 }


export const getCartItems = async (req, res) =>{
    const {_id} = req.user;
   
    try{
        const cartItems = await Cart.find({user:_id }).populate("productId");
        

        if(!cartItems ||cartItems.length === 0) return res.status(200).json({ message: "No items found in cart", cartItems: [] });

        return  res.json({message: "Cart items fetched successfully",
        cartItems
        });

    }catch(err){
        console.log(err)
    }
}

export const updateCartItem = async(req, res) =>{
    const  {id} = req.params;
    const user = req.user;
  
 

    try{
        const cartItem = await Cart.findByIdAndUpdate({_id: id}, req.body, {new: true});

        if(!cartItem) return res.status(404).json({ message: "Failed to update item" });

        return res.json({
            message: "Item updated successfully",
            cartItem
        })

    } catch(err){
        console.log(err)
    }
}   

export const removeFromCart = async(req, res) =>{
  const {id} = req.params;
  
  
  try{
    const deleted = await Cart.findByIdAndDelete({_id: id});

    if(!deleted) return res.status(500).json({message: "failed to delete cart item"})
 return res.json({ message: "Cart item deleted successfully" ,
deleted});

  }
  catch(err){
  console.log(err)
          res.status(500).json({ message: "Server error" });
  }
}; 
