import React from 'react'
import './google.scss'
import { GoogleLogin } from '@react-oauth/google';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { GoogleRegister } from '../../../actions/auth';

function GoogleSignup() {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      width='450'
      onSuccess={credentialResponse => {
        dispatch(GoogleRegister(credentialResponse, "mod"))
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    >
      <span>Sign up with Google</span>
    </GoogleLogin>
  );
}

export default GoogleSignup;