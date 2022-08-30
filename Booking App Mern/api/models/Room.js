import mongoose from "mongoose";
import  Schema  from "mongoose";


const RoomSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true 
    },
    desc:{
        type:String,
        required:true
    },
    // {number:101,unavailableDates[01.05.2022,02,05.2022]},
    // {number:102,unavailableDates[]},
    // {number:103,unavailableDates[]},
    // {number:104,unavailableDates[]}
    roomNumbers:[{number:Number,unavailableDates:{type:[Date]}}]
    ,
    

},{timestamps:true})

export default mongoose.model("Room",RoomSchema)