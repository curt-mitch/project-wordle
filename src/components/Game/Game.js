import React from 'react';

import { range, sample } from '../../utils';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput/GuessInput';
import GuessResults from '../GuessResults/GuessResults';
import Banner from '../Banner/Banner';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';


// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });
const initGuessList = [];
let initGameStatus = { complete: false, win: false, guessCount: 0 };

// Initialize the guessList with empty guesses.
range(0, NUM_OF_GUESSES_ALLOWED).forEach(() => {
  let guess = [];
  range(0, 5).forEach(() => {
    guess.push({ letter: '', letterId: crypto.randomUUID(), status: '' })
  });
  initGuessList.push({ guess, guessId: crypto.randomUUID(), filled: false })
});

function Game() {
  const [guessList, setGuessList] = React.useState(initGuessList);
  const [gameStatus, setGameStatus] = React.useState(initGameStatus);
  const complete = gameStatus.complete;
  return <>
    {complete && <Banner gameStatus={gameStatus} answer={answer} />}
    <GuessResults guessList={guessList}/>
    <GuessInput
      guessList={guessList}
      setGuessList={setGuessList}
      answer={answer}
      gameStatus={gameStatus}
      setGameStatus={setGameStatus}
    />
  </>;
}

export default Game;
