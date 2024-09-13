import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    currentUserId : {
        type : String,
        required : true
    },
    product : [
        {
            productId : String,
            productTittle : String,
            productQuantity : Number,
            productPrice : Number,
            productImage : String,
            productWeight : String,
        }
    ],
    amount : {
        type : Number,
        required : true
    },
    receipt : {
        type : String,
        required : true
    },
    currency : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    orderId : {
        type : String,
    },
    paymentId : {
        type : String,
    },
},
{ timestamps : true },
{ collection : 'orders' })

const orderData = mongoose.model('order',orderSchema)

export default orderData;