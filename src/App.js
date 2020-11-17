import React, { useState } from "react";
import Signup from "./components/Signup.js";
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
      </div>
    </Router>
  );
};

export default App;
