import React from 'react';

interface HeaderProps {
  name: string;
}

interface ContentProps {
  parts: Array<{ name: string, exerciseCount: number }>;
}

interface TotalProps {
  parts: Array<{ exerciseCount: number }>;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map(part => (
        <p key={part.name}>{part.name} {part.exerciseCount}</p>
      ))}
    </div>
  )
}

const Total = (props: TotalProps) => {
  return <p>
    Number of exercises{" "}
    {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
}

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

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;