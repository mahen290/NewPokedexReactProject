import React from 'react';
import { useState, useEffect } from "react";
import "./PokemonList.css";
import axios from 'axios';
import Pokemon from './Pokemon';

function PokemonList() 
{
    const [ pokemonList, setPokemonList ] = useState( [] );
    const [ isLoading, setIsLoading ] = useState( true );

    const Pokedex_Url = "https://pokeapi.co/api/v2/pokemon/";

    async function downloadPokemons() 
    {
        const response = await axios.get( Pokedex_Url ); 
        // Fetch 20 Pokemon List
        console.log ( "Responded Data", response.data );

        const pokemonResults = response.data.results; 
        // we get the array of pokemons from result
        console.log ( "Pokemon Results", pokemonResults );

        const pokemonResultPromise = pokemonResults.map( ( pokemon ) => axios.get( pokemon.url ) );
        // iterating over the array of pokemons, and using their url, to create an array of promises that will download those 20 pokemons.
        console.log ( "Pokemon Results Promise", pokemonResultPromise );

        const pokemonData = await axios.all ( pokemonResultPromise )
        // passing that promise array to axios.all
        console.log ( "Pokemon Data", pokemonData );

        const pokemonListResult = pokemonData.map( ( pokeData ) => {
            const pokemon = pokeData.data;
        // now iterate on Data of Each Pokemon Extract id, name, image and types.
            console.log ( "Each Pokemon", pokemon );

            return {
                id: pokemon.id,
                name: pokemon.name, 
                img: pokemon.sprites.other.dream_world.front_default, 
                types: pokemon.types
            }
        });

        console.log ( pokemonListResult );
        setPokemonList ( pokemonListResult );
        setIsLoading ( false );
    }

    useEffect( () => 
    {
        downloadPokemons();
    },[])

  return (
    <div className = "main-wrapper"> 
        <div className = "pokemon-list-wrapper"> Pokemon Data List </div>
        
        <div className = "pokemon-wrapper">
        {
            isLoading ? 'Loading...' : pokemonList.map ( ( poke ) => 
            <Pokemon key = { poke.id } name = { poke.name } image = { poke.img } /> )
        }
        </div>
        
        <div className = "controls">
            <button className = "btn-controls"> Previous </button>
            <button className = "btn-controls"> Go On Next </button>
        </div>
    </div>
  );
}

export default PokemonList;
