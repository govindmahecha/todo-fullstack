import { createSlice } from "@reduxjs/toolkit";
import { loginRequest, logOut } from "./userThunk";

const initialState = {
    user: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginRequest.fulfilled, (state, action) => {
            const {accessToken, email, uid} = action.payload
            state.user = {
                accessToken,
                email,
                uid
            }   
        })
        .addCase(logOut.fulfilled, () => {
            // Add user to the state array
            return initialState
          })
    }
})

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
