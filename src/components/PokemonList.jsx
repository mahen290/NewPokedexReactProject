import React from 'react';
import { useState, useEffect } from "react";
import "./PokemonList.css";
import axios from 'axios';
import Pokemon from './Pokemon';

function PokemonList() 
{
    // const [ pokemonList, setPokemonList ] = useState( [] );
    // const [ isLoading, setIsLoading ] = useState( true );

    // const [ pokedexUrl, setPokedexUrl ] = useState( "https://pokeapi.co/api/v2/pokemon/" );

    // const [ nextUrl, setNextUrl ] = useState();
    // const [ previousUrl, setPreviousUrl ] = useState();


    const [ pokemonListState, setPokemonListState ] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: "https://pokeapi.co/api/v2/pokemon/",
        nextUrl: "",
        previousUrl: ""
    })

    async function downloadPokemons() 
    {
        // setIsLoading(true);

        setPokemonListState( (state) => ( { ...state, isLoading: true } ) )
        const response = await axios.get(pokemonListState.pokedexUrl); 
        // This downloads list of 20 pokemon. 
        console.log( response )

        const pokemonResults = response.data.results; 
        // we get the array of pokemons from result
        console.log( response.data );  
        console.log( pokemonResults );                                  
        // we get the array of pokemons from result

        // setNextUrl(response.data.next);
        setPokemonListState( ( state ) => ( {
            ...state, 
            nextUrl: response.data.next, 
            previousUrl: response.data.previous
            } )
        )
        // setPrevUrl(response.data.previous);


        // iterating over array of pokemons, using their url, to create array of promises that download 20 pokemons in Every Page.
        const pokemonResultPromise = pokemonResults.map( ( pokemon ) => axios.get( pokemon.url ) );
        console.log ( "Pokemon Results Promise", pokemonResultPromise );


        // passing that promise array to axios.all
        const pokemonData = await axios.all ( pokemonResultPromise ) 
        console.log ( "Pokemon Data", pokemonData );


        // now iterate on Data of Each Pokemon Extract id, name, image and types.
        const pokemonListResult = pokemonData.map( ( pokeData ) => {
            const pokemon = pokeData.data;
            console.log ( "Each Pokemon", pokemon );
                return {
                    id: pokemon.id,
                    name: pokemon.name, 
                    img: pokemon.sprites.other.dream_world.front_default, 
                    types: pokemon.types
                }
            });
        console.log ( pokemonListResult );
        
        // setPokemonList(pokeListResult);
        setPokemonListState((state) => ({...state, pokemonList: pokemonListResult, 
            isLoading: false
            })
        );
        // setIsLoading(false);
    }

    useEffect( () => 
    {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl])

    const [ searchQuery, setSearchQuery ] = useState('');
        const handleSearch = ( query ) => { 
            setSearchQuery ( query );
        };

  const filteredPokemon = response.filter( (pokemon) => 
    pokemon.name.toLowerCase().includes( searchQuery.toLowerCase() ))

  return (
<>
    <Search onSearch = { handleSearch } />
    <div className = "main-wrapper"> 
        <div className = "pokemon-list-wrapper"> Pokemon Data List </div>

        <div className = "controls"> 
            { /* <button disabled = { previousUrl == null } onClick = { () => setPokedexUrl( previousUrl ) }> Previous Page. </button> */ }
            <button disabled = { pokemonListState.previousUrl == null } 
                onClick = { () => setPokemonListState( { ...pokemonListState, pokedexUrl: pokemonListState.previousUrl } ) } 
                className = "btn-controls"> Go On Previous Page. 
            </button>  

            { /* <button disabled = { nextUrl == null } onClick = { () => setPokedexUrl( nextUrl ) }> Next Page. </button> */ }
             <button disabled = { pokemonListState.nextUrl == null } 
                onClick = { () => setPokemonListState( { ...pokemonListState, pokedexUrl: pokemonListState.nextUrl } ) }
                className = "btn-controls"> Go On Next Page. 
            </button> 
        </div>

        <hr size = "1" color = "white" />

        <div className = "pokemon-wrapper">
            { 
                ( pokemonListState.isLoading ) ? 'Loading...' : 
                    pokemonListState.pokemonList.map( (poke) => 
                    <Pokemon 
                        name = { poke.name } 
                        image = { poke.img } 
                        id = { poke.id } 
                        key = { poke.id } 
                    /> 
                )
            }

        {/* Search Every Pokemon Item By The Name */}

            {
                filteredPokemon.map( ( sear_poke ) => (
                    <Pokemon 
                        name = { sear_poke.name }
                        image = { sear_poke.img }
                        id = { sear_poke.id }
                        key = { sear_poke.id }
                    />
                ) )
            }
        </div>
    </div>
</>
  );
}

export default PokemonList;