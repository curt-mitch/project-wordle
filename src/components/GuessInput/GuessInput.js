import React from 'react';

import { checkGuess } from '../../game-helpers';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

function handleSubmit(event, guessList, setGuessList, answer, gameStatus, setGameStatus) {
  event.preventDefault();
  const newGuessList = [...guessList];
  let newGuess = event.target.elements['guess-input'].value.toUpperCase();
  const newGuessResults = checkGuess(newGuess, answer);
  gameStatus.guessCount += 1;

  for (let i = 0; i < newGuessList.length; i++) {
    const guessItem = newGuessList[i];
    if (!guessItem.filled) {
      for (let j = 0; j < newGuess.length; j++) {
        guessItem.guess[j].letter = newGuess[j];
        guessItem.guess[j].status = newGuessResults[j].status;
      }
      guessItem.filled = true;
      if (newGuessResults.every(({ status }) => status === 'correct')) {
        gameStatus.complete = true;
        gameStatus.win = true;
        setGameStatus(gameStatus);
      } else if (gameStatus.guessCount === NUM_OF_GUESSES_ALLOWED) {
        gameStatus.complete = true;
        gameStatus.win = false;
        setGameStatus(gameStatus);
      }
      break;
    }
  }

  event.target.elements['guess-input'].value = '';
  setGuessList(newGuessList);
}

function GuessInput({ guessList, setGuessList, answer, gameStatus, setGameStatus }) {
  return <form className="guess-input-wrapper" onSubmit={(event) => handleSubmit(event, guessList, setGuessList, answer, gameStatus, setGameStatus)}>
    <label htmlFor="guess-input">Enter guess:</label>
    <input
      id="guess-input"
      type="text"
      pattern='[a-zA-Z]{5}'
      style={{ textTransform: 'uppercase' }}
      disabled={gameStatus.complete}
    />
  </form>;
}

export default GuessInput;
