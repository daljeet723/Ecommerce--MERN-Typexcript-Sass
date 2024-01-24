import mongoose from "mongoose";
import { invalidateCacheProp, orderItemsType } from "../types/product.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { error } from "console";

export const connectDB = (uri:string) => {
    mongoose.connect(uri, {
        dbName: "Ecommerce_2024"
    }).then((c) => console.log(`Database connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
}

export const invalidateCache =async ({product, order, admin}: invalidateCacheProp)=>{
    if(product){

        //create array of all api for which caching is performed
        const productKeys: string[] = ["latest-product","categories", "all-products"];

        //get all id from products db
        const products = await Product.find({}).select("_id");

        //get all id from products and push them in array for getSingleProduct API
        products.forEach(idx => {
            productKeys.push(`product-${idx._id}`);
        });
        myCache.del(productKeys)
    }
    if(order){}
    if(admin){}
}

export const reduceStock=async (orderItems:orderItemsType[])=>{
    for(let i=0;i<orderItems.length;i++){
        const order= orderItems[i];
        const product = await Product.findById(order.productId);
        if(!product){
            throw new Error("Product not found");
        }
        product.stock -= order.quantity;

        await product.save();
    }
}