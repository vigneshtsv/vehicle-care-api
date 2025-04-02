import petrolStationData from '../Models/petrolStationData.js'


export const registerData = async(req,res,next) => {
    try {
        let {
            StationName,
            Distance,
            PetrolPrice,
            DiselPrice,
        } = req.body;
        // const existingUser = await petrolStationData.findOne({ StationName });
        if (!StationName) {
            return res.status(400).json({ message: `StationName is required` });
        }
        const petrolData = new petrolStationData({
            StationName,
            Distance,
            PetrolPrice,
            DiselPrice,
        });

        await petrolData.save();
        res.status(200).json({
            message: "Petrol Station Data Registered Successfully",
        });

    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Failed to register Petrol Station Data.  Please try again."
         });
    }
}

export const upDatePetrolData = async(req,res,) => {
    try {
        const { StationName, Distance, PetrolPrice, DiselPrice } = req.body;

        const updatePetrolData = await petrolStationData.findOneAndUpdate(
            {StationName},
            {StationName,Distance,PetrolPrice,DiselPrice},
            { new: true }
        );
        if(!updatePetrolData){
            return res.status(404).send({ message: "PetrolStation not found"})
        }
        res.status(200).json({
            message:"PetrolData update Successfully",
            data:updatePetrolData
        })
    } catch (error) {
        res.status(500).send({message : "Internal Server Error in UpdatePetrol Data"})
    }
}

export const getPetrolData = async(req,res) => {
    try {
        const users = await petrolStationData.find({});
        res.status(200).json({
            success:true,
            users,
            message:'fetch successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get Petrol Station Data.  Please try again." });
    }
}