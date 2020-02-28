import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Button good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad}/>
            <Statistics good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad}/>
        </div>
    )
}

const Button = (props) => {
    return(
    <div>
    <button onClick={ () => props.setGood(props.good + 1)}>
                Good    
            </button>
            <button onClick={ () => props.setNeutral(props.neutral +1)}>
                Neutral
            </button>
            <button onClick={ () => props.setBad(props.bad +1)}>
                Bad
            </button>
    </div>
    )
}


const Statistics = (props) => {
    if (props.good !== 0 || props.neutral !== 0 || props.bad !== 0) {
        return(
        <table>
            <tbody>
                <tr><Statistic type={"good"} good={props.good}/></tr>
                <tr><Statistic type={"neutral"} neutral={props.neutral}/></tr>
                <tr><Statistic type={"bad"} bad={props.bad}/></tr>
                <tr><Statistic type={"average"} good={props.good} neutral={props.neutral} bad={props.bad}/></tr>
                <tr><Statistic type={"positive"} good={props.good} neutral={props.neutral} bad={props.bad}/></tr>
            </tbody>
        </table>
        )
    } else {
        return (
            <div>
            <p>No feedback given</p>
            </div>
        )
    }
}

const Statistic = (props) => {
    if (props.type === "good") {
        return (
            <td>
                Good: {props.good}
            </td>
        )
    }
    else if (props.type === "neutral") {
        return (
            <td>
                Neutral: {props.neutral}
            </td>
        )
    }
    else if (props.type === "bad") {
        return (
            <td>
                Bad : {props.bad}
            </td>
        )
    }

    else if (props.type === "average") {
        return (
            <td>
                Average: {(props.good + props.neutral*0 + props.bad*-1) / (props.good + props.neutral + props.bad)}
            </td>
        )
    }
    else if (props.type === "positive") {
        return (
            <td>
                Positive: {props.good / (props.good + props.neutral + props.bad) * 100} {'%'}
            </td>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

