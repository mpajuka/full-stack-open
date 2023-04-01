import { useState } from "react";

const Statistics = (props) => {
  if (props.all !== 0) {
    return(
      <table>
        <thead>
          <StatisticLine text="good" value ={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={(props.good - props.bad) / props.all} />
          <StatisticLine text="positive" value={props.good / props.all * 100 + " %"} />
        </thead>
      </table>
    )
  } else {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => ( 
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodValue = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralValue = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadValue = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodValue} text='good'/>
      <Button handleClick={handleNeutralValue} text='neutral'/>
      <Button handleClick={handleBadValue} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App;
