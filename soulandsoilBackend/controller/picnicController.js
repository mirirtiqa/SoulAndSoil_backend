import Picnic from "../model/picnicModel.js";

import mongoose from "mongoose";

export const getPicnics = async(req,res)=>{
    try{
      const currentDate = new Date();
      const picnics = Picnic.find(
        { date: { $gte: currentDate } },
        { reservations: 0, attendees: 0 }
      )
      if(!picnics){
        res.status(404).json({message:"No picnic found"})
      }  

    }
    catch{

    }
}