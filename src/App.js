import './App.css';
import Background from './components/Background';
import PokemonSelection from './components/PokemonSelection';
import PokeRivals from './components/PokeRivals';
import { useState } from 'react';

function App() {
  const [step, setStep] = useState(0);
  const [passedimg, setPassedImg] = useState(null);
  const[enemypokeimg,setEnemyPokeImg]=useState(null);
  const[bgindex,setBgindex]=useState(0);
  const[moves,setMoves]=useState([]);
  

  function handleClick() {
    setStep(prevStep => prevStep + 1);
  }

  return (
    <div className="App">
      {step >= 1 && step < 2 && <Background handleClick={handleClick} setBgindex={setBgindex} />} 
      
      {step === 0 && (
        <PokemonSelection handleClick={handleClick} setPassedImg={setPassedImg} setEnemyPokeImg={setEnemyPokeImg} moves={moves} setMoves={setMoves} /> 
      )}

    {step >= 2 && <PokeRivals sprites={passedimg} bgindex={bgindex} enemysprite={enemypokeimg} moves={moves}  handleClick={handleClick}/>}
    </div>
  );
}

export default App;
