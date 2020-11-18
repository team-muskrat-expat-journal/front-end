import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import PersonForm from "./PersonForm";
import axiosWithAuth from "../utils/axiosWithAuth";
import * as yup from "yup";

export default function PostForm(props) {
  const [post, setPost] = useState({
    name: "",
    date: "",
    location: "",
    imageURL: "",
    notes: "",
    rating: "",
    persons: [{ name: "", contact: "", location: "", imageURL: "", notes: "" }],
    places: [{ name: "", contact: "", location: "", imageURL: "", notes: "" }],
    things: [{ name: "", contact: "", location: "", imageURL: "", notes: "" }],
  });

  const [errors, setErrors] = useState({
    name: "",
    date: "",
    imageURL: "",
    location: "",
  });

  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  const formSchema = yup.object().shape({
    name: yup.string().required("The Trip Must Have A Name"),
    date: yup.string().required("Must Have A Date For The Trip"),
    imageURL: yup.string().required("A Phot From he Trip Is Required"),
    location: yup.string().required("Must Have Location Of Trip"),
  });

  const formErrors = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setPost({ ...post, [name]: value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const newPost = {
      name: post.name.trim(),
      date: post.date.trim(),
      location: post.location.trim(),
      imageURL: post.imageURL.trim(),
      notes: post.notes.trim(),
      rating: post.rating.trim(),
    };
    axiosWithAuth()
      .post("api/post", newPost)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        history.pushState("/");
        console.log("Post res: ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    formSchema.isValid(post).then((valid) => setDisabled(!valid));
  }, [post]);
  return (
    <div className="post-form container">
      <header>
        <h1>Add a Trip to Your Journal</h1>
        <div className="errors">
          <div>{errors.name}</div>
          <div>{errors.date}</div>
          <div>{errors.imageURL}</div>
        </div>
      </header>
      <form className="form container" onSubmit={onSubmit}>
        <label>
          Name:&nbsp;
          <input
            type="text"
            name="tripname"
            value={post.name}
            onChange={onChange}
          />
        </label>
        <label>
          Date:&nbsp;
          <input
            type="text"
            name="date"
            value={post.date}
            onChange={onChange}
          />
        </label>
        <label>
          Location:&nbsp;
          <input
            type="text"
            name="location"
            value={post.location}
            onChange={onChange}
          />
        </label>
        <label>
          ImageURL:&nbsp;
          <input
            type="text"
            name="imageURL"
            value={post.imageURL}
            onChange={onChange}
          />
        </label>
        <label>
          Notes:&nbsp;
          <input
            type="text"
            name="notes"
            value={post.notes}
            onChange={onChange}
          />
        </label>
        <label>
          Rating:&nbsp;
          <input
            type="text"
            name="rating"
            value={post.rating}
            onChange={onChange}
          />
        </label>
        <label>
          Notes:&nbsp;
          <input
            type="text"
            name="notes"
            value={post.notes}
            onChange={onChange}
          />
        </label>
        <div></div>
        <Link to={`/persons`}>Add a Person</Link>
        <Link to={`/place`}>Add a Place</Link>
        <Link to={`/thing`}>Add a Thing</Link>
        <button disabled={disabled} onSubmit={onSubmit}>
          Submit Post
        </button>
      </form>
    </div>
  );
}
