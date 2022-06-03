const { once } = require("events")
const { createReadStream, writeFileSync } = require("fs")
const { createInterface } = require("readline")

const relativeFileLocation = "./sorted-words.txt"
let rl = createInterface({
    input: createReadStream(relativeFileLocation),
    crlfDelay: Infinity
})
let wordsObj = {} // object with words separated by length { 1:["a", "I"], 2:["am", "as", "at"...], ... }
rl.on("line", line => {
    let lineString = "" + line
    if(lineString.length in wordsObj){
        wordsObj[lineString.length].push(lineString)
    }else{
        wordsObj[lineString.length] = [lineString]
    }
})
try{
    once(rl,"close").then( () =>{
        writeFileSync("./src/wordsList.js", "let wordList = " + JSON.stringify(wordsObj) + ";\nexport default wordList;\n")
    }).catch(err =>{console.error(err);})
} catch (err){
    console.error(err);
}
