import Picnic from "../model/picnicModel.js";
import User from "../model/userModel.js";

import mongoose from "mongoose";


export const reserveSpot = async(req,res)=>{
    const session = await mongoose.startSession();

    try{
            const {picnicId, userId} = req.body;

            const picnic = await Picnic.findById(picnicId);
            if(!picnic){
                throw new Error("Picnic not found")
            }
            const availableSpots = Number(picnic.availableSpots)-1;

            if(availableSpots < 0){
                throw new Error("No available spots")
            }


            //add the userid to the reservations for the picnic
            const updatedPicnic = await Picnic.findByIdAndUpdate(
                picnicId,
                { $push: { reservations: userId }, availableSpots: availableSpots },
                { new: true}
            );

            if(!updatedPicnic){
                throw new Error("Spot could not be reseved")
            }

            //add the picnic details to users currentReservation record:
            const picnicDetails = {
                picnicId: picnicId,
                title: picnic.title,
                location: picnic.location,
                date: picnic.date,
                category: picnic.category,
            }

            const updatedUser= await User.findByIdAndUpdate(
                userId,
                { $push: { currentReservations: picnicDetails } },
                { new: true} );
            
            if (!updatedUser) {
                    throw new Error('User not found'); 
                    }
        
            res.status(200).json({picnicDetails,updatedUser})




      
    
    }
    catch(error){
        res.status(500).json({error:`reservation failed: ${error.message}`})
    }
}