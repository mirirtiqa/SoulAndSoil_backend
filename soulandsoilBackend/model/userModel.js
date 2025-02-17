import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
            type: String,
            required: true
    },
    email:{
        type: String,
        required: true
    },
    currentAddress: String,
    age:String,
    token:{
        type: String,
        required: true
    },
    currentReservations:{
        type: Array
    },
    pastReservations:{
        type:Array
    }

})

export default mongoose.model("users",userSchema);