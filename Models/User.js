import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: false,
    },
    LastName: {
        type: String,
        required: false,
    },
    PhoneNumber: {
        type: Number,
        required: false,
    },
    Email: {
        type: String,
        required:[false,"Email is required"],
        unique: true,
    },
    Password: {
        type: String,
        required:[false,"Password is required"]
    },
    ConfirmPassword: {
        type: String,
        required: false,
    },
    Address: {
        type: String,
        required: false,
    },
    EmployeeId: {
        type: String,
        required: false,
    },
    AadharCard:{
        type: String,
        required: false,
    },
    DrivingLicence:{
        type: String,
        required: false,
    },
    PetrolStationCertification:{
        type: String,
        required: false,
    },
    // CurrentPhoto:{
    //     data: Buffer,
    //     contentType: String,
    // },
    MechanicCertificate:{
        type: String,
        required: false,
    },
    ProfilePicture:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
        required: false,
    },
    StationName:{
        type:String,
        required: false,
    },  
    Role: {
        type: String,
        enum: ['Admin', 'Customer', 'PetrolStation', 'DeliveryBoy', 'ServiceMan'],
    },
},{timestamps:true})


const userRole = mongoose.model('userroles',UserSchema)

export default userRole;