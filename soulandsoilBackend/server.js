import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

const app = express()

app.use(express.json())
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(()=>{
    console.log("Successfully connected to db")
    app.listen(PORT,()=>{
        console.log(`Server is running on pt ${PORT}`)
    })

}).catch((error)=>{
    console.log(error)
});

app.use("/api/user",userRoute);
app.use("/api/user/reserve",reservationRoute);
app.use("/api/admin",adminRoute);
app.use("/api/myreservations",picnicStatusRoute);
