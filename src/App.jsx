import "./App.css";
import PokemonList from "./components/Pokemon List/PokemonList";
import { useState } from "react";
import PokemonDetail from "./components/Pokemon Detail/PokemonDetail";
import logo from "./assets/pokemon-logo.png";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={`app-container ${selectedPokemon ? "no-scroll" : ""}`}>
      <div className="header-container">
        <img src={logo} alt="Pokemon" className="pokemon-logo" />

        {isSearchActive ? (
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            onBlur={() => setIsSearchActive(false)}
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        ) : (
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={() => setIsSearchActive(true)}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        )}
      </div>

      {selectedPokemon ? (
        <PokemonDetail
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      ) : (
        <PokemonList
          onSelectPokemon={setSelectedPokemon}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
}

export default App;