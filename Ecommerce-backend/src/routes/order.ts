import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { myOrders, newOrder } from "../controllers/order.js";

const app = express.Router();

//ROUTE - /api/v1/order/new
app.post("/new",newOrder );

//ROUTE - /api/v1/order/my/?userId=sampleId101
app.get("/my",myOrders);

export default app;