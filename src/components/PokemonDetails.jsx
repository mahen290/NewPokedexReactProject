import React from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function PokemonDetails() {

  const { id } = useParams()
  const [ pokemon, setPokemon ] = useState( {} );
  console.log(id)

    async function downloadPokemon() {
    const response = await axios.get( `https://pokeapi.co/api/v2/pokemon/${id}` );
    console.log(response.data);

      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map( ( type ) => type.type.name)
      })

    }

    console.log(pokemon);

    useEffect( () => {
      downloadPokemon()
    }, [])


  return (
      <div className = "pokemon-details-wrapper">

        <div className = "pokemon-detail-name"> name: { pokemon.name } </div>
        <img className = "pokemon-detail-image" src = { pokemon.image } alt = "pokemon image" />

        <div> Height : { pokemon.height } </div>
        <div> Weight : { pokemon.weight } </div>

        <div className = "pokemon-detail-types" >
            { pokemon.types && pokemon.types.map( ( type ) => <div key = { type }> { type } </div> ) }
        </div>

      </div>
    );
  }

export default PokemonDetails;