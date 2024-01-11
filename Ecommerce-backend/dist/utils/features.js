import mongoose from "mongoose";
export var connectDB = function () {
    mongoose.connect("mongodb://0.0.0.0:27017/Ecommerce_2024", {
        dbName: "Ecommerce_2024"
    }).then(function (c) { return console.log("Database connected to ".concat(c.connection.host)); })
        .catch(function (e) { return console.log(e); });
};
