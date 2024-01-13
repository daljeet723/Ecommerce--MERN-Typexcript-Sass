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
            const user = await User.create({
                name, email, photo, gender, dob:new Date(dob), _id
            });
    
            return res.status(200).json({
                success: true,
                message: `Welcome ${user.name}`
            });
    
    }
)
