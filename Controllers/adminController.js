import userRole from "../Models/User.js"
import Error from '../Middleware/Error.js'

// get the allUsers
export const getAllUserData = async (req,res) => {
    const users = await userRole.find();
    res.status(200).json({
        users,
        message: 'fetch all userData'
    })
}

// get the UserById
export const getUserById = async (req,res,next) => {
   try {
    const user = await userRole.find({_id:req.params.id.trim()});

    if(!user) {     
        return next(new Error(`User not found with this id ${req.params.id}`,401))
    }
    res.status(200).json({
        success: true,
        user
    })
   } catch (error) {
    console.error(error);
   }
}


//get the userprofile
export const getUserProfile = async (req,res,next) => {
    const user = await userRole.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
}

//Update UserDetails
export const updateUser = async (req,res,next) => {
    const newUserData = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        PhoneNumber:req.body.PhoneNumber,
        Address: req.body.Address,
        Role: req.body.Role,
        ProfilePicture: req.body.ProfilePicture
    }

    const user = await userRole.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })
}

//Delete for UserDetails in only by admin
export const deleteUser = async (req,res,next) => {
    const user = await userRole.findById(req.params.id);
    if(!user) {
        return next(Error(`User not found with this id ${req.params.id}`))
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
    })
}


