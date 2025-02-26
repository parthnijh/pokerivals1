import React, { useState, useEffect } from "react";
import bg1 from "../assets/1.png";
import bg2 from "../assets/2.png";
import bg3 from "../assets/3.png";

const Background = ({ handleClick, setBgindex }) => {
  const backgrounds = [
    { img: bg1, name: "Pokémon Stadium", type: "Normal" },
    { img: bg2, name: "Water Arena", type: "Water" },
    { img: bg3, name: "Fire Colosseum", type: "Fire" }
  ];
  
  const [selectedBg, setSelectedBg] = useState(bg1);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [hover, setHover] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (bg, idx) => {
    setSelectedBg(bg);
    setSelectedIdx(idx);
  };

  const handleConfirm = () => {
    setBgindex(selectedIdx + 1);
    handleClick();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="w-24 h-24 border-t-4 border-b-4 border-red-600 rounded-full animate-spin"></div>
        <div className="mt-8 text-white text-2xl font-bold">Loading Battle Arena...</div>
        <div className="mt-4 w-64 h-3 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-500 to-yellow-500 animate-pulse-loading"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center transition-all duration-500 relative overflow-hidden"
      style={{ backgroundImage: `url(${selectedBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Animated Pokéballs in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="pokeball-float top-20 left-20"></div>
        <div className="pokeball-float top-40 right-40 delay-300"></div>
        <div className="pokeball-float bottom-20 right-20 delay-700"></div>
        <div className="pokeball-float bottom-40 left-40 delay-500"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="title-container mb-8">
          <h2 className="text-7xl font-extrabold tracking-widest text-center">
            <span className="poke-title-shadow">POKÉ</span>
            <span className="rivals-title-shadow">RIVALS</span>
          </h2>
          <div className="text-center text-xl text-yellow-300 font-semibold mt-2">BATTLE SIMULATOR</div>
        </div>

        {/* Content Container */}
        <div className="bg-black bg-opacity-70 rounded-xl border-2 border-yellow-500 p-8 w-full max-w-5xl backdrop-filter backdrop-blur-sm">
          {/* Choose Theme Section */}
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 text-white relative">
              <span className="relative z-10">Select Your Battle Arena</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"></span>
            </h1>
            
            <div className="grid grid-cols-3 gap-8 mb-8">
              {backgrounds.map((bg, idx) => (
                <div 
                  key={idx} 
                  className={`relative overflow-hidden transition-all duration-300 transform ${selectedIdx === idx ? 'scale-105 ring-4 ring-yellow-400' : 'opacity-80 hover:opacity-100'}`}
                  onMouseEnter={() => setHover(idx)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => handleSelect(bg.img, idx)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent ${selectedIdx === idx ? 'opacity-70' : 'opacity-50'}`}></div>
                  <img
                    src={bg.img}
                    alt={`Background ${idx + 1}`}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-70">
                    <div className="text-lg font-bold">{bg.name}</div>
                    <div className="text-sm text-yellow-300">Type: {bg.type}</div>
                  </div>
                  {(selectedIdx === idx || hover === idx) && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      {selectedIdx === idx ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Arena details */}
            <div className="w-full p-4 mb-8 bg-gray-900 bg-opacity-80 rounded-lg border border-gray-700">
              <div className="flex items-center">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-red-500 to-yellow-500 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{backgrounds[selectedIdx].name}</h3>
                  <p className="text-gray-300">This arena gives a slight advantage to {backgrounds[selectedIdx].type}-type Pokémon.</p>
                </div>
              </div>
            </div>
            
            {/* Confirm button */}
            <button 
              onClick={handleConfirm}
              className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white text-xl font-bold rounded-full hover:from-red-700 hover:to-red-900 transform hover:scale-105 transition-all duration-300 border-2 border-red-400 shadow-lg flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              ENTER BATTLE
            </button>
          </div>
        </div>
        
        {/* Bottom details */}
        <div className="text-center mt-6 text-sm text-gray-300">
          Press <span className="bg-gray-700 px-2 py-1 rounded text-white font-mono">ESC</span> to return to the main menu
        </div>
      </div>
      
      {/* Custom CSS */}
      <style jsx>{`
        @keyframes pulsate {
          0% { transform: scale(0.98); opacity: 0.8; }
          50% { transform: scale(1.02); opacity: 1; }
          100% { transform: scale(0.98); opacity: 0.8; }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }
        
        @keyframes pulse-loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-pulse-loading {
          animation: pulse-loading 1.5s ease-in-out infinite;
        }
        
        .poke-title-shadow {
          color: #3B82F6;
          text-shadow: 
            0 0 10px #3B82F6,
            0 0 20px rgba(59, 130, 246, 0.5),
            -2px -2px 0 #000,
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000;
        }
        
        .rivals-title-shadow {
          color: #EF4444;
          text-shadow: 
            0 0 10px #EF4444,
            0 0 20px rgba(239, 68, 68, 0.5),
            -2px -2px 0 #000,
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000;
        }
        
        .title-container {
          animation: pulsate 3s infinite ease-in-out;
        }
        
        .pokeball-float {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(to bottom, #f00 0%, #f00 50%, #fff 50%, #fff 100%);
          border: 4px solid #333;
          animation: float 10s infinite ease-in-out;
        }
        
        .pokeball-float:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: #fff;
          border-radius: 50%;
          border: 3px solid #333;
        }
        
        .delay-300 {
          animation-delay: 3s;
        }
        
        .delay-500 {
          animation-delay: 5s;
        }
        
        .delay-700 {
          animation-delay: 7s;
        }
      `}</style>
    </div>
  );
};

export default Background;