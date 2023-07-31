import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./NavBar.module.css"




const NavBar = ()=>{
  return(
      <> 
      <div>
      </div>
    <nav className={styles.nav}>
      <div className={styles.logo}>
      <NavLink to="/" style={{textDecoration: "none", color: "black"}}>
      {" "}POKEMON
      <img className={styles.imgLogo} src="https://p1.hiclipart.com/preview/586/927/642/pokemon-sun-and-moon-rendered-logos-round-black-logo-png-clipart.jpg" alt="img"/>
      </NavLink>
      </div>
     
      <button className={styles.button}>
        <NavLink to="/home" className={styles.link}>
          <div className={styles.div}>
              HOME
          </div>
        </NavLink>
      </button>
      <button className={styles.button}>
        <NavLink to="/create" className={styles.link}>
          <div className={styles.div}>
              CREATE POKEMON
          </div>
        </NavLink>
      </button>
    </nav>
      </>

   
  )
}

export default NavBar;