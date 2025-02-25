
import './App.css';
import Background from './components/Background';
import PokeRivals from './components/PokeRivals';
import { useState } from 'react';
function App() {
  const[step,setStep]=useState(0);
  function handleClick(){
    setStep(prevStep=>prevStep+1);
  }
  return (
    <div className="App">
      {step>=1 ? <Background /> : <PokeRivals handleClick={handleClick}/>}
     
    </div>
  );
}

export default App;
