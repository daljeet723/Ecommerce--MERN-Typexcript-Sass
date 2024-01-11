import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect("mongodb://0.0.0.0:27017/Ecommerce_2024", {
        dbName: "Ecommerce_2024"
    }).then((c) => console.log(`Database connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
}