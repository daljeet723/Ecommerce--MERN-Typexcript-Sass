import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { addProduct, getLatestProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
var app = express.Router();
//instead of using raw, use form-data in req.body from postman
//as form-data will allow to upload images from system
app.post("/new", isAdmin, singleUpload, addProduct);
app.get("/latest", getLatestProduct);
export default app;
