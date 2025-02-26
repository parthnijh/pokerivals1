import React, { useState } from "react";
import bg1 from "../assets/1.png";
import bg2 from "../assets/2.png";
import bg3 from "../assets/3.png";

const Background = ({handleClick, setBgindex}) => {
    const backgrounds = [bg1, bg2, bg3];
    const [selectedBg, setSelectedBg] = useState(bg1);
    
    // Default background
    const handleSelect = (bg) => {
        setSelectedBg(bg);
    };
    
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center transition-all duration-500 overflow-hidden"
            style={{ 
                backgroundImage: `url(${selectedBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}
        >
            {/* PS5-style overlay with subtle grid lines */}
            <div className="absolute inset-0 bg-blue-900 bg-opacity-30 z-0"
                 style={{
                     backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
                     backgroundSize: '20px 20px',
                     mixBlendMode: 'overlay'
                 }}></div>
            
            {/* Ambient light effects */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-indigo-600 rounded-full filter blur-3xl opacity-15"></div>
            </div>
            
            {/* Content container */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Game title with PS5-style glow */}
                <h2 className="text-6xl font-extrabold tracking-widest text-white mb-4"
                    style={{
                        textShadow: '0 0 10px rgba(239, 68, 68, 0.7), 0 0 20px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)',
                        letterSpacing: '0.15em'
                    }}>
                    POKERIVALS
                </h2>
                
                {/* Animated separator line - PS5 style */}
                <div className="w-64 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400 rounded-full mb-12"
                     style={{boxShadow: '0 0 10px rgba(59, 130, 246, 0.7)'}}></div>
                
                <div className="mt-8 flex flex-col items-center space-y-8">
                    {/* Section title */}
                    <h1 className="text-3xl font-bold text-white mb-6"
                        style={{textShadow: '0 0 15px rgba(59, 130, 246, 0.8)'}}>
                        SELECT YOUR ARENA
                    </h1>
                    
                    {/* Background selection cards */}
                    <div className="grid grid-cols-3 gap-8">
                        {backgrounds.map((bg, idx) => (
                            <div key={idx} className="relative group">
                                <button 
                                    onClick={() => {handleSelect(bg); setBgindex(idx+1); handleClick()}}
                                    className="relative overflow-hidden rounded-lg focus:outline-none transform transition-all duration-300"
                                >
                                    {/* Card container with interactive effects */}
                                    <div className="relative overflow-hidden rounded-lg group-hover:scale-105 transition-all duration-300">
                                        {/* Background image */}
                                        <img
                                            src={bg}
                                            alt={`Arena ${idx + 1}`}
                                            className="w-56 h-36 object-cover rounded-lg shadow-xl transform transition-all duration-300"
                                            style={{
                                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                                                filter: selectedBg === bg ? 'brightness(1.2)' : 'brightness(0.8)'
                                            }}
                                        />
                                        
                                        {/* Selection indicator */}
                                        {selectedBg === bg && (
                                            <div className="absolute inset-0 border-4 border-blue-400 rounded-lg"
                                                 style={{boxShadow: '0 0 15px rgba(59, 130, 246, 0.7)'}}></div>
                                        )}
                                        
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300 rounded-lg"></div>
                                        
                                        {/* PS5 controller icon on hover */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    {/* Arena label */}
                                    <div className="absolute -bottom-2 left-0 right-0 text-center">
                                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-800 to-indigo-900 text-xs font-bold tracking-wider uppercase rounded-full"
                                              style={{boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'}}>
                                            Arena {idx + 1}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    {/* PS5-style instruction text */}
                    <p className="text-sm text-blue-100 mt-6 opacity-80">
                        Select an arena and press ✕ to continue
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Background;
