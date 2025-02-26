import React, { useState, useEffect } from 'react';

const PokemonDefeatScreen = () => {
  const [smokeOpacity, setSmokeOpacity] = useState(0.5);
  const [pokemonShake, setPokemonShake] = useState(false);
  
  // Animate smoke effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSmokeOpacity(prev => 0.3 + Math.random() * 0.3);
    }, 800);
    
    return () => clearInterval(timer);
  }, []);
  
  // Pokéball shake animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPokemonShake(prev => !prev);
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-red-900 to-red-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Smoke/ash effect */}
      <div className="absolute inset-0" style={{ opacity: smokeOpacity }}>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-gray-800 rounded-full"
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.3
            }}
          ></div>
        ))}
      </div>
      
      {/* Pokeball pattern background - darker, more subtle */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-around">
            {[...Array(10)].map((_, colIndex) => (
              <div 
                key={colIndex} 
                className="w-24 h-24 m-4 rounded-full border border-gray-600 relative"
              >
                <div className="absolute inset-0 border-t-0 border-b-2 border-gray-600"></div>
                <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Defeat text */}
      <div className="z-10 text-center mb-16">
        <h1 className="text-6xl font-bold text-red-500 mb-2 drop-shadow-lg">
          YOU LOST!
        </h1>
        <p className="text-2xl text-gray-300 mt-4">Your Pokémon fainted...</p>
      </div>
      
      {/* Broken/defeated Pokeball */}
      <div 
        className={`relative w-32 h-32 mb-8 ${pokemonShake ? 'translate-x-1' : '-translate-x-1'}`}
      >
        {/* Red upper half - cracked */}
        <div className="absolute w-32 h-16 bg-red-600 rounded-t-full overflow-hidden">
          <div className="absolute w-full h-full">
            <div className="absolute bg-red-800 w-2 h-12 rotate-45 left-1/4 top-0"></div>
            <div className="absolute bg-red-800 w-2 h-8 -rotate-12 right-1/4 top-2"></div>
            <div className="absolute bg-red-800 w-2 h-10 rotate-30 left-1/2 top-1"></div>
          </div>
        </div>
        
        {/* White lower half - damaged */}
        <div className="absolute top-16 w-32 h-16 bg-gray-300 rounded-b-full overflow-hidden">
          <div className="absolute w-full h-full">
            <div className="absolute bg-gray-400 w-2 h-12 rotate-12 right-1/3 top-0"></div>
            <div className="absolute bg-gray-400 w-3 h-8 -rotate-25 left-1/4 top-2"></div>
          </div>
        </div>
        
        {/* Black center line - slightly askew */}
        <div className="absolute top-14 w-32 h-4 bg-black transform -rotate-2"></div>
        
        {/* Center button - dimmed */}
        <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-gray-400 border-4 border-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-gray-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Try again button */}
      <button className="mt-8 px-8 py-3 bg-red-600 text-white font-bold rounded-full transform transition hover:scale-110 hover:bg-red-500 focus:outline-none z-10">
        Try Again
      </button>
      
      {/* Return to Pokémon Center link */}
      <button className="mt-4 text-gray-300 underline hover:text-white">
        Return to Pokémon Center
      </button>
    </div>
  );
};

export default PokemonDefeatScreen;