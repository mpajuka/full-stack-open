const Header = (props) => {
  console.log(props)
  return (
    <div>
       <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
     <Part part={props.contents[0]} /> 
     <Part part={props.contents[1]} />
     <Part part={props.contents[2]} />
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  let total_exercises = 0
  for (let i = 0; i < props.total.length; ++i)
  {
    total_exercises += props.total[i].exercises
  }
  return (
    <div>
      <p>Number of exercises {total_exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content contents={parts} />
      <Total total={parts}/>
    </div>
  )
}

export default App