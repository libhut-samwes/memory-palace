import { useState } from 'react';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Gameboard from './Gameboard';
import Victory from './Victory';
import Footer from './Footer';
import { co } from "../ob/co";

class Tile {
	id: string = '';
	tileValue: string = "";
	defaultValue: string = '#7D6B91';
	matched: boolean = false;
	clicked: boolean = false;
}

// put value randomizers for different tile libraries here
const availableLibraries: string[] = ['color', 'urbit'];
const randPatp = () => co.patp(Math.floor(Math.random() * 4228250625).toString());
const randColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

// checks number of tiles and the chosen library; pulls random values, doubles
// them, then randomizes and creates an array of Tile objects
const tileChooser = (num: number, library: string) => {
	console.assert(num % 2 === 0, {num, errorMsg: 'number of tiles must be even'});
	console.assert(availableLibraries.indexOf(library) !== -1, {library, errorMsg: 'not a valid library'});
	let valueArr: string[] = [];
	while(valueArr.length < num){
		let value: string = ''
		if(library === 'color') {
			value = randColor();
		}
		else if(library === 'urbit') {
			value = randPatp();
		}
		if(valueArr.indexOf(value) === -1) valueArr.push(value);
	}
	let doubledArr = valueArr.concat(valueArr);
	let shuffledArr = doubledArr.map((value) => ({value, sort: Math.random()}))
															.sort((a,b) => a.sort - b.sort)
															.map(({ value }) => value);
	let tileArray = []
	for (let i in shuffledArr) {
		const tile = new Tile();
		tile.id = i;
		tile.tileValue = shuffledArr[i];
		tile.defaultValue = '#252323';
		tile.matched = false;
		tile.clicked = false;
		tileArray.push(tile);
	}
	return tileArray;
}

function Game(props: any) {
	const [tileCount, setTileCount] = useState(24);
	const [library, setLibrary] = useState('urbit');
	const [tiles, setTiles] = useState<Tile[]>([]);
	const [turn, setTurn] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [gameOver, setGameOver] = useState(false);

	function tileCountToggle(num: number) {
		setTileCount(num);
	}
	function libraryToggle(lib: string) {
		setLibrary(lib);
	}
	function gameStartedToggle(num: number) {
		setGameStarted(true);
		const drawTiles = tileChooser(tileCount / 2, library);
		setTiles(drawTiles);
		
	}
	function gameOverToggle() {
		setGameOver(true);
		setTiles([]);
	}
	function incrementTurn() {
		setTurn(turn + 1);
	}
	function tileClickedToggle(i: number) {
		const arr = tiles;
		arr[i].clicked = !arr[i].clicked;
		setTiles(arr);
	}
	function tileMatchedToggle(i: number) {
		const arr = tiles;
		arr[i].matched = true;
		setTiles(arr);
	}
	function gameReset() {
		setGameStarted(false);
		setGameOver(false);
		setTiles([]);
	}
	function welcomeHandler() {
		if(!gameStarted && !gameOver) {
			return (
				<Welcome 
					gameStart={gameStartedToggle}
					libraryToggle={libraryToggle}
					library={library}
					tileCount={tileCount}
					tileCountToggle={tileCountToggle}
				/>
			)
		}
	}
	function gameStartHandler() {
		if(gameStarted && !gameOver) {
			return (
				<Gameboard
					library={library}
					tiles={tiles}
					incrementTurn={incrementTurn}
					tileClickedToggle={tileClickedToggle}
					tileMatchedToggle={tileMatchedToggle}
					gameOverToggle={gameOverToggle}
				/>
			)
		}
	}
	function gameOverHandler() {
		if(gameOver) {
			return (
				<Victory 
					gameReset={gameReset}
					turn={turn}
					tileCount={tileCount}
				/>
			)
		}
	}
	return (
		<>
			<Navbar 
				gameStarted={gameStarted}
				gameReset={gameReset}
				gameOver={gameOver}
			/>
			{welcomeHandler()}
			{gameStartHandler()}
			{gameOverHandler()}
			<Footer 
				gameStarted={gameStarted}
				gameOver={gameOver}
				turn={turn}
			/>
		</>
	);
}

export default Game
