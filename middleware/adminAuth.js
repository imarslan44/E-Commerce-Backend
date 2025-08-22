import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js";



const adminAuth = async (req, res, next)=>{
    try{
        const {token} = req.headers;
        if(!token) {
            return res.json({success: false, message: "not authorized login again"})
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log({"decoded":decoded})
        
        next()
    } catch (error){
        console.log(error);
        res.json({success: false, message: error.message})

    }
}

export default adminAuth