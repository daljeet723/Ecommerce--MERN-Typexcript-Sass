import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { allOrders, myOrders, newOrder } from "../controllers/order.js";

const app = express.Router();

//ROUTE - /api/v1/order/new
app.post("/new",newOrder );

//ROUTE - /api/v1/order/my/?userId=sampleId101
app.get("/my",myOrders);

//ROUTE - /api/v1/order/all   --- adminOnly
app.get("/all", isAdmin, allOrders);

export default app;