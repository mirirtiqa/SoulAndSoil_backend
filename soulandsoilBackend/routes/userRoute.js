import express from "express"

import {signin,login,getCurrentReservations,getDetails , getUserPastReservation} from "../controller/userController.js"
// import { authenticateToken } from "../middleware/authmiddleware.js";
const userRoute = express.Router(); 
userRoute.post("/signin",signin);
userRoute.post("/login",login);
userRoute.get("/getReservations/:userId",getCurrentReservations);
userRoute.get("/details/:userId",getDetails);
userRoute.get("/getpastReservations/:userId",getUserPastReservation);

export default userRoute;