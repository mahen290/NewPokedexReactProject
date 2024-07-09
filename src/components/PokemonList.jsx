import React from 'react';
import { useState, useEffect } from "react";
import "./PokemonList.css";
import axios from 'axios';
import Pokemon from './Pokemon';



function PokemonList() 
{
    const [ pokemonList, setPokemonList ] = useState( [] );
    const [ isLoading, setIsLoading ] = useState( true );

    const [ pokedexUrl, setPokedexUrl ] = useState( "https://pokeapi.co/api/v2/pokemon/" );

    const [ nextUrl, setNextUrl ] = useState();
    const [ previousUrl, setPreviousUrl ] = useState();

    async function downloadPokemons() 
    {
        setIsLoading( true )
        const response = await axios.get( pokedexUrl );                 // Fetch 20 Pokemon List
        console.log ( "Response", response );
        console.log( "Responded Data", response.data );

        const pokemonResults = response.data.results;                   
        setNextUrl( response.data.next );
        setPreviousUrl( response.data.previous );
        console.log( pokemonResults );                                  // we get the array of pokemons from result

        const pokemonResultPromise = pokemonResults.map( ( pokemon ) => axios.get( pokemon.url ) );
        // iterating over array of pokemons, using their url, to create array of promises that download 20 pokemons.
        console.log ( "Pokemon Results Promise", pokemonResultPromise );

        const pokemonData = await axios.all ( pokemonResultPromise )    // passing that promise array to axios.all
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
    },[ pokedexUrl ])

  return (
    <div className = "main-wrapper"> 
        <div className = "pokemon-list-wrapper"> Pokemon Data List </div>

        <div className = "controls">
            <button disabled = { previousUrl == null } onClick = { () => setPokedexUrl(  previousUrl ) } 
                className = "btn-controls"> Previous Page </button>

            <button disabled = { nextUrl == null } onClick = { () => setPokedexUrl( nextUrl ) } 
                className = "btn-controls"> Next Page </button>
        </div>

        <hr size = "1" color = "white" />

        <div className = "pokemon-wrapper">
            {
                (isLoading) ? 'Loading...' : pokemonList.map ( ( poke ) => 
                <Pokemon key = { poke.id } name = { poke.name } image = { poke.img } id = { poke.id } /> )
            }
        </div>

    </div>
  );
}

export default PokemonList;