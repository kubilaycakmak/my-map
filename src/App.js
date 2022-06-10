import React, {useState, useEffect} from "react";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardModerator from "./components/BoardModerator";
import Nav from './components/Nav'
import { history } from "./helpers/history";

import { useDispatch, useSelector } from "react-redux";
import { getPoint } from "./actions/point";

const App = () => {

  const dispatch = useDispatch();
  const { point: currentPoints } = useSelector((state) => state.point);

  useEffect(() => {
    if(!currentPoints) {
      dispatch(getPoint());
    };
  }, [dispatch]);


  return (
    <Router history={history}>
      <div>
        <Nav />
        <div className="">
          <Switch>
            <Route exact path={["/", "/home"]} > 
              <Home />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/mod">
              <BoardModerator/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;