import React from 'react';

import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <Part part={courseParts[0]} />
      <Part part={courseParts[1]} />
      <Part part={courseParts[2]} />
      <Part part={courseParts[3]} />
      <Part part={courseParts[4]} />
    </div>
  );
};

export default Content;