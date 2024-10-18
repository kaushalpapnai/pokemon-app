import React from "react";
import '../styles/Search.css';

function SearchBar({ setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
