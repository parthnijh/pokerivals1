import React, { useState } from "react";
import bg1 from "../assets/1.png";
import bg2 from "../assets/2.png";
import bg3 from "../assets/3.png";


function PokeRivals({ sprites,bgindex }) {
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
            {/* Background Component as Background */}
           

            {/* Pokémon Image */}
            <div className="flex justify-center gap-[70%]">
            
            <img src={sprites} alt="Selected Pokémon" className="z-10 w-[16rem] h-[16rem]" />
            <img src={sprites} alt="Selected Pokémon" className="z-10 w-[16rem] h-[16rem] " />

            </div>
            
        </div>
    );
}

export default PokeRivals;
