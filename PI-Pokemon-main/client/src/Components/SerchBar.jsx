import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { findPokemonByName } from "../redux/actions/actions";


const SerchBar = ()=>{
const dispatch = useDispatch();
const [name, setName] = useState("");

const handleChangeInput = (event)=>{
setName(event.target.value)
console.log(name)
}

const handleSubmit = (event)=>{
 event.preventDefault();
 dispatch(findPokemonByName(name))
 
}

return(
    <div>
        <input type="text" placeholder="Buscar pokemon..." onChange={(event)=> handleChangeInput(event)} />
        <button type="submit" onClick={(event)=> handleSubmit(event)}>Buscar</button>
    </div>
)


}


export default SerchBar