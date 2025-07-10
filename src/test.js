

guessedLetters = ["A", "B"]

currWord = ["R","E","A","C","T"]

let counter = 0
for(let i = 0; i < guessedLetters.length; i++){
    isInside = currWord.includes(guessedLetters[i])
    if(isInside)counter++;
}

console.log(counter)