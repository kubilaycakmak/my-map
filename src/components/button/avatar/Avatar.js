import React, { useState, useEffect, useCallback } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import Image from 'react-bootstrap/Image'
import { logout } from "../../../actions/auth";
import { useHistory } from "react-router";
import './Avatar.scss'

function Avatar({ fullName }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const styles = {
    minWidth: "100%",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  };

  const stylesDropdown = {
    border: "none"
  };

  const logOut = useCallback(() => {
    history.push("/login");
    dispatch(logout());
  }, [dispatch]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <div className='avatar'>
            <img className="avatar-img" src={require('./avatar.jpg')}/>
        </div>
        <div className='avatar-name'>{ fullName }</div>
      </Dropdown.Toggle>

      <Dropdown.Menu style={styles} >
        <Dropdown.Item  href="#/action-3" onClick={logOut}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Avatar;