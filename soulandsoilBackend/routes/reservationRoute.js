import express from "express"
import {reserveSpot} from "../controller/reservationController.js"


const reservationRoute = express.Router();
reservationRoute.post("/reservespot",reserveSpot);

export default reservationRoute;