import React from "react";

function Signup() {
  return (
    <>
      <h1>Sign up!</h1>
      <p>What is needed, - name, email, terms, password, 2nd pass, terms</p>
      <form>
        <label>
          Your Name <input name="name" type="text" />
        </label>
        <br></br>
        <label>
          Your Email <input name="email" type="email" />
        </label>
        <br></br>
        <label>
          Password <input name="password" type="password" />
        </label>
        <br></br>
        <label>
          Terms and Conditions
          <input name="terms" type="checkbox" />
        </label>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Signup;
