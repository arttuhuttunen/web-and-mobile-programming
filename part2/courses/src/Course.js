import React from 'react'

const Course = (props) => {
    return (
        <div>
          <Header course={props.course.name}/>
          <Contents name={props.course.parts.map(parts => parts.name)} exercises={props.course.parts.map(parts => parts.exercises)}/>
          <Total parts={props.course.parts.map(parts => parts.exercises)} />
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
          <Part partName={props.name[0]} partExercises={props.exercises[0]}/>
          <Part partName={props.name[1]} partExercises={props.exercises[1]}/>
          <Part partName={props.name[2]} partExercises={props.exercises[2]}/>
      </div>
    )
}
  
const Part = (props) => {
    return (
      <div>
          <p>{props.partName} {props.partExercises}</p>
      </div>
  )
}
  
const Total = (props) => {
    return (
        <p>{"Total amount of exercises: "} {props.parts[0] + props.parts[1] + props.parts[2]}</p>
    )
}

export default Course