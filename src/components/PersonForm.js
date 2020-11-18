import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Person from "./PersonForm";
import axiosWithAuth from "../utils/axiosWithAuth";

export default function PersonForm(props) {
  const [person, setPerson] = useState({
    name: "",
    contact: "",
    location: "",
    imageURL: "",
    notes: "",
  });

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setPerson({ ...person, [name]: value });
  };
  const history = useHistory();

  const onSubmit = (evt) => {
    evt.preventDefault();
    const newPerson = {
      name: person.personname.trim(),
      contact: person.contact.trim(),
      location: person.location.trim(),
      imageURL: person.imageURL.trim(),
      notes: person.notes.trim(),
    };
    setPerson({ ...person, newPerson });
    history(-1);
  };

  return (
    <div className="person-form container">
      <header>
        <h2>Add A Person From The Trip</h2>
      </header>
      <form className="form container" onSubmit={onSubmit}>
        <label>
          Name:&nbsp;
          <input
            type="text"
            name="personname"
            value={person.name}
            onChange={onChange}
          />
        </label>
        <label>
          Contact:&nbsp;
          <input
            type="text"
            name="contact"
            value={person.contact}
            onChange={onChange}
          />
        </label>
        <label>
          Location:&nbsp;
          <input
            type="text"
            name="location"
            value={person.location}
            onChange={onChange}
          />
        </label>
        <label>
          ImageURL:&nbsp;
          <input
            type="text"
            name="imageURL"
            value={person.imageURL}
            onChange={onChange}
          />
        </label>
        <label>
          Notes:&nbsp;
          <input
            type="text"
            name="notes"
            value={person.notes}
            onChange={onChange}
          />
        </label>
        <button onSubmit={onSubmit}>Submit</button>
      </form>
    </div>
  );
}
