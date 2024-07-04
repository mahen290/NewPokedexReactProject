import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import "./PokemonList.css";

function PokemonList() 
{
    const [ pokemonList, setPokemonList ] = useState( [] );
    const [ isLoading, setIsLoading ] = useState( true );

    async function downloadPokemons() 
    {
        const response = await axios.get ( "https://pokeapi.co/api/v2/pokemon/" );
        console.log ("Response", response.data );

        const pokemonResults = response.data.results;
        console.log ("Pokemon Results", pokemonResults);

        const pokemonResultPromise = pokemonResults.map( ( pokemon ) => axios.get( pokemon.url ) );
        console.log ("Pokemon Results Promise", pokemonResultPromise);

        const pokemonData = await axios.all ( pokemonResultPromise )
        console.log ("Pokemon Data", pokemonData);

        const result = pokemonData.map( (pokeData) => {
            const pokemon = pokeData.data;
            console.log("Each Pokemon", pokemon);
            return {
                name: pokemon.name, 
                image: pokemon.sprites.other.dream_world.front_default, 
                types: pokemon.types
            }
        });
        console.log ( result );
        setPokemonList ( result );
        setIsLoading ( false );
    }

    useEffect( () => 
    {
        downloadPokemons();
    },[])

  return (
    <div className = "pokemon-list-wrapper"> 
        <div> Pokemon Data Downloaded List </div>
        { ( isLoading ) ? 'Loading...' : 'Pokemon Data Downloaded List' }
    </div>
  );
}

export default PokemonList;
