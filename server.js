import express from "express"
import cors from 'cors'

import connectCloudinary from "./config/cloudinary.js"
import connectToDb from "./config/mongodb.js"
import { PORT } from "./config/env.js"
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
//App Config
const app = express() 
connectCloudinary()


//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)

const port = PORT || 4000
app.get("/",(req, res)=>{
    res.send("server is running")
})


app.listen(port, ()=>{
    console.log('server is running on http://localhost:'+port)
    connectToDb();
})