import './Pokedex.css';
import Search from './Search';
import PokemonList from './PokemonList';

function Pokedex() {
  return (
    <div className = "pokedex-wrapper">
        <header> POKEDEX </header>
        <Search />
        <PokemonList />
    </div>
  );
}

export default Pokedex;