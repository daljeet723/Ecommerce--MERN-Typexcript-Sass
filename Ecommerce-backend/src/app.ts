import express from "express";

//IMPORTING ROUTES
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";


const port = 4000;
const app = express();

connectDB();
//use middleware so that whenever we give req.body it should accept all parameters in json format
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is Working with /api/v1");
  });
  

//USING ROUTES
app.use("/api/v1/user",userRoute);

app.listen(port, ()=>{
    console.log(`Server is working on http://localhost:${port}`)
})
