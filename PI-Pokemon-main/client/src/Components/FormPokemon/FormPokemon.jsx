import React, { useEffect } from "react";
import {getTypes, postPokemon } from "../../redux/actions/actions";
import { useNavigate , Link} from "react-router-dom";
import styles from "./FormPokemon.module.css";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import axios from "axios";


const FormPokemon = ()=>{
    const dispatch= useDispatch();
    const type = useSelector((state)=> state.type)
    const pokemons = useSelector((state)=>state.pokemons)
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name:"",
        image:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        types: [],
    })

    const [errors, setErrors] = useState({
         name:"",
         image:"",
         hp:"",
         attack:"",
         defense:"",
         speed:"",
         height:"",
         weight:"",
         type: "",
    })

    const handleChange = (event)=>{
        const property = event.target.name;
        const value= event.target.value;

        setErrors(validate({...form, [property]: value}));
        setForm({...form, [property]:value});
        
    }

  

    const submitHandler = (event)=>{
        event.preventDefault()
        dispatch(postPokemon(form))
        setForm({
            name:"",
            image:"",
            hp:"",
            attack:"",
            defense:"",
            speed:"",
            height:"",
            weight:"",
            type: "",
        })
        alert("creado pokemon")

        // if (!Object.keys(errors).length) {
        //     if (pokemons.find((pokemon) => pokemon.name === form.name)) {
        //         alert("There's already a pokemon with that name");
        //         setForm({
        //             name: "",
        //             image: "",
        //             hp: "",
        //             attack: "",
        //             defense: "",
        //             speed: "",
        //             height: "",
        //             weight: "",
        //             type:"",
        //         });
        //         navigate("/home");
        //     } else {
        //         axios.post("http://localhost:3001/pokemon", form);
        //         setForm({
        //             name: "",
        //             image: "",
        //             hp: 0,
        //             attack: 0,
        //             defense: 0,
        //             speed: 0,
        //             height: 0,
        //             weight: 0,
        //           type:"",
        //         });
        //         alert("Let's check out our Pokemons!");
        //         navigate("/home");
        //     }
        // } else {
        //     alert("Error. Please try again");
        // }      
        };


    useEffect(()=>{
        dispatch(getTypes())
    },[dispatch]);


    const validate = (form) => {

        let errors = {};

        if (!form.name.trim()){
            errors.name = "This feature is required.";            
        } else if (!/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(form.name.trim())){
            errors.name = "This feature must contain only letters.";            
        }

        if (!form.image){
            errors.image = "This feature is required.";        
        }
        
        if (!form.hp){
            errors.hp = "This feature is required.";
        }else if (/^\d*\.\d+$/.test(form.hp)){
            errors.hp = "The value of this feature must be an integer.";
        }

        if (!form.attack){
            errors.attack = "This feature is required.";
        }else if (/^\d*\.\d+$/.test(form.hp)){
            errors.hp = "The value of this feature must be an integer.";
        }

        if (!form.defense){
            errors.defense = "This feature is required.";
        }else if (/^\d*\.\d+$/.test(form.hp)){
            errors.hp = "The value of this feature must be an integer.";
        }

        if (/^\d*\.\d+$/.test(form.speed)){
            errors.speed = "The value of this feature must be an integer.";
        }

        if (/^\d*\.\d+$/.test(form.height)){
            errors.height = "The value of this feature must be an integer.";
        }

        if (/^\d*\.\d+$/.test(form.weight)){
            errors.weight = "The value of this feature must be an integer.";
        }

        return errors;
    };


 return(
     
     <div className={styles.contenedor}>
       <Link to="/home">
       <button>Volver</button>
       </Link>
        <h1>Crea tu super Pokemon!</h1>
        <form className={styles.form} onSubmit={(event)=>submitHandler(event)}>
        <div>
            <label htmlFor="name">Nombre: </label>
            <input type="text" name="name" value={form.name} onChange={(e)=>handleChange(e)}/>
            {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <hr />
        <div>
            <label htmlFor="hp">Vida: </label>
            <input type="text" name="hp" value={form.life} onChange={(e)=>handleChange(e)} />
            {errors.hp && <span className={styles.error}>{errors.hp}</span>}
        </div>
            <hr />
        <div>
            <label htmlFor="attack">Ataque: </label>
            <input type="text" name="attack" value={form.attack} onChange={(e)=>handleChange(e)} />
            {errors.attack && <span className={styles.error}>{errors.attack}</span>}
        </div>
        <hr />
        <div>
            <label htmlFor="defense">Defensa: </label>
            <input type="text" name="defense" value={form.defense} onChange={(e)=>handleChange(e)} />
            {errors.defense && <span className={styles.error}>{errors.defense}</span>}
        </div>
        <hr />
        <div>
            <label htmlFor="speed">Velocidad: </label>
            <input type="text" name="speed" value={form.speed} onChange={(e)=>handleChange(e)} />
            {errors.speed && <span className={styles.error}>{errors.speed}</span>}
        </div>
<hr />
        <div>
            <label htmlFor="height">Altura: </label>
            <input type="text" name="height" value={form.height} onChange={(e)=>handleChange(e)}/>
            {errors.height && <span className={styles.error}>{errors.height}</span>}
        </div>
        <hr />
        <div>
            <label htmlFor="weight">Peso: </label>
            <input type="text" name="weight" value={form.weight} onChange={(e)=>handleChange(e)}/>
            {errors.weight && <span className={styles.error}>{errors.weight}</span>}
        </div>
        <hr />
        <div>
            <label htmlFor="image">Imagen</label>
            <input type="text" name="image" value={form.image} onChange={(e)=>handleChange(e)}/>
        </div>
        <hr />
        <div>
            <select>
                {type.map((t)=>{return(
                        <option key={t.id} value={t.name}>{t.name}</option>
                    )})}
            </select>
        </div>
       
        <hr />
        <div>
        <button className={styles.button} type="submit">CREATE POKEMON</button>
        </div>
        <hr />
      
      

        </form>

    </div>
   
 )
}

export default FormPokemon;












