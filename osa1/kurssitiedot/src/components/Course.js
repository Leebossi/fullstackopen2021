import React from 'react'

const Course = ({ courses }) => {  
    return (
      courses.map(course =>
        <div key={course.id}>
          <Header header={course.name}/>
          <Content parts={course.parts}/>
        </div>
      )
    )
  }
  
  const Header = ({ header }) => {
    return (
      <h1>{header}</h1>
    )
  }
  
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <div key={part.id}>
            {<Part name={part.name} exercises={part.exercises}/>}
          </div>
        )}
        <Total parts={parts}/>
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <p>{name} {exercises}</p>
      )
    }
    
    const Total = ({ parts }) => {
      const exercises = parts.map(part => part.exercises)
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const total = exercises.reduce(reducer)
      return (
        <div>
          <b>Total of {total} exercises</b>
        </div>
      )
   }

export default Course