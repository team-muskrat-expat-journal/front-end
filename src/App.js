import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./components/Home.js";
import Edited from './components/Edited';
import Login from "./components/Login.js";
import Deleted from './components/Deleted';
import Signup from "./components/Signup.js";
import PostForm from './components/PostForm';
import Dashboard from './components/Dashboard';
import { fetchPosts } from './actions/PostsAction';
import { PrivateRoute } from './components/PrivateRoute';

import "./App.css";

const App = () => {
  const [onDashboard, setOnDashboard] = useState(false);
  const [onPost, setOnPost] = useState(false);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Signup" component={Signup} />
          <PrivateRoute exact path='/dashboard'>
            <Dashboard onDashboard={setOnDashboard} />
          </PrivateRoute>
          <PrivateRoute exact path='/postform'>
            <PostForm onPost={setOnPost} />
          </PrivateRoute>
          <PrivateRoute exact path='/deleted'>
            <Deleted />
          </PrivateRoute>
          <PrivateRoute exact path='/edited'>
            <Edited />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { fetchPosts })(App);