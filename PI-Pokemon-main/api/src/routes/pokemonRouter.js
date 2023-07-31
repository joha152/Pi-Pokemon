const { Router } = require('express');
const {allPokemons, pokemonById, createNewPokemon} = require("../handlers/pokemonHandlers")

const pokemonRouter = Router();

pokemonRouter.get("/", allPokemons)
pokemonRouter.get("/:id", pokemonById)
pokemonRouter.post("/", createNewPokemon)

module.exports= pokemonRouter; 
