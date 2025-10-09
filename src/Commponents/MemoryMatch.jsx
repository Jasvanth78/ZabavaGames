import React, { useEffect, useState } from "react";
import Card from "./Card"
import img1 from "../assets/1.jpg"

const cardImages = [
  { src:img1, matched: false },
  { src: {img1}, matched: false },
  { src: {img1}, matched: false },
  { src: {img1}, matched: false },
  { src: {img1}, matched: false },
  { src: {img1}, matched: false },
  { src: {img1}, matched: false },
  { src: {img1}, matched: false },
];

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  // start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6">Memory Match Game </h1>
      <button
        onClick={shuffleCards}
        className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md mb-6 hover:bg-blue-100"
      >
        New Game
      </button>

      <div className="grid grid-cols-4 gap-4 max-w-[500px]">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p className="mt-4 text-lg">Turns: {turns}</p>
    </div>
  );
};

export default MemoryMatch;

<Card/>