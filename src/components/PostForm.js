import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as yup from "yup";
import styled from "styled-components";
import { Button, FormGroup, Label } from "reactstrap";
import "./Style/signUpStyles.css";

import axiosWithAuth from "../utils/axiosWithAuth";
import { addPost } from "../actions/PostsAction";

const initalErrors = {
  name: "",
  date: "",
  imageURL: "",
  location: "",
};

const initialFormValues = {
  tripname: "",
  date: "",
  location: "",
  imageURL: "",
  notes: "",
  rating: "",
  role: "",
};

//const initialPosts = [];
const initialDisabled = true;

const PostForm = (props) => {
  //const [posts, setPosts] = useState(initialPosts);
  const [errors, setErrors] = useState(initalErrors);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(initialDisabled);

  const history = useHistory();

  const formSchema = yup.object().shape({
    tripname: yup.string().required("The Trip Must Have A Name"),
    date: yup.string().required("Must Have A Date For The Trip"),
    imageURL: yup.string().required("A Photo From The Trip Is Required"),
    location: yup.string().required("Must Have Location Of Trip"),
    role: yup.string(),
    rating: yup.string(),
    notes: yup.string(),
  });

  const setFormErrors = (name, value) => {
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
    const valueToUse = value;
    setFormValues({ ...formValues, [name]: valueToUse });
    setFormErrors(name, valueToUse);
    // console.log(formValues);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const newPost = {
      role: formValues.role,
      tripname: formValues.tripname,
      date: formValues.date,
      location: formValues.location,
      imageURL: formValues.imageURL,
      notes: formValues.notes,
      rating: formValues.rating,
      user_id: localStorage.getItem("user_id"),
    };
    console.log("New Post: ", newPost);
    props.addPost(newPost, history, setFormValues, initialFormValues);
    setFormValues(initialFormValues);
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <>
      <nav>
        <div className="logo">
          <h2>Team 'Skrat Expat Journal</h2>
        </div>

        <div className="links">
          <Link to="/Dashboard">
            <button className="navButton" type="button">
              Dashboard
            </button>
          </Link>
          <Link to="/">
            <button className="navButton" type="button">
              Log out
            </button>
          </Link>
        </div>
      </nav>
      <div>
        <h2>Add a Trip to Your Journal</h2>
        <div className="signup">
          <header>
            <div className="errors">
              <div>{errors.tripname}</div>
              <div>{errors.date}</div>
              <div>{errors.imageURL}</div>
            </div>
          </header>
          <form onSubmit={onSubmit}>
            <label>
              This is a:
              <select
                name="role"
                className="form-control"
                value={formValues.role}
                onChange={onChange}
              >
                <option value="">--- Select role ---</option>
                <option value="Person">Person</option>
                <option value="Place">Place</option>
                <option value="Thing">Thing</option>
              </select>
              <div style={{ color: "red" }}>{errors.role}</div>
            </label>
            <br></br>
            <label>
              Name:
              <input
                placeholder="Name of trip"
                className="form-control"
                type="text"
                name="tripname"
                value={formValues.tripname}
                onChange={onChange}
              />
              <div style={{ color: "red" }}>{errors.tripname}</div>
            </label>
            <br></br>
            <label>
              Date:
              <input
                placeholder="Date"
                className="form-control"
                type="text"
                name="date"
                value={formValues.date}
                onChange={onChange}
              />
              <div style={{ color: "red" }}>{errors.date}</div>
            </label>
            <br></br>
            <label>
              Location:
              <input
                placeholder="Location"
                className="form-control"
                type="text"
                name="location"
                value={formValues.location}
                onChange={onChange}
              />
              <div style={{ color: "red" }}>{errors.location}</div>
            </label>
            <br></br>
            <label>
              ImageURL:
              <input
                placeholder="Image"
                className="form-control"
                type="text"
                name="imageURL"
                value={formValues.imageURL}
                onChange={onChange}
              />
              <div style={{ color: "red" }}>{errors.imageURL}</div>
            </label>
            <br></br>
            <label>
              Notes:
              <input
                placeholder="Notes on your awesome trip!"
                className="form-control"
                type="text"
                name="notes"
                value={formValues.notes}
                onChange={onChange}
              />
              <div style={{ color: "red" }}>{errors.notes}</div>
            </label>
            <br></br>
            <label>
              Rating:
              <select
                className="form-control"
                name="rating"
                value={formValues.rating}
                onChange={onChange}
              >
                <option value="">---Select---</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <div style={{ color: "red" }}>{errors.rating}</div>
            </label>
            <br></br>
            <button
              className="form-control"
              disabled={disabled}
              onSubmit={onSubmit}
            >
              Submit Post
            </button>
            <Link to="/dashboard">Back</Link>
          </form>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps, { addPost })(PostForm);
