import React, { useState, useEffect } from 'react';

const PokemonVictoryScreen = () => {
  const [showStars, setShowStars] = useState(true);
  const [rotateVal, setRotateVal] = useState(0);
  
  // Animate pokeball rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setRotateVal(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(timer);
  }, []);
  
  // Toggle stars animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShowStars(prev => !prev);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-blue-500 to-blue-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Pokeball pattern background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-around">
            {[...Array(10)].map((_, colIndex) => (
              <div 
                key={colIndex} 
                className="w-24 h-24 m-4 rounded-full border border-white relative"
              >
                <div className="absolute inset-0 border-t-0 border-b-2 border-white"></div>
                <div className="absolute left-1/2 top-1/2 w-6 h-6 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Victory text */}
      <div className="z-10 text-center mb-16">
        <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-lg animate-bounce">
          <span className="text-yellow-300">YOU</span> 
          <span className="text-white"> WON!</span>
        </h1>
        <p className="text-2xl text-white mt-4">Congratulations, Trainer!</p>
      </div>
      
      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        {showStars && (
          <>
            <div className="absolute w-3 h-3 bg-white rounded-full left-1/4 top-1/3 animate-pulse"></div>
            <div className="absolute w-2 h-2 bg-white rounded-full left-1/3 top-2/3 animate-pulse delay-200"></div>
            <div className="absolute w-4 h-4 bg-white rounded-full right-1/4 top-1/3 animate-pulse delay-300"></div>
            <div className="absolute w-3 h-3 bg-white rounded-full right-1/3 top-2/3 animate-pulse delay-100"></div>
          </>
        )}
      </div>
      
      {/* Pokeball */}
      <div 
        className="relative w-32 h-32 mb-8 transform"
        style={{ transform: `rotate(${rotateVal}deg)` }}
      >
        {/* Red upper half */}
        <div className="absolute w-32 h-16 bg-red-600 rounded-t-full"></div>
        
        {/* White lower half */}
        <div className="absolute top-16 w-32 h-16 bg-white rounded-b-full"></div>
        
        {/* Black center line */}
        <div className="absolute top-14 w-32 h-4 bg-black"></div>
        
        {/* Center button */}
        <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white border-4 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Continue button */}
      <button className="mt-8 px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-full transform transition hover:scale-110 hover:bg-yellow-300 focus:outline-none z-10">
        Continue
      </button>
      
      {/* XP gained */}
      <div className="mt-4 text-white text-lg">
        <p>+850 XP gained</p>
      </div>
    </div>
  );
};

export default PokemonVictoryScreen;