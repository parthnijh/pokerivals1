import React, { useState } from "react";
import bg1 from "../assets/1.png";
import bg2 from "../assets/2.png";
import bg3 from "../assets/3.png";


function PokeRivals({ sprites,bgindex ,enemysprite}) {
    function getBackgroundImage(bgindex) {
        switch (bgindex) {
            case 1: return bg1;
            case 2: return bg2;
            case 3: return bg3;
            default: return bg1; // Default background
        }
    }
   
    console.log("Received sprites in PokeRivals:", sprites);
    const [step, setStep] = useState(0);

    function handleClick() {
        setStep(prevStep => prevStep + 1);
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${getBackgroundImage(bgindex)})` }}
        >
           
           

            
            <div className="flex justify-center gap-[40%] items-center">
              
                <div className="text-center">
                  
                    <div className="w-[180px] bg-gray-300 rounded-lg overflow-hidden mb-2 border-2 border-black">
                        <div className="bg-green-500 h-5 w-[100%]"></div>
                    </div>
                  
                    <img src={sprites} alt="Player Pokémon" className="z-10 w-[16rem] h-[16rem]" />
                </div>

                {/* Enemy Pokémon */}
                <div className="text-center">
                    {/* Static HP Bar */}
                    <div className="w-[180px] bg-gray-300 rounded-lg overflow-hidden mb-2 border-2 border-black">
                        <div className="bg-red-500 h-5 w-[100%]"></div>
                    </div>
                    {/* Pokémon Image */}
                    <img src={enemysprite} alt="Enemy Pokémon" className="z-10 w-[16rem] h-[16rem]" />
                </div>
            </div>
            
        </div>
    );
}

export default PokeRivals;
