import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import Picnic from "../model/picnicModel.js"
import { addMultiplePicnics } from "../controller/picnicController.js"


const app = express()
app.use(cors())

app.use(express.json())


dotenv.config();
const PORT =  5000;
const MONGOURL = "mongodb+srv://irtiqaschildhood:kPJ7QmE2PJ7f98FU@cluster0.8myewks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGOURL).then(()=>{
    console.log("Successfully connected to db")
    app.listen(PORT,()=>{
        console.log(`Server is running on pt ${PORT}`)
    })

}).catch((error)=>{
    console.log(error)
});

export const picnics = [
    {
      title: "Crochet by the Lake",
      date: "April 28, 2025",
      image: "/images/images.jpg",
      description: "Join us for a peaceful picnic by the lake with crochet and chai.",
      category: "Pottery",
      availableSpots: "3",
      location: "Lakeview Park",
    },
    {
      title: "Crochet by the Lake",
      date: "April 28, 2025",
      image: "/images/images.jpg",
      description: "Join us for a peaceful picnic by the lake with crochet and chai.",
      category: "Crochet",
      availableSpots: "3",
      location: "Lakeview Park",
    },
    {
      title: "Crochet by the Lake",
      date: "April 28, 2025",
      image: "/images/images.jpg",
      description: "Join us for a peaceful picnic by the lake with crochet and chai.",
      category: "Writing",
      availableSpots: "3",
      location: "Lakeview Park",
    },
    {
      title: "Crochet by the Lake",
      date: "April 28, 2025",
      image: "/images/images.jpg",
      description: "Join us for a peaceful picnic by the lake with crochet and chai.",
      category: "Crochet",
      availableSpots: "3",
      location: "Lakeview Park",
    },
    {
      title: "Crochet by the Lake",
      date: "April 28, 2025",
      image: "/images/images.jpg",
      description: "Join us for a peaceful picnic by the lake with crochet and chai.",
      category: "Crochet",
      availableSpots: "3",
      location: "Lakeview Park",
    },
    {
      title: "Crochet by the Lake",
      date: "April 28, 2025",
      image: "/images/images.jpg",
      description: "Join us for a peaceful picnic by the lake with crochet and chai.",
      category: "Reading",
      availableSpots: "3",
      location: "Lakeview Park",
    },
   
    
  ];

  const addPicnics = async () => {
    try {
        const picnicData = picnics.map(picnic => {
            if (!picnic.title || !picnic.date || !picnic.location || !picnic.description || !picnic.category) {
                console.log("All fields are required");
            }
            return ({...picnic, reservations: [], attendees: []})});
        const added = await Picnic.insertMany(picnicData);
        console.log("Picnics added successfully");
      } catch (error) {
        console.error("Error adding picnics:", error);
      }

  }


addPicnics();
