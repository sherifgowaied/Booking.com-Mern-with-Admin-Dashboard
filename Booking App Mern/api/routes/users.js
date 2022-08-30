import express from "express"
import { getUsers,updateUser,deleteUser,getUser } from "../controllers/user.js";
import {verifyAdmin, verifyToken , verifyUser}  from "../utils/verifyToken.js";

const router = express.Router();


// router.get("/checkAthentication",verifyToken,(req,res,next)=>{
//     res.send("you are logged in")
// })
// router.get("/checkuser/:id",verifyUser ,(req,res,next)=>{
//     res.send("you are logged in your account and can update and delete")
// })
// router.get("/checkadmin/:id",verifyAdmin ,(req,res,next)=>{
//     res.send("hello admin ,you are logged in your account and can update and delete all accounts" )
// })


//UPDATE
router.put("/:id",verifyUser,updateUser)
//DELETE
router.delete("/:id",verifyUser, deleteUser)
//GET
router.get("/:id",verifyUser,getUser)
//GETALL
router.get("/",verifyAdmin,getUsers)

export default router