import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { newOrderRequestBody } from "../types/product.js";

export const newOrder = TryCatch(async(
    req:Request<{},{},newOrderRequestBody>,
    res:Response,
    next:NextFunction)=>{
        
})