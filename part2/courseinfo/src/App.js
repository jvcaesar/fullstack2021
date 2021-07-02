import React from 'react';

const Title = ({ name }) => <h1>{name}</h1>
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


const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux chapter',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Title name='Web development curriculum' />
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App;
