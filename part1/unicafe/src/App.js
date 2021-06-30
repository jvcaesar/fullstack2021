import React, { useState } from 'react';

const Heading = ({ heading }) => <h1>{heading}</h1>

const Button = ({ handleClick, name }) => <button onClick={handleClick}>{name}</button>

const Statistic = ({ name, counter, symbol }) => <tr><td>{name}</td><td>{counter} {symbol}</td></tr>

// Statistics component - unicafe
const Statistics = ({ good, neutral, bad, all }) => {
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

  if (all === 0)
    return (
      <div>
        <Heading heading='statistics' />
        <p>No feedback given</p>
      </div>
    )
  return (
    <div>
      <Heading heading='statistics' />
      <table>
        <tbody>
          <Statistic name='good  ' counter={good} />
          <Statistic name='neutral  ' counter={neutral} />
          <Statistic name='bad  ' counter={bad} />
          <Statistic name='all  ' counter={all} />
          <Statistic name='average  ' counter={average()} />
          <Statistic name='positive  ' counter={positive()} symbol='%' />
        </tbody>
      </table>

    </div>
  )
}

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

  return (
    <div>
      <Heading heading='give feedback' />
      <Button handleClick={addGood} name='good' />
      <Button handleClick={addNeutral} name='neutral' />
      <Button handleClick={addBad} name='bad' />

      <br></br>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} />

    </div>
  )
}

export default App
