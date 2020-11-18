import React from "react";
import { Link } from "react-router-dom";
import "./Style/styleHome.css";
function Home() {
  return (
    <>
      <nav>
        <div className="logo">
          <h1>Team 'Skrat Expat Journal</h1>
        </div>
        <div className="links">
          <Link to="/Login">
            <button className="navButton" type="button">
              Login
            </button>
          </Link>
          <Link to="/Signup">
            <button className="navButton" type="button">
              Sign up!
            </button>
          </Link>
        </div>
      </nav>
      <div className="main">
        <br></br>
      </div>

      <h1>Don't be a tourist, be a traveler</h1>
    </>
  );
}

export default Home;
