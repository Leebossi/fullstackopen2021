import React from 'react';

import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(coursePart =>
        <Part key={coursePart.name} part={coursePart} />
      )}
    </div>
  );
};

export default Content;