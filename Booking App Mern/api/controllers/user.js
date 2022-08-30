import User from "../models/User.js"


export const deleteUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({sherif:user,message:"the hotel has been deleted"})
    }catch(error){
        next(error)
    }
}

export const getUser = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(error){
        next(error)
    }
}
export const updateUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{ $set:req.body},{new:true})
        res.status(200).json(user)
    }catch(error){
        next(error)
    }
}

export const getUsers = async(req,res,next)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(error){
        next(error)
    }
}