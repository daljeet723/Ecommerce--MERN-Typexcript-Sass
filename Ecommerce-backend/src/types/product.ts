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