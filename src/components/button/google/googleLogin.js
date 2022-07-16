import React from 'react'
import './google.css'
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../../../actions/auth'
import { useDispatch } from 'react-redux';
const GoogleSignin = () => {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        dispatch(googleLogin(credentialResponse));
      }}
      onError={() => {
        console.log('Login Failed');
      }}
      useOneTap
      theme='filled_black'
      size='large'
      shape="square"
    />
  );
}

export default GoogleSignin;