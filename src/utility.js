

export let getRandomInt = (low, high) => {
    let multiplier = (high + 1) - low
    return Math.floor((Math.random() * multiplier) + low)
}

export function shuffleArray(arr){
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
        let indexToRemove = getRandomInt(0,indices.length - 1 )
        shuffledIndices.push(indices.splice(indexToRemove,1)[0])
    }
    return shuffledIndices.map(index => arr[index])
}

export let shuffleString = string => shuffleArray(string.split("")).join("")

export let chooseRandomElementFromArray = (arr) => arr.length ? arr[getRandomInt(0,arr.length - 1)]:undefined