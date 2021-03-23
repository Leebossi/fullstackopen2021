import React, { useState } from 'react'


const StatisticLine = (props) => {
  return(
    <tbody>
      <tr>
        <td> {props.text}</td>
        <td> {props.value} {props.char}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  if (props.total > 0) {
    return (
      <table>
        <StatisticLine text="Good" value ={props.good} />
        <StatisticLine text="Neutral" value ={props.neutral} />
        <StatisticLine text="Bad" value ={props.bad} />
        <StatisticLine text="All" value ={props.total} />
        <StatisticLine text="Average" value ={props.sum/props.total} />
        <StatisticLine text="Positive" value ={props.good/props.total*100} char="%"/>
      </table>
    )
  }
  else {
    return (
      <p>No feedback given</p>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={() => {
      props.setValue(props.value + 1)
      props.setTotal(props.total + 1)
      props.setSum(props.sum)
    }}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [sum, setSum] = useState(0)

  return (
    <div>

      <h1>Give Feedback</h1>
      
      <Button text="Good" setValue={setGood} value={good}
       setTotal={setTotal} total={total} setSum={setSum} sum={sum + 1}
      />

      <Button text="Neutral" setValue={setNeutral} value={neutral}
       setTotal={setTotal} total={total} setSum={setSum} sum={sum} 
      />

      <Button text="Bad" setValue={setBad} value={bad}
       setTotal={setTotal} total={total} setSum={setSum} sum={sum - 1}
      />


      <h1>Statistics</h1>

      <Statistics good={good} neutral={neutral}
       bad={bad} total={total} sum={sum}
      />

    </div>
  )
}

export default App