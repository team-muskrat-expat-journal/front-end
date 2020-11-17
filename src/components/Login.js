//Things needed... name: [text]
// username (aka email address): [text]
// password: [text]

// new user?
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

function Login() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
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
      .then(() => ({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const submit = (e) => {
    e.preventDefault();
    const newUser = {
      user: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    };
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setForm({ name: "", email: "", password: "" });
      })
      .catch((err) => {
        debugger;
      });
  };
  return (
    <div>
      <h1>Hello from login</h1>
      <form onSubmit={submit}>
        <label>
          Username
          <input
            onChange={change}
            // value={form.name}
            name="name"
            type="text"
            placeholder="Your Username"
          ></input>
          <div style={{ color: "red" }}>{errors.name}</div>
        </label>
        <br></br>
        <label>
          Email
          <input
            onChange={change}
            //value={form.email}
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
            onChange={change}
            //  value={form.password}
            name="password"
            type="password"
            placeholder="Your Username"
          ></input>
          <div style={{ color: "red" }}>{errors.password}</div>
        </label>
        <button disabled={disabled}>Submit</button>
      </form>
      <a href="#">New User?</a>
    </div>
  );
}

export default Login;
