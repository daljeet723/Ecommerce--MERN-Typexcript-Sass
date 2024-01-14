import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const isAdmin = TryCatch( async( req, res, next)=>{
    const {id} = req.query;

    if(!id){
        return next(new ErrorHandler("Please login to access this resource",401));
    }

    const user = await User.findById(id);

    if(!user){
        return next(new ErrorHandler("Cannot find user",401));
    }

    if(user.role !== "admin"){
        return next(new ErrorHandler("You don't have permission to access this resource",401))
    }


    //if above conditions fails i.e find user with admin role
    // call next api that is passed in route (getAllUser)
    //app.get(isAdmin, getAllUser)
    next();
})