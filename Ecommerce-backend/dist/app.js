import express from "express";
//IMPORTING ROUTES
import userRoute from "./routes/user.js";
var port = 4000;
var app = express();
app.get("/", function (req, res) {
    res.send("API is Working with /api/v1");
});
//USING ROUTES
app.use("/api/v1/user", userRoute);
app.listen(port, function () {
    console.log("Server is working on http://localhost:".concat(port));
});
