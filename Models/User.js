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
    Email: {
        type: String,
        required:[true,"Email is required"],
        unique: true,
    },
    Password: {
        type: String,
        required:[true,"Password is required"]
    },
    ProfilePicture:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
      },
    Role: {
        type: String,
        require:[false,"Customer"]
    },
},{timestamps:true})

const userRole = mongoose.model('User',UserSchema)

export default userRole;