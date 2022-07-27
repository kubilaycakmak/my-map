import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import '../App.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import styles from './reset.module.scss'
import { reset } from "../actions/auth";
import { useHistory } from "react-router-dom";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Reset = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const history = useHistory();
  const [password1, setPasswor1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

//   const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangePassword1 = (e) => {
    const password1 = e.target.value;
    setPasswor1(password1);
  };

  const onChangePassword2 = (e) => {
    const password2 = e.target.value;
    setPassword2(password2);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
        if(password1 === password2){
          console.log(password1, props.location.pathname.split('/')[2]);
          dispatch(reset(password1, props.location.pathname.split('/')[2]))
          .then(() => {
            history.push("/login");
            // window.location.reload();
          })
          .catch(() => {
            setLoading(false);
          });    
        }else{
            setLoading(false);
        }
     
    } else {
      setLoading(false);
    }
  };

  return (
    <div className={styles.forget}>
      <div className={styles.forgetOuter}>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password1"
              value={password1}
              onChange={onChangePassword1}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password again</label>
            <Input
              type="password"
              className="form-control"
              name="password2"
              value={password2}
              onChange={onChangePassword2}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-dark btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Submit</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Reset;