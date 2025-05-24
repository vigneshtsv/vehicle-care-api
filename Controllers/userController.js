import userRole from "../Models/User.js";
import bcryptjs from 'bcryptjs'

 //User Logout
 export const logoutUser = async(req,res) => {
    try {
        const user = await userRole.findOne({_id : req.params.id})
        if(user) {
            let logout = await userRole.findOneAndUpdate({_id : req.params.id},{'$set': { isLoggedIn : false }},{new : true})
            res.status(200).send({
                message : 'Logged Out Successfully'
            })
        }
    } catch (error) {
        res.status(500).send({
            message : 'Internal server error in logging out'
        })
    }
 }


 //forgetPassword 
 export const forgetPassword = async (req,res) => {
    try {
        const user = await userRole.findOne({Email : req.body.email})
        if(user) {
            req.body.Password = await hash.createHash(req.body.password)
            let resetPwd = await userRole.updateOne({password : req.body.password})
            res.status(200).send({
                message : "Password updated successfully",
                resetPwd
            })
        }
     } catch (error) {
        res.status(500).send({
            message : 'Internal server error in fetching email'
        })
     }
 }
 
 export const updateUser = async(req,res,next) => {
    if(req.user.id != req.params.userId){
        return next(errorHandler(403,"Unauthorized access to update the user"))
    }
    if(req.body.password) {
        if(req.body.password.length < 6 ) {
            return next(errorHandler(400,"Password must be atleast 6 charactors"));
        }
    }
    if(req.body.FirstName) {
        if(req.body.FirstName.length < 7 || req.body.FirstName.length > 16) {
            return next(
                errorHandler(400,"Username must between 7 and 16 characters")
            );
        }
        if(req.body.FirstName.includes(" ")) {
            return next(errorHandler(400,"username must not contain spaces"));
        }
        if(req.body.FirstName !== req.body.FirstName.toLowerCase()) {
            return next(errorHandler(400, "Username must be lowercase"));
        }
        if(!req.body.FirstName.match(/^[A-Za-z0-9 ]+$/)) {
            return next (errorHandler(400, "Username can only contain latters and numbers")
            );
        }
    }

    try {
        const updateUser = await userRole.findByIdAndUpdate(req.params.userId,{
            $set:{
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Email: req.body.Email,
                Password: req.body.Password,
                ProfilePicture: req.body.ProfilePicture
            },
        },{
            new:true
        })
        const { Password,...rest } = updateUser._doc
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
 }

 export const deleteUser = async(req,res) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(403, 'You are not allowed to delete this user'));
    }
    try {
        await userRole.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully'});
    } catch (error) {
        next(error);        
    }
 }

 export const upload = async(req,res) => {
    const  { image } = req.body;
    console.log('Received image:',image);
    res.json({ message: 'Image uploaded successfully'});

 }

 //update Profile (DashboardProfile)

export const updateProfile = async (req, res) => {
    console.log("update profile called", req.body.FirstName)
 try {
    const { FirstName, Email, Password } = req.body;
    const ProfilePicture = req.body.ProfilePicture || '';
 
    if(!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    const user = await userRole.findById(req.user.id);

    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    if(Email && Email !== user.Email) {
        const existingUser = await userRole.findOne ({ Email,_id: {$ne: req.user.id } });
        if(existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
    }

    if (FirstName) user.FirstName = FirstName;
    if (Email) user.Email = Email;
    if (Password) {
        const salt = await bcryptjs.genSalt(10);
        user.Password = await bcryptjs.hash(Password,salt);
    }
    // console.log("pic", ProfilePicture)
    if (ProfilePicture) {
        user.ProfilePicture = ProfilePicture;
        // if (ProfilePicture.startsWith('data:image')) {
        //     const base64Data = ProfilePicture.split(',')[1];
        //     const sizeInBytes = Buffer.from(base64Data, 'base64').length;

        //     if (sizeInBytes > 2 * 1024 * 1024) { // 2MB limit
        //         return res.status(400).json({ message: 'Image size exceeds 2MB' });
        //     }
        //     user.ProfilePicture = ProfilePicture;
        // }else {
        //     return res.status(400).json({ message: 'Invalid image format' });   
        // }
    }

    await user.save();

    const updatedUser = {
        _id : user._id,
        Id: user._id,
        FirstName: user.FirstName,
        Email: user.Email,
        ProfilePicture: user.ProfilePicture,
        Password: user.Password,
    }
    res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser,
    });
 } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Internal server error',
         error: error.message });
 }  
} 
