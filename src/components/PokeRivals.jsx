import React, { useEffect, useState } from "react";
import bg1 from "../assets/1.png";
import bg2 from "../assets/2.png";
import bg3 from "../assets/3.png";


function PokeRivals({ sprites, bgindex, enemysprite, moves, handleClick }) {
    const [moveData, setMoveData] = useState([]);
    const [compMoveData,setCompData] = useState([])
    const [playerHp, setPlayerHp] = useState(100);
    const [enemyHp, setEnemyHp] = useState(100);
    const [playerMove,setPlayerMove] = useState('');
    const [compMove,setCompMove] = useState('');
    
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
            const CompmoveDetails = await Promise.all(moves.map(CompmoveName => movefetchData(CompmoveName)));
            setMoveData(CompmoveDetails);
        };

        fetchAllMoves();
    }, [moves]);

    function getBackgroundImage(bgindex) {
        switch (bgindex) {
            case 1: return bg1;
            case 2: return bg2;
            case 3: return bg3;
            default: return bg1;
        }
    }

    function CalcDamage(index) {
        if (!moveData.length) return;
        if(playerHp === 0){
            
        }

        const level = 100;
        const attack = 100;
        const defense = 100;
        const power = moveData[index].power;
        console.log(moveData[index].name)
        setPlayerMove(moveData[index].name)

        const damage = Math.floor((((2 * level / 5 + 2) * power * (attack / defense)) / 50) + 2);
        console.log(`Player dealt ${damage} damage`);

        setEnemyHp((prevHp) => Math.max(prevHp - damage, 0));

        // Enemy attacks after a short delay
        setTimeout(() => {
            enemyAttack();
        }, 1000);
    }

    function enemyAttack() {
        if (!moveData.length) return;

        const randomIndex = Math.floor(Math.random() * moveData.length);
        const power = moveData[randomIndex].power;
        console.log(moveData[randomIndex].name)

        const level = 100;
        const attack = 100;
        const defense = 100;
        const damage = Math.floor((((2 * level / 5 + 2) * power * (attack / defense)) / 50) + 2);

        console.log(`Enemy dealt ${damage} damage`);

        setPlayerHp((prevHp) => Math.max(prevHp - damage, 0));
    }

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
                        <div className="bg-green-500 h-6 rounded-full transition-all duration-500" 
                            style={{ width: `${playerHp}%` }}>
                        </div>
                    </div>

                    {/* Pokémon Image */}
                    <img src={sprites} alt="Player Pokémon" className="w-[12rem] h-[12rem] drop-shadow-lg animate-fadeIn" />

                    {/* Move Selection */}
                    <div className="relative w-full">
                        <div className="absolute bottom-[-250px] transform w-48 bg-gray-900 p-4 rounded-xl border border-gray-700 shadow-lg">
                            {moves.map((move, index) => (
                                <button 
                                    key={index} 
                                    className="block w-full px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition mb-2"
                                    onClick={() => CalcDamage(index)}
                                >
                                    {move}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enemy Pokémon */}
                <div className="text-center flex flex-col items-center">
                    {/* Enemy HP Bar */}
                    <div className="w-[200px] bg-gray-300 rounded-full overflow-hidden mb-3 border-4 border-black shadow-md">
                        <div className="bg-red-500 h-6 rounded-full transition-all duration-500" 
                            style={{ width: `${enemyHp}%` }}>
                        </div>
                    </div>

                    {/* Pokémon Image */}
                    <img src={enemysprite} alt="Enemy Pokémon" className="w-[12rem] h-[12rem] drop-shadow-lg animate-fadeIn delay-200" />
                </div>
            </div>
        </div>
    );
}

export default PokeRivals;
