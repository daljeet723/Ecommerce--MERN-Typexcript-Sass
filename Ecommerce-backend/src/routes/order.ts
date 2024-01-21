import express from "express";
import { isAdmin } from "../middlewares/auth.js";
import { newOrder } from "../controllers/order.js";

const app = express.Router();

//ROUTE - /api/v1/order/new
app.post("/new",newOrder );


export default app;