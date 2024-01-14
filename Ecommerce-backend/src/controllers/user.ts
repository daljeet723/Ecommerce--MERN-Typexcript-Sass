import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { newUserRequestBody } from "../types/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

//wrap the entire asynchronous function with TryCatch. 
//This means that any errors that occur within the function will be caught and handled by the TryCatch function.
export const addUser = TryCatch(
    async (
        req: Request<{}, {}, newUserRequestBody>,
        res: Response,
        next: NextFunction
    ) => {
        
            const { name, email, photo, gender, dob, _id } = req.body;

            let oldUser = await User.findById(_id);

            //if user already exists
            if(oldUser){
                return res.status(200).json({
                    success:true,
                    message:`Welcome back ${oldUser.name}`
                })
            }

            if(!_id || !name || !email || !photo || !gender || !dob){
                return next(new ErrorHandler("All fields are mandatory!!",400));
            }
            const user = await User.create({
                name, email, photo, gender, dob:new Date(dob), _id
            });
    
            return res.status(201).json({
                success: true,
                message: `Welcome ${user.name}`
            });
    }
)


//GET ALL USERS FOR ADMIN
export const getAllUsers = TryCatch(async(
    req,res,next
)=>{
    const users = await User.find();

    return res.status(200).json({
        success:true,
        users
    });
});

export const getUserById = TryCatch(async(req, res, next)=>{

    const id = req.params._id;
  
    const user = await User.findById(id);
    if(!user){
        return next(new ErrorHandler("Cannot find user",400));
    }

    return res.status(200).json({
        success:true,
        user
    })
});

//DELETE USER
export const deleteUserById = TryCatch(async(req, res, next)=>{

    const id = req.params._id;
    const user = await User.findById(id);

    if(!user){
        return next(new ErrorHandler("Cannot find user",400));
    }

    await user.deleteOne();

    return res.status(200).json({
        success:true,
        message:"User deleted succesfully"
    })
})