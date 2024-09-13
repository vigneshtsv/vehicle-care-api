import userRole from "../Models/User.js";


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

 //get the current user
export const currentUser = async (req,res) => {
    try {
        let currentuser = await userRole.findById({_id : req.params.userId})
        res.status(200).send({
            currentuser
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal error in fetching Users List"
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
 
 