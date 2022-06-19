import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from "./store";
import { Provider } from "react-redux";
import 'mapbox-gl/dist/mapbox-gl.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <GoogleOAuthProvider clientId="1069569845407-0k9k0n05j0ieou0l922qavgitq8du356.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
  </Provider>
);

