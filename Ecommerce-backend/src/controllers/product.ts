import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import {  baseQueryType, newProductRequestBody, searchProductQuery } from "../types/product.js";
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


export const getLatestProduct = TryCatch(async (req, res, next) => {

    //get all prodcuts and sort them in desc order according to created time
    //createdAt:-1 indicates desc order
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

    return res.status(200).json({
        success: true,
        products
    });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
    const categories = await Product.distinct("category")
    return res.status(200).json({
        success: true,
        categories
    });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
    const products = await Product.find({});

    return res.status(200).json({
        success: true,
        products
    });

});

export const getSingleProduct = TryCatch(async (req, res, next) => {

    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).json({
        success: true,
        product
    })
});

export const updateProduct = TryCatch(async (req, res, next) => {

    const {id} = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    const product = await Product.findById(id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    //if photo uploaded
    if (photo) {
        //delete old existing photo from database
        rm(product.photo!, () => {
            console.log("Old existing photo deleted");
        });
        product.photo = photo.path;
    }

    if(name) product.name = name;
    if(price) product.price = price;
    if(stock) product.stock = stock;
    if(category) product.category = category;

    await product.save();

    return res.status(200).json({
        success: true,
        message: "Product details updated successfully"
    })
});

export const deleteProduct = TryCatch(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    rm(product.photo!, () => {
        console.log("Old existing photo deleted");
    });
    await product.deleteOne()

    return res.status(200).json({
        success: true,
        message:"Product deleted successfully"
    });
});

export const searchProducts = TryCatch(async(
    req:Request<{},{},{},searchProductQuery>,
    res, next)=>{

    const {search, price, category, sort} = req.query;

    //if pagination provided show that page products else show 1st page 
    const page = Number(req.query.page)|| 1; //typecast page to Number

    //per page products limit
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    
    //skip previous pages. example at page 2 skip previous 8 pages
    const skipPages = limit * (page - 1);

    //give baseQuery structure in types file
    //mentioning in separate type file as all are optional parameters
    const baseQuery : baseQueryType={}; 
    
    //if user searches product
    if(search){
        baseQuery.name={
            $regex: search,
            options : "i" //case-insensitive
        }
    }

    //if user gives price filter
    if(price){
        baseQuery.price={
            //display products whose price <= filter price
            $lte: Number(price)

        }
    }
    
    //if user filter prodcuts based on category
    if(category){
        baseQuery.category= category
    }

    //sort && : if sort is selected
    // -1 indicates descending order
    const products = await Product.find(baseQuery).sort(
        sort && {price: sort ==="asc"?1 : -1}
    );


    return res.status(200).json({
        success: true,
       products
    })

})
