import React from 'react';

import style from './Cards.module.css';
import CardPokemon from "../Cardpokemon/CardPokemon"

export default function Cards() {
    return ( 
        <div className={style.padre}>

          
        <CardPokemon/>

          {/* <CardPokemon
             key={props.id}
             id={props.id}
             name={props.name}
             image={props.image}
             types={props.types}
                        />
                     */}
                
            
        </div>
     );
}