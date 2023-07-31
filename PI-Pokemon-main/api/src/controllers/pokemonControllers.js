const {Pokemon, Type} = require("../db")
const axios = require("axios")


function normalizeInfoApi(infoApi){
  return {
      id: infoApi.data.id,
      name: infoApi.data.name[0].toUpperCase() + infoApi.data.name.slice(1),
      types: infoApi.data.types?.map((e) => e.type.name).join(', '),
      hp: infoApi.data.stats[0].base_stat,
      attack:infoApi.data.stats[1].base_stat,
      defense: infoApi.data.stats[2].base_stat,
      speed: infoApi.data.stats[5].base_stat,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${infoApi.data.id}.svg`,
      height: infoApi.data.height,
      weight: infoApi.data.weight,
      createdBd: false,
  }
}

function normalizeInfoDb(infoDb){
  return {
      id: infoDb.id,
      name: infoDb.name,
      types: infoDb.Types?.map(t => t.name.toLowerCase()).join(', '),
      hp: infoDb.hp,
      attack: infoDb.attack,
      defense: infoDb.defense,
      speed: infoDb.speed,
      image: infoDb.image,
      height: infoDb.height,
      weight: infoDb.weight,
      createdBd: true,
  }
}


async function getPokemonsApi(){
  // Busqueda de todo a la API
  const infoApi1 = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=60');
  let  nextPage =  infoApi1.data.next;
  
  const infoApi2 = await axios.get(nextPage);
  let results = infoApi1.data.results;

  results = results.concat(infoApi2.data.results);

  const infoApiPromises = results.map((pokemon) => {
      return axios.get(pokemon.url)
      .then(info => normalizeInfoApi(info))
      .catch(error => console.log(error));
  })

  const pokemonsApi = await Promise.all(infoApiPromises)
 
  return pokemonsApi;
}

async function getPokemonsBd(){
  let pokemons = await Pokemon.findAll({
      include: {
          model: Type,
          attribute: ['name'],
          through: {
              attribute: [],
          }
      }
  });
  pokemons = pokemons.map((e) => normalizeInfoDb(e));
  return pokemons;
}


async function getAllPokemons(){
  const pokemonsApi = await getPokemonsApi();
  const pokemonsBd = await getPokemonsBd();
  return pokemonsApi.concat(pokemonsBd);
}


async function getPokemonsByName(name) {
    try {
      // Búsqueda por name a la API
      name = name.toLowerCase()
      const infoApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemon = normalizeInfoApi(infoApi);
      return pokemon;
    } catch (error) {
      // Búsqueda por name a la BD
      if (typeof name !== 'string') {
        throw new Error('Invalid input: name must be a string.');
      }
      name = name[0].toUpperCase() + name.slice(1);
      const pokemon = await Pokemon.findOne({
        where: { name: name },
        include: {
          model: Type,
          attributes: ['name']
        }
      });
  
      if (pokemon === null) throw new Error('Pokemon not found');
  
      return normalizeInfoDb(pokemon);
    }
  }


//   export const getAllPokemonsbyName = async (name) =>{
//     const pokesDB = await getPokeDb(); //Todos los pokemons de la DB
//     const pokesApi = await getPokeApi(); //Todos los pokemons de la Api
//     const allPokemons = [...pokesDB, ...pokesApi];

//     if (name) {
//         const pokesName = allPokemons.filter((poke)=>
//         poke.name.toLowerCase().includes(name.toLowerCase())
//         );
//         if(!pokesName.length)
//         throw new Error(`No se encontraron Pokemons con el nombre: ${name}`);
//         return pokesName;
//     }
//         return allPokemons;


// }
  


async function getPokemonById(id){
 try {
      const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      return normalizeInfoApi(pokemon)
  } catch (error) {
      const pokemon = await Pokemon.findByPk(id, {
          include: {
              model: Type,
              attributes: ['name']
         }})
      if(pokemon === null) throw Error('No existe un Pokemon con el id proporcionado');
      return normalizeInfoDb(pokemon);
 }
}


const postPokemon =async (name, hp, attack, speed, defense, height, weight, image)=> {
  !hp ? hp = 1 : null;
  !attack ? attack = 1 : null;
  !speed ? speed = 1 : null;
  !defense ? defense = 1 : null;
  !height ? height = 1 : null;
  !weight ? weight = 1 : null;
  

       // Busqueda por name a la API
   try {
       name = name.toLowerCase()
       const infoApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
       return true;
       
   } catch (error) {
       // Busqueda por name a la BD
       name = name[0].toUpperCase() + name.slice(1);
       const pokemon = await Pokemon.findOne({
           where : {name},
       });
       
       if(pokemon !== null) throw new Error('Este Pokemon ya existe');

       const  pokemons = await Pokemon.create({name, hp, attack, speed, defense, height, weight, image});

  

 
  
   }}



module.exports = {
  getPokemonsApi,
  getPokemonsBd,
  getAllPokemons,
  getPokemonById,
  getPokemonsByName,
  normalizeInfoApi,
  postPokemon,
}



