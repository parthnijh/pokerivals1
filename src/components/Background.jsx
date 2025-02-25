import React, { useState } from "react";
import bg1 from "../assets/1.png";
import bg2 from "../assets/2.png";
import bg3 from "../assets/3.png";

const Background = () => {
  const backgrounds = [bg1, bg2, bg3];
  const [selectedBg, setSelectedBg] = useState(bg1); // Default background

  const handleSelect = (bg) => {
    setSelectedBg(bg);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${selectedBg})` }}
    >
      <h2 className="text-6xl font-extrabold tracking-widest bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
        POKERIVALS
      </h2>

      <div className="mt-12 flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
          Choose Your Theme
        </h1>

        <div className="grid grid-cols-3 gap-6">
          {backgrounds.map((bg, idx) => (
            <button key={idx} onClick={() => handleSelect(bg)}>
              <img
                src={bg}
                alt={`Background ${idx + 1}`}
                className="w-56 h-36 rounded-xl shadow-2xl cursor-pointer transform hover:scale-110 hover:brightness-110 transition-all duration-300"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Background;
