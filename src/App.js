import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Signup from "./components/Signup.js";
import PostForm from "./components/PostForm";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>Team 'Skrat Expat Journal</h1>
      <Signup />
      <PostForm />
    </div>
  );
};

export default App;
