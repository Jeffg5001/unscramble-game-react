import {
  clickableIdPrefix,
  convertToClickableWord,
  getRandomShuffledWordFromList,
  initialTime,
  resetClickableWord,
  shuffleArray,
} from "../utility";

//action types
const GET_NEW_WORD = "GET_NEW_WORD";
const ADD_LETTER_TO_GUESS = "ADD_LETTER_TO_GUESS";
const REMOVE_LETTER_FROM_GUESS = "REMOVE_LETTER_FROM_GUESS";
const SHUFFLE_WORD = "SHUFFLE_WORD";
const TOGGLE_LETTER_USED = "TOGGLE_LETTER_USED";
const SET_LEVEL = "SET_LEVEL";
const REMOVE_INVALID_GUESS = "REMOVE_INVALID_GUESS";
const INCREMENT_SCORE = "INCREMENT_SCORE";
const DECREMENT_TIMER = "DECREMENT_TIMER";
const SET_IS_ACTIVE = "SET_IS_ACTIVE";
const START_NEW_GAME = "START_NEW_GAME";
//action creators
export let getNewWord = (word) => ({
  type: GET_NEW_WORD,
  word,
});
export let addLetterToGuess = (letter) => ({
  type: ADD_LETTER_TO_GUESS,
  letter,
});
export let removeLetterFromGuess = (letter) => ({
  type: REMOVE_LETTER_FROM_GUESS,
  letter,
});
export let toggleLetterUsed = (id) => ({
  type: TOGGLE_LETTER_USED,
  id,
});
export let setLevel = (level, words) => ({
  type: SET_LEVEL,
  words,
  level,
  currentWord: convertToClickableWord(getRandomShuffledWordFromList(words)),
  nextWord: getRandomShuffledWordFromList(words),
});
export let shuffleWord = (word) => ({
  type: SHUFFLE_WORD,
  word: shuffleArray(word).map((obj, idx) => ({
    ...obj,
    id: clickableIdPrefix + idx,
  })),
});
export let removeInvalidGuess = (word) => ({
  type: REMOVE_INVALID_GUESS,
  word,
});
export let incremetScore = () => ({
    type: INCREMENT_SCORE
})
export let decrementTimer = () =>({
    type: DECREMENT_TIMER
})
export let setIsActive = newIsActive =>({
    type: SET_IS_ACTIVE,
    newIsActive,
});
export let startNewGame = () =>({
    type: START_NEW_GAME
});

// helper functions

export default function reducer(state, action) {
  switch (action.type) {
    case SET_LEVEL:
      return {
        ...state,
        currentWord: action.currentWord,
        nextWord: action.nextWord,
        level: action.level,
      };
    case GET_NEW_WORD:
      return {
        ...state,
        currentWord: convertToClickableWord(state.nextWord),
        nextWord: action.word,
        guess: "",
      };
    case ADD_LETTER_TO_GUESS:
      return { ...state, guess: state.guess + action.letter, invalidGuess:{...state.invalidGuess, show:false} };
    case REMOVE_LETTER_FROM_GUESS:
      let lastIndexOfLetter = state.guess.lastIndexOf(action.letter);
      let newGuess = [...state.guess];
      newGuess.splice(lastIndexOfLetter, 1);
      newGuess = newGuess.join("");
      return { ...state, guess: newGuess };
    case TOGGLE_LETTER_USED:
      let letterToChange = state.currentWord.find(({ id }) => id === action.id);
      letterToChange = { ...letterToChange, used: !letterToChange.used };
      let idx = parseInt(action.id.substring(clickableIdPrefix.length));
      let newCurrentWord = [...state.currentWord];
      newCurrentWord[idx] = letterToChange;
      return { ...state, currentWord: newCurrentWord };
    case SHUFFLE_WORD:
      return { ...state, currentWord: action.word };
    case REMOVE_INVALID_GUESS:
      return {
        ...state,
        guess: "",
        currentWord:resetClickableWord(state.currentWord),
        invalidGuess: {
          ...state.invalidGuess,
          show: true,
          value: action.word,
        },
      };
    case INCREMENT_SCORE:
        return {...state, score: state.score + 1};
    case DECREMENT_TIMER:
        return {...state, time: state.time - 1};
    case SET_IS_ACTIVE:
        return{...state, isActive: action.newIsActive};
    case START_NEW_GAME:
        return {...state, guess:"", isActive:true, score:0, time:initialTime + (state.level - 3)*10, invalidGuess:{value:"", show:false}}
    default:
      return state;
  }
}
