import mongoose from "mongoose";

const petrolStationSchema = new mongoose.Schema(
    {
        StationName: {
            type: String,
            required: true,
        },
        Distance: {
            type: Number,
            required: true,
        },
        PetrolPrice: {
            type: Number,
            required: true,
        },
        DiselPrice: {
            type: Number,
            required: true,
        }
    },
);

const petrolStationData = mongoose.model('petrolStation', petrolStationSchema);

export default petrolStationData;