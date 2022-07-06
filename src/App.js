import React, {useState, useEffect} from "react";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardModerator from "./components/BoardModerator";
import Nav from './components/Nav'
import { history } from "./helpers/history";
import Test from './components/Test.js'
import { useDispatch, useSelector } from "react-redux";
import { getNFTPoint, getPoint } from "./actions/point";
import Reset from './components/Reset'
import Forget from './components/Forgot';
import ForgetSuccess from "./components/ForgetSuccess";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    // if(currentUser)
      // dispatch(getPoint())
      // dispatch(getNFTPoint())
  }, [currentUser]);

  return (
    <Router history={history}>
      <div>
        <Nav />
        <div>
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/mod" component={BoardModerator} />
            <Route path='/reset' component={Reset} />
            <Route path='/forget' component={Forget} />
            <Route path='/forget-success' component={ForgetSuccess} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;