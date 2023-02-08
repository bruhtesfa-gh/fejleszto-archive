import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: {
        isvisible: false,
        message: ""
    },
    success: {
        isvisible: false,
        message: ""
    },
    info: {
        isvisible: false,
        message: ""
    }
}

const messageSlice = createSlice({
    name: "message-slice",
    initialState,
    reducers: {
        setError(state, action) {
            state.success = initialState.success;
            state.info = initialState.info;
            state.error.isvisible = true;
            state.error.message = action.payload.message;
        },
        setSuccess(state, action) {
            state.error = initialState.error;
            state.info = initialState.info;
            state.success.isvisible = true;
            state.success.message = action.payload.message;
        },
        setInfo(state, action) {
            state.error = initialState.error;
            state.success = initialState.success;
            state.info.isvisible = true;
            state.info.message = action.payload.message;
        },
        clearError(state) {
            state.error.isvisible = false;
            state.error.message = "";
        },
        clearSuccess(state) {
            state.success.isvisible = false;
            state.success.message = "";
        },
        clearInfo(state) {
            state.info.isvisible = false;
            state.info.message = "";
        },
    }
});

export const messageActions = messageSlice.actions;
export default messageSlice;