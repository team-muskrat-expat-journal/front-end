import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const initialFormValues = {
  rating: "",
  name: "",
  date: "",
  location: "",
  image: "",
  person: [],
  place: [],
  thing: [],
};

const initialFomErrors = {
  name: "",
  date: "",
};

const initialPost = [];
const initialDisabled = true;

export default function PostForm(props) {
  const { values, submit, change, person, place, thing } = props;
  const [post, setPost] = useState(initialPost);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFomErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const postNewPost = (newPost) => {
    axios
      .post("", newPost)
      .then((res) => {
        setPost([...post, res.data]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitForm = (evt) => {
    const newPost = {
      id: uuidv4().trim(),
      rating: formValues.rating,
      name: formValues.name.trim(),
      date: formValues.date.trim(),
      location: formValues.location.trim(),
      image: formValues.image.trim(),
      person: [{ ...person }],
      place: [{ ...place }],
      thing: [{ ...thing }],
    };
    postNewPost(newPost);
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    change(name, value);
  };

  return (
    <div className="postForm">
      <form className="form-group container" onSubmit={submitForm}>
        <label>
          Name/Location:&nbsp;
          <input
            type="text"
            value={values.name}
            onChange={onChange}
            name="name"
          />
        </label>
        <label>
          Date/Time:&nbsp;
          <input
            type="text"
            value={values.date}
            name="date"
            onChange={onChange}
          />
        </label>
        <label>
          Location:&nbsp;
          <input
            type="text"
            value={values.location}
            name="location"
            onChange={onChange}
          />
        </label>
        <label>
          Rating:&nbsp;
          <select name="rating" value={values.rating} onChange={onChange}>
            <option value="">---Rating---</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label>
          Image:&nbsp;
          <input
            type="text"
            value={values.image}
            name="image"
            onChange={onChange}
          />
        </label>
        {person.map((ele) => {
          <div className="person-card" key={ele.id}>
            <Link className="link" to="/person">
              Add a Person
            </Link>
          </div>;
        })}
        {place.map((elm) => {
          <div className="place-card" key={elm.id}>
            <Link clasName="link" to="/place">
              Add a Place
            </Link>
          </div>;
        })}
        {thing.map((elm) => {
          <div className="thing-card" key={elm.id}>
            <Link className="link" to="/thing">
              Add a Thing
            </Link>
          </div>;
        })}
        <button disabled={disabled}>submit</button>
      </form>
    </div>
  );
}
