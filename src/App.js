import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Die from "./Die";
import "./style.css"
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
    
  }, [dice])

  function allNewDice() {
    const newDice =[]
    for (let i = 0; i < 10; i++) {
    newDice.push(generateNewDie())

    }
    return newDice 
  }

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
    }
  }

  function rollDice() {
    // if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die :
          generateNewDie()
      }))
    // }else
      // setTenzies(false)
      // setDice(allNewDice())
    
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
    }))
  }

  const diceElements = dice.map(die => (
      <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ))
  

  return (
    <main>
      {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll untill all dice are the same. Click each die to freeze it at it's current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
        {/* <Die value="1" />
        <Die value="2" />
        <Die value="3" />
        <Die value="4" />
        <Die value="5" />
        <Die value="6" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" /> */}
      </div>
      <button 
          className="roll-dice" 
          onClick={rollDice}
          >
            {tenzies ? "New Game" : "Roll"} 
          </button>
    </main>
  )
}
