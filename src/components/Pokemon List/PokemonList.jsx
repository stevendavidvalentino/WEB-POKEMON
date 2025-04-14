import React, { useState } from "react";
import PokemonCard from "../Pokemon Card/PokemonCard";
import PokemonDetail from "../Pokemon Detail/PokemonDetail";
import "./PokemonList.css";

const pokemonData = [
    {
        id: "#0025",
        name: "Pikachu",
        type: "Electric",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    },
    {
        id: "#0028",
        name: "Sandshrew",
        type: "Ground",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png",
    },
    {
        id: "#0035",
        name: "Clefairy",
        type: "Fairy",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png",
    },
    {
        id: "#0004",
        name: "Charmander",
        type: "Fire",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    },
    {
        id: "#0034",
        name: "Nidoking",
        type: "Poison",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png",
    },
    {
        id: "#0059",
        name: "Arcanine",
        type: "Fire",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png",
    },
    {
        id: "#0086",
        name: "Seel",
        type: "Water",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/86.png",
    },
    {
        id: "#0095",
        name: "Onix",
        type: "Rock",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png",
    },
    {
        id: "#0009",
        name: "Blastoise",
        type: "Water",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    },
    {
        id: "#0010",
        name: "Caterpie",
        type: "Bug",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
    },
    {
        id: "#0011",
        name: "Metapod",
        type: "Bug",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png",
    },
    {
        id: "#0012",
        name: "Butterfree",
        type: "Bug",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png",
    },
    {
        id: "#0013",
        name: "Weedle",
        type: "Bug",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png",
    },
    {
        id: "#0014",
        name: "Kakuna",
        type: "Bug",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png",
    },
    {
        id: "#0015",
        name: "Beedrill",
        type: "Bug",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png",
    },
    {
        id: "#0016",
        name: "Pidgey",
        type: "Normal",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
    },
    {
        id: "#0017",
        name: "Pidgeotto",
        type: "Normal",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
    },
    {
        id: "#0018",
        name: "Pidgeot",
        type: "Normal",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png",
    },
    {
        id: "#0019",
        name: "Rattata",
        type: "Normal",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png",
    },
    {
        id: "#0020",
        name: "Raticate",
        type: "Normal",
        image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png",
    },
];

function PokemonList({ searchTerm = "" }) {
    const [isTwoGrid, setIsTwoGrid] = useState(false);
    const [sortBy, setSortBy] = useState("default");
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handleCardClick = async (pokemon) => {
        const numericId = parseInt(pokemon.id.replace("#", ""));
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${numericId}`);
            const data = await res.json();
            const selected = {
                ...pokemon,
                sprite: data.sprites.front_default,
                stats: data.stats,
            };
            setSelectedPokemon(selected);
        } catch (error) {
            console.error("Gagal ambil data detail:", error);
            setSelectedPokemon(pokemon);
        }
    };

    const closeDetail = () => setSelectedPokemon(null);
    const allTypes = [...new Set(pokemonData.map((p) => p.type))];
    const filteredData = pokemonData
        .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((pokemon) => {
            if (sortBy.startsWith("type:")) {
                const type = sortBy.split(":")[1];
                return pokemon.type === type;
            }
            return true;
        })
        .sort((a, b) => {
            if (sortBy === "id") {
                return parseInt(a.id.slice(1)) - parseInt(b.id.slice(1));
            } else if (sortBy === "name") {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });

    return (
        <div className="pokemon-list-container">
            {selectedPokemon ? (
                <PokemonDetail pokemon={selectedPokemon} onClose={closeDetail} />
            ) : (
                <>
                    <div className="pokemon-list-header">
                        <select
                            className="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Sort by</option>
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            {allTypes.map((type) => (
                                <option key={type} value={`type:${type}`}>
                                    Type: {type}
                                </option>
                            ))}
                        </select>

                        <div className="grid-toggle-box">
                            <button
                                className={`grid-toggle-button ${!isTwoGrid ? "active" : ""}`}
                                onClick={() => setIsTwoGrid(false)}
                            >
                                <span className="grid-icon">◼</span>
                            </button>
                            <button
                                className={`grid-toggle-button ${isTwoGrid ? "active" : ""}`}
                                onClick={() => setIsTwoGrid(true)}
                            >
                                <span className="grid-icon">
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "repeat(2, 5px)",
                                            gap: "2px",
                                        }}
                                    >
                                        <div
                                            style={{ width: 5, height: 5, background: "#bfc6f9" }}
                                        />
                                        <div
                                            style={{ width: 5, height: 5, background: "#bfc6f9" }}
                                        />
                                        <div
                                            style={{ width: 5, height: 5, background: "#bfc6f9" }}
                                        />
                                        <div
                                            style={{ width: 5, height: 5, background: "#bfc6f9" }}
                                        />
                                    </div>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="pokemon-list-scrollable">
                        <div
                            className={`pokemon-list ${isTwoGrid ? "two-grid" : "one-grid"}`}
                        >
                            {filteredData.map((pokemon) => (
                                <PokemonCard
                                    key={pokemon.id}
                                    {...pokemon}
                                    isTwoGrid={isTwoGrid}
                                    onClick={() => handleCardClick(pokemon)}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default PokemonList;