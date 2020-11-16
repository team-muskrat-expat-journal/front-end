import React, { useState, useEffect } from "react";
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

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const change = (event) => {
    const { checked, value, name, type } = event.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormErrors(name, valueToUse);
    setForm({ ...form, [name]: valueToUse });
  };
  const schema = yup.object().shape({
    name: yup.string("name").required("Name is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is required and must be at least 6 characters long"),
    terms: yup.boolean().oneOf([true], "You must give away your data"),
  });
  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  return (
    <>
      <h1>Sign up!</h1>
      <p>What is needed, - name, email, terms, password, 2nd pass, terms</p>
      <form>
        <label>
          Your Name{" "}
          <input
            onChange={change}
            name="name"
            type="text"
            placeholder="Your Name"
          />
        </label>
        <div style={{ color: "red" }}>{errors.name}</div>
        <br></br>
        <label>
          Your Email{" "}
          <input
            onChange={change}
            name="email"
            type="email"
            placeholder="Your Email"
          />
        </label>
        <div style={{ color: "red" }}>{errors.email}</div>
        <br></br>
        <label>
          Password{" "}
          <input
            onChange={change}
            name="password"
            type="password"
            placeholder="Your Password"
          />
        </label>

        <div style={{ color: "red" }}>{errors.password}</div>
        <br></br>
        <label>
          Terms and Conditions
          <input onChange={change} name="terms" type="checkbox" />
        </label>
        <div style={{ color: "red" }}>{errors.terms}</div>
        <br></br>
        <button disabled={disabled} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default Signup;
