import React from "react";
import CoursePart from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case "normal":
      return (
        <div className="part">
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <i>{coursePart.description}</i>
        </div>
      );

    case "groupProject":
      return (
        <div className="part">
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p>project exercises {coursePart.groupProjectCount}</p>
        </div>
      );

    case "submission":
      return (
        <div className="part">
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <i>{coursePart.description}</i>
          <p>
            submit to <i>{coursePart.exerciseSubmissionLink}</i>
          </p>
        </div>
      );

    case "special":
      return (
        <div className="part">
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <i>{coursePart.description}</i>
          <br/>
          <span>required skills:</span>
          {coursePart.requirements.map((req) => (
            <span key={req}> {req} </span>
          ))}
        </div>
      );

    default:
      return assertNever(coursePart);
  }
};

export default Part;
