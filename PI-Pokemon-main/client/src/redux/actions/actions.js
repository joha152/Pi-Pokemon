import {
    GET_ALL_POKEMONS,
    FIND_POKEMON_BY_NAME,
    POKEMON_DETAIL,
    GET_TYPES,
    FILTER_CREATED,
    FILTER_TYPES,
    ORDER_BY_ATTACK,
    ORDER_BY_NAME,
    POST_POKEMON
} from "./action_type";

import axios from "axios";

const apiUrl = "http://localhost:3001";


export const getAllPokemons = () => {

    return async function (dispatch) {
        const json = await axios.get(`${apiUrl}/pokemons`);
        const data = json.data;
        //console.log(data)
        return dispatch({ type: GET_ALL_POKEMONS, payload: data })
    }
};

/////////////////////////////////////////////////////////////////////////////


export const findPokemonByName = (name) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${apiUrl}/${name}`);
        const data = response.data;
  
        return dispatch({ type: FIND_POKEMON_BY_NAME, payload: data });
      } catch (error) {
        // Lanzar un nuevo error con el mensaje de error recibido de la API.
        // Esto permite que el componente que utiliza esta acción pueda manejar el error adecuadamente.
        console.error('Error while fetching Pokemon:', error);
        throw new Error(error.response.data);
      }
    };
  };
  
  
  
  
  
  

///////////////////////////////////////////////////////////////////////////

export const pokemonDetail = (id) => {

    return async function (dispatch) {
        try {
            const json = await axios.get(`${apiUrl}/pokemons/${id}`);
            const data = json.data;
            return dispatch({ type: POKEMON_DETAIL, payload: data })
        } catch (error) {
            return alert(error.response.data)
        }
    }
};

//////////////////////////////////////////////////////////////////////////////

export const getTypes = () => {
    return async function (dispatch) {
        const json = await axios.get(`${apiUrl}/types`);
        const data = json.data;
        return dispatch({ type: GET_TYPES, payload: data })

    }
};

//////////////////////////////////////////////////////////////////////////////////

export const createPokemon = (form) => {
    return async function (dispatch) {
        try {
            const data = await axios.post(`${apiUrl}/pokemons`, form)
            axios.get(`${apiUrl}/pokemons`)
                .then((json) => json.data)
                .then((data) => dispatch({ type: GET_ALL_POKEMONS, payload: data }))
            const data1 = data;
            return alert(data1.data);

        } catch (error) {
            return alert(error.message)
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////

export const filterCreated = (payload) => {

    return ({ type: FILTER_CREATED, payload })

};

/////////////////////////////////////////////////////////////////////////////////

export const filterTypes = (payload) => {
    return ({ type: FILTER_TYPES, payload })

};

///////////////////////////////////////////////////////////////////////////

export const orderByAttack = (order) => {
    return function (dispatch) {
        return dispatch({ type: ORDER_BY_ATTACK, payload: order })
    }
};

//////////////////////////////////////////////////////////////

export const orderByName = (order) => {
    return function (dispatch) {
        return dispatch({ type: ORDER_BY_NAME, payload: order })
    }
};

////////////////////////////////////////////////////////

export const postPokemon = (payload) => {
    return async function (dispatch) {
        const response = axios.post("http://localhost:3001/pokemons", payload)
        return dispatch({ type: POST_POKEMON, response })
    }
}