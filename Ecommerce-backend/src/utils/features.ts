import mongoose from "mongoose";
import { invalidateCacheProp, orderItemsType } from "../types/product.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { error } from "console";
import { Order } from "../models/order.js";

export const connectDB = (uri: string) => {
    mongoose.connect(uri, {
        dbName: "Ecommerce_2024"
    }).then((c) => console.log(`Database connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
}

export const invalidateCache = async ({
    product, order, admin, userId, orderId, productId }: invalidateCacheProp) => {
    if (product) {

        //create array of all api for which caching is performed
        const productKeys: string[] =
            ["latest-product", "categories", "all-products"];

        //if there is change in single product
        if (typeof productId === "string") {
            productKeys.push(`product-${productId}`);
        }

        //if productId is in array, if any new order is placed
        if (typeof productId === "object") {
            productId.forEach((i) => productKeys.push(`product-${i}`))
        }

        myCache.del(productKeys)
    }

    if (order) {
        //create array for all keys for which caching is performed
        const orderKeys: string[] =
            ["all-orders", `my-orders-${userId}`, `order-${orderId}`];

        myCache.del(orderKeys)
    }

    if (admin) { }
}

export const reduceStock = async (orderItems: orderItemsType[]) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product) {
            throw new Error("Product not found");
        }
        product.stock -= order.quantity;

        await product.save();
    }
}