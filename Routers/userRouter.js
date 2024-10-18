import express from 'express';
import { currentUser, forgetPassword, logoutUser, updateUser } from '../Controllers/userController.js';
import authorization from '../Middleware/authorization.js';

const router = express.Router();

//user
router.put('/logout/:id',logoutUser);
router.get('/currentuser/:id',currentUser);
router.put('/forgotpassword',forgetPassword);
router.put('/update/:id',authorization,updateUser);


export default router;