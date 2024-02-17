import express from "express";
//IMPORTING ROUTES
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors"; //when using external api here using to sgn in through Google, permissio required hence using CORS
//call congif at top to access env variables
config({
    path: "./.env"
});
var port = process.env.PORT || 4000;
var app = express();
connectDB(process.env.MONGO_URI || "");
//stores cached data in the computer's RAM 
//When you create an instance of node-cache, 
//it initializes an in-memory cache within your Node.js application, 
//allowing you to store and retrieve data using keys.
export var myCache = new NodeCache();
//Always use middleware before calling routes
//use middleware so that whenever we give req.body it should accept all parameters in json format
app.use(express.json());
//gives API call information on console(status, runtime,..)
//The "dev" format is particularly useful during development and debugging.
app.use(morgan("dev"));
app.use(cors());
app.get("/", function (req, res) {
    res.send("API is Working with /api/v1");
});
//USING ROUTES
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
//to display images which are in uploads folder
app.use("/uploads", express.static("uploads"));
//always use custom error handler middleware after calling all routes.
//This middleware will be called when next() is called in APIs.
app.use(errorMiddleware);
app.listen(port, function () {
    console.log("Server is working on http://localhost:".concat(port));
});
