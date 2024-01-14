import express from "express";
import { addUser, deleteUserById, getAllUsers, getUserById } from "../controllers/user.js";
var app = express.Router();
//ROUTE - /api/v1/user/new
app.post("/new", addUser);
//ROUTE - /api/v1/user/all
app.get("/all", getAllUsers);
//ROUTE - /api/v1/user/dynamic id
// app.get("/:_id",getUserById);
// app.delete("/:id",deleteUserById);
app.route("/:_id").get(getUserById).delete(deleteUserById);
export default app;
