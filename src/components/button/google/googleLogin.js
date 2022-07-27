import React from 'react'
import './google.scss'
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../../../actions/auth'
import { useDispatch } from 'react-redux';
const GoogleSignin = () => {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      context="signin"
      shape='rectangular'
      size='large'
      theme="outline"
      width='400'
      useOneTap
      onSuccess={credentialResponse => {
        dispatch(googleLogin(credentialResponse))
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}

export default GoogleSignin;