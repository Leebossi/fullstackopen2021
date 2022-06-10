import React from "react";
import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

function App() {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      <Total total={total}/>
    </div>
  );
}

export default App;
