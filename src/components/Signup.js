import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";

import "./Style/signUpStyles.css";
import * as yup from "yup";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
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

  const change = (event) => {
    const { checked, value, name, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormErrors(name, value);
    setForm({ ...form, [name]: valueToUse });
  };

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is required and must be at least 6 characters long"),
    terms: yup.boolean().oneOf([false], "You must give away your data"), //This is where the issue is, (check with Brian)
  });

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  const submit = (e) => {
    e.preventDefault();
    const newUser = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      terms: form.terms,
    };
    axios
      .post("https://skrat-expat.herokuapp.com/api/auth/register", newUser)
      .then((res) => {
        console.log("Login res: ", res);
        history.push('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2 className="login">Signup</h2>
      <div className="signup">
        <form onSubmit={submit}>
          <label>
            Your Name
            <input
              className="form-control"
              type="text"
              name="name"
              value={form.name}
              onChange={change}
              placeholder="Your Name"
            />
          </label>
          <div style={{ color: "red" }}>{errors.name}</div>
          <br></br>
          <label>
            Your Email
            <input
              className="form-control"
              onChange={change}
              name="email"
              type="email"
              value={form.email}
              placeholder="Your Email"
            />
          </label>
          <div style={{ color: "red" }}>{errors.email}</div>
          <br></br>
          <label>
            Password
            <input
              className="form-control"
              onChange={change}
              name="password"
              type="password"
              value={form.password}
              placeholder="Your Password"
            />
          </label>

          <div style={{ color: "red" }}>{errors.password}</div>
          <br></br>
          <label>
            Terms and Conditions
            <input
              className="form-control"
              onChange={change}
              name="terms"
              type="checkbox"
              value={form.terms}
              checked={form.terms}
            />
          </label>
          <div style={{ color: "red" }}>{errors.terms}</div>
          <br></br>
          <button
            className="form-control"
            disabled={disabled}
            onSubmit={submit}
            type="submit"
          >
            Submit!
          </button>

          <br></br>
          <Link to="/Login">Already a user?</Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
