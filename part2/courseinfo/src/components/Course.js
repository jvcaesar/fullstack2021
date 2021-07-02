import React from 'react'

const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({ course }) => {
  const parts = course.parts

  const total = parts.reduce((sum, val) => {
    //console.log('sum, val', sum, val)
    if (typeof sum === 'number')
      return sum + val.exercises
    return sum.exercises + val.exercises
  })
  return(
    <p><b>total of {total} exercises</b></p>
  ) 
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>    

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course
