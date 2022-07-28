import React, { useState, useEffect, useCallback } from "react";
import EventBus from "../../common/EventBus";
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';

import { history } from "../../helpers/history";
import "./Nav.module.scss"
import "./Nav.css"
import Avatar from "../button/avatar/Avatar";

const Nav = (props) => {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      console.log(currentUser);
      history.listen((location) => {
        dispatch(clearMessage()); // clear message when changing location
      });
    }, [dispatch]);
  
    const logOut = useCallback(() => {
      dispatch(logout());
    }, [dispatch]);
  
    useEffect(() => {
      if(currentUser){
        if (currentUser.type == 'mod') {
          setShowModeratorBoard(true);
        } else {
          setShowModeratorBoard(false);
        }
      }
      
      EventBus.on("logout", () => {
        logOut();
        googleLogout();
      });
  
      return () => {
        EventBus.remove("logout");
      };
    }, [currentUser, logOut]);

    return <nav className="navbar navbar-expand">
      <div className="logo">Geo App</div>
        {/* <div className="navbar-nav mr-auto">
          {showModeratorBoard && (
              <li className="nav-item">
              <NavLink to={"/mod"} className="nav-link">
                  Moderator Board
              </NavLink>
              </li>
          )}
        </div> */}

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <Avatar {...currentUser}/>
          </div>
        // <div className="navbar-nav ml-auto">
        //     <li className="nav-item">
        //     <NavLink to={"/profile"} className="nav-link">
        //         {currentUser.username}
        //     </NavLink>
        //     </li>
        //     <li className="nav-item">
        //     <a href="/login" className="nav-link" onClick={logOut}>
        //         Logout
        //     </a>
        //     </li>
        //
        ) : (
        <div className="navbar-nav ml-auto">
            <li className="nav-item">
            <NavLink to={"/login"} className="nav-link login-button">
                Login
            </NavLink>
            </li>

            <li className="nav-item">
            <NavLink to={"/register"} className="nav-link register-button">
                Sign Up
            </NavLink>
            </li>
        </div>
        )}
    </nav> 
}

export default Nav;