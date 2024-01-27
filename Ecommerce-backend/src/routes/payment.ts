import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { newCoupon } from "../controllers/payment.js";

const app = express.Router();

//ROUTE: /api/v1/payment/coupon/new
app.post("/coupon/new", newCoupon)
export default app;