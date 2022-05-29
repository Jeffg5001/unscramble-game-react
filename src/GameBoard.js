import { useEffect, useReducer } from "react";
import {
  validateGuess,
  getRandomShuffledWordFromList,
  convertToClickableWord,
} from "./utility";
import "./GameBoard.css";
import Word from "./Word";
import wordsList from "./wordsList";
import ClickableWord from "./ClickableWord";
import {
  default as reducer,
  getNewWord,
  removeLetterFromGuess,
  setLevel,
  shuffleWord,
  toggleLetterUsed,
  addLetterToGuess,
  removeInvalidGuess,
  incremetScore,
  decrementTimer,
  setIsActive,
  startNewGame,
} from "./store/gameBoard";

const initialLevel = 3;

let GameBoard = (props) => {
  let nextWord = getRandomShuffledWordFromList(wordsList[initialLevel]);
  let currentWord = convertToClickableWord(
    getRandomShuffledWordFromList(wordsList[initialLevel])
  );

  let initializer = {
    nextWord,
    currentWord,
    level: initialLevel,
    guess: "",
    score: 0,
    invalidGuess: { show: false, value: "" },
    time: 0,
    isActive: false,
  };
  const [state, dispatch] = useReducer(reducer, initializer);
  let guessVal = state.guess.padEnd(state.level, "_");
  // let levelToShow = state.level - 2;
  useEffect(() => {
    let interval = null;
    if (state.isActive && state.time) {
      interval = setInterval(() => {
        dispatch(decrementTimer()); // decrement timer
      }, 1000);
    } else if (!state.isActive || !state.time) {
      clearInterval(interval);
      if (state.isActive) {
        // state.time is 0 set to false
        dispatch(setIsActive(false)); // SET_IS_ACTIVE
      }
    }
    return () => clearInterval(interval);
  }, [state.time, state.isActive]);

  return (
    <div className="gameBoard">
      <div className="headsUpDisplay">
        <div className="timer">
          {" "}
          Time:{" "}
          <span
            className={`time ${state.isActive ? "active" : "inactive"} ${
              state.time < 10 ? (state.time < 5 ? "urgent" : "warn") : ""
            }`}
          >
            {state.time}
          </span>
        </div>
        <div className="level">
          <label htmlFor="levels">
            {" "}
            Level:
            <span className={"levelText " + (state.isActive ? "" : "hidden")}>
              {" "}
              {state.level - 2}
            </span>
          </label>
          <select
            className={"levelSelect " + (!state.isActive ? "" : "hidden")}
            id="levels"
            defaultValue={state.level - 2}
            onChange={(e) => {
              let level = parseInt(e.target.value);
              dispatch(setLevel(level, wordsList[level]));
              dispatch(startNewGame());
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((level) => (
              <option key={level} value={level + 2}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            if (!state.time && !state.isActive) {
              dispatch(setLevel(state.level, wordsList[state.level]));
              dispatch(startNewGame());
            }
            dispatch(setIsActive(!state.isActive));
          }}
        >
          {state.isActive ? "Pause" : state.time ? "Resume" : "Start New Game"}
        </button>
        <div className="score"> Score: {state.score} </div>
      </div>
      <div
        className={`wordArea ${!state.isActive ? "hidden" : ""}`}
        tabIndex="0"
        onKeyDown={(e) => {
          let letter = state.currentWord.find(
            ({ letter, used }) => e.key === letter && !used
          );
          if (!state.isActive) return;
          if (letter) {
            dispatch(toggleLetterUsed(letter.id));
            if (!letter.used) {
              dispatch(addLetterToGuess(letter.letter));
            }
          } else if (e.key === "Backspace") {
            let letterToRemove = state.currentWord.find(
              ({ letter, used }) =>
                state.guess[state.guess.length - 1] === letter && used
            );
            if (letterToRemove) {
              dispatch(toggleLetterUsed(letterToRemove.id));
              dispatch(removeLetterFromGuess(letterToRemove.letter));
            }
          }
        }}
      >
        <div id="nextLabel">Next:</div>
        <Word id="nextWord" value={state.nextWord} />
        <div id="guessLabel">Guess:</div>
        <Word
          id="guess"
          value={guessVal}
          type="guess"
          onChange={() => {
            if (state.guess.length === state.level) {
              let hasValidGuess = validateGuess(
                state.guess,
                wordsList[state.level]
              );
              if (hasValidGuess) {
                dispatch(
                  getNewWord(
                    getRandomShuffledWordFromList(wordsList[state.level])
                  )
                );
                dispatch(incremetScore());
              } else {
                dispatch(removeInvalidGuess(state.guess));
              }
            }
          }}
        />
        <ClickableWord
          id="currenttWord"
          value={state.currentWord}
          onClick={(e) => {
            dispatch(toggleLetterUsed(e.target.id));
            let newLetter = e.target.textContent;
            if (e.target.className === "LetterBox") {
              dispatch(addLetterToGuess(newLetter));
            } else {
              dispatch(removeLetterFromGuess(newLetter));
            }
          }}
        />
        <button
          onClick={() => {
            dispatch(shuffleWord(state.currentWord));
          }}
        >
          Shuffle
        </button>
        {state.invalidGuess.show && (
          <div>{`${state.invalidGuess.value.toUpperCase()} is not in list of valid words`}</div>
        )}
      </div>
    </div>
  );
};
export default GameBoard;
