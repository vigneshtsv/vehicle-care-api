import express from 'express';
import { currentUser, forgetPassword, logoutUser } from '../Controllers/userController.js';

const router = express.Router();

//user
router.put('/logout/:id',logoutUser);
router.get('/currentuser/:id',currentUser);
router.put('/forgotpassword',forgetPassword);


//admin


export default router;