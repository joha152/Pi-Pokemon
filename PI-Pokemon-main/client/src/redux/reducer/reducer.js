//aca se maneja es estado.... 
import { GET_ALL_POKEMONS,  
    GET_TYPES, 
    FILTER_CREATED,
    FILTER_TYPES, 
    POKEMON_DETAIL ,
    ORDER_BY_ATTACK,
    ORDER_BY_NAME,  
    FIND_POKEMON_BY_NAME,
    POST_POKEMON} from "../actions/action_type";

const initialState = {
    pokemons:[],
    pokemonsAux:[],
    detail:[],
    detailAux: {},
    type:[],
    errorFilter: false
};

const reducer = (state=initialState, action)=>{
    switch(action.type){
        
        case GET_ALL_POKEMONS: return {
            ...state,
            pokemons: action.payload,
           
        };

        case FIND_POKEMON_BY_NAME: 

        return {...state, 
            pokemons: action.payload} 

        case POKEMON_DETAIL: return {
                ...state,
                detail: action.payload,
            };

        case GET_TYPES: return {
            ...state,
            type: action.payload

        }

        case FILTER_TYPES: 
        const pokemon = state.pokemons
        const filtered = action.payload === 'all'? pokemon : pokemon.filter(pokemonn=> pokemonn.type === action.payload)
        console.log(action.payload)
        console.log(filtered)
      return {
        ...state,
        pokemons: filtered
        
      }

        // case FILTER_CREATED: 
        // const allPokemons1 = state.pokemons;
        // const allpokefilter = action.payload === "all" ? allPokemons1 : allPokemons1.filter(el=>el.value)

      

        // return { ...state, pokemons: createdFilter || allPokemons1 };

   

        case ORDER_BY_ATTACK:
            const orderAttack = action.payload;
        let sortedPokemons;

        if (orderAttack === 'strong') {
            sortedPokemons = state.pokemons.slice().sort((a, b) => b.attack - a.attack);
        } else if (orderAttack === 'weak') {
            sortedPokemons = state.pokemons.slice().sort((a, b) => a.attack - b.attack);
        } else {
            return { ...state };
        }
            return { ...state, pokemons: sortedPokemons };

            case ORDER_BY_NAME: 
            const pokemons = state.pokemons.slice(); // Copiar el arreglo original
        const isAscending = action.payload === 'as'; // Verificar si la ordenación debe ser ascendente o descendente
        pokemons.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          return isAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
        return {
          ...state,
          pokemons,
        }

        case POST_POKEMON:
            return{
                ...state
            }


        default: 
            return { ...state };

           

    }



}




export default reducer; 


