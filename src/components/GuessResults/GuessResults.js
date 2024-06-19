import React from 'react';


function GuessResults({ guessList }) {
  return <div className='guess-results'>
    {guessList.map(({guess, guessId}) => (
      <p
        className='guess'
        key={guessId}>
          {guess.map(({letter, letterId, status}) => (
            <span
              key={letterId}
              className={ `cell ${status}` }
            >
              {letter}
            </span>
          ))}
      </p>
    ))}
  </div>;
}

export default GuessResults;

/*

*/
