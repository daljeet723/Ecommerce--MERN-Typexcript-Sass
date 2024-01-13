//CUSTOM ERROR HANDLER FILE

import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { controllerType } from "../types/user.js";

export const errorMiddleware = (
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    //If some error msg is passed in API it will show that mesg else it will show
    //Internal server Error
    //err.message = error.message || ""
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500

    return res.status(400).json({
        success: false,
        message: err.message
    })
};


//This is a higher-order function called TryCatch. 
//It takes another function func (assumed to be an asynchronous function) 
//and returns a new function that wraps the original function (func) in a try-catch block.
export const TryCatch = (func: controllerType) =>

    (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(func(req, res, next)).catch(next);
        //If an error occurs inside the original function, 
        //it's caught by the catch block, and the next function is called with the error.
    } 

    //Stp by step working in learning file