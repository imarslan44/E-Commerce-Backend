import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) =>{
    const item = req.body;
    const user = req.user;

    if(!item) return console.log("no item selected")
 try{
       const cartItem =  await Cart.create({
        user: user._id, 
        item
       });

       if(!cartItem) return console.log("Failed to add item");

       res.json({
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
        const cartItems = await Cart.find({user:_id });

        if(!cartItems) return console.log("no items found in cart");

        return  res.json({message: "Cart items fetched successfully"});

    }catch(err){
        console.log(err)
    }
}

export const updateCartItem = (req, res) =>{
    res.send("Update cart item");
}   

export const removeFromCart = (req, res) =>{
    res.send("Remove from cart");
}   