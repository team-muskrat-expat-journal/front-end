//Things needed... name: [text]
// username (aka email address): [text]
// password: [text]

// new user?
import React, { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div>
      <h1>Hello from login</h1>
      <form>
        <label>
          Username
          <input
            value={form.name}
            name="username"
            type="text"
            placeholder="Your Username"
          ></input>
        </label>
        <br></br>
        <label>
          Email
          <input
            value={form.email}
            name="email"
            type="text"
            placeholder="Your Username"
          ></input>
        </label>
        <br></br>
        <label>
          Password
          <input
            value={form.password}
            name="password"
            type="password"
            placeholder="Your Username"
          ></input>
        </label>
        <button>Submit</button>
      </form>
      <a href="#">New User?</a>
    </div>
  );
}

export default Login;
