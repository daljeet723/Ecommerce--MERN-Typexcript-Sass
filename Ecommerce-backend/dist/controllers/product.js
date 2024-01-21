var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";
// Revalidate on New,Update,Delete Product & on New Order
export var getLatestProduct = TryCatch(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!myCache.has("latest-product")) return [3 /*break*/, 1];
                products = JSON.parse(myCache.get("latest-product"));
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, Product.find({}).sort({ createdAt: -1 }).limit(5)];
            case 2:
                //get all prodcuts and sort them in desc order according to created time
                //createdAt: -1 indicates desc order
                products = _a.sent();
                //store products in cache
                myCache.set("latest-product", JSON.stringify(products));
                _a.label = 3;
            case 3: return [2 /*return*/, res.status(200).json({
                    success: true,
                    products: products
                })];
        }
    });
}); });
// Revalidate on New,Update,Delete Product & on New Order
export var getAllCategories = TryCatch(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!myCache.has("categories")) return [3 /*break*/, 1];
                categories = JSON.parse(myCache.get("categories"));
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, Product.distinct("category")];
            case 2:
                categories = _a.sent();
                myCache.set("categories", JSON.stringify(categories));
                _a.label = 3;
            case 3: return [2 /*return*/, res.status(200).json({
                    success: true,
                    categories: categories
                })];
        }
    });
}); });
// Revalidate on New,Update,Delete Product & on New Order
export var getAdminProducts = TryCatch(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!myCache.has("all-products")) return [3 /*break*/, 1];
                products = JSON.parse(myCache.get("all-products"));
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, Product.find({})];
            case 2:
                products = _a.sent();
                myCache.set("all-products", JSON.stringify(products));
                _a.label = 3;
            case 3: return [2 /*return*/, res.status(200).json({
                    success: true,
                    products: products
                })];
        }
    });
}); });
export var getSingleProduct = TryCatch(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var product, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!myCache.has("product-".concat(id))) return [3 /*break*/, 1];
                product = JSON.parse(myCache.get("product-".concat(id)));
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, Product.findById(id)];
            case 2:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, next(new ErrorHandler("Product not found", 404))];
                }
                myCache.set("product-".concat(id), JSON.stringify(product));
                _a.label = 3;
            case 3: return [2 /*return*/, res.status(200).json({
                    success: true,
                    product: product
                })];
        }
    });
}); });
export var addProduct = TryCatch(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, stock, category, photo;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, price = _a.price, stock = _a.stock, category = _a.category;
                photo = req.file;
                if (!photo) {
                    return [2 /*return*/, next(new ErrorHandler("Please add photo!!", 400))];
                }
                if (!name || !price || !stock || !category) {
                    //when user second time upload all missing details, 
                    //photo will agin be uploaded so delete it to avoid duplicasy
                    rm(photo.path, function () {
                        console.log("Photo deleted");
                    });
                    return [2 /*return*/, next(new ErrorHandler("All fields are mandatory!!", 400))];
                }
                return [4 /*yield*/, Product.create({
                        name: name,
                        price: price,
                        stock: stock,
                        category: category.toLowerCase(),
                        photo: photo.path
                    })];
            case 1:
                _b.sent();
                //whenevr new product created refresh/ delete the  products in cache
                return [4 /*yield*/, invalidateCache({ product: true })];
            case 2:
                //whenevr new product created refresh/ delete the  products in cache
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        message: "Product created successfully"
                    })];
        }
    });
}); });
export var updateProduct = TryCatch(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, price, stock, category, photo, product;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, price = _a.price, stock = _a.stock, category = _a.category;
                photo = req.file;
                return [4 /*yield*/, Product.findById(id)];
            case 1:
                product = _b.sent();
                if (!product) {
                    return [2 /*return*/, next(new ErrorHandler("Product not found", 404))];
                }
                //if photo uploaded
                if (photo) {
                    //delete old existing photo from database
                    rm(product.photo, function () {
                        console.log("Old existing photo deleted");
                    });
                    product.photo = photo.path;
                }
                if (name)
                    product.name = name;
                if (price)
                    product.price = price;
                if (stock)
                    product.stock = stock;
                if (category)
                    product.category = category;
                return [4 /*yield*/, product.save()];
            case 2:
                _b.sent();
                //whenevr product is updated refresh/ delete the  products in cache
                return [4 /*yield*/, invalidateCache({ product: true })];
            case 3:
                //whenevr product is updated refresh/ delete the  products in cache
                _b.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Product details updated successfully"
                    })];
        }
    });
}); });
export var deleteProduct = TryCatch(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.findById(req.params.id)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, next(new ErrorHandler("Product not found", 404))];
                }
                rm(product.photo, function () {
                    console.log("Old existing photo deleted");
                });
                return [4 /*yield*/, product.deleteOne()];
            case 2:
                _a.sent();
                //whenevr product is deleted refresh/ delete the  products in cache
                return [4 /*yield*/, invalidateCache({ product: true })];
            case 3:
                //whenevr product is deleted refresh/ delete the  products in cache
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: "Product deleted successfully"
                    })];
        }
    });
}); });
export var searchProducts = TryCatch(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, search, price, category, sort, page, limit, skipPages, baseQuery, productsPromise, _b, products, filteredProducts, totalPage;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, search = _a.search, price = _a.price, category = _a.category, sort = _a.sort;
                page = Number(req.query.page) || 1;
                limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
                skipPages = limit * (page - 1);
                baseQuery = {};
                //if user searches product
                if (search) {
                    baseQuery.name = {
                        $regex: search,
                        $options: "i" //case-insensitive
                    };
                }
                //if user gives price filter
                if (price) {
                    baseQuery.price = {
                        //display products whose price <= filter price
                        $lte: Number(price)
                    };
                }
                //if user filter prodcuts based on category
                if (category) {
                    baseQuery.category = category;
                }
                productsPromise = Product.find(baseQuery)
                    .sort(sort && { price: sort === "asc" ? 1 : -1 })
                    .limit(limit)
                    .skip(skipPages);
                return [4 /*yield*/, Promise.all([
                        productsPromise,
                        Product.find(baseQuery) //filtered prodcuts
                    ])];
            case 1:
                _b = _c.sent(), products = _b[0], filteredProducts = _b[1];
                totalPage = Math.ceil(filteredProducts.length / limit);
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        products: products,
                        totalPage: totalPage
                    })];
        }
    });
}); });
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
