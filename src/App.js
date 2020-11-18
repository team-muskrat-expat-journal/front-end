import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Signup from "./components/Signup.js";
import PostForm from "./components/PostForm";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";


import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Login" component={Login}></Route>
        </Switch>
        <PostForm />
      </div>
    </Router>
  );
};

export default App;
