import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Google from '../components/button/google/googleRegister.js'
import { register } from "../actions/auth";
import styles from './styles/register.module.scss'
import MetaMaskAuth from "../components/button/metamask/MetaMaskAuth.js";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {

  const form = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);

  const [fullName, setFullName] = useState("");
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  // const onChangeUsername = (e) => {
  //   const username = e.target.value;
  //   setUsername(username);
  // };

  const onChangeWalletAddress = (e) => {
    const walletAddress = e.target.value;
    setWalletAddress(walletAddress);
  }

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeFullName = (e) => {
    const fullName = e.target.value;
    setFullName(fullName);
  };

  const handleRegister = (e) => {
    setLoading(true);
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(fullName, email, password, "mod", walletAddress))
        .then(() => {
          setLoading(false);
          setSuccessful(true);
        })
        .catch(() => {
          setLoading(false);
          setSuccessful(false);
        });
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/event" />;
  }

  return (
    <div className={styles.login}>
      <h3 className={styles.registerHeader}>Sign Up</h3>
      {/* <img className={styles.logo} src={require('../images/logowname.png')} /> */}
      <div className={styles.loginOuter}>

      {!message && (<div className={styles.headerRegister}>
        <Google />
        {/* <MetaMaskAuth text="up" /> */}
      </div>)}
      <Form onSubmit={handleRegister} ref={form} className="form">
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Full Name or Company</label>
                <Input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={fullName}
                  onChange={onChangeFullName}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div> */}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
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
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Wallet Address (Optional)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={walletAddress}
                  onChange={onChangeWalletAddress}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-dark btn-block">Sign Up {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}</button>
              </div>


              <div className="form-group">
                <NavLink to={"/login"} >Sign in</NavLink>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group no-margin">
              <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
              </div>
              <div className="form-group">
                <NavLink to="/login" className="btn btn-block" style={{background: "white", borderRadius: "3px", color: "black", padding: 0, height: "100%", display: "flex", justifyContent:"center", alignItems:"center"}}>Sign In</NavLink>
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
        
      </div>
      
    </div>
  );
  // return (
  //   <div className="col-md-12 page">
  //     <div className="card card-container">

  //       <Form onSubmit={handleRegister} ref={form} className="form">
  //         {!successful && (
  //           <div>
  //             <div className="form-group">
  //               <label htmlFor="username">Full Name</label>
  //               <Input
  //                 type="text"
  //                 className="form-control"
  //                 name="username"
  //                 value={fullName}
  //                 onChange={onChangeFullName}
  //               />
  //             </div>
  //             <div className="form-group">
  //               <label htmlFor="username">Username</label>
  //               <Input
  //                 type="text"
  //                 className="form-control"
  //                 name="username"
  //                 value={username}
  //                 onChange={onChangeUsername}
  //                 validations={[required, vusername]}
  //               />
  //             </div>

  //             <div className="form-group">
  //               <label htmlFor="email">Email</label>
  //               <Input
  //                 type="text"
  //                 className="form-control"
  //                 name="email"
  //                 value={email}
  //                 onChange={onChangeEmail}
  //                 validations={[required, validEmail]}
  //               />
  //             </div>

  //             <div className="form-group">
  //               <label htmlFor="password">Password</label>
  //               <Input
  //                 type="password"
  //                 className="form-control"
  //                 name="password"
  //                 value={password}
  //                 onChange={onChangePassword}
  //                 validations={[required, vpassword]}
  //               />
  //             </div>

  //             <div className="form-group">
  //               <label htmlFor="email">Wallet Address</label>
  //               <Input
  //                 type="text"
  //                 className="form-control"
  //                 name="email"
  //                 value={walletAddress}
  //                 onChange={onChangeWalletAddress}
  //               />
  //             </div>

  //             <div className="form-group">
  //               <button className="btn btn-dark btn-block">Sign Up</button>
  //             </div>

  //             <div className="form-group">
  //               <Google />
  //             </div>

  //             <div className="form-group">
  //               <NavLink to={"/login"} >Sign in</NavLink>
  //             </div>
  //           </div>
  //         )}

  //         {message && (
  //           <div className="form-group no-margin">
  //             <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
  //               {message}
  //             </div>
  //             <div className="form-group">
  //               <a href="/login" className="btn btn-dark btn-block">Sign In</a>
  //             </div>
  //           </div>
  //         )}
  //         <CheckButton style={{ display: "none" }} ref={checkBtn} />
  //       </Form>
  //     </div>
  //   </div>
  // );
};

export default Register;