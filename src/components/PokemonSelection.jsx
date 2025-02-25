import React, { useEffect, useState } from "react";
import Background from "./Background";
import PokeRivals from "./PokeRivals";

function PokemonSelection({handleClick,setPassedImg,setEnemyPokeImg}) {
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    
    

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
                        return {
                            name: pokeData.name,
                            img: pokeData.sprites.front_default,
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
    
    
    
    return (
        <div className="flex flex-col items-center bg-gradient-to-b from-red-600 via-yellow-400 to-blue-600 min-h-screen p-6 text-white">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black drop-shadow-lg">
                Select Your Pokémon!
            </h1>

            {/* Selected Pokémon Display */}
            {selectedPokemon &&
            
            (
                  
                
                <div className="mb-6 p-4 border-4 border-white rounded-lg bg-black bg-opacity-70 shadow-lg">
                    <h2 className="text-2xl font-bold text-center uppercase text-yellow-300">
                        {selectedPokemon.name}
                    </h2>
                    <img
                        src={selectedPokemon.img}
                        alt={selectedPokemon.name}
                        className="w-32 h-32 mx-auto"
                    />
                    <p className="p-2 bg-amber-400 cursor-pointer" onClick={() => {
                            setPassedImg(selectedPokemon.img); // ✅ Send selected image to App.js
                            handleClick(); // ✅ Move to next step
                        }}>I choose you!!</p>
                   
                </div>
            )
            }

            {/* Pokémon Grid */}
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
               
            
                {pokemons.map((pokemon) => (
                    <button
                        key={pokemon.name}
                        onClick={() => {setSelectedPokemon(pokemon);}}
                        className={`relative flex flex-col items-center justify-center p-3 border-4 rounded-xl bg-white shadow-md transition duration-200  hover:scale-110 hover:border-yellow-500 ${
                            selectedPokemon?.name === pokemon.name
                                ? "border-yellow-500 scale-110"
                                : "border-transparent"
                        }`}
                    >
                        <img src={pokemon.img} alt={pokemon.name} className="w-16 h-16" />
                        <span className="absolute bottom-0 left-0 right-0 text-center text-xs font-bold capitalize bg-black bg-opacity-70 text-yellow-200 p-1 rounded-b-lg">
                            {pokemon.name}
                        </span>
                    </button>
                ))}
            </div>
         

        </div>
        
    );

}

export default PokemonSelection;
