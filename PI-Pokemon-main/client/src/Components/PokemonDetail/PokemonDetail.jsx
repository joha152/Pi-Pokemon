import {React, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {pokemonDetail} from "../../redux/actions/actions";
import styles from "./PokemonDetail.module.css";


const PokemonDetail = ()=>{

const params = useParams();
 const dispatch= useDispatch();
// console.log(params.id)
 const pokemon = useSelector((state)=> state.detail) || {} ; 

console.log(pokemon)

     
useEffect(()=>{
  dispatch(pokemonDetail(params.id));
}, [dispatch, params.id]);




  return(
    <div className={styles.container}>
    { pokemon  ?
    <div className={styles.card}>
        <h1 className={styles.name}>{pokemon.name}</h1>

        <div> 
        <div className={styles.chart}>    
        <div className={styles.circle}>             
        <img 
            src={pokemon.image} 
            alt="not found" 
            className={styles.image}                      
        />
        </div>
        </div>
        </div>

        <form className={styles.form}>                   
            
            <label>Life:</label>
            <h2>{pokemon.hp}</h2>

            <label> Attack:</label>
            <h2>{pokemon.attack}</h2>
            
            <label >Defense:</label>
            <h2 >{pokemon.defense}</h2>

            <label >Speed:</label>
            <h2>{pokemon.speed}</h2>

            <label >Height:</label>
            <h2 >{pokemon.height}</h2>

            <label >Weight:</label>
            <h2 >{pokemon.weight}</h2>

            <label >Types:</label>
            <h2 >{pokemon.types}</h2>
        </form>

    </div>
    : <p>Loading...</p>
    }
<Link to="/home">
   <button>Volver</button>
</Link>
</div>
  )
}

export default PokemonDetail;