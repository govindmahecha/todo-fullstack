// src/app/store.js

import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import logger from 'redux-logger';

const middleware = [logger];

const store = configureStore({
  reducer: {
    auth: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(middleware)    


});

export default store;