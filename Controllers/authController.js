// import userRole from '../Models/User.js'
// import bcryptjs from 'bcryptjs';
// import { generateToken } from '../Utils/jsonWebToken.js';


// export const registerUser = async (req,res,next) => {
//     try {
//         let { FirstName,LastName,Email,PhoneNumber,Password,ConfirmPassword,Address,AadharCard,Role } = req.body;
        
//         const existingUser = await userRole.findOne({ Email : Email }); //req.body.Email

//         if(existingUser) {
//             return res.status(400).json({message: `${Email} Already Exists`}); 
//         }

//         const hashedPassword = bcryptjs.hashSync(Password, 10);
//         console.log(hashedPassword);
        
//         const userData = new userRole({
//             FirstName,
//             LastName,
//             Email,
//             PhoneNumber,
//             Password:hashedPassword,
//             ConfirmPassword,
//             Address,
//             AadharCard,
//             Role,
//         });

//         await userData.save();
//         const token = generateToken(userData._id);

//         res.status(201).json({
//             message: "Registration Successful",
//             token,
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message: 'Failed to register User.  Please try again.'})   
//     }
// }

// export const loginUser = async (req,res) => {
//     try {
//         let { Email,Password } = req.body;
//         let user = await userRole.findOne({Email:Email}).select('+password');
//         if(!user) {
//             return res.status(404).json({message: `User Not Found`});
//         }
//         const isPasswordValid = bcryptjs.compareSync(Password,user.Password);
//         if(!isPasswordValid) {
//             return res.status(401).json({message: "Invalid Password"});
//         }
//         const jwt = generateToken(user._id);
//         user.Password = null;
        
//         res.status(200).json({message: 'Login Successfully',data:user, token:jwt,})
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message: `Failed to Login user.  Please try again.`});
//     }
//  }; 
   
 
 
import userRole from '../Models/User.js'
import bcryptjs from 'bcryptjs';
import { generateToken } from '../Utils/jsonWebToken.js';


export const registerUser = async (req,res,next) => {
    try {
        let { FirstName,LastName,Email,Password,Role } = req.body;
        const existingUser = await userRole.findOne({ Email : Email });

        if(existingUser) {
            return res.status(400).json({message: `${FirstName} Already Exists`}); 
        }

        Password = bcryptjs.hashSync(Password, 10);
        const userData = new userRole({
            FirstName,
            LastName,
            Email,
            Password,
            Role,
        });

        await userData.save();
        const jwt = generateToken(userData._id);

        res.status(200).json({
            message: "Registration Successful",
            token: jwt,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to register User.  Please try again.'})   
    }
}

export const loginUser = async (req,res) => {
    try {
        let { Email,Password } = req.body;
        let user = await userRole.findOne({Email:Email});
        if(!user) {
            return res.status(404).json({message: `User Not Found`});
        }
        const isPasswordValid = bcryptjs.compareSync(Password,user.Password);
        if(!isPasswordValid) {
            return res.status(401).json({message: "Invalid Password"});
        }
        const jwt = generateToken(user._id);
        user.Password = null;
        
        // if(user){
        //     if(await Auth.hashCompare(password,user.password)){
        //         let token = await Auth.createToken({
        //             Email,
        //             Role: user.Role,
        //             id: user._id
        //         })
        //     }
        // }

        res.status(200).json({message: 'Login Successfully',data:user, token:jwt,})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Failed to Login user.  Please try again.`});
    }
 }; 
   
 
 
 