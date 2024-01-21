import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { baseQueryType, newProductRequestBody, searchProductQuery } from "../types/product.js";
import { rm } from "fs";
import { faker } from "@faker-js/faker";
import { myCache } from "../app.js";


// Revalidate on New,Update,Delete Product & on New Order
export const getLatestProduct = TryCatch(async (req, res, next) => {
    let products;
    //myCache instance holds the cached data in memory.
    if (myCache.has("latest-product")) {
        products = JSON.parse(myCache.get("latest-product") as string);
    }
    else {
        //get all prodcuts and sort them in desc order according to created time
        //createdAt: -1 indicates desc order
        products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

        //store products in cache
        myCache.set("latest-product", JSON.stringify(products));
    }


    return res.status(200).json({
        success: true,
        products
    });
});


// Revalidate on New,Update,Delete Product & on New Order
export const getAllCategories = TryCatch(async (req, res, next) => {
    let categories;

    if (myCache.has("categories")) {
        categories = JSON.parse(myCache.get("categories") as string);
    }
    else {
        categories = await Product.distinct("category");
        myCache.set("categories", JSON.stringify(categories));
    }

    return res.status(200).json({
        success: true,
        categories
    });
});


// Revalidate on New,Update,Delete Product & on New Order
export const getAdminProducts = TryCatch(async (req, res, next) => {
    let products;
    if (myCache.has("all-products")) {
        products = JSON.parse(myCache.get("all-products") as string);
    }
    else {
        products = await Product.find({});
        myCache.set("all-products", JSON.stringify(products));
    }

    return res.status(200).json({
        success: true,
        products
    });

});

export const getSingleProduct = TryCatch(async (req, res, next) => {
    let product;
    const id = req.params.id;
    if (myCache.has(`product-${id}`)) {
        product = JSON.parse(myCache.get(`product-${id}`) as string);
    }

    else {
        product = await Product.findById(id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }
        myCache.set(`product-${id}`, JSON.stringify(product));
    }


    return res.status(200).json({
        success: true,
        product
    });
});

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

export const updateProduct = TryCatch(async (req, res, next) => {

    const { id } = req.params;
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

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

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
        message: "Product deleted successfully"
    });
});

export const searchProducts = TryCatch(async (
    req: Request<{}, {}, {}, searchProductQuery>,
    res, next) => {

    // Extract query parameters from the request
    const { search, price, category, sort } = req.query;

    // Set up pagination parameters
    //if pagination provided show that page products else show 1st page 
    const page = Number(req.query.page) || 1; //typecast page to Number
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skipPages = limit * (page - 1);

    //give baseQuery structure in types file
    //mentioning in separate type file as all are optional parameters
    // Create a base query object
    const baseQuery: baseQueryType = {};

    //if user searches product
    if (search) {
        baseQuery.name = {
            $regex: search,
            $options: "i" //case-insensitive
        }
    }

    //if user gives price filter
    if (price) {
        baseQuery.price = {
            //display products whose price <= filter price
            $lte: Number(price)

        }
    }

    //if user filter prodcuts based on category
    if (category) {
        baseQuery.category = category
    }

    //sort && : if sort is selected
    // -1 indicates descending order
    //sort products
    const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skipPages);

    // Fetch both the paginated products and the total filtered products
    //***why promise.all is used: in learning.txt file */
    const [products, filteredProducts] = await Promise.all([
        productsPromise,
        Product.find(baseQuery)//filtered prodcuts
    ]);

    //ceil of 10.4 -> 10
    // Calculate the total number of pages based on the filtered products and the per-page limit
    const totalPage = Math.ceil(filteredProducts.length / limit);

    return res.status(200).json({
        success: true,
        products,
        totalPage
    });

});

// const generateRandomProducts = async (count: number = 10) => {
//   const products = [];

//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       photo: "uploads\\dca59fd0-d721-4463-87af-86beb6dd3902.jpg",
//       price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//       stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//       category: faker.commerce.department(),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };

//     products.push(product);
//   }

//   await Product.create(products);

//   console.log({ succecss: true });
// };
//uncomment below line whenever required to generate fake random products else comment it
//generateRandomProducts();

// const deleteRandomsProducts = async (count: number = 10) => {
//   const products = await Product.find({}).skip(3);

//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }

//   console.log({ succecss: true });
// };
//uncomment below line whenever required to delete fake random products else comment it
//deleteRandomsProducts(7);
