import mongoose from "mongoose"

const picnicSchema = new mongoose.Schema(
    {
        location: String,
        date: Date,
        availableSpots: String,
        reservations: [],
        attendees: [],
        headerPhoto: String,
        details:String,
    }
);

export default mongoose.model('Picnic',picnicSchema);