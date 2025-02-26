import React, { useState } from "react";
import bg1 from "../assets/1.png";
import bg2 from "../assets/2.png";
import bg3 from "../assets/3.png";

function PokeRivals({ sprites, bgindex, enemysprite, moves }) {
    function getBackgroundImage(bgindex) {
        switch (bgindex) {
            case 1: return bg1;
            case 2: return bg2;
            case 3: return bg3;
            default: return bg1; // Default background
        }
    }

    console.log("Received sprites in PokeRivals:", sprites, moves);
    const [showMoves, setShowMoves] = useState(false);

    return (
        <div 
            className="w-full h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${getBackgroundImage(bgindex)})` }}
        >
            {/* Dark Overlay for Better Visibility */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            {/* Battle Arena */}
            <div className="relative flex justify-center gap-[20%] items-center w-full max-w-5xl">

                {/* Player Pokémon */}
                <div className="text-center flex flex-col items-center relative">
                    {/* HP Bar */}
                    <div className="w-[200px] bg-gray-300 rounded-full overflow-hidden mb-3 border-4 border-black shadow-md">
                        <div className="bg-green-500 h-6 w-[100%] rounded-full"></div>
                    </div>

                    {/* Pokémon Image with Animation */}
                    <img src={sprites} alt="Player Pokémon" className="w-[12rem] h-[12rem] drop-shadow-lg animate-fadeIn" />

                    {/* Move Selection - Absolutely Positioned */}
                    <div className="relative w-full">
                        {!showMoves ? (
                            <button 
                                onClick={() => setShowMoves(true)} 
                                className="mt-4 px-5 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
                            >
                                Show Moves
                            </button>
                        ) : (
                            <div className="absolute bottom-[-250px]  transform w-48 bg-gray-900 p-4 rounded-xl border border-gray-700 shadow-lg">
                                {moves.map((move, index) => (
                                    <button 
                                        key={index} 
                                        className="block w-full px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition mb-2"
                                    >
                                        {move}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Enemy Pokémon */}
                <div className="text-center flex flex-col items-center">
                    {/* Enemy HP Bar */}
                    <div className="w-[200px] bg-gray-300 rounded-full overflow-hidden mb-3 border-4 border-black shadow-md">
                        <div className="bg-red-500 h-6 w-[100%] rounded-full"></div>
                    </div>

                    {/* Pokémon Image with Animation */}
                    <img src={enemysprite} alt="Enemy Pokémon" className="w-[12rem] h-[12rem] drop-shadow-lg animate-fadeIn delay-200" />
                </div>
            </div>
        </div>
    );
}

export default PokeRivals;
