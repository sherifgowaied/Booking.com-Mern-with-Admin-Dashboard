import mongoose from "mongoose";
import Schema from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    country:{
        type:String,
        required:true,

    },
    city:{
        type:String,
        required:true,

    },
    img:{
        type:String,
        required:true

    },
    phone:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


export default mongoose.model("User",userSchema)