import express from 'express'
import {deleteUser, getAllUser,getUserById, getUserProfile, updateUser} from '../Controllers/adminController.js';

const router = express.Router();

router.get('/getalluser',getAllUser);
router.get('/getuserbyid/:id',getUserById);
router.get('/getuserprofile/:id',getUserProfile);
router.put('/updateuser/:id',updateUser);
router.delete('/deleteuser/:id',deleteUser);

export default router;

