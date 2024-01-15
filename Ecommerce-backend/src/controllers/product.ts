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
});


export const getLatestProduct = TryCatch(async(req,res,next)=>{

    //get all prodcuts and sort them in desc order according to created time
    //createdAt:-1 indicates desc order
    const products = await Product.find({}).sort({createdAt:-1}).limit(5);

    return res.status(200).json({
        success:true,
        products
    });
});

export const getAllCategories = TryCatch(async(req, res,next)=>{
    const categories = await Product.distinct("category")
    return res.status(200).json({
        success:true,
        categories
    });
});

export const getAdminProducts = TryCatch(async(req, res, next)=>{
    const products = await Product.find({});

    return res.status(200).json({
        success:true,
        products
    });

})