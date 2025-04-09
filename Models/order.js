import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
    },
    StationName: {
      type: String,
      required: false,
    },
    Location: {
      type: String,
      required: false,
    },
    Distance : {
      type: Number,
      require: false,
    },
    Petrol_Price: {
      type: Number,
      required: false,
    },
    Petrol_Quantity: {
      type: Number,
      required: false,
    },
    Disel_Price: {
      type: Number,
      required: false,
    },
    ServiceName: {
      type: Number,
      required: false,
    },
    Disel_Quantity: {
      type: Number,
      required: false,
    },
    Service_Type:{
      type: String,
      required: false,
    },
    Problem_Type:{
      type: String,
      required: false,
    },
    PhoneNumber:{
      type: Number,
      required: false,
    },
    Status: {
      type: String,
      required: true,
      enum: ["Waiting", "Processing", "Completed"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
  { collection: "orders" }
);

const orderData = mongoose.model('order',orderSchema)

export default orderData;