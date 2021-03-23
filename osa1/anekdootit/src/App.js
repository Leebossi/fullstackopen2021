import React, { useState } from 'react'

const Vote = (points, selected) => {
  const copy = [...points]
  copy[selected] += 1
  return copy
}

const MostVotes = (props) => {
  const index = props.points.indexOf(Math.max(...props.points))
  return (
    <div>
      <p>{props.anecdotes[index]}</p>
      <p>has {props.points[index]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <div>
      <button onClick={() => setPoints(Vote(points, selected))}>
        Vote
      </button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 6))}>
        next anecdote
      </button>
      </div>
      <h1>Anecdote with most votes</h1>
      <MostVotes points={points} anecdotes={anecdotes}/>
    </div>
  )
}

export default App