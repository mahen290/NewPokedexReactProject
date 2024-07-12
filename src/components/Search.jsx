import React from 'react';
import './Search.css';

function Search( { onSearch } ) 
{
  const searchHandler = (event) => {
    console.log(event);
    onSearch(event.target.value);
  }
  return (
    <div className = "search-wrapper">
      <input className = "pokemon-name-search" type = "text" placeholder = "Search Pokemon By Name..." onChange = { searchHandler } />
    </div>
  );
}

export default Search;
