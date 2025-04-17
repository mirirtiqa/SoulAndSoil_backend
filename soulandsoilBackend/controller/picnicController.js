import Picnic from "../model/picnicModel.js";

import mongoose from "mongoose";

export const getPicnics = async(req,res)=>{
    try{
      console.log("Getting picnics");
      const currentDate = new Date();
      const picnics = await Picnic.find(
        { date: { $gte: currentDate } },
        { reservations: 0, attendees: 0 }
      )
      console.log(picnics);
      if(!picnics){
        res.status(404).json({message:"No picnic found"})
      }  
      res.status(200).json(picnics);

    }
    catch(error){
      res.status(500).json({message:error.message})
    }
}

export const getPicnic = async(req,res)=>{
  try{
    console.log("Getting picnic");
    const {id} = req.params;
    
    const picnic = await Picnic.findById(id)
    console.log(picnic);
    if(!picnic){
      res.status(404).json({message:"No picnic found"})
    }  
    res.status(200).json(picnic);

  }
  catch(error){
    res.status(500).json({message:error.message})
  }
}



export const addPicnic = async (req, res) => {
  try {
    if (!req.body.title || !req.body.date || !req.body.location || !req.body.description || !req.body.category) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const picnicData = {...req.body, reservations: [], attendees: []} 
    const newPicnic = new Picnic(picnicData);
    await newPicnic.save();
    res.status(201).json({ message: "Picnic added successfully", picnic: newPicnic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const addMultiplePicnics = async (req, res) => {
  try {
    const picnicData = req.body.map(picnic => ({...picnic, reservations: [], attendees: []}));
    const added = await Picnic.insertMany(picnicData);
    res.status(201).json({ message: "Picnics added", added });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deletePicnic = async (req, res) => {
  try {
    const result = await Picnic.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Picnic not found" });
    res.status(200).json({ message: "Picnic deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
