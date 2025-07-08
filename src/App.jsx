import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import "./styles/App.css";
import { languages } from "./languages.js";
import Language from "./language.jsx";

export default function App() {
  const [langs, setLangs] = useState([]);

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
  }, []);
  return (
    <>
      <Header />
      <div className="status">
        <h3>You win!</h3>
        <p>Well done! 🎉</p>
      </div>
      <section className="languages">{langs}</section>
      <main>hi</main>
    </>
  );
}
