// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//     FirstName: {
//         type: String,
//         required: true,
//     },
//     LastName: {
//         type: String,
//         required: true,
//     },
//     PhoneNumber: {
//         type: Number,
//         required: true,
//     },
//     Email: {
//         type: String,
//         required:[true,"Email is required"],
//         unique: true,
//     },
//     Password: {
//         type: String,
//         required:[true,"Password is required"]
//     },
//     ConfirmPassword: {
//         type: String,
//         required: [true, "Password is required"],
//     },
//     AadharCard:{
//         type:String,
//         default:" ",
//     },
//     DrivingLicence:{
//         type:String,
//         default:" ",
//     },
//     PetrolStationCertification:{
//         type:String,
//         default:" ",
//     },
//     CurrentPhoto:{
//         type:String,
//         default:"",
//     },
//     MechanicCertificate:{
//         type:String,
//         default:" ",
//     },
//     ProfilePicture:{
//         type: String,
//         default: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
//     },
//     StationName:{
//       type:String,
//       default:"",
//     },
//     Role: {
//         type: String,
//         enum: ['Admin', 'Customer', 'PetrolStation', 'DeliveryBoy', 'ServiceMan'],
//     },
// },{timestamps:true})


// const userRole = mongoose.model('userroles',UserSchema)

// export default userRole;



import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: Number,
        required: true,
    },
    Email: {
        type: String,
        required:[true,"Email is required"],
        unique: true,
    },
    Password: {
        type: String,
        required:[true,"Password is required"]
    },
    ConfirmPassword: {
        type: String,
        required: false,
    },
    Address: {
        type: String,
        required: false,
    },
    AadharCard:{
        data: Buffer,
        contentType: String,
    },
    DrivingLicence:{
        data: Buffer,
        contentType: String,
    },
    PetrolStationCertification:{
        data: Buffer,
        contentType: String,
    },
    // CurrentPhoto:{
    //     data: Buffer,
    //     contentType: String,
    // },
    MechanicCertificate:{
        data: Buffer,
        contentType: String,
    },
    ProfilePicture:{
        data: Buffer,
        contentType: String,
    },
    StationName:{
        type:String,
        contentType: String,
        
    },  
    Role: {
        type: String,
        enum: ['Admin', 'Customer', 'PetrolStation', 'DeliveryBoy', 'ServiceMan'],
    },
},{timestamps:true})


const userRole = mongoose.model('userroles',UserSchema)

export default userRole;