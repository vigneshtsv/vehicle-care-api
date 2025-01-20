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

import userRole from "../Models/User.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../Utils/jsonWebToken.js";

export const registerUser = async (req, res, next) => {
  try {
    let {
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      Password,
      ConfirmPassword,
      Address,
      AadharCard,
      DrivingLicence,
      PetrolStationCertification,
      MechanicCertificate,
      CurrentPhoto,
      Role,
    } = req.body;
    const existingUser = await userRole.findOne({ Email: Email });

    if (existingUser) {
      return res.status(400).json({ message: `${Email} Already Exists` });
    }

    Password = bcryptjs.hashSync(Password, 10);
    const userData = new userRole({
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      Password,
      ConfirmPassword,
      Address,
      AadharCard,
      DrivingLicence,
      PetrolStationCertification,
      MechanicCertificate,
      CurrentPhoto,
      Role,
    });

    await userData.save();
    const jwt = generateToken(userData._id);

    res.status(200).json({
      message: "Registration Successful",
      token: jwt,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to register User.  Please try again." });
  }
};

export const loginUser = async (req, res) => {
  try {
    let { Email, Password } = req.body;
    let user = await userRole.findOne({ Email: Email });
    if (!user) {
      return res.status(404).json({ message: `User Not Found` });
    }
    const isPasswordValid = bcryptjs.compareSync(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const jwt = generateToken(user._id);
    user.Password = null;

    res
      .status(200)
      .json({ message: "Login Successfully", data: user, token: jwt });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: `Failed to Login user.  Please try again.` });
  }
};

export const getMapBox = async (req, res) => {
  let { lat, lng } = req.body;
  const accessToken = "";
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/gas%20station.json?proximity=${lng},${lat}&limit=10&access_token=${accessToken}`
  )
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json(error));
};

export const getGoogleMap = async (req,res) => {
  let { location, radius, type } = req.query;
  //const APIKEY = AIzaSyD4HjB6WiBhpuZPV9qMrPVVn7e982UOTQ4
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${APIKEY}`;
    try {
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}