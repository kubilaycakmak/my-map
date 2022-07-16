import React, {useState, useEffect} from "react";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import BoardModerator from "./components/BoardModerator";
import Nav from './components/nav/Nav'
import { history } from "./helpers/history";
import { useDispatch, useSelector } from "react-redux";
import { getNFTPoint, getPoint } from "./actions/point";
import Reset from './components/Reset'
import Forget from './components/Forgot';
import ForgetSuccess from "./components/ForgetSuccess";
import Event from './pages/Event'
import CreateEvent from "./pages/CreateEvent";
import EventSuccess from "./pages/EventStatus/EventSuccess";
import EventFailed from "./pages/EventStatus/EventFailed";
import Wallet from "./pages/Wallet";
import Status from "./pages/Status";
import Setting from "./pages/Setting";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // if(currentUser)
  //     // dispatch(getPoint())
  //     // dispatch(getNFTPoint())
  // }, [currentUser]);

  return (
    <Router history={history}>
      <div>
        <Nav />
        <div>
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/event" component={Event} />
            <Route exact path="/create-event" component={CreateEvent} />
            <Route exact path="/create-event-success" component={EventSuccess} />
            <Route exact path="/create-event-fail" component={EventFailed} />
            <Route path="/mod" component={BoardModerator} />
            <Route exact path='/wallet' component={Wallet} />
            <Route exact path='/status' component={Status} />
            <Route exact path='/setting' component={Setting} />
            <Route exact path='/reset' component={Reset} />
            <Route exact path='/forget' component={Forget} />
            <Route exact path='/forget-success' component={ForgetSuccess} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;