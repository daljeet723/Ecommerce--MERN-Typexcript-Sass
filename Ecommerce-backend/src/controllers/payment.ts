import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";

export const newCoupon = TryCatch(async(req, res, next)=>{
    const {coupon, amount} = req.body;

    if(!amount || !coupon){
        return next(new ErrorHandler("Plesae provide both coupon code and amount",400));
    }
    await Coupon.create({code: coupon, amount});

    return res.status(201).json({
        success:true, 
        message: `Coupon ${coupon} created successfully with discount Rs ${amount}`
    })

})