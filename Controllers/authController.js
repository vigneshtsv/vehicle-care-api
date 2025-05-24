import bcrypt from "bcryptjs";
import userRole from "../Models/User.js";
import multer from "multer";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware for handling image uploads (ProfilePicture, DrivingLicence, AadharCard, PetrolStationCertification, MechanicCertificate)
export const uploadMiddleware = upload.fields([
  { name: "ProfilePicture", maxCount: 1 },
  { name: "DrivingLicence", maxCount: 1 },
  { name: "AadharCard", maxCount: 1 },
  { name: "PetrolStationCertification", maxCount: 1 },
  { name: "MechanicCertificate", maxCount: 1 },
]);

// Function to handle user registration
// export const Register = async (req, res) => {
//   const {
//     FirstName,
//     LastName,
//     PhoneNumber,
//     Email,
//     Password,
//     ConfirmPassword,
//     Address,
//     StationName,
//     Role,
//     ProfilePicture,
//     AadharCard
//   } = req.body;
//   const files = req.files;
//   console.log(req.body);
//   console.log(req.files);
  
//   try {
//     // 1. Validate required fields
//     if (
//       !FirstName ||
//       !LastName ||
//       !PhoneNumber ||
//       !Email ||
//       !Password ||
//       !ConfirmPassword ||
//       !Role
//     ) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // 2. Check if passwords match
//     if (Password !== ConfirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     // 3. Check if user already exists
//     const existingUser = await userRole.findOne({ Email });
//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ message: "User already exists with this email" });
//     }
//   console.log(existingUser);
  
//     // 4. Hash the password
//     const hashedPassword = await bcrypt.hash(Password, 10);

//     // 5. Create new user object
//     const newUser = new userRole({
//       FirstName,
//       LastName,
//       PhoneNumber,
//       Email,
//       Password: hashedPassword,
//       ConfirmPassword,
//       Address,
//       StationName,
//       Role,
//       ProfilePicture,
//       AadharCard,
//     });

//     // 6. Assign files to respective fields
//     if (files) {
//       if (files.ProfilePicture) {
//         newUser.ProfilePicture = {
//           data: files.ProfilePicture[0].buffer,
//           contentType: files.ProfilePicture[0].mimetype,
//         };
//       }
//       if (files.DrivingLicence) {
//         newUser.DrivingLicence = {
//           data: files.DrivingLicence[0].buffer,
//           contentType: files.DrivingLicence[0].mimetype,
//         };
//       }
//       if (files.AadharCard) {
//         newUser.AadharCard = {
//           data: files.AadharCard[0].buffer,
//           contentType: files.AadharCard[0].mimetype,
//         };
//       }
//       if (files.PetrolStationCertification) {
//         newUser.PetrolStationCertification = {
//           data: files.PetrolStationCertification[0].buffer,
//           contentType: files.PetrolStationCertification[0].mimetype,
//         };
//       }
//       // if (files.CurrentPhoto) {
//       //   newUser.CurrentPhoto = {
//       //     data: files.CurrentPhoto[0].buffer,
//       //     contentType: files.CurrentPhoto[0].mimetype,
//       //   };
//       // }
//       if (files.MechanicCertificate) {
//         newUser.MechanicCertificate = {
//           data: files.MechanicCertificate[0].buffer,
//           contentType: files.MechanicCertificate[0].mimetype,
//         };
//       }
//     }

//     // 8. Save the new user to the database
//     const savedUser = await newUser.save();
//     console.log(savedUser);
    
//     const token = jwt.sign(
//       {
//         userId:savedUser._id,
//         Email: savedUser.Email,
//         Role: savedUser.Role
//       },
//       process.env.JWT_SECRET_KEY,{expiresIn: '24h'}
//     );
//     console.log(token);
    
//     // 9. Send success response
//     res.status(201).json({
//       message: "Registration successful",
//       token,
//       user: {
//         id: savedUser._id,
//         FirstName: savedUser.FirstName,
//         LastName: savedUser.LastName,
//         Email: savedUser.Email,
//         Address: savedUser.Address,
//         StationName: savedUser.StationName,
//         Role: savedUser.Role,
//         ProfilePicture: savedUser.ProfilePicture && savedUser.ProfilePicture.data
//           ? `data:${
//               savedUser.ProfilePicture.contentType
//             };base64,${savedUser.ProfilePicture.data.toString("base64")}`
//           : null,
//         AadharCard: savedUser.AadharCard && savedUser.AadharCard.data
//           ? `data:${
//               savedUser.AadharCard.contentType
//             };base64,${savedUser.AadharCard.data.toString("base64")}`
//           : null,  
//         DrivingLicence: savedUser.DrivingLicence && savedUser.DrivingLicence.data
//           ? `data:${
//               savedUser.DrivingLicence.contentType
//             };base64,${savedUser.DrivingLicence.data.toString("base64")}`
//           : null,
//         MechanicCertificate: savedUser.MechanicCertificate && savedUser.MechanicCertificate.data
//           ? `data:${
//               savedUser.MechanicCertificate.contentType
//             };base64,${savedUser.MechanicCertificate.data.toString("base64")}`
//           : null,
//         PetrolStationCertification: savedUser.PetrolStationCertification && savedUser.PetrolStationCertification.data
//           ? `data:${
//               savedUser.PetrolStationCertification.contentType
//             };base64,${savedUser.PetrolStationCertification.data.toString("base64")}`
//           : null,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const Register = async (req, res) => {
  const {
    FirstName,
    LastName,
    PhoneNumber,
    Email,
    Password,
    ConfirmPassword,
    Address,
    StationName,
    Role,
    ProfilePicture,
    AadharCard
  } = req.body;
  const files = req.files;
  console.log(req.body);
  console.log(req.files);
  
  try {
    // 1. Validate required fields
    if (
      !FirstName ||
      !LastName ||
      !PhoneNumber ||
      !Email ||
      !Password ||
      !ConfirmPassword ||
      !Role
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if passwords match
    if (Password !== ConfirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 3. Check if user already exists
    const existingUser = await userRole.findOne({ Email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }
  console.log(existingUser);
  
    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // 5. Create new user object
    const newUser = new userRole({
      FirstName,
      LastName,
      PhoneNumber,
      Email,
      Password: hashedPassword,
      ConfirmPassword,
      Address,
      StationName,
      Role,
      ProfilePicture: null,
      AadharCard: null,
      DrivingLicence: null,
      PetrolStationCertification: null,
      MechanicCertificate: null,
    });

    // 6. Assign files to respective fields
    if (files) {
      if (files.ProfilePicture && files.ProfilePicture[0]) {
        newUser.ProfilePicture = `data:${files.ProfilePicture[0].mimetype};base64,${files.ProfilePicture[0].buffer.toString("base64")}`;
      }
      if (files.DrivingLicence && files.DrivingLicence[0]) {
        newUser.DrivingLicence = `data:${files.DrivingLicence[0].mimetype};base64,${files.DrivingLicence[0].buffer.toString('base64')}`;
      }
      if (files.AadharCard && files.AadharCard[0]) {
        newUser.AadharCard = `data:${files.AadharCard[0].mimetype};base64,${files.AadharCard[0].buffer.toString('base64')}`;
      }
      if (files.PetrolStationCertification && files.PetrolStationCertification[0]) {
        newUser.PetrolStationCertification = `data:${files.PetrolStationCertification[0].mimetype};base64,${files.PetrolStationCertification[0].buffer.toString('base64')}`;
      }
      if (files.MechanicCertificate && files.MechanicCertificate[0]) {
        newUser.MechanicCertificate = `data:${files.MechanicCertificate[0].mimetype};base64,${files.MechanicCertificate[0].buffer.toString('base64')}`;
      }
      // if (files.CurrentPhoto) {
      //   newUser.CurrentPhoto = {
      //     data: files.CurrentPhoto[0].buffer,
      //     contentType: files.CurrentPhoto[0].mimetype,
      //   };
      // }
    }

     if (ProfilePicture && typeof ProfilePicture === 'string') {
      newUser.ProfilePicture = ProfilePicture;
     }
     if (AadharCard && typeof AadharCard === 'string') {
      newUser.AadharCard = AadharCard;
     }

    // 8. Save the new user to the database
    const savedUser = await newUser.save();
    console.log(savedUser);
    
    const token = jwt.sign(
      {
        userId:savedUser._id,
        Email: savedUser.Email,
        Role: savedUser.Role
      },
      process.env.JWT_SECRET_KEY,{expiresIn: '24h'}
    );
    console.log(token);
    
    // 9. Send success response
    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: savedUser._id,
        FirstName: savedUser.FirstName,
        LastName: savedUser.LastName,
        Email: savedUser.Email,
        Address: savedUser.Address,
        StationName: savedUser.StationName,
        Role: savedUser.Role,
        ProfilePicture: savedUser.ProfilePicture,
        AadharCard: savedUser.AadharCard,
        DrivingLicence: savedUser.DrivingLicence,
        MechanicCertificate: savedUser.MechanicCertificate,
        PetrolStationCertification: savedUser.PetrolStationCertification,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to handle user sign-in
export const LoginForm = async (req, res) => {
  const { Email, Password } = req.body;
  const files = req.files;

  try {
    // 1. Find the user by email
    const user = await userRole.findOne({ Email });

    // 2. If no user is found, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Check if the password matches
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 4. Update user's images if provided in the request
    if (req.files && Object.keys(req.files).length > 0) {
      if (req.files.ProfilePicture && req.files.ProfilePicture.length > 0) {
        user.ProfilePicture.data = files.ProfilePicture[0].buffer;
        user.ProfilePicture.contentType = files.ProfilePicture[0].mimetype;
      }
      if (req.files.DrivingLicence && req.files.DrivingLicence.length > 0) {
        user.DrivingLicence.data = req.files.DrivingLicence[0].buffer;
        user.DrivingLicence.contentType = req.files.DrivingLicence[0].mimetype;
      }
      if (req.files.AadharCard && req.files.AadharCard.length > 0) {
        user.AadharCard.data = req.files.AadharCard[0].buffer;
        user.AadharCard.contentType = req.files.AadharCard[0].mimetype;
      }
      if (
        req.files.PetrolStationCertification &&
        req.files.PetrolStationCertification.length > 0
      ) {
        user.PetrolStationCertification.data =
          files.PetrolStationCertification[0].buffer;
        user.PetrolStationCertification.contentType =
          files.PetrolStationCertification[0].mimetype;
      }
      if (
        req.files.MechanicCertificate &&
        req.files.MechanicCertificate.length > 0
      ) {
        user.MechanicCertificate.data = files.MechanicCertificate[0].buffer;
        user.MechanicCertificate.contentType =
          files.MechanicCertificate[0].mimetype;
      }
      await user.save(); // Save updates to the database
    }

    // 6. Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.Role }, // Payload with user data
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    // 7. Send the response with the token
    return res.status(200).json({
      success: true,
      token,
      message: "Login successful",
      user: {
        Id: user._id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        PhoneNumber: user.PhoneNumber,
        Email: user.Email,
        Address: user.Address,
        StationName: user.StationName,
        Role: user.Role,
        ProfilePicture:
        user.ProfilePicture,
        //   user.ProfilePicture &&
        //   user.ProfilePicture.data &&
        //   user.ProfilePicture.contentType
        //     ? `data:${
        //         user.ProfilePicture.contentType
        //       };base64,${user.ProfilePicture.data.toString("base64")}`
        //     : "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg",
        DrivingLicence:
          user.DrivingLicence &&
          user.DrivingLicence.data &&
          user.DrivingLicence.contentType
            ? `data:${
                user.DrivingLicence.contentType
              };base64,${user.DrivingLicence.data.toString("base64")}`
            : null,
        AadharCard:
          user.AadharCard &&
          user.AadharCard.data && 
          user.AadharCard.contentType
            ? `data:${
                user.AadharCard.contentType
              };base64,${user.AadharCard.data.toString("base64")}`
            : null,
        PetrolStationCertification:
          user.PetrolStationCertification &&
          user.PetrolStationCertification.data &&
          user.PetrolStationCertification.contentType
            ? `data:${
                user.PetrolStationCertification.contentType
              };base64,${user.PetrolStationCertification.data.toString(
                "base64"
              )}`
            : null,
        // CurrentPhoto:
        //   user.CurrentPhoto &&
        //   user.CurrentPhoto.data &&
        //   user.CurrentPhoto.contentType
        //     ? `data:${
        //         user.CurrentPhoto.contentType
        //       };base64,${user.CurrentPhoto.data.toString("base64")}`
        //     : null,
        MechanicCertificate:
          user.MechanicCertificate &&
          user.MechanicCertificate.data &&
          user.MechanicCertificate.contentType
            ? `data:${
                user.MechanicCertificate.contentType
              };base64,${user.MechanicCertificate.data.toString("base64")}`
            : null,
      },
    });
    //console.log(token)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const getMapBox = async (req, res) => {
//   let { lat, lng } = req.body;
//   const accessToken = "";
//   fetch(
//     `https://api.mapbox.com/geocoding/v5/mapbox.places/gas%20station.json?proximity=${lng},${lat}&limit=10&access_token=${accessToken}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((error) => res.status(500).json(error));
// };

export const getGoogleMap = async (req, res) => {
  let { location, radius, type } = req.query;
  //const APIKEY = AIzaSyD4HjB6WiBhpuZPV9qMrPVVn7e982UOTQ4
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${APIKEY}`;
  try {
    const response = await axios.get(url);
    res.status(200  ).json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
