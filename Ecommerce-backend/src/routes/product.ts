import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { addProduct, deleteProduct, getAdminProducts, getAllCategories, getLatestProduct, getSingleProduct, searchProducts, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();


//instead of using raw, use form-data in req.body from postman
//as form-data will allow to upload images from system
//To Create New Product  - /api/v1/product/new
app.post("/new", singleUpload, addProduct);

//To get last 10 Products  - /api/v1/product/latest
app.get("/latest", getLatestProduct);

//To get all unique Categories  - /api/v1/product/categories
app.get("/categories", getAllCategories);

//To get all Products   - /api/v1/product/admin-products
app.get("/admin-products", getAdminProducts);

app.route("/:id")
    .get(getSingleProduct)
    .put(isAdmin, singleUpload, updateProduct)
    .delete(isAdmin, deleteProduct);

//To get all Products with filters  - /api/v1/product/search
app.get("/search",searchProducts);

export default app;