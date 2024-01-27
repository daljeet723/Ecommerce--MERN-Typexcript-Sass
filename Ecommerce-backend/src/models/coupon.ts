import mongoose from "mongoose";

const schema = new mongoose.Schema({
    coupon:{
        type:String,
        required:[true,"Please provide coupon code"],
        unique:true
    },
    amount:{
        type:Number,
        required:[true,"Please enter dicount amount"],
        
    }
})
export const coupon = mongoose.model("Coupon", schema)