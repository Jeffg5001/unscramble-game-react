import seedrandom from "seedrandom";
import { getRandomInt, shuffleArray, shuffleString } from "./utility";

process.env.TEST = true;

test("getRandomInt returns number between first argument and last argument inclusive", ()=> {
    let int = getRandomInt(1,5)
    for(let i = 0; i < 10; i++){
        expect(int).toBeGreaterThanOrEqual(1);
        expect(int).toBeLessThanOrEqual(5);
    }
})

let randFn = seedrandom("random string"); // using a seeded random function to get predictable results
test("shuffled Array has all elements of original array", ()=>{
    let arr = [1,2,3,4,5];
    let shuffledArr = shuffleArray(arr);
    let set = new Set();
    shuffledArr.forEach((elem)=>set.add(elem));
    for(let item of arr){
        expect(set.has(item)).toBeTruthy()
    }
})

test("shuffle string produces a string",()=>{
    expect(typeof shuffleString("RANDOM", randFn)).toBe("string")
})

delete process.env.TEST