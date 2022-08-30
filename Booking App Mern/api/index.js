import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "./routes/auth.js"
import roomsRouter from "./routes/rooms.js"
import usersRouter from "./routes/users.js"
import hotelsRouter from "./routes/hotels.js"
import cookieParser from "cookie-parser"
const app = express()
dotenv.config()

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongoDb")
    } catch (error) {
        throw error
    }    
}
app.get('/',(req,res)=>{
    res.send("hello sheko")
})

// middleWare
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRouter)
app.use("/api/rooms",roomsRouter)
app.use("/api/hotels",hotelsRouter)
app.use("/api/users",usersRouter)

app.use((err,req,res,next)=>{
    const errorMessage = err.message || "something went wrong";
    const errorStatus = err.status || 500;
    //console.log(err.stack)
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})


mongoose.connection.on("connected" ,()=>{
    console.log("connected to mongoDb checking connection")
})
mongoose.connection.on("disconnected",()=>{
    console.log("disconnected to mongoDb checking connection")
})


app.listen(8800,()=>{
    connectDb( )
    console.log("connected to backend at port 8800")
})