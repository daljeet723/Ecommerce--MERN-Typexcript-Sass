import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { newProductRequestBody } from "../types/product.js";
import { rm } from "fs";

export const addProduct = TryCatch(async (
    req: Request<{}, {}, newProductRequestBody>,
    res: Response,
    next: NextFunction) => {

    const { name, price, stock, category } = req.body;

    const photo = req.file;

    if (!photo) {
        return next(new ErrorHandler("Please add photo!!", 400))
    }

    if (!name || !price || !stock || !category) {
        //when user second time upload all missing details, 
        //photo will agin be uploaded so delete it to avoid duplicasy
        rm(photo.path, () => {
            console.log("Photo deleted");
        });

        return next(new ErrorHandler("All fields are mandatory!!", 400))
    }

    await Product.create({
        name, price, stock, category: category.toLowerCase(),
        photo: photo.path
    });

    return res.status(201).json({
        success: true,
        message: "Product created successfully"
    })
})