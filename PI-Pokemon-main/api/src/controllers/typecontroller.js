const axios = require('axios');
const { Type } = require('../db.js')

const normalInfoTypes=(infoApi)=>{
    return {
        name: infoApi.name[0].toUpperCase() + infoApi.name.slice(1) ,
    }
};

const getAllTypes= async()=>{
    const infoApi = await axios.get('https://pokeapi.co/api/v2/type')
    const results = infoApi.data.results.map(type => normalInfoTypes(type))
    return results;
};

const chargeAndGetAllTypes = async()=>{
    const dbTypes = await Type.findAll({})
    if(!dbTypes.length){
        const results = await getAllTypes();
        return Type.bulkCreate(results)
    }
    return dbTypes;
}


module.exports = {
    getAllTypes,
    chargeAndGetAllTypes,
}