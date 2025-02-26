import React, { useEffect, useState } from "react";
import Background from "./Background";
import PokeRivals from "./PokeRivals";

function PokemonSelection({handleClick, setPassedImg, setEnemyPokeImg, moves, setMoves}) {
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [showmoves, setShowmoves] = useState(false);
    
    useEffect(() => {
        const fetchPoke = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/generation/1/`);
                const data = await response.json();
                const pokemonNames = data.pokemon_species.map((pokemon) => pokemon.name);
                if(!response.ok){
                    console.log("not okay");
                }

                const pokemonData = await Promise.all(
                    pokemonNames.map(async (name) => {
                        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                        if (!res.ok) return null;
                        const pokeData = await res.json();
                        // Use animated sprites when available, otherwise fallback to regular
                        const spriteUrl = 
                            pokeData.sprites.versions['generation-v']['black-white'].animated?.front_default || 
                            pokeData.sprites.other['official-artwork'].front_default ||
                            pokeData.sprites.front_default;
                        
                        return {
                            name: pokeData.name,
                            img: spriteUrl,
                            moves: pokeData.moves.slice(0, 20).map(m => m.move.name), // Limit to first 20 moves for better display
                        };
                    })
                );
 
                setPokemons(pokemonData.filter(Boolean));
               
            } catch (error) {
                console.error(error);
            }
        };

        fetchPoke();
    }, []);
   
    useEffect(() => {
        if (pokemons.length > 0) {
            let compPoke = Math.floor(Math.random() * pokemons.length);
            setEnemyPokeImg(pokemons[compPoke].img);
        }
    }, [pokemons]);  // Runs when pokemons array is updated
    
    const handleMoveSelection = (move) => {
        // Fixed the move selection logic to prevent duplicates and ensure it works consistently
        setMoves((prevMoves) => {
            // If already have 4 moves, don't add more
            if (prevMoves.length >= 4) return prevMoves;
            // If move is already selected, don't add it again
            if (prevMoves.includes(move)) return prevMoves;
            // Add the new move
            return [...prevMoves, move];
        });
    };
    
    return (
        <div className="flex flex-col items-center min-h-screen text-white relative overflow-hidden">
            {/* PlayStation-style background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-800 to-blue-600 z-0">
                {/* Abstract geometric shapes for PS background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-300"></div>
                    <div className="absolute top-40 right-20 w-40 h-40 transform rotate-45 bg-purple-400"></div>
                    <div className="absolute bottom-20 left-1/4 w-64 h-16 bg-blue-400"></div>
                    <div className="absolute bottom-40 right-1/3 w-20 h-20 rounded-full bg-indigo-500"></div>
                </div>
                {/* Grid overlay for PlayStation aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-10"
                     style={{backgroundSize: '50px 50px', backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)'}}>
                </div>
            </div>
            
            {/* Content - with increased z-index to ensure visibility */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8">
                {/* Header with PlayStation-style title */}
                <div className="mb-8 text-center">
                    <h1 className="text-5xl font-extrabold mb-2 tracking-wider text-white shadow-blue-500/50 shadow-lg" 
                        style={{textShadow: '0 0 10px #4299e1, 0 0 20px #4299e1, 0 0 30px #4299e1'}}>
                        POKÉMON SELECTION
                    </h1>
                    <div className="h-1 w-64 bg-blue-400 mx-auto rounded-full shadow-lg shadow-blue-500/50" 
                         style={{boxShadow: '0 0 10px #4299e1'}}></div>
                </div>
                
                {/* Move selection indicator with PlayStation UI style */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 mb-6 w-full max-w-md mx-auto">
                    {moves.length > 0 ? (
                        moves.map((move, index) => (
                            <div key={index} className="p-3 bg-gray-900 bg-opacity-80 text-white text-center rounded-md border-2 border-blue-500 shadow-lg transform transition-all hover:scale-105"
                                 style={{boxShadow: '0 0 10px rgba(66, 153, 225, 0.5)'}}>
                                <p className="text-xs text-blue-300 font-medium mb-1">{index+1}/4</p>
                                <p className="font-bold text-sm capitalize truncate">{move}</p>
                            </div>
                        ))
                    ) : (
                        showmoves ? <p className="text-white text-center">Select your moves (0/4)</p> : ""
                    )}
                </div>
                
                {/* Proceed button with PlayStation styling */}
                {moves.length === 4 && showmoves ? (
                    <div className="text-center my-4">
                        <button 
                            className="px-8 py-3 bg-blue-700 text-white font-bold tracking-wider rounded-md border-2 border-blue-400 shadow-lg transform transition hover:scale-105 hover:bg-blue-600 active:scale-95"
                            style={{boxShadow: '0 0 15px rgba(66, 153, 225, 0.7)'}}
                            onClick={handleClick}
                        >
                            PROCEED TO BATTLE
                        </button>
                    </div>
                ) : ""}

                {/* Selected Pokémon Display with PlayStation-style card */}
                {showmoves ? (
                    <div className="mb-8 p-6 border-2 border-blue-400 rounded-lg bg-gray-900 bg-opacity-80 shadow-lg w-full max-w-lg mx-auto"
                         style={{boxShadow: '0 0 20px rgba(66, 153, 225, 0.6)'}}>
                        <h2 className="text-2xl font-bold text-center uppercase mb-4" 
                            style={{textShadow: '0 0 10px #4299e1, 0 0 20px #4299e1'}}>
                            {selectedPokemon.name} - Select Moves
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                            {selectedPokemon.moves.map((move, index) => (
                                <div 
                                    key={index} 
                                    className={`p-2 bg-gray-800 bg-opacity-90 text-white text-center rounded-md cursor-pointer border border-blue-500 transform transition hover:scale-105 ${moves.includes(move) ? 'bg-blue-700 border-blue-300' : ''}`}
                                >
                                    <button 
                                        onClick={() => handleMoveSelection(move)} 
                                        className="w-full capitalize text-sm font-medium"
                                        disabled={moves.includes(move) || moves.length >= 4}
                                    >
                                        {move}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4 text-sm text-blue-300">
                            Select 4 moves to proceed ({moves.length}/4)
                        </div>
                    </div>
                ) : (
                    selectedPokemon && (
                        <div className="mb-8 p-5 border-2 border-blue-400 rounded-lg bg-gray-900 bg-opacity-80 shadow-lg max-w-xs mx-auto transform transition-all hover:scale-105"
                             style={{boxShadow: '0 0 20px rgba(66, 153, 225, 0.6)'}}>
                            <h2 className="text-2xl font-bold text-center uppercase mb-2 text-blue-300"
                                style={{textShadow: '0 0 10px #4299e1'}}>
                                {selectedPokemon.name}
                            </h2>
                            <div className="rounded-full bg-gradient-to-br from-blue-900 to-indigo-900 p-4 mx-auto mb-4">
                                <img 
                                    src={selectedPokemon.img} 
                                    alt={selectedPokemon.name} 
                                    className="w-40 h-40 mx-auto object-contain transform hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <button
                                className="w-full p-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-lg tracking-wide rounded-md border border-blue-400 transition-colors"
                                style={{boxShadow: '0 0 10px rgba(66, 153, 225, 0.7)'}}
                                onClick={() => {
                                    setPassedImg(selectedPokemon.img);
                                    setShowmoves(true);
                                }}
                            >
                                I CHOOSE YOU!
                            </button>
                        </div>
                    )
                )}
           
                {/* Pokémon Grid with PlayStation-style cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                    {pokemons.map((pokemon) => (
                        <button
                            key={pokemon.name}
                            onClick={() => {setSelectedPokemon(pokemon);}}
                            className={`relative flex flex-col items-center justify-center p-3 border-2 rounded-lg bg-gray-800 bg-opacity-70 shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-700 ${
                                selectedPokemon?.name === pokemon.name
                                    ? "border-blue-400 bg-blue-900 bg-opacity-40 scale-105 shadow-lg shadow-blue-500/40"
                                    : "border-gray-700"
                            }`}
                            style={selectedPokemon?.name === pokemon.name ? {boxShadow: '0 0 15px rgba(66, 153, 225, 0.6)'} : {}}
                        >
                            <img 
                                src={pokemon.img} 
                                alt={pokemon.name} 
                                className="w-16 h-16 object-contain transform hover:rotate-3 transition-all"
                            />
                            <span className="w-full text-center text-xs font-bold capitalize bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 text-white py-1 px-2 rounded-md mt-2">
                                {pokemon.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonSelection;
