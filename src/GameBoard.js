import { Component, useReducer, useState } from "react";
import { chooseRandomElementFromArray, getRandomInt, shuffleString,  } from "./utility";
import './GameBoard.css';
import Word from "./Word";
import wordsList from "./wordsList";

//action types
const GET_NEW_WORD = "GET_NEW_WORD";
const ADD_LETTER_TO_GUESS = "ADD_LETTER_TO_GUESS";
const REMOVE_LETTER_FROM_GUESS = "REMOVE_LETTER_FROM_GUESS";
const SHUFFLE_WORD = "SHUFFLE_WORD";
//action creators
let getNewWord = word =>({
    type:GET_NEW_WORD,
    word
})
let addLetterToGuess = letter =>({
    type:ADD_LETTER_TO_GUESS,
    letter
})
let removeLetterFromGuess = () =>({
    type:REMOVE_LETTER_FROM_GUESS
})

let reducer = (state, action) => {
    switch(action.type){
        case GET_NEW_WORD:
            return {...state, currentWord: state.nextWord, nextWord:action.word}
        case ADD_LETTER_TO_GUESS:
            return {...state, guess: state.guess + action.letter} 
        case REMOVE_LETTER_FROM_GUESS:
            return {...state, guess: state.guess.length > 1 ? state.guess.substring(0,state.guess.length - 2):""}  
        default:
            return state
    }
}
let getRandomShuffledWordFromList = list => shuffleString(chooseRandomElementFromArray(list))

let GameBoard = (props) => {
    
    let initializer ={
        nextWord: getRandomShuffledWordFromList(wordsList[3]),
        currentWord: getRandomShuffledWordFromList(wordsList[3]),
        level: 3,
        guess: ""
    }
    const [state, dispatch] = useReducer(reducer, initializer)

    return (
        <div className="gameBoard">
        <div className="headsUpDisplay">
        <div className="timer"> Time: </div>
        <div className="level"> Level: {state.level - 2}</div>
        <div className="score"> Score: </div>
        </div>
        <div className="wordArea" onClick={()=>{
            dispatch(getNewWord(getRandomShuffledWordFromList(wordsList[state.level])))
        }}>
        <Word id="nextWord" value={state.nextWord}  />
        <Word id="currenttWord" value={state.currentWord} />
        <Word id="guess" value={state.guess} />
        </div>
        </div>
    )
    
}
export default GameBoard