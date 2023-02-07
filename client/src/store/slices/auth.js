import { createSlice } from "@reduxjs/toolkit";

let token = localStorage.getItem("authtoken")
let username = localStorage.getItem("username")
const initialState = { token, username, loggedin: !!token };

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setLogIn(state, action) {
            state.token = action.payload.token;
            state.loggedin = true;
            localStorage.setItem("authtoken", action.payload.token);
            localStorage.setItem("username", action.payload.username);
        },
        setUserData(state, action) {
            state.username = action.payload.username;
        },
        setLogOut(state) {
            state.token = null;
            state.loggedin = false;
            state.username = '';
            localStorage.removeItem('authtoken');
            localStorage.removeItem('username');
        },
    }
})

export const authActions = authSlice.actions;
export default authSlice;