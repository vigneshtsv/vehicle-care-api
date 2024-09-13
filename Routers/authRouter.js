import express from 'express';
import { loginUser, registerUser } from '../Controllers/authController.js';


const router = express.Router();

router.post('/register',registerUser);
router.post('/loginuser',loginUser);


export default router;