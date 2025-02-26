import './App.css';
import Background from './components/Background';
import PokemonSelection from './components/PokemonSelection';
import PokeRivals from './components/PokeRivals';
import { useState } from 'react';
import Lost from './components/Lost';
import Won from './components/Won';

function App() {
  const [step, setStep] = useState(0);
  const [passedimg, setPassedImg] = useState(null);
  const[enemypokeimg,setEnemyPokeImg]=useState(null);
  const[bgindex,setBgindex]=useState(0);
  const[moves,setMoves]=useState([]);
  const[enemymoves,setEnemyMoves]=useState([]);
  const[playername,setPlayerName]=useState("");
  const[enemyname,setEnemyName]=useState("");
  

  function handleClick() {
    setStep(prevStep => prevStep + 1);
  }

  return (
    <div className="App">
      {step >= 1 && step < 2 && <Background handleClick={handleClick} setBgindex={setBgindex} />} 
      
      {step === 0 && (
        <PokemonSelection handleClick={handleClick} setPassedImg={setPassedImg} setEnemyPokeImg={setEnemyPokeImg} moves={moves} setMoves={setMoves} setEnemyMoves={setEnemyMoves} setPlayerName={setPlayerName} setEnemyName={setEnemyName}/> 
      )}

    {step >= 2 && step<3 &&<PokeRivals sprites={passedimg} bgindex={bgindex} enemysprite={enemypokeimg} moves={moves}   setStep={setStep} enemymoves={enemymoves} playername={playername} enemyname={enemyname} />}
    {step===3 &&<Lost  setStep={setStep} setMoves={setMoves}/> }
    {step===4 && <Won  setStep={setStep} setMoves={setMoves}/>}
    </div>
  );
}

export default App;
