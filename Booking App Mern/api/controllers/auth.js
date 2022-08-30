import User from "../models/User.js"
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export  const register = async(req,res,next)=>{
    try {
        // if(req.body.confirmPassword !==req.body.password  ){
        //     return next(createError(400,"Wrong password and confirm are not the same"))
        // }
        
        
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        const user = new User({
            ...req.body,
            password:hash
        })
        await user.save()
        res.status(200).send("user has been saved")
    } catch (error) {
        next(error)
    }
}
export const login = async(req,res,next)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user)return next(createError(404,"user not found"))
        const isCorrectPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrectPassword) return next(createError(400,"Wrong password or username"))

        const token = jwt.sign({id:user.id,isAdmin:user.isAdmin}, process.env.JWT)
        //console.log(token)

        const {password,isAdmin , ...otherDetails} = user._doc
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json({details:{...otherDetails},isAdmin})
    } catch (error) {
        next(error)
    }
}