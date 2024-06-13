import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";

import MyRouter from './router';
import { useStore } from 'react-redux';
import { setUpInterceptor } from './axios.interceptor';
// import { store } from './redux/store';
// import { Provider } from 'react-redux';


export default function App() {

  // firebase init 

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE__AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
    appId: process.env.REACT_APP_APPID
  };

  initializeApp(firebaseConfig);
  const store = useStore();
  setUpInterceptor(store);
  return (
    
    <div style={{backgroundColor: '#FAFAFA'}}>
      <BrowserRouter>
        <MyRouter></MyRouter>
      </BrowserRouter>
    </div>
    
  );
}
