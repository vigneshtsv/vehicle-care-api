import express from 'express';
import {  LoginForm, Register, uploadMiddleware } from '../Controllers/authController.js';
// import authorization from '../Middleware/authorization.js';


const router = express.Router();

router.post('/register',uploadMiddleware,Register);
router.post('/loginuser',uploadMiddleware,LoginForm);


export default router;