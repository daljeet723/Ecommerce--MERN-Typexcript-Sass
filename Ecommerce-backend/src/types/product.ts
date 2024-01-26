import { NextFunction, Request, Response } from "express";

export interface newProductRequestBody {
    name: string,
    price: number,
    stock: number,
    category: string
}

//controllerType is a function that takes req, res, and next, 
//and returns a Promise that resolves to either void or a Response with some data.
export type controllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>

export type searchProductQuery = {
    search?: string,//optional parameter
    price?: string, //optional parameter
    category?: string,//optional parameter
    sort?: string,//optional parameter
    page?: string,//optional parameter

}

export interface baseQueryType {
    name?: {
        $regex: string,
        $options: string
    };
    price?: { $lte: number };
    category?: string

}

export type invalidateCacheProp = {
    product?: boolean,
    order?: boolean,
    admin?: boolean,
    userId?: string,
    orderId?: string,
    productId?: string | string[],

}

export type shippigInfoType = {
    address: string,
    city: string,
    state: string,
    country: string,
    pinCode: string
}

export type orderItemsType = {
    name: string,
    photo: string,
    price: number,
    quantity: number,
    productId: string
}
export interface newOrderRequestBody {
    shippingInfo: shippigInfoType,
    user: string,
    subTotal: Number,
    tax: Number,
    discount: Number,
    shippingCharges: Number,
    total: Number,
    orderItems: orderItemsType[]// array of orderItmsType


}