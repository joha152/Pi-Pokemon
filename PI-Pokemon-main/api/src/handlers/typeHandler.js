const {chargeAndGetAllTypes}= require("../controllers/typecontroller")

const getAllTypes =async (req, res)=>{
    try {
        const infoApi = await chargeAndGetAllTypes();
        res.json(infoApi)
   } catch (error) {
        res.status(404).json({error: error.message})
   }
}

// trae todoss los tipos que vienen en chargeAndGetAllTypes y los convierte en json.


module.exports = getAllTypes; 