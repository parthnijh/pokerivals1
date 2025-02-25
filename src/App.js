import './App.css';
import Background from './components/Background';
import PokemonSelection from './components/PokemonSelection';
import PokeRivals from './components/PokeRivals';
import { useState } from 'react';

function App() {
  const [step, setStep] = useState(0);
  const [passedimg, setPassedImg] = useState(null);
  const[bgindex,setBgindex]=useState(0);
  

  function handleClick() {
    setStep(prevStep => prevStep + 1);
  }

  return (
    <div className="App">
      {step >= 1 && step < 2 && <Background handleClick={handleClick} setBgindex={setBgindex} />} 
      
      {step === 0 && (
        <PokemonSelection handleClick={handleClick} setPassedImg={setPassedImg}  /> 
      )}

      {step >= 2 && <PokeRivals sprites={passedimg} bgindex={bgindex}/>}
    </div>
  );
}

export default App;
