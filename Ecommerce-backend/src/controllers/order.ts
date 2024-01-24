import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { newOrderRequestBody } from "../types/product.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";

export const newOrder = TryCatch(async (
    req: Request<{}, {}, newOrderRequestBody>,
    res: Response,
    next: NextFunction) => {

    const { shippingInfo, orderItems,
        user, subTotal, tax, discount, shippingCharges, total } = req.body;

    const order = await Order.create({
        shippingInfo, orderItems,
        user, subTotal, tax, discount, shippingCharges, total
    });

    if (!shippingInfo || !orderItems || !user || !subTotal || !tax || !total)
    return next(new ErrorHandler("Please Enter All Fields", 400));

    //await reduceStock() as it returns promise, so await is required
    await reduceStock(orderItems);//function in utils/features.ts

    //it will refresh cache as product & order db is updated
    await invalidateCache({ product: true, order:true, admin:  true });

    return res.status(201).json({
        success:true, 
        message:"Order placed successfully!!"
    })
})