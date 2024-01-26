import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { newOrderRequestBody } from "../types/product.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";

export const newOrder = TryCatch(async (
    req: Request<{}, {}, newOrderRequestBody>,
    res: Response,
    next: NextFunction) => {

    const { shippingInfo, orderItems,
        user, subTotal, tax, discount, shippingCharges, total } = req.body;

    if (!shippingInfo || !orderItems || !user || !subTotal || !tax || !total || !discount || !shippingCharges) {
        return next(new ErrorHandler("Please Enter All Fields", 400));
    }

    const order = await Order.create({
        shippingInfo, orderItems,
        user, subTotal, tax, discount, shippingCharges, total
    });

    //await reduceStock() as it returns promise, so await is required
    await reduceStock(orderItems);//function in utils/features.ts

    //it will refresh cache as product & order db is updated
    await invalidateCache({ product: true, order: true, admin: true });

    return res.status(201).json({
        success: true,
        message: "Order placed successfully!!"
    })
});

export const myOrders = TryCatch(async (req, res, next) => {
    const { userId } = req.query;
    const key = `my-orders-${userId}`;
    let orders = [];

    if (myCache.has(key)) {
        orders = JSON.parse(myCache.get(key) as string)
    }
    else {
        orders = await Order.find({ user: userId });
        myCache.set(key, JSON.stringify(orders))
    }

    return res.status(200).json({
        success:true,
        orders
    })
})