import React from "react";

export default function postDetails({ details }) {
  return (
    <div className="post-container">
      <header>
        <div className="image-container">
          <img src={details.imageURL} alt={details.imageURL} />
        </div>
        <div className="details-info">
          <div className="deetails-info heading">
            <p>{details.location}</p>
            <p>{details.date}</p>
          </div>
          <div className="rating">
            <p>{details.rating}</p>
          </div>
          <div className="details-notes">
            <p>{details.notes}</p>
          </div>
        </div>
      </header>
    </div>
  );
}
