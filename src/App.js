import React, { useState, useEffect } from "react";
import Search from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch the Pokémon list and their details using async/await
    const fetchPokemons = async () => {
      try {
        // Get the basic Pokémon data (names and URLs)
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        const data = await response.json();

        // Fetch detailed data for each Pokémon in parallel
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return await response.json();
          })
        );

        // Set the fetched Pokémon details to the state
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data: ", error);
      }
    };

    fetchPokemons();
  }, []);

  // Filter Pokémon based on the search term
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Pokédex</h1>
      <Search setSearchTerm={setSearchTerm} />
      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard 
            key={index} 
            name={pokemon.name} 
            image={pokemon.sprites.other['official-artwork'].front_default} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
