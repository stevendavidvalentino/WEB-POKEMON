import React from "react";
import "./PokemonDetail.css";

function PokemonDetail({ pokemon, onClose }) {
    const numericId =
        typeof pokemon.id === "number"
            ? pokemon.id
            : parseInt(String(pokemon.id).replace(/\D/g, ""));

    const paddedId = `#${String(numericId).padStart(4, "0")}`;
    const largeImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numericId}.png`;
    const smallSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numericId}.png`;

    const health =
        pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat || 0;
    const attack =
        pokemon.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0;
    const defense =
        pokemon.stats.find((stat) => stat.stat.name === "defense")?.base_stat || 0;
    const healthPercentage = Math.min((health / 100) * 100, 100);

    return (
        <div className="pokemon-detail-container">
            <div className="pokemon-detail-header">
                <span className="pokemon-id">{paddedId}</span>
                <button className="close-button" onClick={onClose}>
                    ✕
                </button>
            </div>
            <img src={largeImage} alt={pokemon.name} className="pokemon-large-img" />
            <h1 className="pokemon-name-detail">{pokemon.name}</h1>
            <img
                className="pokemon-sprite-detail"
                src={smallSprite}
                alt={pokemon.name}
            />

            <div className="pokemon-stats-box">
                <div className="stat health">
                    <span className="label">Health</span>
                    <div className="health-bar-container">
                        <div
                            className="health-bar"
                            style={{ width: `${healthPercentage}%` }}
                        ></div>
                    </div>
                    <div className="health-value">
                        <span className="bold">{health}</span> from 100
                    </div>
                </div>

                <div className="stat-row">
                    <div className="stat-left">
                        <span className="label">Attack</span>
                        <span className="value">{attack}</span>
                    </div>
                    <div className="stat-right">
                        <span className="label">Defense</span>
                        <span className="value">{defense}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetail;