import { useState, useEffect } from 'react';
import { urbitVisor } from '@dcspark/uv-core';
import AuthFlow from "./AuthFlow";
import Game from './components/Game';
import './App.css';

function App() {
  const [ship, setRealShip] = useState('');

  return(
    <div className="App">
			{ship === "" 
      ? 
     <AuthFlow setRealShip={setRealShip}/>
      : 
      <Game ship={ship}/>}
		</div>
  )

}
export default App