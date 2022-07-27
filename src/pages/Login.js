import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import '../App.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Google from '../components/button/google/googleLogin.js'
import styles from './styles/login.module.scss'
import { login, logout, register } from "../actions/auth";
import MetaMaskAuth from "../components/button/metamask/MetaMaskAuth";
import eventBus from "../common/EventBus";
import Modal from 'react-bootstrap/Modal';
import DefaultInput from '../components/input/DefaultInput'
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

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInfoNeeded, setIsInfoNeeded] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const [modalEmail, setModalEmail] = useState();
  const [data, setData] = useState();
  const dispatch = useDispatch();

  eventBus.on("ask-info", (data) => {
    if(data) {
      console.log(data.attributes);
      setIsInfoNeeded(true);
      setData(data.attributes);
    }
  })

  const handleChangeModalEmail = (e) => {
    const email = e.target.value;
    setModalEmail(email);
    console.log(email);
  }
  

  const metamaskRegister = () => {
    // fullName, email, password, type, walletAddress
    dispatch(register(data.username, modalEmail, data.sessionToken, "mod", data.ethAddress))
    setIsInfoNeeded(false);
    history.push("/login")
    eventBus.remove("ask-info", (a) => {
      console.log(a);
      
    })
  }

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/event");
          // window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/event" />;
  }

  return (
    <>
    {isInfoNeeded && <Modal show={isInfoNeeded}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Connect Email
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DefaultInput onChangeValue={handleChangeModalEmail} label={"Email"} placeholder="asd@gmail.com"/>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setIsInfoNeeded(false)}>Close</button>
        <button onClick={() => metamaskRegister()}>Submit</button>
      </Modal.Footer>
    </Modal>}
      <div className={styles.login}>
      {/* <img className={styles.logo} src={require('../images/logowname.png')} /> */}
      <h3 className={styles.loginHeader}>Sign In</h3>
      <div className={styles.loginOuter}>

        <div className={styles.headerLogin}>
            <Google />
            {/* <MetaMaskAuth text="in"/> */}
        </div>

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-dark btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>


          <div className="form-group">
            <NavLink className={styles.nextButton} to={"/forget"} >Forget Password</NavLink>
          </div>
          <div className="form-group">
            <NavLink className={styles.nextButton} to={"/register"} >Sign up</NavLink>
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
    </>
  );
};

export default Login;