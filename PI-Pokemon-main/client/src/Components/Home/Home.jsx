import {React, useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { findPokemonByName, getAllPokemons,filterTypes, orderByName, getTypes, orderByAttack } from "../../redux/actions/actions";
import Cards from "../Cards/Cards"
import styles from "./Home.module.css";
import CardPokemon from "../Cardpokemon/CardPokemon";
import { useNavigate } from "react-router-dom";


const Home = ()=>{

const navigate= useNavigate();

  const pokemons = useSelector((state)=>state.pokemons); //accede al estado 
  const type = useSelector((state)=>state.type);
  
  const dispatch = useDispatch();
  // const params = useParams();
  const [orderName, setOrderName] = useState("");
  const [orderAttack, setOrderAttack] = useState("");
  const [page, setPages] = useState(1);
  const pokemonsPerPage = 12;
  const pages = [];
  const lastIndex = page * pokemonsPerPage;
  const firstIndex = lastIndex - pokemonsPerPage;
 const pagesPokemons = pokemons.slice(firstIndex, lastIndex);
 console.log(pokemons)
  const pagesNumber= Math.ceil(pokemons.length / 12);
  // const post = useSelector((state)=> state.post);
 
  for( let i =1; i <= pagesNumber; i++){
    pages.push([i]);
  }

  useEffect(() => {
    //dispatch(loadingTrue())
    dispatch(getAllPokemons())
    dispatch(getTypes())
}, [dispatch]);

const [name, setName] = useState("");

const handleChangeInput = (event)=>{
setName(event.target.value)
console.log(name)
}




  const handlePageChange = (newPage, paging)=>{
    if(newPage){
      setPages(newPage[0])
      
    }else if(page !== pagesNumber && paging === "+" ){
      setPages(page + 1)

    }else if(page !== 1 && paging === " - "){
      setPages(page - 1)
    }
  };

  const handleOrderName = (e) => {
    setOrderName(e.target.id);
    dispatch(orderByName(e.target.id));
};
const handleOrderAttack = (e) => {
    setOrderAttack(e.target.id);
    dispatch(orderByAttack(e.target.id));
};
const handleOnSearch = (e) => {
    dispatch(findPokemonByName(e.target.value));
    setPages(1);
};

const handleFilterType = (e)=>{
dispatch(filterTypes(e.target.value))
}

const volverNormal = ()=> {
setOrderAttack()

};

  return(
    <>
  <div className={styles.homeContainer}>
    <NavBar/>   
       
    <div className={styles.filters}>
          
        <div className={styles.filter}>
     
        {/* <FilterType setPages={setPages}/>
        <FilterOrigin setPages={setPages}/> */}
        </div>
        <div className={styles.item}>
        <div>
        <input type="text" placeholder="Buscar pokemon..." onChange={(event)=> handleChangeInput(event)} />
        <button type="submit" onClick={handleOnSearch}>Buscar</button>
    </div>
         
          <div className={styles.order}>
            <label htmlFor="as" className={styles.input}>
              <input type="radio" name="orderName" id="as" checked={orderName=== "as"} onChange={(e)=> handleOrderName(e)}/>
              Ordenar de: A - Z
            </label>
            <hr />
            <label htmlFor="des" className={styles.input}>
              <input type="radio" name="orderName" id="des" checked={orderName=== "des"} onChange={(e)=> handleOrderName(e)}/>
              Ordenar de: Z - A
            </label>
            </div>
            <div>
              <h2>Ordenar por ataque</h2>
              <button id="weak" onClick={handleOrderAttack}>de menor a mayor</button>
                <button id="strong" onClick={handleOrderAttack}>de mayor a menor</button>
              <button onClick={volverNormal}>Volver a la normalidad</button>
            </div>
           <hr />
        </div>
        <span>Filtrar por origen: </span>
        <select >
          <option value="all">Todos</option>
          <option value="api">Api</option>
          <option value="created">Creado</option>
        </select>
        <hr />
        <span>Filtrar por tipo:  </span>
        <select onChange={(e)=>handleFilterType(e)}>
        {type.map((t)=>{return(
                        <option key={t.id} value={t.name}>{t.name}</option>
                    )})}
            </select>


      
      <div className={styles.number}>
        {pokemons.length>0 && (
          <div className={styles.paging}>
            {pages.length>1 && (
              <button id="-" onClick={(e)=>handlePageChange(null, e.target.id)} className={styles.font}>
                PREV
              </button>
            )}
           {pages.map((newPage) => (
                <button
                  key={newPage}
                  onClick={() => handlePageChange(newPage)}
                  className={styles.font}
                >
                  {newPage}
                </button>
              ))}
              {pages.length > 1 && (
                <button
                  id="+"
                  onClick={(e) => handlePageChange(null, e.target.id)}
                  className={styles.font}
                >
                  NEXT
                </button>
              )}
            </div>
          )}
        </div>
        {pokemons.length > 0 ? (
          <div>
            <div className={styles.pageNumberTop}>page:{page}</div>
            <div className={styles.container}>
              {pagesPokemons.map((pokemon) => (
                <CardPokemon
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
                attack={pokemon.attack}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.all}>
            <Cards/>
          </div>
        )}
      </div>
  </div>
  </>
  );
};

export default Home;