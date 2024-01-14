import express from "express";
import { addUser, deleteUserById, getAllUsers, getUserById } from "../controllers/user.js";
import { isAdmin } from "../middlewares/auth.js";

const app = express.Router();

//ROUTE - /api/v1/user/new
app.post("/new", addUser);

//ROUTE - /api/v1/user/all?id
//http://localhost:4000/api/v1/user/all?id=sampleId101
app.get("/all",isAdmin, getAllUsers);

//ROUTE - /api/v1/user/dynamic id
// app.get("/:_id",getUserById);
// app.delete("/:id",deleteUserById);

app.route("/:_id").get(getUserById).delete(isAdmin,deleteUserById);

export default app;