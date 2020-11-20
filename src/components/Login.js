import React, { useState, useEffect } from "react";
import "./Style/signUpStyles.css";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import * as yup from "yup";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is required and must be at least 6 characters long"),
  });

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  const change = (e) => {
    const { value, name } = e.target;
    const valueToUse = value;
    setForm({ ...form, [name]: valueToUse });
    setFormErrors(name, valueToUse);
  };

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const submit = (e) => {
    e.preventDefault();
    const newUser = {
      email: form.email.trim(),
      password: form.password.trim(),
    };
    axios
      .post("https://skrat-expat.herokuapp.com/api/auth/login", newUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.data.id);
        history.push("/dashboard");
        console.log("Login res: ", res);
      })
      .catch((err) => {
        console.log("Login error: ", err);
      });
  };
  return (
    <div>
      <nav>
        <div className="logo">
          <h2>Team 'Skrat Expat Journal</h2>
        </div>
        <div className="links">
          <Link to="/">
            <button className="navButton" type="button">
              Home
            </button>
          </Link>
          <Link to="/Signup">
            <button className="navButton" type="button">
              Sign up!
            </button>
          </Link>
        </div>
      </nav>
      <h2 className="login">Login</h2>
      <br></br>
      <div className="signup">
        <form onSubmit={submit}>
          <label>
            Email
            <input
              className="form-control"
              onChange={change}
              value={form.email}
              name="email"
              type="text"
              placeholder="Your Username"
            ></input>
            <div style={{ color: "red" }}>{errors.email}</div>
          </label>
          <br></br>
          <label>
            Password
            <input
              className="form-control"
              onChange={change}
              value={form.password}
              name="password"
              type="password"
              placeholder="Your Username"
            ></input>
            <div style={{ color: "red" }}>{errors.password}</div>
          </label>
          <br></br>
          <button className="form-control" disabled={disabled}>
            Submit
          </button>
          <br></br>
          <Link to="/Signup">
            <button className="form-control">New User?</button>
          </Link>
        </form>
        <br></br>
      </div>
    </div>
  );
}

export default Login;
