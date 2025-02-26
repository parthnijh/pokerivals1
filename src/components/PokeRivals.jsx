import React, { useEffect, useState } from "react";
import bg1 from "../assets/1.png";
import bg2 from "../assets/2.png";
import bg3 from "../assets/3.png";

function PokeRivals({ sprites, bgindex, enemysprite, moves, setStep, enemymoves, playername, enemyname }) {
    const [moveData, setMoveData] = useState([]);
    const [CompData, setCompData] = useState([]);
    const [playerHp, setPlayerHp] = useState(100);
    const [enemyHp, setEnemyHp] = useState(100);
    const [battleLog, setBattleLog] = useState([]);

    useEffect(() => {
        const movefetchData = async (moveName) => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
                const data = await response.json();
                return { name: moveName, power: data.power || 40 };
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAllMoves = async () => {
            const moveDetails = await Promise.all(moves.map(moveName => movefetchData(moveName)));
            setMoveData(moveDetails);
        };

        const fetchAllCompMoves = async () => {
            const CompmoveDetails = await Promise.all(enemymoves.map(CompmoveName => movefetchData(CompmoveName)));
            setCompData(CompmoveDetails);
        };

        fetchAllMoves();
        fetchAllCompMoves();
    }, [moves, enemymoves]);

    useEffect(() => {
        if (enemyHp === 0) {
            setStep((prevStep) => prevStep + 2);
        }
    }, [enemyHp, setStep]);

    useEffect(() => {
        if (playerHp === 0) {
            setStep((prevStep) => prevStep + 1);
        }
    }, [playerHp, setStep]);

    function getBackgroundImage(bgindex) {
        switch (bgindex) {
            case 1: return bg1;
            case 2: return bg2;
            case 3: return bg3;
            default: return bg1;
        }
    }

    function CalcDamage(index) {
        if (!moveData.length || playerHp === 0) return;

        const level = 100;
        const attack = 100;
        const defense = 100;
        const power = moveData[index].power;
        const moveName = moveData[index].name;

        const damage = Math.floor((((2 * level / 5 + 2) * power * (attack / defense)) / 50) + 2);

        setBattleLog((prevLog) => [`${playername} used ${moveName} and dealt ${damage} damage!`, ...prevLog]);

        setEnemyHp((prevHp) => Math.max(prevHp - damage, 0));

        setTimeout(() => {
            enemyAttack();
        }, 1000);
    }

    function enemyAttack() {
        if (!CompData.length || enemyHp === 0) return;

        const randomIndex = Math.floor(Math.random() * CompData.length);
        const power = CompData[randomIndex].power;
        const moveName = CompData[randomIndex].name;

        const level = 100;
        const attack = 100;
        const defense = 100;
        const damage = Math.floor((((2 * level / 5 + 2) * power * (attack / defense)) / 50) + 2);

        setBattleLog((prevLog) => [`${enemyname} used ${moveName} and dealt ${damage} damage!`, ...prevLog]);

        setPlayerHp((prevHp) => Math.max(prevHp - damage, 0));
    }

    return (
        <div 
            className="w-full h-screen flex flex-col items-center justify-between bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `url(${getBackgroundImage(bgindex)})` }}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black opacity-20"></div>

            {/* Battle header with player names - moved to top */}
            <div className="relative z-10 w-full text-center mt-4">
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                    <span className="text-yellow-300">{playername}</span> 
                    <span className="text-white mx-2">vs</span> 
                    <span className="text-red-400">{enemyname}</span>
                </h1>
            </div>

            {/* Main battle area */}
            <div className="relative z-10 flex justify-between items-center w-full max-w-6xl px-8 mt-6">
                {/* Player side */}
                <div className="text-center flex flex-col items-center relative">
                    {/* Name moved above HP bar */}
                    <div className="mb-3 text-white text-xl font-bold drop-shadow-lg bg-yellow-600 bg-opacity-70 px-4 py-1 rounded-full">
                        {playername}
                    </div>
                    {/* HP bar with fixed positioning */}
                    <div className="w-[225px] bg-gray-800 rounded-full overflow-hidden mb-4 border-2 border-yellow-400 shadow-lg p-1 relative">
                        <div className="bg-gradient-to-r from-green-500 to-green-300 h-5 rounded-full transition-all duration-500" 
                            style={{ width: `${playerHp}%` }}>
                        </div>
                        <div className="absolute top-0 left-0 w-full text-center text-white font-bold text-sm mt-1">
                            HP: {playerHp}/100
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-75 blur-sm"></div>
                        <img src={sprites} alt="Player Pokémon" className="relative w-[14rem] h-[14rem] drop-shadow-lg animate-bounce-slow" />
                    </div>
                </div>

                {/* VS symbol in middle */}
                <div className="relative z-10">
                    <div className="text-6xl font-bold text-white drop-shadow-lg opacity-80">VS</div>
                </div>

                {/* Enemy side */}
                <div className="text-center flex flex-col items-center">
                    {/* Name moved above HP bar */}
                    <div className="mb-3 text-white text-xl font-bold drop-shadow-lg bg-red-600 bg-opacity-70 px-4 py-1 rounded-full">
                        {enemyname}
                    </div>
                    {/* HP bar with fixed positioning */}
                    <div className="w-[225px] bg-gray-800 rounded-full overflow-hidden mb-4 border-2 border-red-500 shadow-lg p-1 relative">
                        <div className="bg-gradient-to-r from-red-600 to-red-400 h-5 rounded-full transition-all duration-500" 
                            style={{ width: `${enemyHp}%` }}>
                        </div>
                        <div className="absolute top-0 left-0 w-full text-center text-white font-bold text-sm mt-1">
                            HP: {enemyHp}/100
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full opacity-75 blur-sm"></div>
                        <img src={enemysprite} alt="Enemy Pokémon" className="relative w-[14rem] h-[14rem] drop-shadow-lg animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Bottom section with moves and battle log */}
            <div className="relative z-10 w-full flex justify-between items-end pb-6 px-8 mt-auto">
                {/* Move buttons - positioned to avoid being covered by battle log */}
                <div className="grid grid-cols-2 gap-3 w-[45%]">
                    {moves.map((move, index) => (
                        <button 
                            key={index} 
                            className="px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105 border-2 border-yellow-300 capitalize"
                            onClick={() => CalcDamage(index)}
                        >
                            {move}
                        </button>
                    ))}
                </div>

                {/* Battle log - moved to the right side */}
                <div className="w-[45%] bg-black bg-opacity-70 p-4 rounded-lg text-white shadow-lg border-2 border-gray-600">
                    <h2 className="text-xl font-bold mb-2 text-yellow-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Battle Log
                    </h2>
                    <div className="h-32 overflow-y-auto scrollbar-thin">
                        {battleLog.length > 0 ? (
                            battleLog.map((log, index) => (
                                <p key={index} className={`text-sm mb-1 ${index === 0 ? 'text-yellow-300 font-bold' : 'text-gray-300'}`}>
                                    {log}
                                </p>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 italic">Battle has not started yet. Choose a move to begin!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s infinite;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 8px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: #4a5568;
                    border-radius: 10px;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: #f6e05e;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}

export default PokeRivals;