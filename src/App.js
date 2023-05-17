import React, { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./component/SingleCard";

const cardImages = [
    { id: 1, "src" : "/img/c-1.png", matched: false},
    { id: 2, "src" : "/img/Java-1.png", matched: false },
    { id: 3, "src" : "/img/JS-1.png", matched: false },
    { id: 4, "src" : "/img/Php-1.png", matched: false},
    { id: 5, "src" : "/img/Python-1.png", matched: false},
    { id: 6, "src" : "/img/SQL-1.png", matched: false},
]

const cardImages2 = [
  { id: 111, "src" : "/img/c-1.png", matched: false},
  { id: 222, "src" : "/img/Java-2.png", matched: false},
  { id: 333, "src" : "/img/JS-2.png", matched: false},
  { id: 444, "src" : "/img/Php-1.png", matched: false},
  { id: 555, "src" : "/img/P-2.png", matched: false},
  { id: 666, "src" : "/img/SQL-2.png", matched: false},
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState([0])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [time, setTime] = useState(0);


        //shuffle cards
      const shuffleCards = () =>  {
          const shuffledCards = [...cardImages, ...cardImages2]
          .sort(() => Math.random() - 0.5)
          .map((card) => ({ ...card}))

          setChoiceOne(null)
          setChoiceTwo(null)
          setCards(shuffledCards)
          setTurns(0)
          setTime(0)
        }

      // handle a choice
      const handleChoice = (card) => {
        if (!choiceOne) {
          setChoiceOne(card)
        } else if (!choiceTwo && choiceOne.id !== card.id) {
          setChoiceTwo(card)
        }
      }

      useEffect(() => {
        const matchingPairs = {
          1: 111,
          2: 222,
          3: 333,
          4: 444,
          5: 555,
          6: 666
          // Add more matching pairs as needed
        };
      
        const handleCardMatching = () => {
          if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (
              choiceOne.id === choiceTwo.id ||
              matchingPairs[choiceOne.id] === choiceTwo.id ||
              matchingPairs[choiceTwo.id] === choiceOne.id
            ) {
              setCards((prevCards) => {
                return prevCards.map((card) => {
                  if (card.id === choiceOne.id || card.id === choiceTwo.id) {
                    return { ...card, matched: true };
                  } else {
                    return card;
                  }
                });
              });
              resetTurn();
            } else {
              setTimeout(() => resetTurn(), 1000);
            }
          }
        };
        handleCardMatching();
      }, [choiceOne, choiceTwo]);

      // add timer
      useEffect(() => {
        const timerId = setInterval(() => {
          setTime(prevTime => prevTime + 1);
        }, 1000);
        if (cards.every(card => card.matched)) {
          clearInterval(timerId);
        }
        return () => clearInterval(timerId);
      }, [cards]);

      // reset choices and increase turn
      const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
      }

      //game start
      useEffect(() => {
        shuffleCards();
      }, [])


  return (
    <div>
      <div>
      <div className="body">
        <div className="header">MATCHING CARDS</div>
        <div id="main">
          <div className="cards">
          <div className="card-grid"> 
          {/* adding the shuffled cards */}
          {cards.map(card => (
            <SingleCard 
              key={card.id}            
              card={card}            
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
          </div>
          </div>
          <div className="input">
          <button onClick={shuffleCards}>New Game</button>
          <p>Turns: {turns}</p>
          <p>Time: {time}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default App;
