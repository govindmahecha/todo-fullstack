import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/firebase.service";

export const loginRequest = createAsyncThunk(
    'user/login',
    async (payload) => {
        const response = await login(payload.email, payload.password);
          
        return response.user
    }
)

export const logOut = createAsyncThunk(
    'user/LOGOUT',
    async () => { 
      return true;
     }
  );