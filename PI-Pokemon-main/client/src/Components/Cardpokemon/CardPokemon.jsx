import React from "react";
import { Link } from "react-router-dom";
import styles from "../Cardpokemon/CardPokemon.module.css";

function CardPokemon({id, name, image, types, attack}){
    //console.log(id, name, types, image)
    return(
        <div className={styles.card}>
            <div>
        <img src={image} alt="imagen" className={styles.img}/>
            </div>
            <Link to={`/detail/${id}`}>
         <h1>{name}</h1>
            </Link>
        <h2>Tipos: {types}</h2>
        <h2>Numero de Ataque: {attack}</h2>
        
   
        </div>

    )

}

export default CardPokemon;