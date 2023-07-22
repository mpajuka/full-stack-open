const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  interface HeaderProps {
    name: string;
  }

  interface Course {
    name: string,
    exerciseCount: number
  }

  interface Courses {
    courseParts: Course[];
  }

  interface ExerciseSum {
    sum: number;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>
  }

  const Content = (props: Courses) => {
    return (
      <div>
        {props.courseParts.map(c => (
          <p key={c.name}>{c.name} {c.exerciseCount}</p>
        ))}
      </div>
    )
  }

  const Total = (props: ExerciseSum) => {
    return (
      <div>
        <p>
          Number of exercises {props.sum}
        </p>
      </div>
    )
  }

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total sum={courseParts.reduce((carry, part) => 
        carry + part.exerciseCount, 0)} />
    </div>
  );
};

export default App;