import React, { useState } from "react";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>Team 'Skrat Expat Journal</h1>
      <Signup />
      <Login />
    </div>
  );
};

export default App;
