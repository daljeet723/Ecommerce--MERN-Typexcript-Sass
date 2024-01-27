import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { allCoupons, applyDiscount, deleteCoupon, newCoupon } from "../controllers/payment.js";
import { isAscii } from "buffer";

const app = express.Router();

//ROUTE: /api/v1/payment/coupon/new
app.post("/coupon/new", isAdmin, newCoupon);

//ROUTE: /api/v1/payment/discount   
app.get("/discount", applyDiscount);

//ROUTE: /api/v1/payment/coupon/all
app.get("/coupon/all", isAdmin, allCoupons);

//ROUTE: /api/v1/payment/coupon/id
app.delete("/coupon/:id", isAdmin, deleteCoupon);

export default app;