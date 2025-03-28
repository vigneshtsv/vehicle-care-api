import orderData from '../Models/order.js'


export const updateOrderData = async (req,res) => {
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
        const { email } = req.body;
        const orderList = await orderData.find({email});
        
        if (orderList.length === 0) {
            return res.status(400).json({message: "No orders found"});
        }
        
        res.status(200).send({
            orders : orderList.length,
            message: "All orders fetched successfully",
            orderList
        });

    } catch (error) {
        res.status(500).send({
            message : "Internal server Error in getting all orders"
        })
    }
}

export const customerOrder = async(req,res) => {
    try {
        const { Email,StationName,Location,Distance,Petrol_Price,Disel_Price,Petrol_Quantity,Disel_Quantity,Service_Type,Problem_Type,PhoneNumber,Status } = req.body;
        if(!Email){
            return res.status(400).json({message: "Email is required"});
        }
        
        const order = new orderData({
            Email,
            StationName,
            Location,
            Distance,
            Petrol_Price,
            Disel_Price,
            Petrol_Quantity,
            Disel_Quantity,
            Service_Type,
            Problem_Type,
            PhoneNumber,
            Status
        })
        
         await order.save()

        res.status(200).json({
            message : "Your Order Recived Successfully",order
        })   
    } catch (error) {
        res.status(500).json({ message: 'Error in customerOrder', error:error.message});
    }
};

export const deliveryBoyData = async(req,res) => {
    try {
        const deliveryBoy = await orderData.find({ Status: { $in: ["Waiting", "Processing", "Completed"] } });
        res.status(200).json({
            success: true,
            deliveryBoy
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : "Internal server Error in getting all deliverys"})
        }
}