import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';


const ANSWER = "moody";

function evaluateGuess(guess, answer) {
  const result = Array(5).fill("absent");
  const answerArr = answer.split("");
  const guessArr = guess.split("");

  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === answerArr[i]) {
      result[i] = "correct";
      answerArr[i] = null; 
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] !== "correct") {
      const index = answerArr.indexOf(guessArr[i]);
      if (index !== -1) {
        result[i] = "present";
        answerArr[index] = null;
      }
    }
  }

  return result;
}

function Cell({ letter, status }) {
  const colors = {
    correct: "green",
    present: "goldenrod",
    absent: "lightgray",
    empty: "white",
  };

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "2px solid #888",
        margin: "2px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        backgroundColor: colors[status] || colors.empty,
        color: status ? "white" : "black",
        fontSize: "20px",
        textTransform: "uppercase",
      }}
    >
      {letter}
    </div>
  );
}

function Row({ guess, answer }) {
  const letters = guess ? guess.split("") : Array(5).fill("");
  const results = guess ? evaluateGuess(guess, answer) : Array(5).fill("empty");

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {letters.map((letter, i) => (
        <Cell key={i} letter={letter} status={results[i]} />
      ))}
    </div>
  );
}

function Board({ guesses, answer }) {
  const rows = Array.from({ length: 6 }, (_, i) => (
    <Row key={i} guess={guesses[i]} answer={answer} />
  ));

  return <div style={{ marginBottom: "40px" }}>{rows}</div>;
}

function Keyboard() {
  const rows = [
    "qwertyuiop".split(""),
    "asdfghjkl".split(""),
    ["Enter", ..."zxcvbnm".split(""), "🔙"],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "flex", margin: "4px" }}>
          {row.map((key, j) => (
            <div
              key={j}
              style={{
                width: key.length > 1 ? "60px" : "40px",
                height: "50px",
                margin: "2px",
                border: "1px solid #aaa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "light-blue",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Game() {
  const guesses = ["might", "flood", "stray"];

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      <h1>Corcoran 🔠 Wordle 2 🧩 </h1>
      <Board guesses={guesses} answer={ANSWER} />
      <Keyboard />
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);


reportWebVitals();
