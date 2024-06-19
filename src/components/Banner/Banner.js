import React from 'react';

function Banner({gameStatus, answer}) {
  if (gameStatus.win) {
    const guessString = gameStatus.guessCount === 1 ? ' guess' : ' guesses';
    return (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong> {gameStatus.guessCount} {guessString}</strong>.
        </p>
      </div>
    );
  } else {
    return (
      <div className="sad banner">
        <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
      </div>
    );
  }
}

export default Banner;
