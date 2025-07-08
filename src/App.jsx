import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import "./styles/App.css";
import { languages } from "./languages.js";
import Language from "./language.jsx";

export default function App() {
  const [langs, setLangs] = useState([])
  const [letters, setLetters] = useState([])
  const [currentWord, setCurrentWord] = useState("React")
  console.log(currentWord.length)
  
  useEffect(() => {
    setLangs(
      languages.map((lang, index) => (
        <Language
        key={index}
        name={lang.name}
        background={lang.backgroundColor}
        color={lang.color}
        id={index}
        />
      ))
    );
    
    setLetters(
      currentWord.split("").map((letter, index) => {
        const styles = {
          width : "40px",
          height : "40px",
          borderBottom: "1px solid #F9F4DA",
          background: "#323232",
          margin: "2px",
          
          fontWeight: "700",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#F9F4DA",
          fontSize: "18px",
        }
        return(
          <span style={styles}>{letter.toUpperCase()}</span>
        )
      })
    )
  }, [])

  let asci = 65;
  let alphabet = [];
  for (let i = 0; i < 26; i++){
    const currentLetter = String.fromCharCode(asci);
    alphabet.push(currentLetter);
    asci++;
  }
  
  const keyboard = alphabet.map((letter, index) => {
    const styles = {
      backgroundColor: "#FCBA29",
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
    }

    return (
      <button style={styles}>{letter}</button>
    )
  })

  return (
    <>
      <Header />
      <div className="status">
        <h3>You win!</h3>
        <p>Well done! 🎉</p>
      </div>
      <section className="languages">{langs}</section>
      <section className="letters">{letters}</section>
      <section className="keyboard">{keyboard}</section>
      <main>hi</main>
    </>
  );
}
