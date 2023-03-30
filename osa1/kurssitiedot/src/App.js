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
      <Part part={props.content[0]}/>
      <Part part={props.content[1]}/>
      <Part part={props.content[2]}/>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.part.part} {props.part.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.total_number}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const content = [
    { part: 'Fundamentals of React', exercises: 10},
    { part: 'Using props to pass data', exercises: 7},
    { part: 'State of a component', exercises: 14},
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total_number={content[0].exercises+content[1].exercises+content[2].exercises}/>
    </div>
  )
}

export default App