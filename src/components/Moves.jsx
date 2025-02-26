import React, { useState, useEffect } from 'react';

const Moves = ({ pokemonName }) => {
    const [moves, setMoves] = useState([]);
    const [showMoves, setShowMoves] = useState(false);

    const displayMoves = async () => {
        try {
            setShowMoves(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const data = await response.json();
            setMoves(data.moves.slice(0, 4)); 
        } catch (error) {
            console.error("Error fetching moves:", error);
        }
    };

    return (
        <div>
            <button onClick={displayMoves}>
                Show Moves
            </button>
            {showMoves && (
                <ul>
                    {moves.map((move, index) => (
                        <li key={index}>{move.move.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Moves;

