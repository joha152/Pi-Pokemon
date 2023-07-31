const {    
    getAllPokemons,
    getPokemonById,
    getPokemonsByName,
    postPokemon,} = require("../controllers/pokemonControllers")

const allPokemons = async (req,res) =>{
    const { name } = req.query;
    try {
        if(name){
           const pokemon = await getPokemonsByName(name);
          return res.json(pokemon);
        }
        const pokemon = await getAllPokemons();
        return res.status(200).json(pokemon);
    } catch (error) {
       return res.status(404).json({error: error.message});
    }
};


const pokemonById = async (req,res) => {
    const {id} = req.params;
    try {
        const pokemon = await getPokemonById(id)
        return res.status(200).json(pokemon);
    } catch (error) {
      return res.status(404).json({error: error.message});
    }

};


const createNewPokemon = async (req, res)=>{

    const {namePokemon, hp, attack, speed, defense, height, weight, image, types} = req.body;
    if(!namePokemon) return res.status(404).json({error: '¡Faltan datos obligatorios!'})
    try {
       const exist = await postPokemon(namePokemon, hp, attack, speed, defense, height, weight, image);
       if(exist) throw new Error('Este Pokemon ya existe');
       await exist.addTypes(types)
        return res.status(200).json({success: 'Pokemon creado con exito'});
    } catch (error) {
        console.log('catch: ',error.message)
        return res.status(404).json({error: error.message});
    } 

};

module.exports={
    allPokemons,
    pokemonById,
    createNewPokemon
}
