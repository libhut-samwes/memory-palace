import { useState } from 'react';
import AuthFlow from "./AuthFlow";
import Game from './components/Game';
import './App.css';

function App() {
  const [ship, setRealShip] = useState('');
	
	const authCheck = () => {
		if(ship === "") {
			return <AuthFlow setRealShip={setRealShip} /> 
		}
		else {
			return <Game ship={ship} />;
		}
	}

	return(
    <div className="App">
			{authCheck()}
		</div>
  )
}
export default App
