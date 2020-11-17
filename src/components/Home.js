import React from "react";
import { Link } from "react-router-dom";
import "./Style/styleHome.css";
function Home() {
  return (
    <>
      <div className="main">
        <h1>Team 'Skrat Expat Journal</h1>
      </div>
      <button type="button">
        <Link to="/Login">Login</Link>
      </button>
      <button type="button">
        <Link to="/Signup">Sign up!</Link>
      </button>
    </>
  );
}

export default Home;
