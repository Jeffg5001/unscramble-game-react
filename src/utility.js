

export let getRandomInt = (low, high, randFn = Math.random) => {
    let multiplier = (high + 1) - low
    return Math.floor((randFn() * multiplier) + low)
}

export function shuffleArray(arr, randFn = Math.random){
    let arrCopy = [...arr] // maybe use lodash deep copy(clone)
    if(arr.length < 2){
        return arrCopy
    }
    let indices = []
    let shuffledIndices = []
    for(let i = 0; i<arr.length; i++){
        indices.push(i)
    }
    while(indices.length){
        let indexToRemove = getRandomInt(0,indices.length - 1, randFn)
        shuffledIndices.push(indices.splice(indexToRemove,1)[0])
    }
    return shuffledIndices.map(index => arr[index])
}

export let shuffleString = (string, randFn = Math.random) => shuffleArray(string.split(""), randFn).join("")

export let chooseRandomElementFromArray = (arr, randFn = Math.random) => arr.length ? arr[getRandomInt(0,arr.length - 1, randFn)]:undefined;

export const clickableIdPrefix = "clickable";

export let convertToClickableWord = (word) =>[...word].map((letter,idx) =>({
    used:false,
    letter,
    id:clickableIdPrefix+idx,
}));

export let resetClickableWord = (arr) => arr.map(word=>({
    ...word,
    used:false,
}));

export let getRandomShuffledWordFromList = (list, randFn = Math.random) => shuffleString(chooseRandomElementFromArray(list, randFn))

export let validateGuess = (guess, validWords) =>{ // assumes sorted wordsList
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

export const initialTime = 30;