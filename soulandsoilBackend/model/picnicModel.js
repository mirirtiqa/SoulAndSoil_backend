import mongoose from "mongoose"

const picnicSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        category: String,
        location: String,
        date: Date,
        availableSpots: String,
        reservations: [],
        attendees: []
    }
);

export default mongoose.model('Picnic',picnicSchema);