import userRole from "../Models/User.js";
import bcryptjs from 'bcryptjs'

// export const registerUser = async (req,res,next) => {
//     try {
//         let { FirstName,LastName,Email,Password,Role } = req.body;
//         const existingUser = await userRole.findOne({ Email : Email });

//         if(existingUser) {
//             return res.status(400).json({message: `${FirstName} Already Exists`}); 
//         }

//         Password = bcryptjs.hashSync(Password, 10);
//         const userData = new userRole({
//             FirstName,
//             LastName,
//             Email,
//             Password,
//             Role,
//         });

//         const role = await userData.save();
//         const jwt = generateToken(role._id);

//         res.status(200).json({
//             message: "Registration Successful",
//             token: jwt,
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message: 'Failed to register User.  Please try again.'})   
//     }
// }

//write a LoginUser controller
//  export const loginUser = async (req,res) => {
//     try {
//         let { Email,Password } = req.body;
//         let user = await userRole.findOne({Email:Email});
//         if(!user) {
//             return res.status(404).json({message: `User Not Found`});
//         }
//         const isPasswordValid = bcryptjs.compareSync(Password,user.Password);
//         if(!isPasswordValid) {
//             return res.status(401).json({message: "Invalid Password"});
//         }
//         const jwt = generateToken(user._id);

//         res.status(200).json({message: 'Login Successfully',data:user, token:jwt})
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message: `Failed to Login user.  Please try again.`});
//     }
//  }

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