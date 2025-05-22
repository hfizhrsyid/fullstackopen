import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="total" value={total} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({setFeedback, text}) => <button onClick={setFeedback}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClicks = () => {
    const updatedClick = good + 1
    setGood(updatedClick)
    setTotal(updatedClick + bad + neutral)
    setAverage((updatedClick - bad) / (updatedClick + neutral + bad))
    setPositive((updatedClick) / (updatedClick + neutral + bad))
  }

  const handleNeutralClicks = () => {
    const updatedClick = neutral + 1
    setNeutral(updatedClick)
    setTotal(updatedClick + good + bad)
    setAverage((good - bad) / (updatedClick + good + bad))
    setPositive((good) / (updatedClick + good + bad))
    console.log(updatedClick + good + bad)
  }

  const handleBadClicks = () => {
    const updatedClick = bad + 1
    setBad(updatedClick)
    setTotal(updatedClick + good + neutral)
    setAverage((good - updatedClick) / (updatedClick + neutral + good))
    setPositive((good) / (updatedClick + neutral + good))
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button feedback={good} setFeedback={handleGoodClicks} text={'good'} />
      <Button feedback={neutral} setFeedback={handleNeutralClicks} text={'neutral'} />
      <Button feedback={bad} setFeedback={handleBadClicks} text={'bad'} />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App