import {v2 as cloudinary} from 'cloudinary'
import { CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY, CLOUDINARY_NAME } from './env.js';

const connectCloudinary = async ()=>{

    cloudinary.config({
        cloud_name: CLOUDINARY_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_SECRET_KEY

    })
    console.log("Cloudinary connected successfully");
}

export default connectCloudinary;