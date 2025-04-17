import {getPicnics, getPicnic} from "../controller/picnicController.js"
import express from "express"

const picnicRoute = express.Router();
picnicRoute.get("/getpicnics",getPicnics);
picnicRoute.get("/getpicnic/:id",getPicnic);

export default picnicRoute;
