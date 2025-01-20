import express from 'express';
import { getGoogleMap, loginUser, registerUser } from '../Controllers/authController.js';
// import authorization from '../Middleware/authorization.js';


const router = express.Router();

router.post('/register',registerUser);
router.post('/loginuser',loginUser);
router.post('/map',getGoogleMap);

export default router;