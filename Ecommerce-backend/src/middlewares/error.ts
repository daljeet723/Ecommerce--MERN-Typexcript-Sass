//CUSTOM ERROR HANDLER FILE

import { NextFunction, Request, Response } from "express";

export const errorMiddleware =(
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    //If some error msg is passed in API it will show that mesg else it will show
    //Internal server Error
    //err.message = error.message || ""
    err.message ||= "Internal Server Error";
    
    return res.status(400).json({
        success:false,
        message:err.message
    })
}