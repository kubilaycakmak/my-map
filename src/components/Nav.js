import React, { useState, useEffect, useCallback } from "react";
import EventBus from "../common/EventBus";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { history } from "../helpers/history";

const Nav = (props) => {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      history.listen((location) => {
        dispatch(clearMessage()); // clear message when changing location
      });
    }, [dispatch]);
  
    const logOut = useCallback(() => {
      dispatch(logout());
    }, [dispatch]);
  
    useEffect(() => {
      if (currentUser) {
        setShowModeratorBoard(true);
        setShowAdminBoard(true);
      } else {
        setShowModeratorBoard(false);
        setShowAdminBoard(false);
      }
  
      EventBus.on("logout", () => {
        logOut();
      });
  
      return () => {
        EventBus.remove("logout");
      };
    }, [currentUser, logOut]);

    return <nav className="navbar navbar-expand navbar-dark bg-dark sidebar-nav">
        <div className="navbar-nav mr-auto">
        <li className="nav-item">
            <NavLink to={"/home"} className="nav-link" activeClassName='is-active'>
            Map
            </NavLink>
        </li>

        {showModeratorBoard && (
            <li className="nav-item">
            <NavLink to={"/mod"} className="nav-link" activeClassName='is-active'>
                Moderator Board
            </NavLink>
            </li>
        )}
        </div>

        {currentUser ? (
        <div className="navbar-nav ml-auto">
            <li className="nav-item">
            <NavLink to={"/profile"} className="nav-link" activeClassName='is-active'>
                {currentUser.username}
            </NavLink>
            </li>
            <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
            </a>
            </li>
        </div>
        ) : (
        <div className="navbar-nav ml-auto">
            <li className="nav-item">
            <NavLink to={"/login"} className="nav-link" activeClassName='is-active'>
                Login
            </NavLink>
            </li>

            <li className="nav-item">
            <NavLink to={"/register"} className="nav-link" activeClassName='is-active'>
                Sign Up
            </NavLink>
            </li>
        </div>
        )}
    </nav> 
}

export default Nav;