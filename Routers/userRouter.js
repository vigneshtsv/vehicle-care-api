import express from 'express';
import { deleteUser, forgetPassword, logoutUser, updateProfile, updateUser, upload } from '../Controllers/userController.js';
import authorization from '../Middleware/authorization.js';

const router = express.Router();

//user
router.put('/logout/:id',logoutUser);
router.put('/forgotpassword',forgetPassword);
router.put('/update/:id',authorization,updateUser);
router.put('/updateprofile/:id',authorization,updateProfile)
router.post('/upload',upload);
router.delete('/delete/:id',authorization,deleteUser)

export default router;