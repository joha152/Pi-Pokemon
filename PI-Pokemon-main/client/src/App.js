import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import  PokemonDetail  from './Components/PokemonDetail/PokemonDetail';
import FormPokemon from './Components/FormPokemon/FormPokemon';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  exact path="/" element={<LandingPage/>}/>
      <Route  exact path="/home" element={<Home/>} />
      <Route  exact path="/detail/:id" element={<PokemonDetail/>} />
      <Route exact path="/create" element={<FormPokemon/>} />
    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
