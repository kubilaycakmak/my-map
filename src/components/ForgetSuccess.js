import React, { useState, useRef } from "react";
import '../App.css';
import styles from './forgetsuccess.module.scss'
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
    <div className={styles.forget}>
        <h3>
            We send you email, please check your email!
        </h3>
        <NavLink className={styles.nextButton} to={"/login"}>Back to Login</NavLink>
      </div>
  );
};

export default ForgetSuccess;