import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    Name : {
        type : String,
        required : true
    },
    Address : {
        type : String,
        required : true
    },
    latitude : {
        type : Number,
        required : true
    },
    longtitude : {
        type : Number,
        required : true
    },
    PetrolPrice : {
        type : Number,
        required : true
    },
    DiselPrice : {
        type : Number,
        required : true
    },
    Distance : {
        type : String,
        required : true
    },
    Services : {
        type : String,
        required : true
    },
    Specialization : {
        type : String,
        required : false
    }
},
{ timestamps : true },
{ collection : 'orders' })

const orderData = mongoose.model('order',orderSchema)

export default orderData;