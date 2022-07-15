import React, { useState, useEffect, useCallback } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import "./Avatar.css"
import Image from 'react-bootstrap/Image'
import { logout } from "../../../actions/auth";

function Avatar({ username }) {

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <div className='avatar'>
            <img className="avatar-img" src={require('./avatar.jpg')}/>
        </div>
        <div className='avatar-name'>{ username }</div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-3">
             <a href="/login" className="nav-link" onClick={logOut}>
                 Logout
             </a>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Avatar;