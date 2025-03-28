import express from 'express'
import { customerOrder, deliveryBoyData, getMyorders, updateOrderData } from '../Controllers/orderController.js';

const router = express.Router();

router.put('/updateorderdata/:id',updateOrderData);
router.get('/getmyorders/:email',getMyorders)
router.post('/customerorder',customerOrder)
router.get('/deliveryboydata',deliveryBoyData)


export default router;