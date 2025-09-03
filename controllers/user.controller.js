import  userModel from '../models/userModel.js'
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD} from '../config/env.js'


//Function to create Token
const createToken = (id)=>{
 return jwt.sign({userID:id}, JWT_SECRET);
}


//Route for login
export const loginUser = async(req, res)=>{
   try{
    const  {email, password} = req.body;
    //validate request data
    if(!validator.isEmail(email)){
      return res.json({success: false, message: "Email is invalid"});
    }
    if(password.length < 6){
      return res.json({success: false, message: "Password must be 6 characters long"});
    }
    const user = await userModel.findOne({email});
    //if user exists or not
    if(!user){
      return res.json({success: false, message: "User not found"})
    }
    const decoded = await bcrypt.compare(password, user.password);

    if(!decoded){
   return res.status(400).json({success: false, message: "Password is incorrect"})
    }

   const token = createToken(user._id);
  const {password :pwd, ...userWithOutPassword} = user._doc;
   return res.json({success: true, token, user: userWithOutPassword})



   }catch(error){
    console.log(error)
    return res.json({success: false, message: error.message})

   }
}

// Rout for use registration
export const registerUser = async (req, res)=>{

  try{
    const {name, email, password} = req.body;

    //checking user already exists or not
    let userExist = await userModel.findOne({email});
    if(userExist){
     

      return res.status(409).json({success: false, message: "User already exists"})
      
  
    }


    //validator email formate & strong password
    if(!validator.isEmail(email)){
       return res.json({success: false, message: "Pleas enter a valid email"})
    }
    if(password.length < 6){
       return res.status(409).json({success: false, message: "Password must be more than 6  characters"})
    }

    //hashing password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser =  new userModel({
      name,
      email,
      password: hashedPassword
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    return res.json({success: true, token:token, user: user})
 
  }catch(error){
    console.log(error)
    return res.json({success:false, msg: error.message} )
  }
}

//Route for adminLogin
export const adminLogin = async (req, res)=>{
   console.log("Admin login request received");
  try{
    const {email, password} = req.body;

    //validate request data
    if(!validator.isEmail(email)){
      return res.json({success: false, message: "Email is invalid"});
    }


   
    if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
      const token = jwt.sign({email, password}, JWT_SECRET);
      res.json({success: true, token});
    }else{
      res.json({success: false, message: "Invalid credentials"})
    }


   } catch(error){
    console.log(error)
    return res.json({success: false, message: error.message} )
   }
}