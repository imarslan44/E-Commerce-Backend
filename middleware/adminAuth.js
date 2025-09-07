import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js";



const adminAuth = async (req, res, next)=>{
    try{
        // get token  from authorization  or header
        const token = req.headers.authorization?.split(" ")[1] || req.headers.token;


       
        if(!token) {
            return res.json({success: false, message: "not authorized login again"})
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        
       if(decoded.email !== process.env.ADMIN_EMAIL){
        return res.json({success: false, message: "not authorized to get all orders"});
       }
        
       req.user = decoded;
    
        
        next()
    } catch (error){
    
        console.log(error);
        res.json({success: false, message: error.message})

    }
}

export default adminAuth