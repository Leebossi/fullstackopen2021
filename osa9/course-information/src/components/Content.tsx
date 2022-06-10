import React from "react";
import Part from "./Part";
import CoursePart from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </div>
  );
};

export default Content;
