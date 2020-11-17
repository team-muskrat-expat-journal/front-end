//Things needed... name: [text]
// username (aka email address): [text]
// password: [text]

// new user?
import React, { useState, useEffect } from "react";
import * as yup from "yup";

function Login() {
  const [form, setForm] = useState({
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
  };

  return (
    <div>
      <h1>Hello from login</h1>
      <form>
        <label>
          Username
          <input
            onChange={change}
            // value={form.name}
            name="name"
            type="text"
            placeholder="Your Username"
          ></input>
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
        </label>
        <button disabled={disabled}>Submit</button>
      </form>
      <a href="#">New User?</a>
    </div>
  );
}

export default Login;
