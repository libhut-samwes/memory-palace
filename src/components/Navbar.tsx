import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { MouseEvent } from 'react';
import './Navbar.css';

function Navbar(props: any) {
	const { gameStarted, gameReset, gameOver } = props
	
	const resetButtonStyle = {
		backgroundColor: '#F4F4F9',
		color: '#252323',
		fontSize: '25px',
		marginRight: '20px'
	}
	
	function gameStartedHandler() {
		if(gameStarted && !gameOver) {
			return (
				<a className="btn" style={resetButtonStyle} onClick={gameReset}>Rage Quit</a>
			);
		}
	}
	return (
		<div className="nav-bar">
			<p id="game-title">Memory Palace</p>
			{gameStartedHandler()}
		</div>
	);
}

export default Navbar;
