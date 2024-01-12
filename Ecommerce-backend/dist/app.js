import express from "express";
//IMPORTING ROUTES
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
var port = 4000;
var app = express();
connectDB();
//Always use middleware before calling routes
//use middleware so that whenever we give req.body it should accept all parameters in json format
app.use(express.json());
app.get("/", function (req, res) {
    res.send("API is Working with /api/v1");
});
//USING ROUTES
app.use("/api/v1/user", userRoute);
//always use custom error handler middleware after calling all routes.
//This middleware will be called when next() is called in APIs.
app.use(errorMiddleware);
app.listen(port, function () {
    console.log("Server is working on http://localhost:".concat(port));
});
