import orderData from '../Models/order.js'


export const updateOrderDatas = async (req,res) => {
    try {
        const updateOrderData = await orderData.findByIdAndUpdate({_id : req.body.id},{ $set : { orderId : req.body.orderId, paymentId : req.body.paymentId}});
        res.status(200).send({
            updateOrderData
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal Server Error in getting all stays"
        })
    }
}

//get my all orders
export const getMyorders = async(req,res) => {
    try {
        const orderList = await orderData.find({currentUserId : req.params.id})
        res.status(200).send({
            orderList
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server Error in getting all orders"
        })
    }
}