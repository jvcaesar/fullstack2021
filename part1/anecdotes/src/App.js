import React, { useState } from 'react';

const generateRandomInteger = ( max ) => Math.floor(Math.random() * max)

const Button = ({ handleClick, label }) => <button onClick={handleClick}>{label}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const voteArray = new Array(anecdotes.length).fill(0)
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(voteArray)
  const [mostVotesIdx, setMostVotes] = useState(0)

  const getAnecdote = () => {
    setSelected(generateRandomInteger(anecdotes.length))
    mostVotes(votes)
  }
  
  const makeVote = () => {

    const upVote = [...votes]
    upVote[selected] += 1
    setVote(upVote)
    mostVotes(upVote)
  }

  // Finds and sets index of the most votes from the array
  const mostVotes = (voteArray) => {
    let max = 0
    let idx = 0
    for (let i = 0; i < voteArray.length; i++) {
      if (max < voteArray[i]) {
        max = voteArray[i]
        idx = i
      }
    }
    console.log('index', idx)
    setMostVotes(idx)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>

      <Button handleClick={makeVote} label='vote' />
      <Button handleClick={getAnecdote} label='next anecdote' />
      <br />
      <h1>Anecdote with the most votes</h1>
      {anecdotes[mostVotesIdx]}
      <p>has {votes[mostVotesIdx]} votes</p>
    </div>
  )
}

export default App;
