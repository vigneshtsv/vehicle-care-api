import express from 'express'
import {deleteUser, getAllUser,getUserById, getUserProfile, updateUser} from '../Controllers/adminController.js';

const router = express.Router();

router.get('/getalluser',getAllUser);
router.get('/getuserbyid',getUserById);
router.get('/getuserprofile',getUserProfile);
router.put('/updateuser',updateUser);
router.delete('/deleteuser',deleteUser);

export default router;