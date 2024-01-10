import express from "express";
import { addUser } from "../controllers/user.js";
var app = express.Router();
//ROUTE - /api/v1/user/new
app.post("/new", addUser);
export default app;
