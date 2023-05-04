import React, { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./component/SingleCard";

const cardImages = [
    { "src" : "/img/c1.png", matched: false},
    { "src" : "/img/Java-1.png", matched: false },
    { "src" : "/img/Javascript-1.png", matched: false },
    { "src" : "/img/Php-1.png", matched: false},
    { "src" : "/img/Python-1.png", matched: false},
    { "src" : "/img/SQL-1.png", matched: false},
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState([0])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


        //shuffle cards
const shuffleCards = () =>  {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

      // handle a choice
      const handleChoice = (card) => {
          choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
      }



      // compare selected cards
      useEffect(() => {
        if (choiceOne && choiceTwo) {
          setDisabled(true)
          if (choiceOne.src === choiceTwo.src) {
            setCards(prevCards => {
              return prevCards.map(card => {
                if (card.src === choiceOne.src) {
                  return {...card, matched: true}
                } else {
                  return card  
                }
              })
            })
            resetTurn()
          } else {
            setTimeout(() => resetTurn(), 1000)
          }
        }
      }, [choiceOne, choiceTwo])

      // reset choices and increase turn
      const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
      }

      //game start
      useEffect(() => {
        shuffleCards()
      }, [])

  return (
    <div>
      <div>
      <div className="body">
        <div className="header">MATCHING CARDS</div>
          <button onClick={shuffleCards}>New Game</button>
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
          <p>Turns: {turns}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default App;
