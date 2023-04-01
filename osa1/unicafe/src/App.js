import { useState } from "react";

const Statistics = (props) => {
  return(
    <div>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.all}</p>
        <p>average {(props.good - props.bad) / props.all}</p>
        <p>positive {props.good / props.all * 100} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const setGoodValue = (newValue) => {
    setGood(newValue)
    setAll(all + 1)
  }

  const setNeutralValue = (newValue) => {
    setNeutral(newValue)
    setAll(all + 1)
  }

  const setBadValue = (newValue) => {
    setBad(newValue)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGoodValue(good + 1)}>good</button>
      <button onClick={() => setNeutralValue(neutral + 1)}>neutral</button>
      <button onClick={() => setBadValue(bad + 1)}>bad</button>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App;
