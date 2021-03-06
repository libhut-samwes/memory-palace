import { useState, useEffect } from 'react';
import Tile from './Tile';
import './Gameboard.css'

function Gameboard(props: any) {
	const [matchCheck, setMatchCheck] = useState<string[]>([])
	const { library, tiles, incrementTurn, gameOverToggle, tileClickedToggle, tileMatchedToggle } = props;
	
	// victory logic
	let done: any = new Array();
	for(let tile of tiles) {
		if(tile.matched) {
			done.push(tile);
		}
	}
	if(tiles.length !== 0 && done.length === tiles.length) {
		gameOverToggle();
	}
	
	// identify matches
	function matchHandler(i: number) {
		setTimeout(() => {
			const matchArr: any[] = matchCheck;
			matchArr.push(tiles[i])
			setMatchCheck(matchArr);
			if(matchArr.length === 2) {
				if(matchArr[0].tileValue === matchArr[1].tileValue && matchArr[0].id !== matchArr[1].id) {
					tileMatchedToggle(matchArr[0].id);
					tileMatchedToggle(matchArr[1].id);
				}
				tileClickedToggle(matchArr[0].id);
				tileClickedToggle(matchArr[1].id);
				setMatchCheck([]);
			}
		}, 500);
	}

	// render the gameboard with either hidden tiles or, if matched, blank
	// unclickable tiles
	const gameBoard:any[] = [];
	for(let i in tiles) {
		if(!tiles[i].matched) {
			gameBoard.push(
				<Tile
					library={library}
					key={tiles[i].id}
					index={tiles[i].id}
					className="tile"
					displayColor={library === 'color' && tiles[i].clicked ? tiles[i].tileValue : tiles[i].defaultValue}
					incrementTurn={incrementTurn}
					tileClickedToggle={tileClickedToggle}
					matchHandler={matchHandler}
					patp={library === 'urbit' && tiles[i].clicked ? tiles[i].tileValue : '~doz'}
				/>
			);
		}
		else {
			gameBoard.push(
				<Tile
					key={tiles[i].id}
					index={tiles[i].id}
					style={{backgroundcolor: '#ffffff', border: 'none'}}
				/>
			)
		}
	}

	return (
		<div className="gameBoard">
			{gameBoard}
		</div>
	);
}

export default Gameboard;
