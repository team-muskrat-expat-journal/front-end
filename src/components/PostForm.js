import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import * as yup from "yup";
import styled from "styled-components";
import { Button, FormGroup, Label } from "reactstrap";
import "./Style/PostForm.css";

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

const initialPosts = [];
const initialDisabled = true;

export default function PostForm(props) {
  const [posts, setPosts] = useState(initialPosts);
  const [errors, setErrors] = useState(initalErrors);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(initialDisabled);

  const history = useHistory();

  const formSchema = yup.object().shape({
    tripname: yup.string().required("The Trip Must Have A Name"),
    date: yup.string().required("Must Have A Date For The Trip"),
    imageURL: yup.string().required("A Phot From he Trip Is Required"),
    location: yup.string().required("Must Have Location Of Trip"),
    role: yup.string().oneOf(["person", "place", "thing"], "role is required"),
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
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const newPost = {
      role: formValues.role.trim(),
      tripname: formValues.tripname.trim(),
      date: formValues.date.trim(),
      location: formValues.location.trim(),
      imageURL: formValues.imageURL.trim(),
      notes: formValues.notes.trim(),
      rating: formValues.rating.trim(),
    };
    axiosWithAuth()
      .post("api/journal", newPost)
      .then((res) => {
        localStorage.getItem("token");
        history.push("/dashboard");
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
      </header>
      <div className="form container">
        <StyledForm onSubmit={onSubmit}>
          <FormGroup>
            <Label for="role">This is a:&nbsp;</Label>
            <select name="role" value={formValues.role} onChange={onChange}>
              <option value="">--- Select role ---</option>
              <option value="Person">Person</option>
              <option value="Place">Place</option>
              <option value="Thing">Thing</option>
            </select>
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="name">Name:&nbsp;</Label>
            <input
              type="text"
              name="tripname"
              value={formValues.tripname}
              onChange={onChange}
            />
            <div>{errors.tripname}</div>
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="date">Date:&nbsp;</Label>
            <input
              type="text"
              name="date"
              value={formValues.date}
              onChange={onChange}
            />
            <div>{errors.date}</div>
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="location">Location:&nbsp;</Label>
            <input
              type="text"
              name="location"
              value={formValues.location}
              onChange={onChange}
            />
            <div>
              <br />
            </div>
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="imageURL">ImageURL:&nbsp;</Label>
            <input
              type="text"
              name="imageURL"
              value={formValues.imageURL}
              onChange={onChange}
            />

            <div>{errors.imageURL}</div>
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="notes">Notes:&nbsp;</Label>
            <input
              type="text"
              name="notes"
              value={formValues.notes}
              onChange={onChange}
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="rating">Rating:&nbsp; </Label>
            <select name="rating" value={formValues.rating} onChange={onChange}>
              <option value="">---Select---</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </FormGroup>
          <br />
          <Button disabled={disabled} onSubmit={onSubmit}>
            Submit Post
          </Button>
        </StyledForm>
      </div>
    </div>
  );
}
const StyledForm = styled.form`
  width: 90%;
  font-size: 2.5rem;
  label {
    width: 60%;
    dispaly: flex;
  }
  input {
    width: 90%;
    align-content: end;
  }
  button {
    margin: 0 40% 3% 40%;
  }
`;
