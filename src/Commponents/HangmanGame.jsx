import React, { useEffect, useState } from "react";

const WORDS = ["react", "tailwind", "hangman", "component", "storage", "coding"];

const HangmanGame = () => {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrong = 6;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hangmanGame"));
    if (saved) {
      setWord(saved.word);
      setGuessedLetters(saved.guessedLetters);
      setWrongGuesses(saved.wrongGuesses);
    } else {
      startNewGame();
    }
  }, []);

  useEffect(() => {
    if (word) {
      localStorage.setItem(
        "hangmanGame",
        JSON.stringify({ word, guessedLetters, wrongGuesses })
      );
    }
  }, [word, guessedLetters, wrongGuesses]);

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    localStorage.removeItem("hangmanGame");
  };

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;
    if (word.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      setGuessedLetters([...guessedLetters, letter]);
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const isWinner = word && word.split("").every((l) => guessedLetters.includes(l));
  const isLoser = wrongGuesses >= maxWrong;

  // Drawing parts of the hangman
  const hangmanParts = [
    <div key="head" className="w-10 h-10 border-4 border-green-500 rounded-full absolute top-10 left-34"></div>,
    <div key="body" className="w-1 h-12 bg-blue-700 absolute top-20 right-[1px]"></div>,
    <div key="left-arm" className="w-8 h-1 bg-green-500 absolute top-[100px] right-[1px] rotate-[145deg]"></div>,
    <div key="right-arm" className="w-8 h-1 bg-green-500 absolute top-[100px] right-[-25px] rotate-[-145deg]"></div>,
    <div key="left-leg" className="w-10 h-1 bg-green-500 absolute top-[139px] right-[0px] rotate-[140deg]"></div>,
    <div key="right-leg" className="w-10 h-1 bg-green-500 absolute top-[139px] right-[-32px] rotate-[-140deg]"></div>,
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4"> Hangman Game</h1>

      {/* Hangman Drawing */}
      <div className="relative w-40 h-52 mb-8">
        <div className="absolute w-2 h-50 bg-white left-0 bottom-0"></div>
        <div className="absolute w-50 h-2 bg-white left-0 top-0"></div>
        <div className="absolute w-2 h-10 bg-orange-700 right-0 top-0"></div>
        <div className="absolute w-40 h-2 bg-white bottom-0"></div>
        {hangmanParts.slice(0, wrongGuesses)}
      </div>

      <div className="text-lg mb-4">
        Wrong Attempts: {wrongGuesses}/{maxWrong}
      </div>

      <div className="flex gap-2 mb-6">
        {word.split("").map((letter, idx) => (
          <span
            key={idx}
            className="border-b-2 border-white text-2xl w-8 text-center uppercase"
          >
            {guessedLetters.includes(letter) ? letter : ""}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || isWinner || isLoser}
            className={`p-2 rounded-lg ${
              guessedLetters.includes(letter)
                ? "bg-gray-700"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>

      {(isWinner || isLoser) && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold mb-2">
            {isWinner ? "🎉 You Won!" : ` You Lost! The word was "${word}"`}
          </h2>
          <button
            onClick={startNewGame}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 mt-3 rounded-lg text-white"
          >
            Play Again
          </button>
        </div>
      )}
      <div className=""><button className="text-white">BACK</button></div>
    </div>
  );
};

export default HangmanGame;