import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import * as yup from "yup";

const initalErrors = {
  name: "",
  date: "",
  imageURL: "",
  location: "",
};

const initialFormValues = {
  name: "",
  date: "",
  location: "",
  imageURL: "",
  notes: "",
  rating: "",
  role: "",
};

const initialPostValues = [];
const initialDisabled = true;

export default function PostForm(props) {
  const [post, setPost] = useState(initialPostValues);
  const [errors, setErrors] = useState(initalErrors);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(initialDisabled);

  const history = useHistory();

  const formSchema = yup.object().shape({
    name: yup.string().required("The Trip Must Have A Name"),
    date: yup.string().required("Must Have A Date For The Trip"),
    imageURL: yup.string().required("A Phot From he Trip Is Required"),
    location: yup.string().required("Must Have Location Of Trip"),
    role: yup.string().oneOf(["person", "place", "thing"], "role is required"),
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
    formSchema(name, value);
    setPost({ ...formValues, [name]: value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const newPost = {
      role: formValues.role.trim(),
      name: formValues.name.trim(),
      date: formValues.date.trim(),
      location: formValues.location.trim(),
      imageURL: formValues.imageURL.trim(),
      notes: formValues.notes.trim(),
      rating: formValues.rating.trim(),
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
    formSchema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

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
          This is a:
          <select name="role" value={post.role} onChange={onChange}>
            <option value="">--- Select role ---</option>
            <option value="Person">Person</option>
            <option value="Place">Place</option>
            <option value="Thing">Thing</option>
          </select>
        </label>
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
          <select name="rating" value={post.rating} onChange={onChange}>
            <option value="">---Select---</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button disabled={disabled} onSubmit={onSubmit}>
          Submit Post
        </button>
      </form>
    </div>
  );
}
