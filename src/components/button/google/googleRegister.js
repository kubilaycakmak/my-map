import React from 'react'
import './google.css'
import { GoogleLogin } from '@react-oauth/google';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { GoogleRegister } from '../../../actions/auth';

function GoogleSignup() {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        dispatch(GoogleRegister(credentialResponse, "mod"))
      }}
      onError={() => {
        console.log('Login Failed');
      }}
      useOneTap
      text="signup_with"
      theme='filled_black'
      size='large'
      shape="square"
    >
      <span>Sign up with Google</span>
    </GoogleLogin>
  );
}

export default GoogleSignup;