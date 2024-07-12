import React, { useState } from 'react';
import './Pokemon.css';
import { Link } from "react-router-dom";
import Search from './Search';

function Pokemon( { name, image, id } ) {
  return (
    <div className = "pokemon">
      <Link to = { `/pokemon/${ id }` }>
        <div className = "pokemon-name"> { name } </div>
        <div className = "pokemon-img"> <img src = { image } /> </div> 
      </Link> 
    </div>
  );
}

export default Pokemon;