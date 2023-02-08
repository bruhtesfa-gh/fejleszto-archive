import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import messageSlice from './slices/message';
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        message: messageSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default store;