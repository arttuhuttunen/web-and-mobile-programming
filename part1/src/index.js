import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Superadvanced web and mobile programming',
        parts: [
          {
            name: 'Basics of React',
            exercises: 8
          },
          {
            name: 'Using props',
            exercises: 10
          },
          {
            name: 'Component states',
            exercises: 12
          }
        ]
      }

  return (
    <div>
        <Header course={course.name} />
        <Contents parts={course.parts} />
        <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Contents = (props) => {
    return (
        <div>
            <Part partName={props.parts[0].name} partExercises={props.parts[0].exercises}/>
            <Part partName={props.parts[1].name} partExercises={props.parts[1].exercises}/>
            <Part partName={props.parts[2].name} partExercises={props.parts[2].exercises}/>
        </div>
    )
}

const Total = (props) => {
    return (
        <p>{"Total amount of exercises: "} {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.partName}</p>
            <p>{props.partExercises}</p>
        </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
