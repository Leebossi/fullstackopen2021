import React from 'react';

import { CoursePart } from '../types';

import { assertNever } from '../utils';


const Part = ({ part }: { part: CoursePart }) => {
  console.log(part)
  switch (part.type) {
    case "normal":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p><em>{part.description}</em></p>
          <hr/>
        </div>
      );

    case "groupProject":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p>project exercises {part.groupProjectCount}</p>
          <hr/>
        </div>
      );

    case "submission":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p><em>{part.description}</em></p>
          <p>submit to {part.exerciseSubmissionLink}</p>
          <hr/>
        </div>
      );

    case "special":
      return (
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p><em>{part.description}</em></p>
          <p>required skills: {part.requirements}</p>
          <hr/>
        </div>
      );

    default:
      return assertNever(part);
  }
};

export default Part;