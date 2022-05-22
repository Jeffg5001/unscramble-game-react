import { useReducer } from "react";
import { chooseRandomElementFromArray, shuffleArray, shuffleString,  } from "./utility";
import './GameBoard.css';
import Word from "./Word";
import wordsList from "./wordsList";
import ClickableWord from "./ClickableWord";

const clickableIdPrefix = "clickable";
//action types
const GET_NEW_WORD = "GET_NEW_WORD";
const ADD_LETTER_TO_GUESS = "ADD_LETTER_TO_GUESS";
const REMOVE_LETTER_FROM_GUESS = "REMOVE_LETTER_FROM_GUESS";
const SHUFFLE_WORD = "SHUFFLE_WORD";
const TOGGLE_LETTER_USED = "TOGGLE_LETTER_USED";
const SET_LEVEL = "SET_LEVEL";
//action creators
let getNewWord = word =>({
    type:GET_NEW_WORD,
    word
});
let addLetterToGuess = letter =>({
    type:ADD_LETTER_TO_GUESS,
    letter
});
let removeLetterFromGuess = letter =>({
    type:REMOVE_LETTER_FROM_GUESS,
    letter
});
let toggleLetterUsed = id =>({
    type:TOGGLE_LETTER_USED,
    id
});
let setLevel = level =>({
    type:SET_LEVEL,
    level,
    currentWord:convertToClickableWord(getRandomShuffledWordFromList(wordsList[level])),
    nextWord:getRandomShuffledWordFromList(wordsList[level]),
})
let shuffleWord = word =>({
    type:SHUFFLE_WORD,
    word:shuffleArray(word).map((obj,idx)=>({...obj, id:clickableIdPrefix+idx})),
})

// helper functions
let convertToClickableWord = (word) =>[...word].map((letter,idx) =>({
    used:false,
    letter,
    id:clickableIdPrefix+idx,
}));

let getRandomShuffledWordFromList = list => shuffleString(chooseRandomElementFromArray(list))

let validateGuess = (guess,level) =>{
    let validWords = wordsList[level];
    let start = 0;
    let end = validWords.length;
    let mid = Math.floor((start + end)/2);
    while(start <= end){
        if(guess < validWords[mid]){
            end = mid - 1;
        }else if(guess > validWords[mid]){
            start = mid + 1;
        }else{
            return true;
        }
        mid = Math.floor((start + end)/2);
    }
    return false;
}

let reducer = (state, action) => {
    switch(action.type){
        case SET_LEVEL:
            return {...state, currentWord:action.currentWord, nextWord:action.nextWord, level: action.level}
        case GET_NEW_WORD:
            return {...state, currentWord: convertToClickableWord(state.nextWord), nextWord:action.word, guess:""}
        case ADD_LETTER_TO_GUESS:
            return {...state, guess: state.guess + action.letter} 
        case REMOVE_LETTER_FROM_GUESS:
            let lastIndexOfLetter = state.guess.lastIndexOf(action.letter);
            let newGuess = [...state.guess];
            newGuess.splice(lastIndexOfLetter,1);
            newGuess = newGuess.join("");
            return {...state, guess: newGuess}  
        case TOGGLE_LETTER_USED:
            let letterToChange = state.currentWord.find(({id})=>id===action.id);
            letterToChange = {...letterToChange, used:!letterToChange.used}
            let idx = parseInt(action.id.substring(clickableIdPrefix.length));
            let newCurrentWord = [...state.currentWord];
            newCurrentWord[idx] = letterToChange;
            return {...state, currentWord:newCurrentWord};
        case SHUFFLE_WORD:
            return{...state, currentWord:action.word}
        default:
            return state
    }
}

let GameBoard = (props) => {
    let nextWord = getRandomShuffledWordFromList(wordsList[3]);
    let currentWord = convertToClickableWord(getRandomShuffledWordFromList(wordsList[3]));

    let initializer ={
        nextWord,
        currentWord,
        level: 3,
        guess: "",

    }
    const [state, dispatch] = useReducer(reducer, initializer)
    return (
        <div className="gameBoard">
        <div className="headsUpDisplay">
        <div className="timer"> Time: </div>
        <div className="level"> Level: </div> <select defaultValue={state.level - 2} onChange={(e)=>{
            dispatch(setLevel(parseInt(e.target.value)));
        }}>{[1,2,3,4,5,6,7,8,9,10,11,12].map( level=>(<option key={level} value={level + 2} >{level}</option>))}</select>
        <div className="score"> Score: </div>
        </div>
        <div className="wordArea" tabIndex="0" onKeyDown={(e) =>{
            let letter = state.currentWord.find( ({letter, used}) => (e.key === letter && !used));
            if(letter){
                dispatch(toggleLetterUsed(letter.id))
                if(!letter.used){ 
                    dispatch(addLetterToGuess(letter.letter))
                }
            }else if(e.key === "Backspace"){
                let letterToRemove = state.currentWord.find( ({letter,used}) => (state.guess[state.guess.length - 1] === letter && used));
                if(letterToRemove){
                    dispatch(toggleLetterUsed(letterToRemove.id));
                    dispatch(removeLetterFromGuess(letterToRemove.letter));
                }
            }
        }}>
        <Word id="nextWord" value={state.nextWord}  />
        <Word id="guess" value={state.guess} onChange={()=>{
            if(state.guess.length === state.level){
                let hasValidGuess = validateGuess(state.guess, state.level);
                if(hasValidGuess){
                    dispatch(getNewWord(getRandomShuffledWordFromList(wordsList[state.level])))
                }
            }
        }}/>
        <ClickableWord id="currenttWord" value={state.currentWord} onClick={ (e) =>{
            dispatch(toggleLetterUsed(e.target.id))
            let newLetter = e.target.textContent;
            if(e.target.className === "LetterBox"){
                dispatch(addLetterToGuess(newLetter))
            }else{
                dispatch(removeLetterFromGuess(newLetter))
            }
        }}/>
        <button onClick={()=>{
            dispatch(shuffleWord(state.currentWord))
        }}>Shuffle</button>
        </div>
        </div>
    )
    
}
export default GameBoard