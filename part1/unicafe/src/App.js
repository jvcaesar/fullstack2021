import React, { useState } from 'react';
import './App.css';

const Heading = ({ heading }) => <h1>{heading}</h1>
const Button = ({ handleClick, name }) => <button onClick={handleClick}>{name}</button>
const Display = ({ name, counter, symbol }) => <p>{name} {counter} {symbol}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // allclicks are stored here
  const [all, setAll] = useState(0)

  const addGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const addNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const addBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const average = () => {
    if (all)
      return (good-bad)/all
    return 0
  }
  const positive = () => {
    if (good)
      return (good/all)*100
    return 0
  }

  return (
    <div>
      <Heading heading='give feedback' />
      <Button handleClick={addGood} name='good' />
      <Button handleClick={addNeutral} name='neutral' />
      <Button handleClick={addBad} name='bad' />

      <br></br>

      <Heading heading='statistics' />
      <Display name='good  ' counter={good} />
      <Display name='neutral  ' counter={neutral} />
      <Display name='bad  ' counter={bad} />
      <Display name='all  ' counter={all} />
      <Display name='average  ' counter={average()} />
      <Display name='positive  ' counter={positive()} symbol='%' />
    </div>
  )
}

export default App
