import React from "react";
import { Link } from "react-router-dom";

const Deleted = () => {
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
          <Link to="/Login">
            <button className="navButton" type="button">
              Sign in!
            </button>
          </Link>
        </div>
      </nav>
      <div className="signup">
        <h2>
          Your Post <br />
          Has Been <br />
          Deleted!!!
        </h2>
        <Link to="/dashboard">
          <button className="navButton">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Deleted;
