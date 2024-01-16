import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { addProduct, getAdminProducts, getAllCategories, getLatestProduct, getSingleProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
var app = express.Router();
//instead of using raw, use form-data in req.body from postman
//as form-data will allow to upload images from system
//To Create New Product  - /api/v1/product/new
app.post("/new", isAdmin, singleUpload, addProduct);
//To get last 10 Products  - /api/v1/product/latest
app.get("/latest", getLatestProduct);
//To get all unique Categories  - /api/v1/product/categories
app.get("/categories", getAllCategories);
//To get all Products   - /api/v1/product/admin-products
app.get("/admin-products", getAdminProducts);
app.route("/:id").get(getSingleProduct).put(singleUpload, updateProduct);
export default app;
