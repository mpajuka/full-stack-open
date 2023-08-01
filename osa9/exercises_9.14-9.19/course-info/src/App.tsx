const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  interface HeaderProps {
    name: string;
  }

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic";
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background";
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special";
  }
  
  type CoursePart = CoursePartBasic 
    | CoursePartGroup 
    | CoursePartBackground
    | CoursePartSpecial;

  interface Courses {
    courseParts: CoursePart[];
  }

  interface ExerciseSum {
    sum: number;
  }

  interface Part {
    coursePart: CoursePart;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>
  }

  const Content = (props: Courses) => {
    return(
      <div>
        {props.courseParts.map(c => (
          <Part key={c.name} coursePart={c} />
        ))}
      </div>
    )
  }

  const Part = (props: Part) => {
    switch(props.coursePart.kind) {
      case "basic":
        return (
          <p>
            <b>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </b>
            <br></br>
            <em>
              {props.coursePart.description}
            </em>
          </p>
        )
      case "group":
        return(
          <p>
            <b>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </b>
            <br></br>
             project exercises {props.coursePart.groupProjectCount}
          </p>
        )
      case "background":
        return(
          <p>
            <b>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </b>
            <br></br>
            <em>
              {props.coursePart.description}
            </em>
            <br></br>
            submit to {props.coursePart.backgroundMaterial}
          </p>
        )
      case "special":
        return(
          <p>
            <b>
              {props.coursePart.name} {props.coursePart.exerciseCount}
            </b>
            <br></br>
            <em>
              {props.coursePart.description}
            </em>
            <br></br>
            required skills: {props.coursePart.requirements.join(', ')}
          </p>
        )
      default:
        return assertNever(props.coursePart);
    }
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

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