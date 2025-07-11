import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import "./styles/App.css";
import { languages } from "./languages.js";
import Language from "./language.jsx";
import {clsx} from "clsx"
import {getFarewellText, getRandomWord} from "./utils.js"

export default function App() {
  // state values
  const [langs, setLangs] = useState([]);
  const [currentWord, setCurrentWord] = useState(getRandomWord().toUpperCase().split(""));
  const [guessedWord, setGuessedWord] = useState([]);
  const [farewellText, setFarewellText] = useState()

  console.log("from outside " + guessedWord);

  // derived values
  const [wrongGuesses, setWrongGuesses] = useState(0)

  const isGameLost = languages.length - 1 <= wrongGuesses
  const isGameWon = currentWord.every((letter) => guessedWord.includes(letter))
  const isGameOver = isGameLost || isGameWon

  console.log(isGameWon)
  for (let i = 0; i < guessedWord.length; i++){
    const check = currentWord.includes(guessedWord[i])
    if (!check){
      console.log("wrong guesses up by 1, : " + wrongGuesses)
    }
  }
  
    const letters = currentWord.map((letter, index) => {
      const styles = {
        width: "40px",
        height: "40px",
        borderBottom: "1px solid #F9F4DA",
        background: "#323232",
        margin: "2px",

        fontWeight: "700",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#F9F4DA",
        fontSize: "18px",
      };

      let isGuessed = guessedWord.includes(letter);

      return <span key={index} id={index} style={styles}>{isGuessed? letter : " "}</span>;
    })
  
  useEffect(() => {
    setLangs(
      languages.map((lang, index) => {
        let isLost = false;
        let lastIndex = languages.length -1 == index
        if (!lastIndex && wrongGuesses > 0 && (index <= wrongGuesses - 1)){
          isLost = true;
        }
        
        return (
        <Language
          key={index}
          name={lang.name}
          background={lang.backgroundColor}
          color={lang.color}
          // under dev
          className = {clsx('chip', isLost && 'lost')}

          id={index}
        />
      )})
    );

    if (wrongGuesses > 0)setFarewellText(getFarewellText(languages[wrongGuesses - 1].name))

  }, [wrongGuesses]);

  let asci = 65;
  let alphabet = [];
  for (let i = 0; i < 26; i++) {
    const currentLetter = String.fromCharCode(asci);
    alphabet.push(currentLetter);
    asci++;
  }

  const keyboard = alphabet.map((letter, index) => {
    let isInside = guessedWord.includes(letter) 
    let isRight = currentWord.includes(letter)
    let isWrong = !currentWord.includes(letter)

    const styles = {
      backgroundColor: isInside? clsx({"red": isWrong, "green": isRight }) : "#FCBA29",
      width: "40px",
      height: "40px",
      borderRadius: "4px",
      border: "1px solid #D7D7D7",
      fontWeight: "600",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
      color: "#1E1E1E", 
      margin: "4px",
      cursor: "pointer",
    };
    


    return (
      <button
        onClick={() => {
          if(!isGameOver){
            setGuessedWord((prev) => [...prev, letter]);
            if(isWrong){
              setWrongGuesses((prev) => (prev + 1))
            }
            console.log(guessedWord);
          }
        }
      }
        disabled={isGameOver}
        aria-disabled = {guessedWord.includes(letter)}
        aria-label = {`letter ${letter}`}
        style={styles}
        id={index}
        key={letter}
      >
        {letter}
      </button>
    );
  });

  const gameStatusClass = clsx('status', isGameLost && 'lost', isGameWon && 'won')

  return (
    <>
      <Header />
      <div aria-live={"polite"} role="status" className={gameStatusClass}>
        {
          isGameOver?
            isGameWon?
              <>
                <h3>You win!</h3><p>Well done! 🎉</p>
              </>:
              <>
                <h3>You lost!</h3><p>You lose! Better start learning Assembly 😭</p>
              </>
            :
            wrongGuesses > 0 ? <h3 className="status farewell">{farewellText}</h3> : null

        }
      </div>
      <section className="languages">{langs}</section>
      <section role="gussed letters" className="letters">{letters}</section>
      <section role="keyboard" className="keyboard">{keyboard}</section>
      {
        isGameOver
        &&
        <button onClick={() => {setGuessedWord([]); setWrongGuesses(0)}} className="new-game">New Game</button>
      }
      <main>hi</main>
    </>
  );
}
