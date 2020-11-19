import React from "react";
import thunk from 'redux-thunk';
import ReactDOM from "react-dom";
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import { PostsReducer } from './reducers/PostsReducer';

const store = createStore(PostsReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
