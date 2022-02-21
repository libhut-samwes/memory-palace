function Victory(props: any) {
	const { gameReset, turn, tileCount } = props;
	const guesses = Math.floor(turn / 2);
	let message: string = '';
	if(guesses === tileCount / 2) {
		message = <p>Congratulations!  I can use 'inspect element too!'</p>
		}
		else if (guesses <= tileCount ) {
		message = <p>Not bad.  Not bad at all.  Only took you {guesses}.</p>
		}
		else {
		message = <p>It took you {guesses} guesses....  I think Washoe would need {guesses - 1}.  Call him at +1-509-963-1518.</p>
		}
	return(
		<>
			<p>Victory!</p>
			{message}
			<a className="reset-btn" onClick={gameReset}>Another Go?</a>
		</>
	);
}

export default Victory;
