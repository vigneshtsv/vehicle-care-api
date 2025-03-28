import petrolStationData from '../Models/petrolStationData.js'


export const registerData = async(req,res,next) => {
    try {
        let {
            StationName,
            Distance,
            PetrolPrice,
            DiselPrice,
        } = req.body;
        const existingUser = await petrolStationData.findOne({ StationName: StationName });
        if (existingUser) {
            return res.status(400).json({ message: `${StationName} Already Exists` });
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
        res.status(500).json({ message: "Failed to register Petrol Station Data.  Please try again." });
    }
}

export const upDatePetrolData = async(req,res,) => {
    try {
        const updatePetrolData = await petrolStationData.findByIdAndUpdate({StationName : req.body.StationName});
        if(!updatePetrolData){
            return res.status(404).send({ message: "PetrolStation not found"})
        }
        res.status(200).send({updatePetrolData})
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