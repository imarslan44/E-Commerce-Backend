import productModel from "../models/product.model.js";
import { CLOUDINARY_API_KEY } from "../config/env.js";
import {v2 as cloudinary} from 'cloudinary';
//funtion for add product
 export const addProdcut = async (req, res)=>{
   
    try{
        
      const {name, description, price, category, subCategory, sizes, bestSeller} = req.body

      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];

     
      
      const images = [image1, image2, image3, image4].filter(image => image !== undefined);


      let imagesUrl = await Promise.all(images.map(async (image)=>{
         let result = await cloudinary.uploader.upload(image.path, {resource_type: "image"});
         console.log(result);
         
         return result.secure_url; // or result.url
      }));
  
      const productData ={
         name,
         description,
         price : Number(price),
         category,
         subCategory,
         sizes : sizes.split(","), // Assuming sizes is a comma-separated string
         bestSeller : bestSeller === "true" ? true : false,
         images: imagesUrl,
         date: Date.now()

      }


      const newProduct = await productModel.create(productData);
      await newProduct.save();

      res.json({success: true, message: "Product added successfully", product: newProduct});

    } catch(error){
       // console.log(error)

     res.json({success: false, message: error.message})
    }
}

//function for list products
 export const getProductList = async (req, res)=>{
   try {
   //only get 20  products
      const products = await productModel.find().sort({date: -1}).limit(20);
      res.json({success: true, products});


   }catch(error){
      console.loog(error);
      res.json({success: false, message: error.message});
   }

}

//function for singel product info
 export const getProductInfo = async (req, res)=>{
    res.send("this route is working fine")
}

export const removeProduct = async (req, res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.id);
         res.json({success: true, message: "Product removed successfully"});
    } catch(error){
         console.log(error);
         res.json({success: false, message: error.message});
    }
}