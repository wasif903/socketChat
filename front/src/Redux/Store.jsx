import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./Reducers/AuthSlice";
import { chatSlice } from "./chat/ChatSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [chatSlice.reducerPath]: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authSlice.middleware)
      .concat(chatSlice.middleware),
});

setupListeners(store.dispatch);
