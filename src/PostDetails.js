import React from "react";
import Person from "././PostsForm/Person/Person";
import Place from "././PostsForm/Place/Place";
import Thing from "././PostForm/Thing/Thing";

export default function PostDetails({ details }) {
  if (!details) {
    return <h3>Searching for deatils for trip....</h3>;
  }

  return (
    <div className="post container">
      <h2>{details.name}</h2>
      <Person />
      <Place />
      <Thing />
    </div>
  );
}
