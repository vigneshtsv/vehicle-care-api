import express from 'express'
import { getPetrolData, registerData, upDatePetrolData } from '../Controllers/petrolStation.js';

const router = express.Router();

router.post('/registerdata',registerData)
router.get('/getpetroldata',getPetrolData);
router.put('/updatepetroldata/:stationname',upDatePetrolData)

export default router;

