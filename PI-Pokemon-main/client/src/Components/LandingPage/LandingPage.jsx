import React from "react";
import { getAllPokemons } from '../../redux/actions/actions';
import styles from './LandingPage.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const Landing = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startHanlder = (event) => {
        event.preventDefault();
        dispatch(getAllPokemons());
        return navigate;

    }


    return (
        <div className={styles.container}>
            <div >
                <p className={styles.p}>
                    Hola! Esto es una pokebola... Poke? No hay poke!
                </p>
            </div>
            <Link to="/home">
                <button type="button" className={styles.btn} onClick={(e) => startHanlder} > Start</button>
            </Link>
        </div>
    )
}

export default Landing;