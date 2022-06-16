import React, { useState, useRef } from "react";
import '../App.css';

import { forgot } from "../actions/auth";
import { NavLink } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const ForgetSuccess = () => {

  return (
    <div className="col-md-12 page">
      <div className="card card-container">
        <div>
            We send you email, please check your email!
        </div>
        <NavLink to={"/login"}>Back to Login</NavLink>
      </div>
    </div>
  );
};

export default ForgetSuccess;