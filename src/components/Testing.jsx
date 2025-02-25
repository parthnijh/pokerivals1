import React from 'react';

const Testing = ({ background }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-300">Selected Theme</h2>
      <img src={background} alt="Selected Background" className="w-full h-full rounded-xl shadow-lg" />
    </div>
  );
};

export default Testing;