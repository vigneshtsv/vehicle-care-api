import express from 'express'
import { getMyorders, updateOrderDatas } from '../Controllers/orderController';

const router = express.Router();

router.put('/updateorderdata',updateOrderDatas);
router.get('/getmyorders',getMyorders)

export default router;