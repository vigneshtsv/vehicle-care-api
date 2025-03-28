import express from 'express';
import { getGoogleMap, LoginForm, Register, uploadMiddleware } from '../Controllers/authController.js';
import authorization from '../Middleware/authorization.js';


const router = express.Router();

router.post('/register',uploadMiddleware,Register);
router.post('/loginuser',uploadMiddleware,LoginForm);
router.post('/map',getGoogleMap);

export default router;